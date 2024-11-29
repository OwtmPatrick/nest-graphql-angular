import { Component } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { GET_PROPERTIES } from '../../../graphql/queries';
import { FormControl, FormGroup } from '@angular/forms';
import { FilterPropertyInput } from '../../../types';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
//   schemas: [CUSTOM_ELEMENTS_SCHEMA],
  //   standalone: true
})
export class HomeComponent {
  filterForm = new FormGroup({
    search: new FormControl<string>(''),
    wifi: new FormControl<boolean>(false),
  });

  private querySubscription!: Subscription;

  constructor(private readonly apollo: Apollo) {}

  submit() {
    this.getProperties(this.filterForm.value as FilterPropertyInput);
  }

  getProperties(filterPropertyInput: FilterPropertyInput) {
    this.querySubscription = this.apollo
      .watchQuery({
        query: GET_PROPERTIES,
        variables: {
          filterPropertyInput,
        },
      })
      .valueChanges.subscribe((result: any) => {
        console.log(result);
      });
  }

  ngOnInit() {
    this.getProperties(this.filterForm.value as FilterPropertyInput);
  }

  noOnDestroy() {
    this.querySubscription.unsubscribe();
  }
}
