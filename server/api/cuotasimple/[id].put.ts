import prisma from "~/lib/prisma";

interface CostoFinanciacionCuotaSimple {
    cuotas: string,
    tasas_interes: string
}

export default defineEventHandler(async (event) => {
  try{

    const id = Number(event.context.params?.id)
    const body = await readBody<CostoFinanciacionCuotaSimple>(event)
    const data = await prisma.costo_financiacion_cuota_simple.update({
        where: { id },
        data: {
            cuotas: body.cuotas,
            tasas_interes: body.tasas_interes 
        }
    })
    return data;
  }
  catch(error){
    console.log(error)
  }
});