import prisma from "~/lib/prisma";

interface CostoFinanciacionVisaMasterNativa {
  cuotas: string;
  tasas_interes: string;
}

export default defineEventHandler(async (event) => {
  try {
    const id = Number(event.context.params?.id);
    const body = await readBody<CostoFinanciacionVisaMasterNativa>(event);
    const data = await prisma.costo_financiacion_visa_master_nativa.update({
      where: { id },
      data: {
        cuotas: body.cuotas,
        tasas_interes: body.tasas_interes,
      },
    });
    return data;
  } catch (error) {
    console.error(error);
  }
});
