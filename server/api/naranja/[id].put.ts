import prisma from "~/lib/prisma";

interface CostoFinanciacionNaranja {
    cuotas: string,
    tasas_interes: string
}

export default defineEventHandler(async (event) => {
  try{

    const id = Number(event.context.params?.id)
    const body = await readBody<CostoFinanciacionNaranja>(event)
    const data = await prisma.costo_financiacion_naranja.update({
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