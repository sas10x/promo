import { AdminService } from './../../services/admin.service';
import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/model/customer';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  customers: any[] = [];
  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.adminService.getCustomers().subscribe(res => {
      this.customers = res.map(e => {
        const data = e.payload.doc.data() as any;
        const id = e.payload.doc.id;
        data.uid = id;
        return { id, ...data };
      });
      console.table(this.customers);
    });
    
  }

}
