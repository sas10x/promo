import { ApiFStoreService } from './../../services/api-fstore.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  loading: boolean = false;
  sap: boolean = true;
  pos: boolean = true;
  receipt: boolean = false;
  ionicForm: FormGroup;
  focused: boolean;
  terminals: string[] = ['','1','2','3','4','5','6','7','8','9','10','13','14','15','16','17','18','19','20','21','34','35','39','40','41','42'];
  constructor(public formBuilder: FormBuilder, private apiFStoreservice: ApiFStoreService, private router: Router) { }

  ngOnInit() {
    this.formInit();
  }

  formInit() {
    this.sap = true;
    this.pos = true;
    this.loading = false;
    this.ionicForm = this.formBuilder.group({
      fullName: ['', [Validators.required,Validators.minLength(3),Validators.maxLength(255)]],
      contactNumber: ['', [Validators.required,Validators.minLength(3),Validators.maxLength(255)]],
      email: ['', [Validators.required, Validators.email,Validators.minLength(3),Validators.maxLength(255)]],
      terminal: ['', ],
      trans: ['', [Validators.minLength(3),Validators.maxLength(255)]],
      soNumber: ['', [Validators.minLength(3),Validators.maxLength(255)]],
      amount: ['', [Validators.required, Validators.minLength(4),Validators.min(5000),Validators.maxLength(255)]],
      address: ['', [Validators.required, Validators.minLength(3),Validators.maxLength(255)]],
   })
  }

  async submitForm(payload) {
    console.log('kristan');
    const entries = await this.getEntries(this.ionicForm.value.amount);
    if (!this.pos || !this.sap && this.ionicForm.valid) {
      this.loading = true;
      this.apiFStoreservice
      .addCustomer(payload)
      .then(() => {
        this.loading = false;
        this.router.navigate(['/thanks'], { queryParams: { numberOfEntries :  entries} });
        this.ionicForm.reset();
      })
      .catch(() => {
        this.loading = false;
      });
    }
  }

  async getEntries(purchasedAmount: number) : Promise<number> {
    const numberOfEntries = purchasedAmount / 5000;
    if (numberOfEntries > 5) {
      return 5;
    }
    return Math.floor(numberOfEntries);
  }

  onBlur(event: any) {
    const value = event.target.value;
    console.log('blur');
    console.log(value);
    if (!value) {
      this.focused = false;
    }
  }

  onPOS(event: any){
    const value = event.target.value;
    if (value.length > 3) {
      this.sap = false;
    }
  } 

  onSAP(event: any){
    const value = event.target.value;
    if (value.length > 3) {
      this.pos = false;
    }
  }

  reset() {
    this.formInit();
  }

  get errorControl() {
  return this.ionicForm.controls;
}

//   get fullName(): AbstractControl {
//     return this.ionicForm.get('title');
//   }

//   get contactNumber(): AbstractControl {
//     return this.ionicForm.get('contactNumber');
//   }

//   get email(): AbstractControl {
//     return this.ionicForm.get('email');
//   }

//   get terminal(): AbstractControl {
//     return this.ionicForm.get('terminal');
//   }

//   get trans(): AbstractControl {
//     return this.ionicForm.get('trans');
//   }

//   get soNumber(): AbstractControl {
//     return this.ionicForm.get('soNumber');
//   }

//   get amount(): AbstractControl {
//     return this.ionicForm.get('amount');
//   }

//   get address(): AbstractControl {
//     return this.ionicForm.get('address');
//   }
}
