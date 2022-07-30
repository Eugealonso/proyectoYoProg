
import { Seccion } from "./seccion";
import {Habilidad} from "./habilidad";

export class Usuario{
    public idUsuario: number;
	
	public mail: string;
	
	public pass: string;

	public nombreApellido: string;

	public foto: string;

	public fotoPortada: string;

	public presentacion: string;

	public descripcion: string;

	public secciones: Seccion[];

	public habilidades: Habilidad[];

    constructor(idUsuario?: number, mail?: string, pass?: string, nombreApellido?: string, foto?:string, fotoPortada?: string, presentacion?:string, descripcion?: string, secciones?: Seccion[], habilidades?: Habilidad[]){
        this.idUsuario = idUsuario;
        this.mail = mail;
        this.pass = pass;
        this.nombreApellido = nombreApellido;
        this.foto = foto;
        this.fotoPortada = fotoPortada;
        this.presentacion = presentacion;
        this.descripcion = descripcion;
        this.secciones = secciones;
        this.habilidades = habilidades;        
    }
}