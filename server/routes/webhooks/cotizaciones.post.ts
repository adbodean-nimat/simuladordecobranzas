// SIN /api => server/routes/webhooks/cotizaciones.post.ts
// CON /api => server/api/webhooks/cotizaciones.post.ts
import {
  defineEventHandler,
  readRawBody,
  getHeader,
  setResponseStatus,
} from "h3";
import crypto from "node:crypto";
import prisma from "~/lib/prisma";

function clients() {
  const g = globalThis as any;
  g.__dlClients ||= new Set<any>();
  return g.__dlClients as Set<any>;
}
function setSnapshot(row: any) {
  (globalThis as any).__dlPrice = row;
}

export default defineEventHandler(async (event) => {
  try {
    const { webhookSecret: secret } = useRuntimeConfig(event);
    if (!secret) {
      console.error("FALTA NUXT_WEBHOOK_SECRET");
      setResponseStatus(event, 500);
      return "secret faltante";
    }

    // 1) leer cuerpo crudo
    const raw = await readRawBody(event, "utf8");
    if (!raw) {
      console.error("Cuerpo vacío");
      setResponseStatus(event, 400);
      return "cuerpo vacío";
    }

    // 2) firma
    const sig = getHeader(event, "x-webhook-signature") || "";
    const exp =
      "sha256=" + crypto.createHmac("sha256", secret).update(raw).digest("hex");
    //console.log("sig:", sig);
    //console.log("exp:", exp);
    if (sig !== exp) {
      console.error("Firma inválida");
      setResponseStatus(event, 400);
      return "firma inválida";
    }

    // 3) payload
    const payload = JSON.parse(raw);
    // console.log("Payload recibido:", payload);
    const row = payload.source === "SIST_COTI" ? payload?.items[0] : payload;
    if (!row || row.COTI_MONEDA1 !== "DL") {
      setResponseStatus(event, 204);
      return;
    }
    //console.log("Webhook DL recibido:", row);
    const dolar = Number(row.COTI_COTIZACION);
    const fecha = row.COTI_FECHA ? payload.detectedAt : new Date();

    // 4) persistir en PG (tomar el primer registro)
    const first =
      await prisma.simulador_cobranzas_parametros_generales.findFirst({
        orderBy: { id: "asc" },
      });
    const updated = first
      ? await prisma.simulador_cobranzas_parametros_generales.update({
          where: { id: first.id },
          data: {
            dolar,
            usuario_dolar: "desde Plataforma",
            fecha_actualizar_dolar: fecha,
          },
        })
      : await prisma.simulador_cobranzas_parametros_generales.create({
          data: {
            dolar,
            usuario_dolar: "desde Plataforma",
            fecha_actualizar_dolar: fecha,
          },
        });

    // 5) snapshot + WS
    const current = {
      dolar: updated.dolar != null ? Number(updated.dolar) : 0,
      fecha_actualizar_dolar: updated.fecha_actualizar_dolar ?? null,
      usuario_dolar: updated.usuario_dolar ?? "desde Plataforma",
    };
    setSnapshot({
      moneda1: "DL",
      moneda2: "PS",
      cotizacion: current.dolar,
      fechaUTC: row.COTI_FECHA ?? null,
      fechaLocal: payload.detectedAt ?? null,
    });
    const msg = JSON.stringify({ type: "DL_UPDATE", row: current });
    for (const p of clients()) {
      try {
        p.send(msg);
      } catch {}
    }

    console.log("Webhook DL OK → PG actualizado a", current.dolar);
    setResponseStatus(event, 204);
  } catch (e) {
    console.error("ERROR webhook:", e);
    setResponseStatus(event, 500);
    return "error interno";
  }
});
