import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  try {
    const id = Number(event.context.params?.id);
    const data = await prisma.simulador_cobranzas_medios_de_pagos.delete({
      where: { id },
    });
    return data;
  } catch (error) {
    console.error(error);
  }
});
