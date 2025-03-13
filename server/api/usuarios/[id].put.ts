import prisma from "~/lib/prisma";

interface Usuarios {
    id: number,
    nombre: string,
    usuario_ad: string,
    id_roles: number
}

export default defineEventHandler(async (event) => {
  try{
    const id = Number(event.context.params?.id)
    const body = await readBody<Usuarios>(event)
    const data = await prisma.simulador_cobranzas_usuarios.update({
        where: { id },
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