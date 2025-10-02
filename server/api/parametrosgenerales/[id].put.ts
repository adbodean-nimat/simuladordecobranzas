import prisma from "~/lib/prisma";
import { DateTime } from "luxon";

interface ParametrosGenerales {
  max_dto_financiero: string;
  tolerncia_dif: string;
  unidad_tiempo_cheq: string;
  unidad_tiempo_tc: string;
  abv_tarjetas_credito: string;
  abv_tarjetas_debito: string;
  tasa_iva: string;
  fecha_alta: string;
  interes_diario: string;
  dolar: string;
  usuario_dolar: string;
  fecha_actualizar_dolar: string;
}

export default defineEventHandler(async (event) => {
  try {
    const id = Number(event.context.params?.id);
    const body = await readBody<ParametrosGenerales>(event);
    const data = await prisma.simulador_cobranzas_parametros_generales.update({
      where: { id },
      data: {
        max_dto_financiero: body.max_dto_financiero,
        tolerncia_dif: body.tolerncia_dif,
        unidad_tiempo_cheq: body.unidad_tiempo_cheq,
        unidad_tiempo_tc: body.unidad_tiempo_tc,
        abv_tarjetas_credito: body.abv_tarjetas_credito,
        abv_tarjetas_debito: body.abv_tarjetas_debito,
        tasa_iva: body.tasa_iva,
        fecha_alta: body.fecha_alta,
        interes_diario: body.interes_diario,
        dolar: body.dolar,
        usuario_dolar: body.usuario_dolar,
        fecha_actualizar_dolar: DateTime.now().toISO(),
      },
    });
    return data;
  } catch (error) {
    console.error(error);
  }
});
