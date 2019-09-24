/***
 *  Copyright (C) 2019 Hoola Inc
 *
 *  This file is part of xDemic Mobile App
 *  xDemic Mobile App is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.

 *  xDemic Mobile App is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  ERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 * 
 *  You should have received a copy of the GNU General Public License
 *  along with xDemic Mobile App.  If not, see <http://www.gnu.org/licenses/>.
 * 
 ***/

import * as React from "react";
import { connect } from "react-redux";
import { Item, Input as InputNative } from "native-base";
import { ActivityIndicator, StyleSheet, Alert } from "react-native";
import {
  Screen,
  ListItem,
  Theme,
  Section,
  Container,
  Text,
  Icon,
  Colors,
  SignPost,
  SignPostCardType,
  Images,
  Button
} from "@kancha";
import { Navigation } from "react-native-navigation";
import SCREENS from "../Screens";
import { hdRootAddress } from "xdemic/lib/selectors/hdWallet";
import Mori from "mori";
import {
  AvatarNameWithSubHeader,
  BaseAddSchoolButton
} from "xdemic/lib/components/shared";
import {
  currentAddress,
  ownClaims,
  myAccounts,
  allIdentities
} from "xdemic/lib/selectors/identities";
import BaseCard from "xdemic/lib/components/shared/BaseCard";
import { font } from "xdemic/lib/styles/globalStyles";
import TESTID from "xdemic/lib/e2e/testIDs";

interface UserShareProps {
  componentId: string;

  avatar: any;
  name: string;
}

interface UserShareState {
  devMode: boolean;
  count: number;
  schools: any[];
}

export class UserShare extends React.Component<UserShareProps, UserShareState> {
  constructor(props: UserShareProps) {
    super(props);

    /**
     * Enable devmode in simulator by default
     */
    this.state = {
      devMode: __DEV__ ? true : false,
      count: 0,
      schools: []
    };

    this.fetchSchools = this.fetchSchools.bind(this);
  }
  componentDidMount() {
    this.fetchSchools();
  }

  fetchSchools = async () => {
    const response = await fetch("https://xdemic-api.herokuapp.com/schools");
    const json = await response.json();
    if (!json.status) {
      Alert.alert(
        "Schools",
        "Schools not found!",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          }
          // {
          //   text: " Event ClearQueue",
          //   style: "destructive",
          //   onPress: () => console.log("on Pressed")
          // }
        ],
        { cancelable: true }
      );
    } else {
      this.setState({
        schools: json.data
      });
    }
  };
  goToScreen(screenID: string) {
    Navigation.push(this.props.componentId, {
      component: {
        name: screenID,
        options: {
          topBar: {
            largeTitle: {
              visible: false
            }
          }
        }
      }
    });
  }

  incrementDeveloperModeCount() {
    this.setState(state => {
      return {
        count: state.count + 1,
        devMode: state.count >= 10
      };
    });
  }

  /**
   * UI Render states
   */
  renderUserAddingInfo() {
    return (
      <Container
      // disabled={
      //   this.state.userCreatingidentity || this.state.identityCreationSuccess
      // }
      >
        <Container
          flex={1}
          justifyContent={"center"}
          paddingLeft={Theme.spacing.default16}
          paddingRight={Theme.spacing.default16}
        >
          <Container>
            <Text
              type={Text.Types.H1}
              textAlign={"left"}
              textColor={Colors.BLACK}
              bold
            >
              Recipients
            </Text>
            <Item style={Styles.input}>
              <Icon
                name={"search"}
                font={"materialicons"}
                color={Colors.LIGHT_GREY}
                size={20}
              />
              <InputNative
                style={{
                  // ...textStyles.h3,
                  fontFamily: font,
                  paddingTop: 15,
                  paddingLeft: 15,
                  textAlign: "left",
                  fontSize: Theme.text.sizes.h6,
                  color: Colors.DARK_GREY
                }}
                placeholder="Search..."
              />
            </Item>
          </Container>

          <Container>
            <Text
              type={Text.Types.H2}
              textAlign={"left"}
              textColor={Colors.BLACK}
              bold
              paddingTop={Theme.spacing.default32}
              paddingBottom={Theme.spacing.default}
            >
              Recent
            </Text>

            <Container flexDirection={"row"}>
              {this.state.schools.length !== 0 &&
                this.state.schools.map((data: any, i: any) => (
                  <Container w={202} key={data.address}>
                    <BaseCard
                      {...this.props}
                      data={{
                        schoolAddress: data.address,
                        schoolName: data.name,
                        schoolPosition: data.offer,
                        expandable: false
                      }}
                      key={"schoolPosition"}
                    />
                  </Container>
                ))}

              {/* {this.state.coursesList.length > 0 &&
                this.state.coursesList.map((data: any) => (
                  <BaseAddSchoolButton
                    {...this.props}
                    iconSize={23}
                    name={"Add Schools"}
                    key={data.name}
                  />
                ))} */}
              <Container paddingLeft={Theme.spacing.default} h={93}>
                <BaseAddSchoolButton
                  {...this.props}
                  iconSize={23}
                  name={"Add Schools"}
                />
              </Container>
            </Container>
          </Container>

          <Container>
            <Text
              type={Text.Types.H2}
              textAlign={"left"}
              textColor={Colors.BLACK}
              bold
              paddingTop={Theme.spacing.default32}
              paddingBottom={Theme.spacing.default}
            >
              Search Result
            </Text>
            {this.state.schools.length !== 0 &&
              this.state.schools.map((data: any, i: any) => {
                return (
                  <BaseCard
                    {...this.props}
                    data={{
                      schoolAddress: data.address,
                      schoolName: data.name,
                      schoolPosition: data.address,
                      expandable: false
                    }}
                    key={i}
                  />
                );
              })}
          </Container>
        </Container>
        <Container flexDirection={"column"} paddingLeft={16} paddingRight={16}>
          <Container>
            <Text
              type={Text.Types.H2}
              textAlign={"left"}
              textColor={Colors.BLACK}
              bold
              paddingTop={Theme.spacing.default32}
              paddingBottom={Theme.spacing.default}
            >
              Favorites
            </Text>
            {this.state.schools.length !== 0 &&
              this.state.schools.map((data: any, i: any) => {
                return (
                  <BaseCard
                    {...this.props}
                    data={{
                      schoolAddress: data.address,
                      schoolName: data.name,
                      schoolPosition: data.address,
                      expandable: false
                    }}
                    key={i}
                  />
                );
              })}
          </Container>
        </Container>
        <Container padding justifyContent={"center"} alignItems={"flex-end"}>
          <Button
            testID={TESTID.ONBOARDING_CREATE_IDENTITY}
            rounded
            icon={
              // <ActivityIndicator
              //   color={"white"}
              //   style={{ marginRight: 10 }}
              // />
              <Icon
                name={"plus"}
                font={"materialcommunityicons"}
                color={Colors.WHITE}
              />
            }
            // fullWidth
            // disabled={
            //   !this.isValid() ||
            //   this.state.userCreatingidentity ||
            //   this.state.identityCreationSuccess
            // }
            // buttonText={
            //   // this.state.userCreatingidentity
            //   // ? "Generating keys...."
            //   //:
            //   "Send"
            // }
            type={Button.Types.Primary}
            block={Button.Block.Filled}
            onPress={() =>
              Navigation.push(this.props.componentId, {
                component: {
                  name: SCREENS.SendTo,
                  options: {
                    topBar: {
                      title: {
                        text: "Send To",
                        alignment: "center",
                        fontFamily: "bold",
                        color: Colors.WHITE
                      },
                      elevation: 0,
                      backButton: {
                        title: "Back",
                        color: Theme.colors.primary.brand,
                        visible: true
                      }
                    }
                  }
                }
              })
            }
          />
        </Container>
      </Container>
    );
  }

  render() {
    const { name, avatar } = this.props;
    return (
      <Screen type={Screen.Types.Secondary} config={Screen.Config.SafeScroll}>
        <Container>
          <AvatarNameWithSubHeader
            avatar={avatar}
            avatarSize={Theme.avatarSize.default}
            name={name || "Bilal Javed Awan"}
            address={"School Name"}
            type={"personInformation"}
            detailed={false}
          />
        </Container>
        {this.renderUserAddingInfo()}
        <Container paddingBottom />
      </Screen>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => {
  const userData = Mori.toJs(ownClaims(state)) || {};
  return {
    ...ownProps,
    avatar:
      typeof state.myInfo.changed.avatar !== "undefined"
        ? state.myInfo.changed.avatar
        : userData.avatar,
    name:
      typeof state.myInfo.changed.name !== "undefined"
        ? state.myInfo.changed.name
        : userData.name
  };
};

export default connect(mapStateToProps)(UserShare);

const Styles = StyleSheet.create({
  input: {
    backgroundColor: "white",
    borderRadius: 8,
    shadowOffset: { width: 0, height: 1 },
    // shadowOpacity: 0.2,
    // shadowRadius: 2,

    shadowColor: "#4f4f4f",
    shadowRadius: 4,
    shadowOpacity: 0.2,
    elevation: 3,

    // fontSize: Theme.text.sizes.h6,
    color: Colors.DARK_GREY,

    paddingLeft: Theme.spacing.default16,
    height: 40
  }
});
