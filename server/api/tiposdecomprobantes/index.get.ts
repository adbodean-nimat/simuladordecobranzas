import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  try {
    const data =
      await prisma.simulador_cobranzas_tipos_de_comprobantes.findMany();
    return data;
  } catch (error) {
    console.error(error);
  }
});
