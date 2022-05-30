export class Habilidad{
    public idHabilidad: number;

	public titulo: string;

	public porcentaje: number;

	public tipo: string;

    constructor(idHabilidad?: number, titulo?: string, porcentaje?: number, tipo?: string) {
        this.idHabilidad = idHabilidad;
        this.titulo = titulo;
        this.porcentaje = porcentaje;
        this.tipo = tipo;
    }

}