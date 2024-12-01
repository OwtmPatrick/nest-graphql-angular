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

        this.properties = properties;
      });
  }

  onFilter = (values: FilterPropertyInput) => {
    this.getProperties(values);
  };

  onReset() {
    this.filterForm.reset();
  }

  ngOnInit() {
    this.getProperties(this.filterForm.value as FilterPropertyInput);
  }

  noOnDestroy() {
    this.querySubscription.unsubscribe();
  }
}
