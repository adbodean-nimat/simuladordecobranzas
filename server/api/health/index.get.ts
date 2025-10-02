import { defineEventHandler, setResponseStatus } from "h3";
import { PrismaClient } from "@prisma/client";

const g = globalThis as any;
const prisma: PrismaClient = g.__prisma ?? new PrismaClient();
if (!g.__prisma) g.__prisma = prisma;

function getWsClients() {
  g.__dlClients ||= new Set<any>();
  return g.__dlClients as Set<any>;
}

const BA_TZ = "America/Argentina/Buenos_Aires";
const fmtBA = (d: Date) =>
  new Intl.DateTimeFormat("es-AR", {
    timeZone: BA_TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(d);

export default defineEventHandler(async (event) => {
  const checks: any = {};
  let ok = true;

  // 1) Secret del webhook
  const secret = (useRuntimeConfig().webhookSecret as string | undefined) || "";
  checks.webhookSecret = { ok: !!secret };

  // 2) Postgres (y último dólar)
  try {
    const row = await prisma.simulador_cobranzas_parametros_generales.findFirst(
      { orderBy: { id: "asc" } }
    );
    checks.postgres = { ok: true, hasRow: !!row };

    if (row) {
      const val = row.dolar != null ? Number(row.dolar) : null;
      const iso = row.fecha_actualizar_dolar
        ? new Date(row.fecha_actualizar_dolar)
        : null;
      checks.lastDollar = {
        value: val,
        iso: iso ? iso.toISOString() : null,
        ba: iso ? fmtBA(iso) : null,
        user: row.usuario_dolar ?? "",
      };
    } else {
      checks.lastDollar = null;
    }
  } catch (e: any) {
    checks.postgres = { ok: false, error: e?.message || String(e) };
    ok = false;
  }

  // 3) WebSocket – cantidad de clientes
  const clients = getWsClients();
  checks.websocket = { ok: true, clients: clients.size };

  // 4) Hora del servidor (ISO + BA)
  const now = new Date();
  checks.serverTime = { iso: now.toISOString(), ba: fmtBA(now) };

  setResponseStatus(event, ok ? 200 : 500);
  return { ok, checks };
});
