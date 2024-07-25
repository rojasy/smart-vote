import gql from "graphql-tag";


// export const CHANGE_PASSWORD = gql`
//   mutation changePassword($passwordDto:PasswordDtoInput){
//     changePassword(passwordDto:$passwordDto){
//       code
//       error
//       message
//     }
//   }
//   `;

export const GET_LOGGED_USER = gql`
    query GetLoggedInUser {
  getLoggedInUser {
    code
    data {
      email
      firstName
      fullName
      id
      lastName
      phone
      roles {
        active
        displayName
        id
        name
        uuid
      }
      username
      uuid
      votes {
        candidates {
          active
          description
          id
          title
          uuid
        }
        election {
          active
          category
          createdAt
          createdBy
          deleted
          description
          id
          name
          updatedAt
          updatedBy
          uuid
          year
        }
        id
        time
        uuid
        year
      }
      active
    }
    error
    message
  }
}
    `;