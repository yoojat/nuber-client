import React from "react";
import { Mutation, MutationFn } from "react-apollo";
import { RouteComponentProps } from "react-router-dom";
import { toast } from "react-toastify";
import { LOG_USER_IN } from "../../sharedQueries.local";
import { facebookConnect, facebookConnectVariables } from "../../types/api";
import SocialLoginPresenter from "./SocialLoginPresenter";
import { FACEBOOK_CONNECT } from "./SocialLoginQueries";

class LoginMutation extends Mutation<
  facebookConnect,
  facebookConnectVariables
> {}

interface IState {
  firstName: string;
  lastName: string;
  email?: string;
  fbId: string;
}

interface IProps extends RouteComponentProps<any> {}

class SocialLoginContainer extends React.Component<IProps, IState> {
  public state = {
    email: "",
    fbId: "",
    firstName: "",
    lastName: ""
  };
  public facebookMutation: MutationFn;

  public render() {
    return (
      // <LoginMutation mutation={FACEBOOK_CONNECT}>
      //   {(facebookMutation, { loading }) => {
      //     // facebookMutation은 mutaion 함수
      //     // 이름은 정하기 나름인듯

      //     this.facebookMutation = facebookMutation;
      //     // mutation 함수를 클래스에 있는 함수로 정의

      //     return <SocialLoginPresenter loginCallback={this.loginCallback} />;
      //   }}
      // </LoginMutation>
      <Mutation mutation={LOG_USER_IN}>
        {logUserIn => (
          <LoginMutation
            mutation={FACEBOOK_CONNECT}
            onCompleted={data => {
              const { FacebookConnect } = data;
              if (FacebookConnect.ok) {
                logUserIn({
                  variables: {
                    token: FacebookConnect.token
                  }
                });
              } else {
                toast.error(FacebookConnect.error);
              }
            }}
          >
            {(facebookMutation, { loading }) => {
              this.facebookMutation = facebookMutation;
              return (
                <SocialLoginPresenter loginCallback={this.loginCallback} />
              );
            }}
          </LoginMutation>
        )}
      </Mutation>
    );
  }

  public loginCallback = response => {
    const { name, first_name, last_name, email, id, accessToken } = response;
    if (accessToken) {
      toast.success(`Weclome ${name}`);
      this.facebookMutation({
        variables: {
          email,
          fbId: id,
          firstName: first_name,
          lastName: last_name
        }
      });
    } else {
      toast.error("Could not log you in :(😓");
    }
  };
}

// mutation 등을 여기서 처리
export default SocialLoginContainer;
