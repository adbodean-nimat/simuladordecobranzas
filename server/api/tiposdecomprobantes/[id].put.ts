import prisma from "~/lib/prisma";

interface TiposdeComprobantes {
  id: number;
  nombre: string;
  codigo: string;
  signo: string;
}

export default defineEventHandler(async (event) => {
  try {
    const id = Number(event.context.params?.id);
    const body = await readBody<TiposdeComprobantes>(event);
    const data = await prisma.simulador_cobranzas_tipos_de_comprobantes.update({
      where: { id },
      data: {
        codigo: body.codigo,
        nombre: body.nombre,
        signo: body.signo,
      },
    });
    return data;
  } catch (error) {
    console.error(error);
  }
});
