import gql from 'graphql-tag';

export default {};

export const AllEvents = gql`
query AllEvents {
    allEvents {
        nodes {
            startDate
            endDate
            title
            isAllDay
            category : categoryByCategory {
              tag
            }
      }
    }
  }  
`;
