import prisma from "~/lib/prisma";

interface ParametrosCheques {
    desde: string,
    hasta: string,
    dto: string
}

export default defineEventHandler(async (event) => {
  try{
    const id = Number(event.context.params?.id)
    const body = await readBody<ParametrosCheques>(event)
    const data = await prisma.simulador_cobranzas_dto_actualizar_cheques.update({
        where: { id },
        data: {
            desde: body.desde,
            hasta: body.hasta,
            dto: body.dto 
        }
    })
    return data;
  }
  catch(error){
    console.log(error)
  }
});