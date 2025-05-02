import prisma from "~/lib/prisma";
import { Prisma } from "~/prisma/app/generated/prisma/client";
import { v1 as uuidv1} from "uuid";

interface InteresBase {
    id: string,
    index: number,
    uuid: string,
    nro_cuota: string,
    interes_base: string
}

export default defineEventHandler(async (event) => {
  try{
    const body = await readBody<InteresBase>(event)
    const json = {"uuid": uuidv1(), "nro_cuota": body.nro_cuota, "interes_base": body.interes_base}
    const result : any = await prisma.$queryRaw`SELECT * FROM public.simulador_cobranzas_medios_de_pagos WHERE id = ${body.id}`
    var datosInteresBaseFiltroxID: any = [];
    const getData : any = result.forEach((item: { interes_base: any[]; }) => item.interes_base?.map(data => datosInteresBaseFiltroxID.push(data)))
    console.log(datosInteresBaseFiltroxID.length)
    console.log(datosInteresBaseFiltroxID.findIndex((e: { nro_cuota: string; }) => e.nro_cuota === body.nro_cuota))
    const index = Prisma.sql([datosInteresBaseFiltroxID.length]);
    const byuuid = Prisma.sql([json.uuid]);
    const nro_cuota = Prisma.sql([json.nro_cuota]);
    const interes_base = Prisma.sql([json.interes_base])

    if(datosInteresBaseFiltroxID.length == 0){
      console.log("Agregado nuevo => " + JSON.stringify(json));
      await prisma.$queryRaw`UPDATE simulador_cobranzas_medios_de_pagos SET interes_base = '[{"uuid": "${byuuid}" ,"nro_cuota": ${nro_cuota}, "interes_base": ${interes_base}}]'::jsonb WHERE id = ${body.id}`
      return "Agregado correctamente";
    } 
    
    if (datosInteresBaseFiltroxID.findIndex((e: { nro_cuota: string; }) => e.nro_cuota === body.nro_cuota) == -1) {
      console.log("Agregado => " + JSON.stringify(json));
      await prisma.$queryRaw`UPDATE simulador_cobranzas_medios_de_pagos SET interes_base = jsonb_set(interes_base::jsonb, '{${index}}', '{"uuid": "${byuuid}" ,"nro_cuota": ${nro_cuota}, "interes_base": ${interes_base}}'::jsonb) WHERE id = ${body.id}`
      return "Agregado correctamente";
    } else 
    if (datosInteresBaseFiltroxID.findIndex((e: { nro_cuota: string; }) => e.nro_cuota === body.nro_cuota) > -1) {
      return "Ya existe";
    }

  }
  catch(error){
    console.log(error)
  }
});