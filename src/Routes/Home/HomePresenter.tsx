import React from "react";
import { MutationFn } from "react-apollo";
import Helmet from "react-helmet";
import Sidebar from "react-sidebar";
import AddressBar from "../../Components/AddressBar";
import Button from "../../Components/Button";
import Menu from "../../Components/Menu";
import styled from "../../typed-components";
import { userProfile } from "../../types/api";

const Container = styled.div``;

const MenuButton = styled.button`
  appearance: none;
  padding: 10px;
  position: absolute;
  top: 10px;
  left: 10px;
  text-align: center;
  font-weight: 800;
  border: 0;
  cursor: pointer;
  font-size: 20px;
  transform: rotate(90deg);
  z-index: 2;
  background-color: transparent;
`;

const ExtendedButton = styled(Button)`
  position: absolute;
  bottom: 50px;
  left: 0;
  right: 0;
  margin: auto;
  z-index: 10;
  height: auto;
  width: 80%;
`;

const RequestButton = ExtendedButton.extend`
  bottom: 250px;
`;

const Map = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
`;

interface IProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
  loading: boolean;
  mapRef: any;
  toAddress: string;
  onAddressSubmit: () => void;
  price?: string;
  data?: userProfile;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  requestRideFn?: MutationFn;
}
const HomePresenter: React.SFC<IProps> = ({
  isMenuOpen,
  toggleMenu,
  loading,
  mapRef,
  toAddress,
  onInputChange,
  onAddressSubmit,
  price,
  data: { GetMyProfile: { user = null } = {} } = {},
  requestRideFn
}) => (
  <Container>
    <Helmet>
      <title>Home | Number</title>
    </Helmet>
    <Sidebar
      sidebar={<Menu />}
      open={isMenuOpen}
      onSetOpen={toggleMenu}
      styles={{
        sidebar: {
          backgroundColor: "white",
          width: "80%",
          zIndex: "10"
        }
      }}
    >
      {!loading && <MenuButton onClick={toggleMenu}>|||</MenuButton>}
      {user &&
        !user.isDriving && (
          <React.Fragment>
            <AddressBar
              name={"toAddress"}
              onChange={onInputChange}
              value={toAddress}
              onBlur={null}
            />
            <ExtendedButton
              onClick={onAddressSubmit}
              disabled={toAddress === ""}
              value={price ? "Change address" : "Pick Address"}
            />
          </React.Fragment>
        )}
      {price && (
        <RequestButton
          onClick={requestRideFn}
          disabled={toAddress === ""}
          value={`Request Ride ($${price})`}
        />
      )}
      <ExtendedButton
        onClick={onAddressSubmit}
        disabled={toAddress === ""}
        value={price ? "Change Address" : "Pick Address"}
      />
      <Map innerRef={mapRef} />
    </Sidebar>
  </Container>
);
export default HomePresenter;
