import prisma from "~/lib/prisma";

interface ParametrosGenerales {
    max_dto_financiero: string,
    tolerncia_dif: string,
    unidad_tiempo_cheq: string,
    unidad_tiempo_tc: string,
    abv_tarjetas_credito: string,
    abv_tarjetas_debito: string,
    tasa_iva: string,
    fecha_alta: string
}

export default defineEventHandler(async (event) => {
  try{

    const id = Number(event.context.params?.id)
    const body = await readBody<ParametrosGenerales>(event)
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
            fecha_alta: body.fecha_alta
        }
    })
    return data;
  }
  catch(error){
    console.log(error)
  }
});