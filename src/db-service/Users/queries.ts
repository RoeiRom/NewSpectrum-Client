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
