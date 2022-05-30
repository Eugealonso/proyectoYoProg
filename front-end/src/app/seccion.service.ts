import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Seccion } from './modelo/seccion';

@Injectable({
  providedIn: 'root'
})
export class SeccionService {

  private seccionesUrl='/secciones';
  
  constructor(private http: HttpClient) {}

  agregarSeccion(idUsuario: number, seccion: Seccion): Observable<Seccion>{
    return this.http.post<any>(environment.baseUrl + this.seccionesUrl + '/' + idUsuario + '/crear', seccion);
  }

  editarSeccion(seccion: Seccion): Observable<Seccion> {
    return this.http.post<any>(environment.baseUrl + this.seccionesUrl + '/editar', seccion);
  }

  listarSecciones(): Observable<Seccion[]> {
    return this.http.get<any>(environment.baseUrl + this.seccionesUrl + '/listar');
  }

  eliminarSeccion(idSeccion: number): Observable<void> {
    return this.http.delete<any>(environment.baseUrl + this.seccionesUrl + '/eliminar/' + idSeccion);
  }
}
