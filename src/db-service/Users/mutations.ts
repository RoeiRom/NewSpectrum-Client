import gql from 'graphql-tag';

export default {};

export const updateLastFoodOrder = gql`
mutation updateLastFoodOrder ($id: number!, $lastFoodOrder: Date!){
    updateUserById(input: {userPatch: {lastFoodOrder: $lastFoodOrder}, id: $id}) {
        clientMutationId
    }
}`;
