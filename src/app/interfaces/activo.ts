export interface Activo {

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
    id_secundario: string;
    ubicacion: string;
    tipo_de_equipo: string;
    fabricante: string;
    modelo: string;
    num_serie: string;
    datos_relevantes: string;

    imagen_equipo: {
      name : string;
      mimeType: string;
      content: string;
    };

    id_subcliente: string;
  }

  export interface Editar_activo {
    id_primario: string;
    id_secundario: string;
    ubicacion: string;
    tipo_de_equipo: string;
    fabricante: string;
    modelo: string;
    num_serie: string;
    datos_relevantes: string;
    id_subcliente: string;
  }