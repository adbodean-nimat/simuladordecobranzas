import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  try{
    const data = await prisma.simulador_cobranzas_usuarios.findMany({
      include: {
        simulador_cobranzas_roles: {
          select: {
            nombre: true
          }
        }
      }
    })
    return data;
  }
  catch(error){
    console.log(error)
  }
});