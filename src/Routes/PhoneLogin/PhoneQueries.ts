import { gql } from "apollo-boost";

export const PHONE_SIGN_IN = gql`
  mutation startPhoneVerification($phoneNumber: String!) {
    # 위의 라인은 아폴로를 위한 것
    # 아래 라인은 api를 위한 것
    StartPhoneVerification(phoneNumber: $phoneNumber) {
      ok
      error
    }
  }
`;
