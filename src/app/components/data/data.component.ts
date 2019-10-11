import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators, FormArray } from "@angular/forms";
import { Promise, reject } from 'q';
import { Observable } from 'rxjs';
import { promise } from 'protractor';
@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styles: []
})
export class DataComponent {
forma:FormGroup
usuario:any;


  constructor() { 

    this.usuario={
     
      nombrecompleto:{
        nombre:'Wilmar',
        apellido:'Borja'      
      },
      correo:"willbor88@hotmail.com",
      pasatiempos:["Correr","Dormir","Comer"]

    }

    this.forma = new FormGroup({
      'nombrecompleto':new FormGroup({
        'nombre':new FormControl(this.usuario.nombrecompleto.nombre,[
          Validators.required,
          Validators.minLength(3)
        ]),
        'apellido':new FormControl('',
        [Validators.required,
          Validators.minLength(5),
          this.noPerez //Usar la validacion personalizada
        ])

      }),
      
      'correo':new FormControl('',[Validators.required,Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$") ]),
       'pasatiempos': new FormArray([
         new FormControl('Comer',Validators.required)
       ]),
       'username':new FormControl('',Validators.required,this.existeUsuario),
       'password1':new FormControl('',Validators.required),
       'password2':new FormControl('',Validators.required)
    })
    //Cargar los valores del formulario por defecto
    // this.forma.setValue(this.usuario)


    this.forma.controls['password2'].setValidators([

      Validators.required,
      this.noIgual.bind(this.forma)//asignar al this el valor de this.forma
    ])

    ///ver los cambios inmediatos en el campo
    this.forma.controls['username'].valueChanges.subscribe(data=>{

      console.log(data)
    })
    ///ver el estado del campo  de forma constante
    this.forma.controls['username'].statusChanges.subscribe(data=>{

      console.log(data)
    })


  }


  guardarCambios(){


    console.log(this.forma.value)
    console.log(this.forma)
//Reset al formulario
    // this.forma.reset({
    //   nombrecompleto:{
    //     nombre:"",
    //     apellido:""

    //   },
    //   correo:""

    // })
  }

  agregarPasatiempo(){

(<FormArray>this.forma.controls['pasatiempos']).push(
  new FormControl('',Validators.required)
)

  }

  //Generar una valicacion personalizada para FormControl

  noPerez(control:FormControl):{[s:string]:boolean}{    
    if (control.value==="perez" ||control.value==="Perez" ) {
      return {
        noPerez:true
      }
      return null  } 
  }

  
  noIgual(control:FormControl):{[s:string]:boolean}{ 
     let forma:any = this; 
    if (control.value!== forma.controls['password1'].value ) {
      return {
        noIgual:true
      }
      return null  } 
  }

  existeUsuario(control:FormControl):any{//Metodo para validaciones asincronas
    //Promise<any>|Observable<any>
    let promise = Promise((resolve,reject)=>{

      setTimeout(()=>{
        if (control.value==="strider") {
          resolve({existe:true})
        }
        else{
         resolve(null)
        }

      },3000)
    })
    
   return promise
  }

  
}
 
