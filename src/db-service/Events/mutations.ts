import gql from 'graphql-tag';

export default {};

export const createEvent = gql`
mutation CreateEventMutation ($title: String!, $category: String!, $startDate:  Date!, $endDate:  Date!, $isAllDay: Boolean!) {
    createEvent(input: {event: {title: $title, category: $category, startDate: $startDate, endDate: $endDate, isAllDay: $isAllDay}}) {
        clientMutationId
    }
}`;
