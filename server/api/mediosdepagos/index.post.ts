import prisma from "~/lib/prisma";

interface MediosDePago {
    estado: boolean,
    nombre: string,
    medio_pago: string,
    tipo_pago: string
}

export default defineEventHandler(async (event) => {
  try{
    const body = await readBody<MediosDePago>(event)
    const data = await prisma.simulador_cobranzas_medios_de_pagos.create({
        data: {
            estado: body.estado,
            nombre: body.nombre,
            medio_pago: body.medio_pago,
            tipo_pago: body.tipo_pago
        }
    })
    return data;
  }
  catch(error){
    console.log(error)
  }
});