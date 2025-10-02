import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  try {
    const data = await prisma.costo_financiacion_visa_master_nativa.findMany({
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
