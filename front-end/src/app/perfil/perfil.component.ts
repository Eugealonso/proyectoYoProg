import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HabilidadService } from '../habilidad.service';
import { Habilidad } from '../modelo/habilidad';
import { ItemSeccion } from '../modelo/itemSeccion';
import { Login } from '../modelo/login';
import { Seccion } from '../modelo/seccion';
import { Usuario } from '../modelo/usuario';
import { SeccionService } from '../seccion.service';
import { UsuarioService } from '../usuario.service';
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { ProgressSpinnerDialogComponent } from '../progress-spinner-dialog/progress-spinner-dialog.component';


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
  public usuarioAMostrar: Usuario = new Usuario();
  public errorArchivo: string = "¡La foto es muy pesada! Tiene que ser como maximo de 7MB.";
  public errorArchivoPortada: string = "¡La foto es muy pesada! Tiene que ser como maximo de 7MB.";
  public mostrarErrorArchivo: boolean = false;
  public mostrarErrorArchivoPortada: boolean = false;
  public show: boolean = false;
  public recordame: boolean = false;
  public mostrarHabilidades: boolean = false;
  public itemSeccionEnviado: boolean = false;
  public mostrarPerfil: boolean = false;
  public mostrarDescripcion: boolean = false;

  constructor(private usuarioService: UsuarioService, private seccionService: SeccionService, private habilidadService: HabilidadService, private dialog: MatDialog) {
    this.usuario = "";
    this.pass = "";
    this.seccion = new Seccion();
    this.habilidad = new Habilidad();
   }

  ngOnInit(): void {
    this.refrescarSecciones();
    this.refrescarHabilidades();
    this.obtenerUsuario();
    this.recordame = JSON.parse(localStorage.getItem('recordame'));
    if(this.recordame) {
      this.usuario = localStorage.getItem('usuario');
      this.pass = localStorage.getItem('password');
      this.loginEnviar();
    }
  }

  loginEnviar(): void{
    let dialogRef: MatDialogRef<ProgressSpinnerDialogComponent> = this.dialog.open(ProgressSpinnerDialogComponent, {
      panelClass: 'transparent',
      disableClose: true
    });
    var login: Login =new Login(this.usuario, this.pass);
    this.usuarioService.login(login).subscribe(usuario => {
      if(usuario == null) {
        this.mostrarErrorLogin = true;
      } else {
        this.closeBtn.nativeElement.click();
        this.estaLogeado = true;
        this.usuarioLogeado = usuario;
        localStorage.setItem('recordame', this.recordame.toString());
        localStorage.setItem('usuario', this.usuario);
        localStorage.setItem('password', this.pass);
      }
      dialogRef.close();
    })
  }

  logout(): void {
    this.estaLogeado = false;
  }

  agregarSeccion(): void {
    let dialogRef: MatDialogRef<ProgressSpinnerDialogComponent> = this.dialog.open(ProgressSpinnerDialogComponent, {
      panelClass: 'transparent',
      disableClose: true
    });
    this.seccionService.agregarSeccion(this.usuarioLogeado.idUsuario, this.seccion).subscribe(seccion => {
      this.closeSeccionBtn.nativeElement.click();
      this.refrescarSecciones();
      this.seccion = new Seccion();
      this.closeItemSeccionBtn.nativeElement.click();
      this.itemSeccion = new ItemSeccion();
      this.itemSeccionEnviado = false;
      this.closeEliminarItemBtn.nativeElement.click();
      dialogRef.close();
    })
  }

  refrescarSecciones(): void {
    let dialogRef: MatDialogRef<ProgressSpinnerDialogComponent> = this.dialog.open(ProgressSpinnerDialogComponent, {
      panelClass: 'transparent',
      disableClose: true
    });
    this.seccionService.listarSecciones().subscribe(secciones => {
      this.secciones = secciones;
      dialogRef.close();
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
    console.log(seccion);
    this.seccion = seccion;
  }

  agregarItemSeccion() {
    if(this.modoEdicionItemSeccion) {
      var index = this.seccion.items.findIndex(x => x.idItemSeccion==this.itemSeccion.idItemSeccion);
      this.seccion.items.splice(index, 1);
    }
    console.log(this.seccion);
    this.seccion.items.push(this.itemSeccion);
    this.agregarSeccion();
  }

  avisoEliminarItemSeccion(seccion: Seccion, itemSeccion: ItemSeccion) {
    this.itemAEliminar = itemSeccion;
    this.seccion = seccion;
  }

  eliminarItem() { 
    var index = this.seccion.items.findIndex(x => x.idItemSeccion==this.itemAEliminar.idItemSeccion);
    this.seccion.items.splice(index, 1);
    this.agregarSeccion();
  }

  abrirFormularioEditarSeccion(seccion: Seccion, itemSeccion: ItemSeccion) {
    this.modoEdicionItemSeccion = true;
    this.seccion = seccion;
    this.itemSeccion = itemSeccion;
    console.log(this.itemSeccion);
  }

  refrescarHabilidades(): void {
    let dialogRef: MatDialogRef<ProgressSpinnerDialogComponent> = this.dialog.open(ProgressSpinnerDialogComponent, {
      panelClass: 'transparent',
      disableClose: true
    });
    this.habilidadService.listarHabilidades('Hard').subscribe(habilidades => {
      this.habilidadesHard = habilidades;
      this.mostrarHabilidades = true;
      dialogRef.close();
    });
    this.habilidadService.listarHabilidades('Soft').subscribe(habilidades => {
      this.habilidadesSoft = habilidades;
    });
  }

  agregarHabilidad(): void {
    let dialogRef: MatDialogRef<ProgressSpinnerDialogComponent> = this.dialog.open(ProgressSpinnerDialogComponent, {
      panelClass: 'transparent',
      disableClose: true
    });
    this.habilidadService.agregarHabilidad(this.usuarioLogeado.idUsuario, this.habilidad).subscribe(habilidad => {
      this.closeHabilidadBtn.nativeElement.click();
      this.refrescarHabilidades();
      this.habilidad = new Habilidad();
      dialogRef.close();
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

  obtenerUsuario(): void {
    this.usuarioService.obtenerUsuario(1).subscribe(usuario => {
      this.usuarioAMostrar = usuario;
      this.mostrarPerfil = true;
      this.mostrarDescripcion = true;
    });
  }

  editarUsuario(): void {
    let dialogRef: MatDialogRef<ProgressSpinnerDialogComponent> = this.dialog.open(ProgressSpinnerDialogComponent, {
      panelClass: 'transparent',
      disableClose: true
    });
    this.usuarioService.editarUsuario(this.usuarioAModificar).subscribe(usuario => {
      this.usuarioAMostrar = usuario;
      this.mostrarErrorArchivo = false;
      this.mostrarErrorArchivoPortada = false;
      this.closePerfilBtn.nativeElement.click();
      dialogRef.close();
    });
  }

  convertirImagen(event, tipo: string): void {
    const file = event.target.files[0];
    if(file.size > 7340032) {
      if(tipo === "perfil") {
        this.mostrarErrorArchivo = true;
      }
      if(tipo === "portada") {
        this.mostrarErrorArchivoPortada = true;
      }
    } else {
      const reader = new FileReader();
  
      if(tipo === "perfil") {
        reader.addEventListener("load", this.procesarImagenCargada.bind(this, reader), false);
      }

      if(tipo === "portada") {
        reader.addEventListener("load", this.procesarImagenPortadaCargada.bind(this, reader), false);
      }

      if (file) {
        reader.readAsDataURL(file);
      }
    }
  }

  procesarImagenCargada(reader: FileReader): void {
    this.usuarioAModificar.foto = reader.result.toString();
  }

  procesarImagenPortadaCargada(reader: FileReader): void {
    this.usuarioAModificar.fotoPortada = reader.result.toString();
  }

  mostrarPassword(){
    this.show = !this.show;
  }
}

