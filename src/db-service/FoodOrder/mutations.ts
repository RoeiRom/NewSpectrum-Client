import gql from 'graphql-tag';

export default {};

export const createFoodPlace = gql`
mutation CreateFoodPlaceMutation ($name: String!){
    createFoodPlace(input: {foodPlace: {name: $name}}) {
        clientMutationId
    }
}`;
