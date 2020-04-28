import gql from 'graphql-tag';

export default {};

export const updateLastFoodOrder = gql`
mutation updateLastFoodOrder ($id: Int!, $lastFoodOrder: Datetime){
    updateUserById(input: {userPatch: {lastFoodOrder: $lastFoodOrder}, id: $id}) {
        clientMutationId
    }
}`;
