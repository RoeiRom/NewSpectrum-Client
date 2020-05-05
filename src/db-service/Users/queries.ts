import gql from 'graphql-tag';

export default {};

export const AllUsersBirthdays = gql`
query allUsersBirthdays {
  allUsersBirthdays: allUsers {
        nodes {
          name
          birthday
      }
    }
  }  
`;

export const getLoggedInUser = gql`
query getLoggedInUser($userName: String!, $password: String!) {
  loggedInUser : allUsers(condition: {userName: $userName, password: $password}) {
    nodes {
      id
      name
    }
  }
} 
`;
