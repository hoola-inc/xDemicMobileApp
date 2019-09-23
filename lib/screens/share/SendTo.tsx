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
import { Item, Input as InputNative, Row } from "native-base";
import { ActivityIndicator, StyleSheet, Alert } from "react-native";
import {
  Screen,
  ListItem,
  Theme,
  Section,
  Container,
  Text,
  Input,
  Icon,
  Colors,
  SignPost,
  SignPostCardType,
  Images,
  Button
} from "@kancha";
import TESTID from "xdemic/lib/e2e/testIDs";
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
import axios from "axios";

interface UserSendToProps {
  componentId: string;

  avatar: any;
  name: string;

  sendTranscript: any;
}

interface UserSendToState {
  devMode: boolean;
  count: number;
  schools: any[];
  name: string;
  phoneNumber: string;
}

export class UserSendTo extends React.Component<
  UserSendToProps,
  UserSendToState
> {
  constructor(props: UserSendToProps) {
    super(props);

    /**
     * Enable devmode in simulator by default
     */
    this.state = {
      devMode: __DEV__ ? true : false,
      count: 0,
      schools: [],
      name: "",
      phoneNumber: ""
    };

    this.sendTranscript = this.sendTranscript.bind(this);
  }
  componentDidMount() {}

  sendTranscript = async () => {
    console.log("sendTranscript is calling!");
    const data = { email: this.state.phoneNumber };
    const res = await axios.post(
      "https://xdemic-api.herokuapp.com/transscipt",
      { email: this.state.phoneNumber }
    );

    console.log("share to res is: ", res);
    if (!res.status) {
      Alert.alert(
        `Transcript`,
        `Transcript not send!`,
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          {
            text: "Ok",
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
      Alert.alert(
        `Transcript`,
        `Transcript send Successfully!`,
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          {
            text: "Ok",
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
      console.log("json after state save is: ", res);
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

  onChangeText = (text: string) => {
    this.setState({
      ...this.state,
      name: text
    });
  };

  onChangePhoneNumber = (text: string) => {
    this.setState({
      ...this.state,
      phoneNumber: text
    });
  };

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
        <Container flex={1} justifyContent={"center"} alignItems={"center"}>
          <Container
            // flexDirection={"row"}
            w={280}
            alignItems={"flex-start"}
            paddingBottom
            paddingTop
          >
            {/* <Text type={Text.Types.H2} bold>
              Personalize xDemic
            </Text> */}
            <Container paddingTop={Theme.spacing.default32} paddingBottom>
              <Text type={Text.Types.H3} bold textColor={Colors.DARK_GREY}>
                Submit your information to confirm your identity
              </Text>
            </Container>
            {/* <Container paddingTop={5} paddingBottom>
              <Text type={Text.Types.SubTitle}>
                Add your name and optional photo
              </Text>
            </Container> */}
          </Container>
          {/* <Container
            justifyContent={"center"}
            alignItems={"center"}
            paddingBottom
          >
            <Avatar
              image={this.state.image && this.state.image.uri}
              text={this.state.name}
            />
            <Button
              buttonText={"Upload photo"}
              block={Button.Block.Clear}
              type={Button.Types.Primary}
              onPress={this.chooseProfileImage}
            />
          </Container> */}
          <Container flexDirection={"row"} w={280} paddingBottom>
            <Text
              type={Text.Types.SubTitle}
              textAlign={"center"}
              transform={"uppercase"}
            >
              Name
            </Text>
          </Container>
          <Container flexDirection={"row"} w={280} paddingBottom>
            <Input
              testID={TESTID.ONBOARDING_NAME_INPUT}
              placeholder={"Name"}
              textType={Text.Types.H2}
              inputType={"filled"}
              value={this.state.name}
              onChangeText={this.onChangeText}
              valid={!!this.state.name}
            />
          </Container>
          <Container flexDirection={"row"} w={280} paddingBottom>
            <Text
              type={Text.Types.SubTitle}
              textAlign={"center"}
              transform={"uppercase"}
            >
              Email
            </Text>
          </Container>
          <Container flexDirection={"row"} w={280} paddingBottom>
            <Input
              testID={TESTID.ONBOARDING_PHONE_NUMBER}
              placeholder={"Email"}
              textType={Text.Types.H2}
              inputType={"filled"}
              value={this.state.phoneNumber}
              onChangeText={this.onChangePhoneNumber}
              valid={!!this.state.phoneNumber}
            />
          </Container>
        </Container>
        <Container padding paddingLeft={Theme.spacing.default64}>
          <Text
            type={Text.Types.H2}
            //textAlign={"center"}
            bold
          >
            Credential to Send
          </Text>
        </Container>

        <Container
          // padding
          paddingLeft={Theme.spacing.default56}
          flexDirection={"row"}
        >
          <Container padding w={250}>
            <BaseCard
              {...this.props}
              data={{
                schoolAddress: "School of Education",
                schoolName: "Transcript",
                schoolPosition: "School Position",
                expandable: false
              }}
              key={"schoolAddress"}
            />
          </Container>
          <Container padding justifyContent={"center"} alignItems={"center"}>
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
              onPress={() => console.log("this.sendTranscript is not calling")}
            />
          </Container>
        </Container>

        <Container alignItems={"flex-end"}>
          <Container
            // flexDirection={"row"}
            // alignItems={"flex-end"}
            paddingBottom
            paddingRight
          >
            <Container padding={Theme.spacing.default} w={150}>
              <Button
                testID={TESTID.ONBOARDING_CREATE_IDENTITY}
                // icon={
                //   this.state.userCreatingidentity && (
                //     <ActivityIndicator
                //       color={"white"}
                //       style={{ marginRight: 10 }}
                //     />
                //   )
                // }
                // fullWidth
                // disabled={
                //   !this.isValid() ||
                //   this.state.userCreatingidentity ||
                //   this.state.identityCreationSuccess
                // }
                buttonText={
                  // this.state.userCreatingidentity
                  // ? "Generating keys...."
                  //:
                  "Send"
                }
                type={Button.Types.Primary}
                block={Button.Block.Filled}
                onPress={this.sendTranscript}
              />
            </Container>
          </Container>
        </Container>
      </Container>
    );
  }

  render() {
    const { name, avatar } = this.props;
    return (
      <Screen type={Screen.Types.Secondary} config={Screen.Config.SafeScroll}>
        {this.renderUserAddingInfo()}
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

export default connect(mapStateToProps)(UserSendTo);

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
