import gql from 'graphql-tag';

export default {};

export const AllFoodPlacesQuery = gql`
{
  allFoodPlaces {
    nodes {
      id
      name
    }
  }
}
`;
