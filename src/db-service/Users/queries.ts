import gql from 'graphql-tag';

export default {};

export const AllUsers = gql`
query allUsers {
  allUsers {
        nodes {
          id
          name
          lastOrderDate
      }
    }
  }  
`;

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
