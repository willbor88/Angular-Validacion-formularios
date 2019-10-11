import { Component, OnInit} from '@angular/core';
  


interface pais{
  codigo:String
  nombre:String

}

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styles: [`
  .ng-invalid.ng-touched:not(form){

    border:1px solid red;
  }
  
  
  `]
})
export class TemplateComponent implements OnInit  {
 object:any
 public paises :pais[]
 sexo=['Masculino','Femenino']


  constructor(
    
  ) { 
    this.object={
      pais:"",
          nombre: "Juan",
          apellido: "null",
          correo:"null",
          sexo:"Masculino",
          acepta:false
    };
    
  
      this.paises=[{
        codigo:"  CRI",
        nombre:"Costa Rica"
      },{
        codigo:"  ESP",
        nombre:"España"
    
      }]

      
     
   
 }
 
 ngOnInit() {
    
    
}

  
guardar(forma:any){

console.log(forma);

}



}
