-- CreateTable
CREATE TABLE "acindar_clasif_clientes" (
    "id" SERIAL NOT NULL,
    "clasif_1_ptf" VARCHAR(30),
    "segmento_cliente_acindar" VARCHAR(30),
    "descrip_segmento" TEXT,
    "observacion" TEXT,

    CONSTRAINT "acindar_clasif_clientes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "acindar_comprobantes" (
    "id" SERIAL NOT NULL,
    "comprobante_ptf" VARCHAR(30),
    "tipo_de_transaccion" VARCHAR(30),
    "comprobante_acindar" VARCHAR(30),
    "tipo_doc_legal" VARCHAR(30),

    CONSTRAINT "acindar_comprobantes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "acindar_equivalcod_factorcant" (
    "id" SERIAL NOT NULL,
    "codigo_ptf" VARCHAR(30),
    "codigo_acindar" VARCHAR(30),
    "factor_cant" DECIMAL,

    CONSTRAINT "acindar_equivalcod_factorcant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "acindar_filtro_plataforma" (
    "id" SERIAL NOT NULL,
    "clasif6_inc" JSON,
    "clasif5_exc" JSON,

    CONSTRAINT "acindar_filtro_plataforma_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "actualizacion_web" (
    "id" SERIAL NOT NULL,
    "actualizacion_automatica" BOOLEAN,
    "actualizacion_fecha" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "actualizacion_cron_lunesaviernes" VARCHAR(70),
    "actualizacion_cron_sabados" VARCHAR(70),

    CONSTRAINT "actualizacion_web_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "articulos" (
    "id" SERIAL NOT NULL,
    "publicado" BOOLEAN,
    "codigo_art" TEXT,
    "nombre_art" TEXT,
    "orden_art" INTEGER,
    "marcar_nuevo" BOOLEAN,
    "mostrar_inicio" BOOLEAN,
    "outlet" BOOLEAN,
    "copete" TEXT,
    "descripcion" TEXT,
    "bloq_vtas" BOOLEAN,
    "min_para_web" DECIMAL,
    "stock" DECIMAL,
    "categorias1" TEXT,
    "categorias2" TEXT,
    "categorias3" TEXT,
    "categorias4" TEXT,

    CONSTRAINT "articulos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cales_cementos_plasticor" (
    "id" SERIAL NOT NULL,
    "cod_articulos" VARCHAR(30),
    "nombre_articulos" VARCHAR(70),

    CONSTRAINT "cales_cementos_plasticor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cartel_manual" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT,
    "subtitulo" TEXT,
    "precio" TEXT,
    "unimed" TEXT,
    "outlet" BOOLEAN,

    CONSTRAINT "cartel_manual_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categorias" (
    "id" SERIAL NOT NULL,
    "id_categorias" INTEGER,
    "nombre_categorias" TEXT,

    CONSTRAINT "categorias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clasif_arts_5_al_consultar" (
    "id" SERIAL NOT NULL,
    "arts_clasif_5" JSONB[],
    "descripcion" TEXT,
    "whatsapp" TEXT,

    CONSTRAINT "clasif_arts_5_al_consultar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clasif_arts_5_stock_manual" (
    "id" SERIAL NOT NULL,
    "arts_clasif_5" JSONB[],
    "stock_manual" VARCHAR,

    CONSTRAINT "clasif_arts_5_stock_manual_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comprobantes_a_omitir" (
    "id" SERIAL NOT NULL,
    "cod_comprobante" VARCHAR(3),
    "nombre_comprobante" VARCHAR(70),

    CONSTRAINT "comprobantes_a_omitir_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "const_seco_armado_config_1" (
    "id" SERIAL NOT NULL,
    "codptf" VARCHAR(30),
    "configcs" VARCHAR(3),
    "cant" DECIMAL,

    CONSTRAINT "const_seco_armado_config_1_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "const_seco_armado_config_2" (
    "id" SERIAL NOT NULL,
    "cod_art" VARCHAR(30),
    "nombre_art_ptf" VARCHAR(70),
    "nombre_art_lp" VARCHAR(70),
    "uni_lp_x_cada_uni_ptf" DECIMAL,
    "uni" VARCHAR(30),
    "fracciona_uni_ptf" VARCHAR(2),
    "observacion" TEXT,

    CONSTRAINT "const_seco_armado_config_2_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "const_seco_nombres_configuraciones" (
    "id" SERIAL NOT NULL,
    "cod_conf_cs" VARCHAR(30),
    "nombre_conf_cs" VARCHAR(70),

    CONSTRAINT "const_seco_nombres_configuraciones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "costo_financiacion_cuota_simple" (
    "id" SERIAL NOT NULL,
    "cuotas" VARCHAR(30),
    "tasas_interes" VARCHAR(30),

    CONSTRAINT "costo_financiacion_cuota_simple_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "costo_financiacion_naranja" (
    "id" SERIAL NOT NULL,
    "cuotas" VARCHAR(30),
    "tasas_interes" VARCHAR(30),

    CONSTRAINT "costo_financiacion_naranja_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "costo_financiacion_visa_master_nativa" (
    "id" SERIAL NOT NULL,
    "cuotas" VARCHAR(30),
    "tasas_interes" VARCHAR(30),

    CONSTRAINT "costo_financiacion_visa_master_nativa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "depos_a_no_considerar" (
    "id" SERIAL NOT NULL,
    "cod_depos" DECIMAL,
    "nombre_deposito" VARCHAR(30),

    CONSTRAINT "depos_a_no_considerar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "depos_a_no_considerar_para_stock_fisico" (
    "id" SERIAL NOT NULL,
    "codigo_deposito" DECIMAL,
    "nombre_deposito" TEXT,

    CONSTRAINT "depos_a_no_considerar_para_stock_fisico_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dimensiones_contenedores" (
    "id" SERIAL NOT NULL,
    "clas4_clas5" VARCHAR(30),
    "nombre" VARCHAR(30),
    "medidas_ancho" VARCHAR(30),
    "medidas_alto_puerta" VARCHAR(30),
    "medidas_alto_interior" VARCHAR(30),
    "medidas_largo" VARCHAR(30),

    CONSTRAINT "dimensiones_contenedores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "familias_articulos_distribucion" (
    "id" SERIAL NOT NULL,
    "cod_familia_art" VARCHAR(30),
    "nombre_familia_art" VARCHAR(70),
    "nro_orden_familia" DECIMAL,
    "cod_set_art" VARCHAR(30),
    "nombre_set_art" VARCHAR(70),

    CONSTRAINT "familias_articulos_distribucion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "familias_de_articulos" (
    "id" SERIAL NOT NULL,
    "nombre_fami_art" VARCHAR(70),
    "nro_orden_de_la_fami" DECIMAL,
    "set_ventas" VARCHAR(30) DEFAULT '',

    CONSTRAINT "familias_de_articulos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "familias_distribuciones" (
    "id" SERIAL NOT NULL,
    "nombre_familia" VARCHAR(70),
    "orden_familia" DECIMAL,

    CONSTRAINT "familias_distribuciones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "filtro_clientes_plataforma" (
    "id" SERIAL NOT NULL,
    "tipo_de_cliente" JSON,
    "perfil_crediticio" JSON,

    CONSTRAINT "filtro_clientes_plataforma_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lista_de_precios_breve_uso_interno" (
    "id" SERIAL NOT NULL,
    "arts_articulo_emp" VARCHAR(30),
    "arts_nombre" VARCHAR(70),
    "grupo_del_art" VARCHAR(70),
    "comentario" TEXT,
    "nro_orden_art" TEXT,

    CONSTRAINT "lista_de_precio_breve_uso_interno_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "movimientos_de_contenedores" (
    "id" SERIAL NOT NULL,
    "cod_cant_mov" VARCHAR(30),
    "nombre_movimiento" VARCHAR(60),
    "cant_mov_nro" DECIMAL,

    CONSTRAINT "movimientos_de_contenedores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "np_a_considerar" (
    "id" SERIAL NOT NULL,
    "cod_comp" VARCHAR(30),
    "nomb_comp" VARCHAR(30),

    CONSTRAINT "np_a_considerar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "productos_para_distribucion" (
    "id" SERIAL NOT NULL,
    "Codigo_producto" VARCHAR(30),
    "Orden_producto" DECIMAL,
    "Cod_Familia_producto" VARCHAR(30) DEFAULT 0,

    CONSTRAINT "productos_para_distribucion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "remitos_de_ventas" (
    "id" SERIAL NOT NULL,
    "cod_comprobante" VARCHAR(3),
    "nombre_comprobante" VARCHAR(70),

    CONSTRAINT "Remitos_de_ventas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rubros_ventas" (
    "id" SERIAL NOT NULL,
    "rubros_id" VARCHAR(6),
    "rubros_nombres" VARCHAR(70),
    "orden_rubros" DECIMAL,

    CONSTRAINT "rubros_ventas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sc_parametros_grales" (
    "id" SERIAL NOT NULL,
    "datos_generales" JSONB,
    "datos_dtos_facturas" JSONB,
    "datos_dtos_cheques" JSONB,

    CONSTRAINT "sc_parametros_grales_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sets_de_ventas" (
    "id" SERIAL NOT NULL,
    "nombre_set_art" VARCHAR(30),

    CONSTRAINT "sets_de_ventas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "simulador_cobranzas_dto_actualizar_cheques" (
    "id" SERIAL NOT NULL,
    "desde" DECIMAL,
    "hasta" DECIMAL,
    "dto" DECIMAL,

    CONSTRAINT "simulador_cobranzas_dto_actualizar_cheques_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "simulador_cobranzas_dto_actualizar_facturas" (
    "id" SERIAL NOT NULL,
    "desde" DECIMAL,
    "hasta" DECIMAL,
    "dto" DECIMAL,

    CONSTRAINT "simulador_cobranzas_dto_actualizar_facturas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "simulador_cobranzas_medios_de_pagos" (
    "id" SERIAL NOT NULL,
    "estado" BOOLEAN,
    "nombre" VARCHAR(30),
    "medio_pago" VARCHAR(30),
    "tipo_pago" VARCHAR(30),
    "interes_base" JSONB,

    CONSTRAINT "simulador_cobranzas_medios_de_pagos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "simulador_cobranzas_parametros_generales" (
    "id" SERIAL NOT NULL,
    "max_dto_financiero" DECIMAL,
    "tolerncia_dif" DECIMAL,
    "unidad_tiempo_cheq" VARCHAR(30),
    "unidad_tiempo_tc" VARCHAR(30),
    "abv_tarjetas_credito" VARCHAR(30),
    "abv_tarjetas_debito" VARCHAR(30),
    "tasa_iva" DECIMAL,
    "fecha_alta" DATE NOT NULL DEFAULT CURRENT_DATE,

    CONSTRAINT "simulador_cobranzas_parametros_generales_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "simulador_cobranzas_roles" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT,
    "descripcion" TEXT,

    CONSTRAINT "simulador_cobranzas_roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "simulador_cobranzas_usuarios" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT,
    "usuario_ad" TEXT,
    "id_roles" INTEGER,

    CONSTRAINT "simulador_cobranzas_usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tablas" (
    "id" SERIAL NOT NULL,
    "nombre_tablas" VARCHAR(70),
    "url_tablas" VARCHAR(70),
    "consultas_tablas" VARCHAR(70),

    CONSTRAINT "tablas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vincular_articulos_a_familia" (
    "cod" SERIAL NOT NULL,
    "cod_art" VARCHAR(30),
    "cod_familia" VARCHAR(30),
    "orden_art_familia" DECIMAL,

    CONSTRAINT "vincular_articulos_a_familia_pkey" PRIMARY KEY ("cod")
);

-- AddForeignKey
ALTER TABLE "simulador_cobranzas_usuarios" ADD CONSTRAINT "roles" FOREIGN KEY ("id_roles") REFERENCES "simulador_cobranzas_roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

