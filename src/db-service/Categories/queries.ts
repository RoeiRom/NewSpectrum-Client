import gql from 'graphql-tag';

export const AllCategories = gql`
{
  allCategories {
    nodes {
      id
      color
      title
    }
  }
}
`;

export const AllsCategories = gql`
{
  allCategories {
    nodes {
      id
      color
      title
    }
  }
}
`;
