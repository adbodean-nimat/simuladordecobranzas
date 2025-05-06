import { Prisma } from "@prisma/client";
import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  try{
    const uuid = event.context.params?.uuid
    console.log(uuid)
    const findMany = Prisma.sql`
    SELECT *
    FROM public.simulador_cobranzas_medios_de_pagos f
    CROSS JOIN jsonb_array_elements(interes_base) i
    WHERE i->>'uuid' = ${uuid}`;
    const result : any = await prisma.$queryRaw(findMany)
    
    return result
  }
  catch(error){
    console.log(error)
  }
});