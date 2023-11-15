export interface Registrar_permiso {
    id_usuario : string,
    id_activo : string,
    ver_informacion_basica: number,
    ver_historial_servicios: number,
    ver_novedades: number,
    registrar_servicio: number,
    registrar_novedad: number,
    ver_costo_servicio : number
}

export interface Editar_permiso {
    id_usuario : string;
    ver_informacion_basica: number;
    ver_historial_servicios: number;
    ver_novedades: number;
    ver_costo_servicio : number;
    registrar_servicio: number;
    registrar_novedad: number;
}

export interface Permisos_creados { 
    id_permiso: string;
    activo : string;
    activo_id_primario : string;
    usuario : string;
    usuario_correo : string;
    ver_informacion_basica: number;
    ver_historial_servicios: number;
    ver_novedades: number;
    ver_costo_servicio : number;
    registrar_servicio: number;
    registrar_novedad: number;
}

export interface Permisos_recibidos {
    activo_id_primario:      string;
    activo_tipo_de_equipo:   string;
    id_activo:               string;
    id_permiso:              string;
    registrar_novedad:       number;
    registrar_servicio:      number;
    ver_historial_servicios: number;
    ver_informacion_basica:  number;
    ver_novedades:           number;
    ver_costo_servicio :     number;
}

export interface Permiso {
    id_activo: string;
    id_permiso: string;
    id_usuario: string;
    registrar_novedad: number;
    registrar_servicio: number;
    ver_historial_servicios: number;
    ver_informacion_basica: number;
    ver_novedades: number;
  }

export interface PermisosDeActivo {
    id_permiso:              string;
    registrar_novedad:       number;
    registrar_servicio:      number;
    usuario_correo:          string;
    usuario_nombre:          string;
    ver_historial_servicios: number;
    ver_informacion_basica:  number;
    ver_novedades:           number;
    ver_costo_servicio:      number;
}

  