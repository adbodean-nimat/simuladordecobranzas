import prisma from "~/lib/prisma";

interface CostoFinanciacionNaranja {
    cuotas: string,
    tasas_interes: string
}

export default defineEventHandler(async (event) => {
  try{
    const body = await readBody<CostoFinanciacionNaranja>(event)
    const data = await prisma.costo_financiacion_naranja.create({
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