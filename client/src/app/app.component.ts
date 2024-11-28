import { Component } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { GET_PROPERTIES } from '../graphql/queries';
import { FormControl, FormGroup } from '@angular/forms';
import { FilterPropertyInput } from '../types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
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
