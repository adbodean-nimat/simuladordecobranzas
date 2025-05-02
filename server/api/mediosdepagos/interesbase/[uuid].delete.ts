import { Prisma } from "~/prisma/app/generated/prisma/client";
import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  try{
    const uuid = (event.context.params?.uuid)?.toString()
    const findMany = Prisma.sql`
    SELECT *
    FROM public.simulador_cobranzas_medios_de_pagos f
    CROSS JOIN jsonb_array_elements(interes_base) i
    WHERE i->>'uuid' = ${uuid};`
    const result : any = await prisma.$queryRaw(findMany)
    
    if(!result[0]){
      return 'No existe'
    } else {
      const id = result ? result[0].id : '';
      const indexData = result[0].interes_base.map((data: any[], index: any) => ({index, data}))
      const uuidById = indexData.filter((item : any) => uuid == item.data.uuid).map((data: any, index: any)=> data.index)[0]
      console.log(uuidById)
      const uuidByIndex = Prisma.sql([uuidById]);
      await prisma.$queryRaw`UPDATE simulador_cobranzas_medios_de_pagos SET interes_base = interes_base::jsonb - ${uuidByIndex} WHERE id = ${id}`;
      
      return 'Eliminado correctamente'
    }
  }
  catch(error){
    console.log(error)
  }
});