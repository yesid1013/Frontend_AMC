export interface Activo {

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

    ficha_tecnica: {
      name: string;
      mimeType: string;
      content: string;
    };
  }