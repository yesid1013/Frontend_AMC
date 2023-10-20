export interface Registro_novedad {
    nombre_reporta : string;
    nombre_empresa: string;
    cargo: string;
    descripcion_reporte: string;

    imagenes: {
        name: string | null;
        mimeType: string | null;
        content: string | null;
    };

}

export interface Novedad {
    id_novedad : string;
    id_activo: string;
    fecha: string;
    nombre_reporta: string;
    nombre_empresa: string;
    cargo: string;
    descripcion_reporte: string;
    imagenes: string;
}