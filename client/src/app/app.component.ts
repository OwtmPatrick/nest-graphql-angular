import { Component } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

const GET_PROPERTIES = gql`
  query getProperties($filterPropertyInput: FilterPropertyInput!) {
    properties(filterPropertyInput: $filterPropertyInput) {
      id
      name
      wifi
    }
  }
`;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  bio = 'client';

  constructor(private readonly apollo: Apollo) {}

  ngOnInit() {
    this.apollo
      .watchQuery({
        query: GET_PROPERTIES,
        variables: {
          filterPropertyInput: {
            search: '',
          },
        },
      })
      .valueChanges.subscribe((result: any) => {
        console.log(result);
      });
  }
}
