import gql from 'graphql-tag';

export default {};

export const AllPostsQuery = gql`
{
  allPosts {
    nodes {
      date
      description
      id
      likes
      userByAuthor {
        userName
        name
      }
    }
  }
} `;
