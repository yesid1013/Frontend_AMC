export interface Servicio {
    activo:          string;
    descripcion:     string;
    fecha_ejecucion: string;
    id_servicio:     string;
    informe:         string;
    nombre_usuario:  string;
    numero_servicio: number;
    observaciones:   string;
    tipo_servicio:   string;
    orden_de_servicio: string;
}

export interface RegistroServicio {
    fecha_ejecucion:   string;
    id_tipo_servicio:  number;
    descripcion:       string;
    observaciones:     string | null;
    observaciones_usuario:     string | null;
    orden_de_servicio: OrdenDeServicio;
}

export interface OrdenDeServicio {
    name:     string | null;
    mimeType: string | null;
    content:  string | null;
}

