import React from "react";
import { RouteComponentProps } from "react-router-dom";
import VerifyPhonePresenter from "./VerifyPhonePresenter";
interface IProps extends RouteComponentProps<any> {}
class VerifyPhoneContainer extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
    // console.log(props)를 찍어보면 여러가지를 확인할수 있는데
    // 그중 loation.state를 사용한다
    // 새로 고침해도 날라가지 않음
    if (!props.location.state) {
      props.history.push("/");
    }
    // phone number login으로 부터 오지 않았으면 홈으로!
  }
  public render() {
    return <VerifyPhonePresenter />;
  }
}
export default VerifyPhoneContainer;
