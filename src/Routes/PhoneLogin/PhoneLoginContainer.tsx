import React from "react";
import { Mutation } from "react-apollo";
import { RouteComponentProps } from "react-router-dom";
import { toast } from "react-toastify";
import {
  startPhoneVerification,
  startPhoneVerificationVariables
} from "../../types/api";
import PhoneLoginPresenter from "./PhoneLoginPresenter";
import { PHONE_SIGN_IN } from "./PhoneQueries.queries";

interface IState {
  countryCode: string;
  phoneNumber: string;
}
// interface IProps extends RouteComponentProps<any> {}
// 위와 같이 정의 해주고 사용해도 됨

// interface IMutationInterface {
//   phoneNumber: string;
// }

class PhoneSignInMutation extends Mutation<
  startPhoneVerification,
  startPhoneVerificationVariables
> {}
// any는 mutation이 리턴할 데이터
// ex. interface IData{ ok:boolean, error:string)}

class PhoneLoginContainer extends React.Component<
  RouteComponentProps<any>, // 받는 props가 없다면 이렇게 하면 됨
  IState
> {
  public state = {
    countryCode: "+82",
    phoneNumber: ""
  };
  public render() {
    const { countryCode, phoneNumber } = this.state;

    return (
      <PhoneSignInMutation
        mutation={PHONE_SIGN_IN}
        variables={{
          phoneNumber: `${countryCode}${phoneNumber}`
        }}
        // update={this.afterSubmit}
        // update = {} // 업데이트가 끝나고 실행되는 함수를 만들수도 있음
        onCompleted={data => {
          const { StartPhoneVerification } = data;
          if (StartPhoneVerification.ok) {
            return;
          } else {
            toast.error(StartPhoneVerification.error);
            // api에서 오는 에러
          }
        }}
        // 500 err 등 쿼리가 제대로 실행되지 않으면 실행 안됨
      >
        {(mutation, { loading }) => {
          const onSubmit: React.FormEventHandler<HTMLFormElement> = event => {
            event.preventDefault();
            // tslint:disable-next-line
            const isValid = /^\+[1-9]{1}[0-9]{7,11}$/.test(
              `${countryCode}${phoneNumber}`
            );
            if (isValid) {
              mutation();
            } else {
              toast.error("Please write a valid phone number");
            }
          };
          return (
            <PhoneLoginPresenter
              countryCode={countryCode}
              phoneNumber={phoneNumber}
              onInputChange={this.onInputChange}
              onSubmit={onSubmit}
              loading={loading}
            />
          );
        }}
      </PhoneSignInMutation>
    );
  }
  /**
   * onInputChange
   */
  public onInputChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement
    // 이렇게 적어줌으로써 무엇으로 부터 오는지 알수 있다
  > = event => {
    const {
      target: { name, value }
    } = event;

    this.setState({
      [name]: value
      // []를 사용해줌으로써 문자열을 변수이름으로 사용 가능하다
    } as any);
  };

  // public afterSubmit = (cache, result) => { 이렇게도 가능
  // public afterSubmit: MutationUpdaterFn = (cache, result: any) => {
  //   const data: startPhoneVerification = result.data;
  //   const { StartPhoneVerification } = data;
  //   if (StartPhoneVerification.ok) {
  //     return;
  //   } else {
  //     toast.error(StartPhoneVerification.error);
  //     // api에서 오는 에러
  //   }
  // };
}

export default PhoneLoginContainer;
