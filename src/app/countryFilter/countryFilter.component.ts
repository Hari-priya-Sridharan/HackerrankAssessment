import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'country-filter',
  templateUrl: './countryFilter.component.html',
  styleUrls: ['./countryFilter.component.scss']
})

export class CountryFilter implements OnInit {
  @Input() countryList: string[];

  ngOnInit() {

  }
}
