
import { ItemSeccion } from "./itemSeccion";

export class Seccion{
    
	public idSeccion: number;

	public titulo: string;

	public items: ItemSeccion[];

    constructor(idSeccion?: number, titulo?: string,items?: ItemSeccion[]){
        this.idSeccion = idSeccion;
        this.titulo = titulo;
        this.items = items;
    }
}