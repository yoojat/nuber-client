import React from "react";
import { Mutation, Query } from "react-apollo";
import { toast } from "react-toastify";
import { USER_PROFILE } from "../../sharedQueries";
import { toggleDriving, userProfile } from "../../types/api";
import MenuPresenter from "./MenuPresenter";
import { TOGGLE_DRIVING } from "./MenuQueries";

class ProfileQuery extends Query<userProfile> {}

class ToggleDrivingMutation extends Mutation<toggleDriving> {}

class MenuContainer extends React.Component {
  public render() {
    return (
      <ToggleDrivingMutation
        mutation={TOGGLE_DRIVING}
        update={(cache, { data }) => {
          if (data) {
            // data는 API를 통해 받은 것
            // data는 toggleDriving을 통해 fetch되는 결과
            // console.log를 통해 확인가능
            const { ToggleDrivingMode } = data;
            if (!ToggleDrivingMode.ok) {
              toast.error(ToggleDrivingMode.error);
              return;
            }
            const query: userProfile | null = cache.readQuery({
              query: USER_PROFILE
            }); // cache에서 user profile을 가지고 옴(이미 저장되어 있음) api가 아님
            // 만약 query가 cache에 없으면 얻을수 없음
            // query 모양이 같은지 확인
            if (query) {
              const {
                GetMyProfile: { user }
              } = query;
              if (user) {
                user.isDriving = !user.isDriving;
              }
            }
            cache.writeQuery({ query: USER_PROFILE, data: query });
            // USER_PROFILE의 data에 해당하는 전체 쿼리데이터 리턴해줘야됨
            // 전체 query에 대해서 return
            // 예를 들어 data : false 로 하면 오류 발생 함
          }
        }}
      >
        {toggleDrivingFn => (
          <ProfileQuery query={USER_PROFILE}>
            {({ data, loading }) => (
              <MenuPresenter
                data={data}
                loading={loading}
                toggleDrivingFn={toggleDrivingFn}
              />
            )}
          </ProfileQuery>
        )}
      </ToggleDrivingMutation>
    );
  }
}
export default MenuContainer;
