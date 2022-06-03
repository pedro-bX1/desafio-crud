import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {ApiserviceService } from '../apiservice.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(private service:ApiserviceService, private router: ActivatedRoute) { }

  errorMsg:any; //exibir mensagem de erro
  sucessMsg:any; //exibir mensagem de sucesso
  getParamId:any; //
  

  ngOnInit(): void {
    //console.log(this.router.snapshot.paramMap.get('id'),'getid');
    this.getParamId = this.router.snapshot.paramMap.get('id');
    if(this.getParamId){
      this.service.getSingleData(this.getParamId).subscribe((res)=>{
      console.log(res,'res==>');
      this.userForm.patchValue({
      'nome':res.data[0].nome,
      'mat_siape':res.data[0].mat_siape,
      'salario':res.data[0].salario,
      'cargo':res.data[0].cargo,
      'certificacao':res.data[0].certificacao
      });
    });
    }
    
  }
  userForm = new FormGroup({
    //rastreando valores para que sejam validadas, evitando falta de inserções no formulário.
    'nome':new FormControl('', Validators.required),
    'mat_siape':new FormControl('', Validators.required),
    'salario':new FormControl('', Validators.required),
    'cargo':new FormControl('', Validators.required),
    'certificacao':new FormControl('', Validators.required)
  });

  userSubmit(){
    if(this.userForm.valid){
      console.log(this.userForm.value);
      this.service.criarDados(this.userForm.value).subscribe((res)=>{
        console.log(res, 'res==>');
        this.userForm.reset();
        this.sucessMsg = res.message;
      })
    }else{
      this.errorMsg = 'Todos os campos são obrigatórios!';
    }
  }

  userUpdate(){
    console.log(this.userForm.value,'updatedform');
    if(this.userForm.valid){
        this.service.atualizarDados(this.userForm.value,this.getParamId).subscribe((res)=>{
                console.log(res,'resupdated');
                this.sucessMsg = res.message;
              });
    }else{
     this.errorMsg = 'Todos os campos são obrigatórios'; 
    }
  }
}
