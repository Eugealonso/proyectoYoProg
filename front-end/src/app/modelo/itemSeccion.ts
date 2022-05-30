export class ItemSeccion {
    public idItemSeccion: number;
	
	public titulo: string;

	public descripcion: string;

    constructor(idItemSeccion?: number, titulo?: string, descripcion?: string) {
        this.idItemSeccion = idItemSeccion;
        this.titulo = titulo;
        this.descripcion = descripcion;
    }

}