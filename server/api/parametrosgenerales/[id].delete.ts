import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  try{
    const id = Number(event.context.params?.id)
    const data = await prisma.simulador_cobranzas_parametros_generales.delete({
        where: { id }
    })
    return data;
  }
  catch(error){
    console.log(error)
  }
});