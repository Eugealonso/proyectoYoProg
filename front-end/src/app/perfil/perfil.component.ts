import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HabilidadService } from '../habilidad.service';
import { Habilidad } from '../modelo/habilidad';
import { ItemSeccion } from '../modelo/itemSeccion';
import { Login } from '../modelo/login';
import { Seccion } from '../modelo/seccion';
import { Usuario } from '../modelo/usuario';
import { SeccionService } from '../seccion.service';
import { UsuarioService } from '../usuario.service';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  @ViewChild('closeBtn') closeBtn: ElementRef;
  @ViewChild('closeSeccionBtn') closeSeccionBtn: ElementRef;
  @ViewChild('closeEliminarSeccionBtn') closeEliminarSeccionBtn: ElementRef;
  @ViewChild('closeItemSeccionBtn') closeItemSeccionBtn: ElementRef;
  @ViewChild('closeEliminarItemBtn') closeEliminarItemBtn: ElementRef;
  @ViewChild('closeHabilidadBtn') closeHabilidadBtn: ElementRef;
  @ViewChild('closeEliminarHabilidadBtn') closeEliminarHabilidadBtn: ElementRef;
  @ViewChild('closePerfilBtn') closePerfilBtn: ElementRef;

  public usuario: string;
  public pass: string;
  public mostrarErrorLogin: boolean = false;
  public estaLogeado: boolean = false;
  public seccion: Seccion;
  public usuarioLogeado: Usuario;
  public secciones: Seccion[];
  public seccionAEliminar: Seccion = new Seccion();
  public itemSeccion: ItemSeccion = new ItemSeccion();
  public itemAEliminar: ItemSeccion = new ItemSeccion();
  public modoEdicionItemSeccion: boolean = false;
  public habilidadesHard: Habilidad[];
  public habilidadesSoft: Habilidad[];
  public habilidadAEliminar: Habilidad = new Habilidad();
  public habilidad: Habilidad = new Habilidad();
  public usuarioAModificar: Usuario = new Usuario();


  constructor(private usuarioService: UsuarioService, private seccionService: SeccionService, private habilidadService: HabilidadService) {
    this.usuario = "";
    this.pass = "";
    this.seccion = new Seccion();
    this.habilidad = new Habilidad();
   }

  ngOnInit(): void {
    this.refrescarSecciones();
    this.refrescarHabilidades();
  }

  loginEnviar(): void{
    var login: Login =new Login(this.usuario, this.pass);
    this.usuarioService.login(login).subscribe(usuario => {
      if(usuario == null) {
        this.mostrarErrorLogin = true;
      } else {
        this.closeBtn.nativeElement.click();
        this.estaLogeado = true;
        this.usuarioLogeado = usuario;
      }
    })
  }

  logout(): void {
    this.estaLogeado = false;
  }

  agregarSeccion(): void {
    this.seccionService.agregarSeccion(this.usuarioLogeado.idUsuario, this.seccion).subscribe(seccion => {
      this.closeSeccionBtn.nativeElement.click();
      this.refrescarSecciones();
      this.seccion = new Seccion();
    })
  }

  refrescarSecciones(): void {
    this.seccionService.listarSecciones().subscribe(secciones => {
      this.secciones = secciones;
    });
  }

  abrirEdicionSeccion(seccion: Seccion): void {
    this.seccion = seccion;
  }

  avisoEliminarSeccion(seccion: Seccion): void {
    this.seccionAEliminar = seccion;
  }

  eliminarSeccion(): void {
    this.seccionService.eliminarSeccion(this.seccionAEliminar.idSeccion).subscribe(() => {
      this.closeEliminarSeccionBtn.nativeElement.click();
      this.refrescarSecciones();
    });
  }

  abrirFormularioItemSeccion(seccion: Seccion) {
    this.seccion = seccion;
  }

  agregarItemSeccion() {
    if(this.modoEdicionItemSeccion) {
      var index = this.seccion.items.findIndex(x => x.idItemSeccion==this.itemSeccion.idItemSeccion);
      this.seccion.items.splice(index, 1);
    }
    this.seccion.items.push(this.itemSeccion);
    this.agregarSeccion();
    this.closeItemSeccionBtn.nativeElement.click();
    this.itemSeccion = new ItemSeccion();
  }

  avisoEliminarItemSeccion(seccion: Seccion, itemSeccion: ItemSeccion) {
    this.itemAEliminar = itemSeccion;
    this.seccion = seccion;
  }

  eliminarItem() { 
    var index = this.seccion.items.findIndex(x => x.idItemSeccion==this.itemAEliminar.idItemSeccion);
    this.seccion.items.splice(index, 1);
    this.agregarSeccion();
    this.closeEliminarItemBtn.nativeElement.click();
  }

  abrirFormularioEditarSeccion(seccion: Seccion, itemSeccion: ItemSeccion) {
    this.modoEdicionItemSeccion = true;
    this.seccion = seccion;
    this.itemSeccion = itemSeccion;
    console.log(this.itemSeccion);
  }

  refrescarHabilidades(): void {
    this.habilidadService.listarHabilidades('Hard').subscribe(habilidades => {
      this.habilidadesHard = habilidades;
    });
    this.habilidadService.listarHabilidades('Soft').subscribe(habilidades => {
      this.habilidadesSoft = habilidades;
    });
  }

  agregarHabilidad(): void {
    this.habilidadService.agregarHabilidad(this.usuarioLogeado.idUsuario, this.habilidad).subscribe(habilidad => {
      this.closeHabilidadBtn.nativeElement.click();
      this.refrescarHabilidades();
      this.habilidad = new Habilidad();
    })
  }

  abrirEdicionHabilidad(habilidad: Habilidad): void {
    this.habilidad = habilidad;
  }

  avisoEliminarHabilidad(habilidad: Habilidad): void {
    this.habilidadAEliminar = habilidad;
  }

  eliminarHabilidad(): void {
    this.habilidadService.eliminarHabilidad(this.habilidadAEliminar.idHabilidad).subscribe(() => {
      this.closeEliminarHabilidadBtn.nativeElement.click();
      this.refrescarHabilidades();
    });
  }

  abrirFormularioHabilidad(tipo: string): void {
    this.habilidad.tipo = tipo;
  }

  abrirFormularioPerfil(): void {
    this.usuarioAModificar = JSON.parse(JSON.stringify(this.usuarioLogeado));
  }
}

