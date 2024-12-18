import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  try{
    const data = await prisma.simulador_cobranzas_medios_de_pagos.findMany()
    return data;
  }
  catch(error){
    console.log(error)
  }
});