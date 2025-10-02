import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  try {
    const data = await prisma.costo_financiacion_cuota_simple.findMany();
    return data;
  } catch (error) {
    console.error(error);
  }
});
