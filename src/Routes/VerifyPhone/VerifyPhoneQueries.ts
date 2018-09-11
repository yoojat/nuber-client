import { gql } from "apollo-boost";
export const VERIFYY_PHONE = gql`
  mutation verifyPhone($key: String!, $phoneNumber: String!) {
    CompletePhoneVerification(key: $key, phoneNumber: $phoneNumber) {
      ok
      error
      token
    }
  }
`;
