import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  try{
    const data = await prisma.simulador_cobranzas_roles.findMany()
    return data;
  }
  catch(error){
    console.log(error)
  }
});