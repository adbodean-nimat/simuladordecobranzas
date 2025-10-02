import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  try {
    const id = Number(event.context.params?.id);
    const data = await prisma.costo_financiacion_cuota_simple.delete({
      where: { id },
    });
    return data;
  } catch (error) {
    console.error(error);
  }
});
