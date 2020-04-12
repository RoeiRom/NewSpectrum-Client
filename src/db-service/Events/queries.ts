import gql from 'graphql-tag';

export default {};

export const AllEvents = gql`
query AllEvents {
    allEvents {
        nodes {
            id
            startDate
            endDate
            title
            isAllDay
            category : categoryByCategory {
            id
            title
            color
            }
      }
    }
  }  
`;
