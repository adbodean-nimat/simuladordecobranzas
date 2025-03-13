import prisma from "~/lib/prisma";

interface ParametrosFacturas {
    desde: string,
    hasta: string,
    dto: string
}

export default defineEventHandler(async (event) => {
  try{
    const body = await readBody<ParametrosFacturas>(event)
    const data = await prisma.simulador_cobranzas_dto_actualizar_facturas.create({
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