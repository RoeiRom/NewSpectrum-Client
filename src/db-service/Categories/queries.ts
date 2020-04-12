import gql from 'graphql-tag';

export default {};

export const AllCategories = gql`
{
  allCategories {
    nodes {
      tag
      title
    }
  }
}
`;
