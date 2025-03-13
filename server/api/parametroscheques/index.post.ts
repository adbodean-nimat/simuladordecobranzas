import prisma from "~/lib/prisma";

interface ParametrosCheques {
    desde: string,
    hasta: string,
    dto: string
}

export default defineEventHandler(async (event) => {
  try{
    const body = await readBody<ParametrosCheques>(event)
    const data = await prisma.simulador_cobranzas_dto_actualizar_cheques.create({
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