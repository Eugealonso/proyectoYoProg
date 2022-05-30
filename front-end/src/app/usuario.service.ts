import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from './modelo/login';
import { Usuario } from './modelo/usuario';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private usuariosUrl='/usuarios';
  
  constructor(private http: HttpClient) {}

  login(login:Login): Observable<Usuario>{
    return this.http.post<any>(environment.baseUrl + this.usuariosUrl + '/login', login);
  }
}
