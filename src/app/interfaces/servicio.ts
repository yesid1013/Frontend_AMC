export interface Servicio {
    id_servicio: string;
    activo_id_primario: string;
    activo: string; //Nombre del activo
    descripcion: string;
    fecha_ejecucion: string;
    informe: string;
    nombre_usuario: string;
    numero_servicio: number;
    observaciones: string;
    tipo_servicio: string;
    id_tipo_servicio: number;
    orden_de_servicio: string;
    observaciones_usuario: string;
}

export interface ServicioDeActivo {
    descripcion:     string;
    fecha_ejecucion: string;
    id_servicio:     string;
    informe:         null;
    nombre_usuario:  string;
    numero_servicio: number;
    observaciones:   string;
    tipo:            string;
}

////////////////////
export interface RegistroServicio {
    fecha_ejecucion: string;
    id_tipo_servicio: number;
    descripcion: string;
    observaciones: string | null;
    observaciones_usuario: string | null;
    orden_de_servicio: OrdenDeServicio;
}

export interface OrdenDeServicio {
    name: string | null;
    mimeType: string | null;
    content: string | null;
}

///////////////////////////
export interface EditarServicio {
    id_activo: string;
    id_tipo_servicio: number;
    descripcion: string;
    observaciones: string;
    observaciones_usuario: string;
    fecha_ejecucion: string;

    orden_de_servicio: OrdenDeServicio;
}

export interface Adjuntar_informe_servicio {
    informe_servicio: {
        name: string | null;
        mimeType: string | null;
        content: string | null;
    };
}

export interface Adjuntar_cotizacion {
    costo : number;
    documento_cotizacion: {
        name: string | null;
        mimeType: string | null;
        content: string | null;
    };
}

