import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { toast } from "react-toastify";
import PhoneLoginPresenter from "./PhoneLoginPresenter";

interface IState {
  countryCode: string;
  phoneNumber: string;
}
// interface IProps extends RouteComponentProps<any> {}
// 위와 같이 정의 해주고 사용해도 됨
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
      // prop에 ...this.state라고 적지말고 각각 이름을 적어서 넣어주자
      <PhoneLoginPresenter
        countryCode={countryCode}
        phoneNumber={phoneNumber}
        onInputChange={this.onInputChange}
        onSubmit={this.onSubmit}
      />
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

  public onSubmit: React.FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault();
    const { countryCode, phoneNumber } = this.state;
    // tslint:disable-next-line
    const isValid = /^\+[1-9]{1}[0-9]{7,11}$/.test(
      `${countryCode}${phoneNumber}`
    );
    if (isValid) {
      return;
    } else {
      toast.error("Please write a valid phone number");
    }
  };
}

export default PhoneLoginContainer;
