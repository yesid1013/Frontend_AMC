export interface Activo {
    id_activo : string;
    id_primario: string;
    id_secundario: string;
    ubicacion: string;
    tipo_de_equipo: string;
    fabricante: string;
    modelo: string;
    num_serie: string;
    datos_relevantes: string;
    fecha_registro : string;
    subcliente : string;

    imagen_equipo: string;

    id_subcliente: string;

    ficha_tecnica:string;

    codigo_qr : string;
  }

  export interface Registro_activo {
    id_primario: string;
    id_secundario: string | null;
    ubicacion: string;
    tipo_de_equipo: string;
    fabricante: string;
    modelo: string | null;
    num_serie: string | null;
    datos_relevantes: string | null;

    imagen_equipo: {
      name : string | null;
      mimeType: string | null;
      content: string | null;
    };

    id_subcliente: string;
  }

  export interface Editar_activo {
    id_primario: string;
    id_secundario: string | null;
    ubicacion: string;
    tipo_de_equipo: string;
    fabricante: string;
    modelo: string | null;
    num_serie: string | null;
    datos_relevantes: string | null;
    id_subcliente: string;

    imagen_equipo: {
      name : string | null;
      mimeType: string | null;
      content: string | null;
    };
  }

  export interface Adjuntar_ficha_tecnica {
    ficha_tecnica: {
      name : string | null;
      mimeType: string | null;
      content: string | null;
    };

  }