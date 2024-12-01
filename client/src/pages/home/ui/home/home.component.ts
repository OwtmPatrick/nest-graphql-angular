import { Component } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { GET_PROPERTIES } from '../../api';
import { FormControl, FormGroup } from '@angular/forms';
import { Property, FilterPropertyInput } from 'src/entities/property/model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  properties: Property[] = [];

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
        const {
          data: { properties },
        } = result;

        console.log(properties)

        this.properties = properties;
      });
  }

  ngOnInit() {
    this.getProperties(this.filterForm.value as FilterPropertyInput);
  }

  noOnDestroy() {
    this.querySubscription.unsubscribe();
  }
}
