import { AdminService } from './../../services/admin.service';
import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/model/customer';
import * as XLSX from 'xlsx';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { TableUtil } from "./tableUtil";

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: "Hydrogen", weight: 1.0079, symbol: "H" },
  { position: 2, name: "Helium", weight: 4.0026, symbol: "He" },
  { position: 3, name: "Lithium", weight: 6.941, symbol: "Li" },
  { position: 4, name: "Beryllium", weight: 9.0122, symbol: "Be" },
  { position: 5, name: "Boron", weight: 10.811, symbol: "B" },
  { position: 6, name: "Carbon", weight: 12.0107, symbol: "C" },
  { position: 7, name: "Nitrogen", weight: 14.0067, symbol: "N" },
  { position: 8, name: "Oxygen", weight: 15.9994, symbol: "O" },
  { position: 9, name: "Fluorine", weight: 18.9984, symbol: "F" },
  { position: 10, name: "Neon", weight: 20.1797, symbol: "Ne" }
];

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  searchTerm:string;
  onlyClean: Partial<PeriodicElement>[] = [];
  kristan: boolean = true;
  done : any[] = ['0aGIxcAXeq0AeAp6or8N', '15wyhCEkuYRsndR4zSaB', '18wOwtcf1GRaZ4SOn2gc', '1GAG8rYaaJCNdccUmitx', '1HqoQSpszCIeiPtUdDmB', '1TGGNADicyJCIUvg5JLG', '1eDPBCz3cMAZMJataWVe', '2FZOUoV0Th7aFdRd4KtK', '2IqcjM4ebv3QMYP2qy57', '2cS7AmRM9JZDsfYKnBzf', '2qfXXrLE1wbL09060y7R', '4f3uKXPxxKLGxGt3TW7o', '58nt0S1NvFfoqc7mIbsP', '5dQblCH6d1ka2tcuAsG8', '69uqvbiWmYL1E68UqgdL', '6M3nPfIXKqaJ5xLNhgL4', '6XRUNeTE0ZYSz2W0DSM6', '7Te4cCDzYfplNLwCf1M9', '7fICx8jVV2Antll0HUFU', '7nNXb4vUR4FsNQNpxpEg', '7x42uGW700S19RMXIsnt', '8C7B2f5fzKF0HAc6Ac2W', '8ibbVKtQ1TrqHugMTgDX', '91Bu82cZ6dxxtI5YmPgc', '9faA8ouBnRmiMQHLvMye', '9jfCK4bYOpj7FNjZimPU', 'AKRP3bnGJ4gsbmvwrbZy', 'AX36T9zkJxDVIz7UQ2Zw', 'Bbo9c3xHmpgS4bugHlWF', 'BfYI4TFDw50BFAFAQODE', 'BobyZfpGAdURyQaPSgoc', 'C9IeTKgbHM4ZdKXT6NaY', 'CcuPZBcpd1HFIZs73k95', 'DjFzmluMXrJNHnhlVUu2', 'Ez7eA9OfzYhXpx0o2Ptv', 'FVXC0w3RZehEDZWrtjCY', 'Flr23HnCRhAa4gS2oH89', 'GIZMik6gHSWAj1kBnqhk', 'GvNNknM0jIuI8dQ8O2Gh', 'GvlbdDw8p69TXwdg0xfS', 'HR4z1NO4bKdysoUSVOu8', 'HduA7UDlIlRBgkaxUXmL', 'Hf4ZbwJV2lfs4TTUyF6m', 'Hrx9GiTvuz36uYN0FaDH', 'IDs11ydnFg0LgJJe29jH', 'IFXQlKXYpmG08miAdkRl', 'IHKOLfuk8gLhi6VUnGIx', 'IIUUkkSdSwPV0RJ5XIDf', 'IniUb1J4OdlEtErwc65U', 'J7HOL8PQVKfOr4WQpYEg', 'JLjbx933xFmB1A4uIHez', 'Jk7QAWutl4ljeHtHR0OV', 'JmYpY70Oxi0ftS1qVdBj', 'KD8WkRKLOa7EXTZDIAKP', 'KKYmfncNr0SRPVHrjaKV', 'KRWvfevtpFJnsE7nWi3n', 'Kp6xDFBMqEeF8JX7KJyX', 'L94Ih94Ge3dkDG1NHaMF', 'LRoZdLAuaIreriQDiH8W', 'LaKb8iud3lTyUk5w153d', 'M4Vp5RKPUc4anQcoklCP', 'M5OGD1lljRpStRF2zuQq', 'MUPAFBz9vD9WpSSPbt7e', 'MsKaWtjKI2GFn1FronET', 'NF8DXE4YMiTzHm6VjADU', 'OGJXLXZp7RDgDCTJevqz', 'OHibwr0DwpeDL0ZGXlUZ', 'P0igqyOulkLsvT0ync13', 'P7ysRRTvOBTF0qQ5cLmp', 'PDijNmcCMNXRnw8KKv1M', 'Pm0KyHnC1Gt3zjiX8iP8', 'Q13or0K7wIyKc3YX10SD', 'QGjI3qJba9Ptr5XQ5E1B', 'QIdgYA0C9okCu17zGW8K', 'QeNp4sCFmz1i2Xdlcd58', 'QuPWSvcuVOO2iKtGnj97', 'R2xoFS10q0EPG1Tv3wum', 'Rtdm7DvsTLWilnLiwPJP', 'Ruh2ITAqPVX93Zc56uH4', 'S6hVezFJLtCQFjYkkqlO', 'SnUNC2dncQ9H3hkYAy2m', 'TMycQT6ybplJwKlGLj69', 'TwENQW776UzcZIe6F9Vp', 'UiSJZ5C2bp5J2XmYcYaA', 'VOIxnbeiPs5GVqZXYVAK', 'VQK456ggrDBdFkijy4EF', 'Vb7lcGEPM7Rv4DAHX4Rn', 'W6dY2J6uVFq4jRskvxEJ', 'W8YNRUuk7jxMZwdV5mof', 'XJG1Vtr9KKhUz14OcZtc', 'XRuDFFy1gLlHUFtCS5VJ', 'XqnpUkrkDBW4FSXSRdWO', 'YE28ZAMzL7mq2pZB16bg', 'YTzJykRk1jPf8k8R2h7j', 'YfhI1qUvkyZZrqYoA16n', 'YncrzTUKDlZejX5aYw3w', 'ZVLGsvIfEdo2mCeY5Tt0', 'Zb2V0anLaJfs5PJawC0R', 'Zni694cwYxeInFiLkkAg', 'ZooagPEuXRMvbOpT9PGl', 'aaJPE2W1NayiMigwMvap', 'bE0DqPnr6szsBAo3AfmA', 'bqQq5EaiNMBJLWZGdCSs', 'cAKpa0bjC9GkPw2Jkuk0', 'cJ1pThzf0ZmOOuD4F8cE', 'cjMqQYXDEk600r9NEqGh', 'crJoh2RKXfEWFudTWDXv', 'd1hU5Cn6Eq8Jm9WJks3F', 'dlmtmznC5b4lfEmLFY7O', 'dy7wUbm3BI8Npo2V37xv', 'eS2I5ZPrL3n5WQ4HIMel', 'eZk3D7PnFDvC0mip6tLD', 'ettUcwkxqQolvLqre58g', 'fH9Pdgyzwkf58XpvC0he', 'g88eN2FptLUqeiaqK4iZ', 'gFN9LnRwUuxxLEFtFBud', 'gUlsUhRRUELGZUgwyb9k', 'ggmPYt1S32of41xYPLB0', 'h24JAHRZZJZzgHnW5HKS', 'h42BsbzMKyAnG4wC7Fv1', 'hK0ZsYUXlSgHRqDuA47K', 'hNmOtciceAcHNQvQNCe3', 'hPUr4t8UhmFXM34g5B7W', 'iar4BGhHCQOqJX5rOXop', 'iiNQ23bRSRkv4bncZjQg', 'kYP2ymWsX39JVVl8z65e', 'ksvrqKcMoMd3e3uCWm53', 'lDLRfMzqbSP9WYBpKlup', 'lI3kWQDkTEg2UtdRhVtZ', 'lmoquOl6CJdIP8L0829w', 'm4lvgxG2AKRwuugBx77O', 'm7IkJQqIxHatiiRrQ8zJ', 'mG1CBMX7u3Y8SncYwxyq', 'mM3ha3NV0FSmMmeY0Ndi', 'mOp79V7pW7TvTxHAXhN6', 'oPeiLT6a6bQG5aVbK3DN', 'oqQGYCBh4xbC5X7yTypv', 'oxDOAIHERyZI1ejG2J3z', 'ppGipeWezQWgztPSnDJV', 'qJLa3mZ7fzfVgL0gQHkw', 'qO6L5l65RbkRBBIesnyk', 'qVF7SXM6xdFDJPl43Hw8', 'r7edhpmjEz9Hs2zz7bJi', 'rFsNgnmQhjtOXcA1v25c', 'rSTYk7c7mnq7XC4o9qyH', 'reEqCmQHGM3OEh48LwXa', 'rouNMf7puObUlDSREZeq', 'sX4xYD0O1OXJQxOwZJgl', 'su1kwgKOpPml5P6QU3uY', 'tD4oEPa5k0XgIyiZ8VpH', 'teVar2p1ozn2fMr7UCzw', 'uL3Vl4pdumU8wUw4nTOz', 'uWk3ZEUrM3OFGHf697YI', 'umUhYeISgTT9lRJ1I8LY', 'uzlfRYGRZC8qQpxJ5qrr', 'vNVPykHzHPQeIolfBqEk', 'vOXeVVNON2jHLJSPUpl9', 'vfnHZZfuPCm6WDvPBCqj', 'w4GorE24JIZUH9dOtBxQ', 'wYoqDof2bFUmlp8MyeKe', 'whAUkuqHgWWBK58SOUMw', 'wqeJPCt5Uq91id1zZDMK', 'xS7x2A7twP7F60uvT730', 'yg5b2BMUKdTfXr12tjYX', 'zD9yfAmvWXvb2iuPjMlm', 'zcdQ8MBPS6ZZuoy0G6oR', 'zxihJ6aZqw4Yrej2gYwM']
  displayedColumns: string[] = ["position", "name", "weight", "symbol"];
  matColumns: string[] = ["name", "symbol"];
  dataSource = ELEMENT_DATA;
  reverseDataSource = [...ELEMENT_DATA].reverse();

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
    }); 
  }

  exportTable() {
    TableUtil.exportTableToExcel("ExampleMaterialTable");
  }

  exportNormalTable() {
    TableUtil.exportTableToExcel("ExampleNormalTable");
  }

  exportArray() {
    const onlyNameAndSymbolArr: Partial<PeriodicElement>[] = this.dataSource.map(x => ({
      name: x.name,
      symbol: x.symbol
    }));
    TableUtil.exportArrayToExcel(onlyNameAndSymbolArr, "ExampleArray");
  }

  exportToArray() {
    const onlyClean: Partial<PeriodicElement>[] = [];
    // const onlyNameAndSymbolArr = this.customers.map(x => 
    //     ({
    //       uid: x.uid,
    //       name: x.fullName,
    //       address: x.address,
    //       mobile: x.mobile,
    //       email: x.email,
    //       soNumber: x.soNumber,
    //       amount: x.amount,
    //       terminal: x.terminal,
    //       trans: x.trans,
    //       contactNumber: x.contactNumber
    //     })
    // );
    const result = from(this.customers);
    result.subscribe(x => {
      if(this.done.indexOf(this.done.find(t => t == x.uid)) === -1) {
        console.log(x.uid);
        console.log(this.done.find(t => t == x.uid))
        onlyClean.push(x);
      }
      else {
        console.log(x.uid);
        console.log(this.done.find(t => t == x.uid))
      }
    }, 
    err => console.log(err), 
    () => TableUtil.exportArrayToExcel(onlyClean, "ExampleArray"));
    // for (const value of onlyNameAndSymbolArr) {
    //   if (this.done.indexOf(this.done.find(t => t === value.uid)) === -1) {
    //     onlyClean.push(value);
    //   }
    // }
  }
  
  delete() {
    console.log(this.searchTerm);
    this.adminService.deleteUser(this.searchTerm).then(() => {
      console.log('done');
    })
    .catch(() => {});
    
  };
}
