import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiFStoreService } from 'src/app/services/api-fstore.service';

@Component({
  selector: 'app-gift',
  templateUrl: './gift.page.html',
  styleUrls: ['./gift.page.scss'],
})
export class GiftPage implements OnInit {
  loading: boolean = false;
  focused: boolean;
  sap: boolean = true;
  pos: boolean = true;
  ionicForm: FormGroup;
  defaultDate = "1987-06-30";
  isSubmitted = false;
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
      fullName: ['', [Validators.required, Validators.minLength(3),Validators.maxLength(255)]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$'),Validators.maxLength(255)]],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]+$'),Validators.minLength(10),Validators.maxLength(12)]],
      terminal: ['',],
      trans: ['', [Validators.minLength(5),Validators.maxLength(255)]],
      soNumber: ['', [Validators.minLength(5),Validators.maxLength(255)]],
      amount: ['', [Validators.required,Validators.min(5000)]],
      address: ['', [Validators.required,Validators.minLength(3),Validators.maxLength(255)]],
    })
  }
  getDate(e) {
    console.log('get date');
    let date = new Date(e.target.value).toISOString().substring(0, 10);
    this.ionicForm.get('dob').setValue(date, {
       onlyself: true
    })
 }

 get errorControl() {
  return this.ionicForm.controls;
}

 async submitForm() {
  console.log('submit');
  this.isSubmitted = true;
  const entries = await this.getEntries(this.ionicForm.value.amount);
  if (this.ionicForm.value.soNumber.length > 1 || this.ionicForm.value.trans.length > 1) {
    if (this.ionicForm.valid) {
      this.loading = true;
      this.apiFStoreservice
        .addCustomer(this.ionicForm.value)
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
  if (value.length > 1) {
    this.sap = false;
    this.pos = true;
  }
} 

onSAP(event: any){
  const value = event.target.value;
  if (value.length > 1) {
    this.pos = false;
    this.sap = true;
  }
}

reset() {
  this.formInit();
}


}
