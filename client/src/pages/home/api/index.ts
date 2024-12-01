import { gql } from 'apollo-angular';

export const GET_PROPERTIES = gql`
  query getProperties($filterPropertyInput: FilterPropertyInput!) {
    properties(filterPropertyInput: $filterPropertyInput) {
      id
      name
      wifi
      photo
      city
      state
      laundry
    }
  }
`;
