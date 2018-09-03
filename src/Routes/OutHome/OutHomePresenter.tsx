import React from "react";
import { RouteComponentProps } from "react-router-dom";
// import styled from "../../typed-component";

interface IProps extends RouteComponentProps<any> {}
// RouteComponentProps에 any를 넣은 이유는 가끔 Route를 받고 되고 그 Route들은
// pros가 있기 때문

const OutHomePresenter: React.SFC<IProps> = () => <span>stuff</span>;

export default OutHomePresenter;
