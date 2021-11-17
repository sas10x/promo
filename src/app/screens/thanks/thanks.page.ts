import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-thanks',
  templateUrl: './thanks.page.html',
  styleUrls: ['./thanks.page.scss'],
})
export class ThanksPage implements OnInit {
  single: boolean;
  entries: number;
  constructor(private route: ActivatedRoute,) { }

  ngOnInit() {
    this.route.queryParams.subscribe(queryParams => {
      const { numberOfEntries } = queryParams;
      if (numberOfEntries == 1) {
        this.single = true;
      }
      this.entries = numberOfEntries;
    });
  }

}
