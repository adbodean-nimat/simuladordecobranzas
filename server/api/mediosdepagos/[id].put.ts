import prisma from "~/lib/prisma";


interface MediosDePago {
    estado: boolean,
    nombre: string,
    medio_pago: string,
    tipo_pago: string,
    dias: [],
    costo_financiacion: boolean
}

export default defineEventHandler(async (event) => {
  try{
    const id = Number(event.context.params?.id)
    const body = await readBody<MediosDePago>(event)
    const data = await prisma.simulador_cobranzas_medios_de_pagos.update({
        where: { id },
        data: {
            estado: body.estado,
            nombre: body.nombre,
            medio_pago: body.medio_pago,
            tipo_pago: body.tipo_pago,
            dias: body.dias,
            costo_financiacion: body.costo_financiacion
        }
    })
    return data;
  }
  catch(error){
    console.log(error)
  }
});