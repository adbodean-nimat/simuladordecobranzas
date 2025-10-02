import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  try {
    const id = Number(event.context.params?.id);
    const data = await prisma.simulador_cobranzas_dto_actualizar_cheques.delete(
      {
        where: { id },
      }
    );
    return data;
  } catch (error) {
    console.error(error);
  }
});
