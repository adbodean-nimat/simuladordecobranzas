import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  try{
    const data = await prisma.simulador_cobranzas_parametros_generales.findMany({
      select: {
        'max_dto_financiero': true,
        'tolerncia_dif': true,
        'unidad_tiempo_cheq': true,
        'unidad_tiempo_tc': true,
        'abv_tarjetas_credito': true,
        'abv_tarjetas_debito': true,
        'tasa_iva': true,
        'interes_diario': true
      }
    })
    return data;
  }
  catch(error){
    console.log(error)
  }
});