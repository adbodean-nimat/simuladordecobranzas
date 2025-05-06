import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  try{
<<<<<<< HEAD
    const data = await prisma.simulador_cobranzas_usuarios.findMany({
      include: {
        simulador_cobranzas_roles: {
          select: {
            nombre: true
          }
        }
      }
    })
=======
    const data = await prisma.simulador_cobranzas_usuarios.findMany()
>>>>>>> fbe786fb (Actualizado al 30-01-2025)
    return data;
  }
  catch(error){
    console.log(error)
  }
});