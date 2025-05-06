<<<<<<< HEAD
import { Prisma } from "~/prisma/app/generated/prisma/client";
=======
import { Prisma } from "@prisma/client";
>>>>>>> fbe786fb (Actualizado al 30-01-2025)
import prisma from "~/lib/prisma";

interface InteresBase {
    uuid: string,
    nro_cuota: string,
    interes_base: string
}

export default defineEventHandler(async (event) => {
  try{
    const uuid = (event.context.params?.uuid)?.toString()
    const body = await readBody<InteresBase>(event)
    console.log(body)
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
      const NroCuotabyUUID = result[0].interes_base.filter((item : any)=> uuid == item.uuid).map((data: { nro_cuota: any; }) => data.nro_cuota)[0]
      const InteresBasebyUUID = result[0].interes_base.filter((item : any)=> uuid == item.uuid).map((data: { interes_base: any; }) => data.interes_base)[0]
      const indexData = result[0].interes_base.map((data: any[], index: any) => ({index, data}))
      const uuidById = indexData.filter((item : any) => uuid == item.data.uuid).map((data: any, index: any)=> data.index)[0]
      const uuidByIndex = Prisma.sql([uuidById]);
      const json = { 
        "uuid": uuid, 
        "nro_cuota": body.nro_cuota === '' || body.nro_cuota === undefined || Number.isNaN(body.nro_cuota) ? NroCuotabyUUID : body.nro_cuota, 
        "interes_base": body.interes_base === '' || body.interes_base === undefined || Number.isNaN(body.interes_base) ? InteresBasebyUUID : body.interes_base
      }
      const byuuid = Prisma.sql([uuid!])
      const nro_cuota = Prisma.sql([json.nro_cuota])
      const interes_base = Prisma.sql([json.interes_base])
      await prisma.$queryRaw`UPDATE simulador_cobranzas_medios_de_pagos SET interes_base = jsonb_set(interes_base::jsonb, '{${uuidByIndex}}', '{"uuid": "${byuuid}" ,"nro_cuota": ${nro_cuota}, "interes_base": ${interes_base}}'::jsonb) WHERE id = ${id}`;
      return 'Modificado correctamente'
    }
  }
  catch(error){
    console.log(error)
  }
});