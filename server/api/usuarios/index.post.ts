import prisma from "~/lib/prisma";

interface Usuarios {
    nombre: string,
    usuario_ad: string,
    id_roles: number
}

export default defineEventHandler(async (event) => {
  try{
    const body = await readBody<Usuarios>(event)
    const data = await prisma.simulador_cobranzas_usuarios.create({
        data: {
            nombre: body.nombre,
            usuario_ad: body.usuario_ad,
            id_roles: body.id_roles 
        }
    })
    return data;
  }
  catch(error){
    console.log(error)
  }
});