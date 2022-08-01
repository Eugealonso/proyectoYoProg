import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Habilidad } from './modelo/habilidad';

@Injectable({
  providedIn: 'root'
})
export class HabilidadService {

  private headersReq = new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET',
    'Access-Control-Allow-Origin': '*'
  });

  private habilidadesUrl='/habilidades';
  
  constructor(private http: HttpClient) {}

  agregarHabilidad(idUsuario: number, habilidad: Habilidad): Observable<Habilidad>{
    return this.http.post<any>(environment.baseUrl + this.habilidadesUrl + '/' + idUsuario + '/crear', habilidad);
  }

  editarHabilidad(habilidad: Habilidad): Observable<Habilidad> {
    return this.http.post<any>(environment.baseUrl + this.habilidadesUrl + '/editar', habilidad);
  }

  listarHabilidades(tipo: string): Observable<Habilidad[]> {
    return this.http.get<any>(environment.baseUrl + this.habilidadesUrl + '/listar?tipo=' + tipo, {headers: this.headersReq});
  }

  eliminarHabilidad(idHabilidad: number): Observable<void> {
    return this.http.delete<any>(environment.baseUrl + this.habilidadesUrl + '/eliminar/' + idHabilidad);
  }
}
