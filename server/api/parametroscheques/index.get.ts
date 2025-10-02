import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  try {
    const data =
      await prisma.simulador_cobranzas_dto_actualizar_cheques.findMany({
        orderBy: [
          {
            id: "asc",
          },
        ],
      });
    return data;
  } catch (error) {
    console.error(error);
  }
});
