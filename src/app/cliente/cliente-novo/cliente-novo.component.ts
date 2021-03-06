import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AlertComponent } from 'ngx-bootstrap/alert/alert.component';

@Component({
  selector: 'app-cliente-novo',
  templateUrl: './cliente-novo.component.html',
  styleUrls: ['./cliente-novo.component.css']
})
export class ClienteNovoComponent implements OnInit {

  alerts: any[] = [{
    type: '',
    msg: ``,
    timeout:0
  }];

  
  formulario: FormGroup;
  client: string ='cliente';
  constructor(private service: ApiService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.configurarFormulario();
  }


  configurarFormulario() {
    this.formulario = this.formBuilder.group({

      nome: [null, this.validarObrigatoriedade],
      cpf: [null, [Validators.required]],
      telefone: [null, [Validators.required]]

    });
  }

  validarObrigatoriedade(input: FormControl) {
  
    return (input.value ? null : { obrigatoriedade: true });
  }

  criar() {
    this.service.criar(this.formulario.value,this.client).subscribe(resposta => {
      
     this.add()
      this.formulario.reset();
      
    });
  }

  add(): void {
    this.alerts.push({
      type: 'info',
      msg: `----  Inserido com Sucesso  ---- `,
      timeout: 3000
    });
  }
 
  onClosed(dismissedAlert: AlertComponent): void {
    this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
  }


}

