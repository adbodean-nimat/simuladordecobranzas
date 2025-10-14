import prisma from "~/lib/prisma";

interface TiposdeComprobantes {
  nombre: string;
  codigo: string;
  signo: string;
}

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody<TiposdeComprobantes>(event);
    const data = await prisma.simulador_cobranzas_tipos_de_comprobantes.create({
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
