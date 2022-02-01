import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  public usuario: string;
  public pass: string;
  
  constructor() {
    this.usuario = "";
    this.pass = "";


   }

  ngOnInit(): void {
  }

  loginEnviar(): void{
    console.log(this.usuario);
    console.log(this.pass);

  }
}

