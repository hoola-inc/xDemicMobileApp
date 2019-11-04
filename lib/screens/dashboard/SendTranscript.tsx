import * as React from "react";
import axios from "axios";
import { ActivityIndicator, Image, StyleSheet, Alert } from "react-native";
import { connect } from "react-redux";
import { addSchool } from "xdemic/lib/actions/schoolActions";
import { Screen, Container, Text, Theme, Icon, Images } from "@kancha";
import { AddSchoolCancelGroup } from "xdemic/lib/components/shared/Button";

import { currentAddress } from "../../selectors/identities";

import { track } from "xdemic/lib/actions/metricActions";

import { Navigation } from "react-native-navigation";
import SCREENS from "xdemic/lib/screens/Screens";
import { addClaims } from "xdemic/lib/actions/uportActions";
import { registerDeviceForNotifications } from "xdemic/lib/actions/snsRegistrationActions";
import BaseCard from "xdemic/lib/components/shared/BaseCard";
import TESTID from "xdemic/lib/e2e/testIDs";

interface ImageObj {
  fileSize: number;
  uri: string;
}

interface SendTranscriptProps {
  componentId: string;
  navigator: Navigator;
  address: string;
  data: any;
  expandable: any;
  schoolAddress: string;
  schoolName: string;
  schoolPosition: string;
  studentName: string;

  //**Redux Actions */

  storeOwnClaim: (address: string, claims: any) => void;
  trackSegment: (event: any) => any;
  addSchool: (data: any) => any;
  addingSchool: (data: any) => any;
  registerDeviceForNotifications: () => void;
}

interface SendTranscriptState {
  valid: boolean;
  name: string;
  search: string;
  termsAccepted: boolean;
  privacyAccepted: boolean;
  userAddingInfo: boolean;
  userCreatingidentity: boolean;
  identityCreationSuccess: boolean;
  image: ImageObj | undefined;
}

const navOptions = {
  topBar: {
    background: {
      color: Theme.colors.primary.background
    },
    backButton: { color: Theme.colors.primary.brand }
  }
};

class SendTranscript extends React.Component<
  SendTranscriptProps,
  SendTranscriptState
> {
  static options(passProps: any) {
    return {
      ...navOptions
    };
  }

  constructor(props: SendTranscriptProps) {
    super(props);

    this.state = {
      valid: false,
      name: "",
      search: "",
      termsAccepted: false,
      privacyAccepted: false,
      image: undefined,
      userAddingInfo: true,
      userCreatingidentity: false,
      identityCreationSuccess: false
    };

    this.submitTranscript = this.submitTranscript.bind(this);
  }

  componentDidMount() {
    this.props.trackSegment("Open");
  }

  /**
   * Api Funnctions for right now
   * after that we will need to change this
   */
  submitTranscript = async () => {
    const data = { ...this.props.data, studentName: "Rizwan" };
    const res = await axios.post(
      "https://xdemic-api.herokuapp.com/studentmobile",
      data
    );
    // const json = await res.json();

    if (!res.status) {
      Alert.alert(
        `${this.props.data.schoolName}`,
        `${this.props.data.schoolName} school not found!`,
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
      Alert.alert(
        `${this.props.data.schoolName}`,
        `${this.props.data.schoolName} School is added successfully!`,
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
      this.props.addingSchool({
        address: data.schoolAddress,
        name: data.schoolName,
        offer: data.schoolPosition
      });
    }
    // updatecoursesList(json)
  };

  /**
   * UI Render main Screen
   */
  render() {
    console.log("This.props is: ", this.props);
    return (
      <Screen
        type={Screen.Types.Primary}
        config={Screen.Config.SafeScroll}
        // statusBarHidden
        // footerNavDivider
        footerNavComponent={
          <Container
            flexDirection={"row"}
            alignItems={"center"}
            paddingBottom
            paddingLeft
          >
            {/* <Container w={160}>
              <Button
                testID={TESTID.ONBOARDING_CREATE_IDENTITY}
                icon={
                  this.state.userCreatingidentity && (
                    <ActivityIndicator
                      color={"white"}
                      style={{ marginRight: 10 }}
                    />
                  )
                }
                fullWidth
                // disabled={
                //   !this.isValid() ||
                //   this.state.userCreatingidentity ||
                //   this.state.identityCreationSuccess
                // }
                buttonText={
                  // this.state.userCreatingidentity
                  //   ? "Add to School"
                  // :
                  "Contact"
                }
                type={Button.Types.Custom}
                block={Button.Block.Filled}
                onPress={() => {
                  startMain();
                }}
              />
            </Container> */}
            {/* <Container w={160} paddingLeft> */}
            {/* <Button
                testID={TESTID.ONBOARDING_CREATE_IDENTITY}
                icon={
                  this.state.userCreatingidentity && (
                    <ActivityIndicator
                      color={"white"}
                      style={{ marginRight: 10 }}
                    />
                  )
                }
                fullWidth
                // disabled={
                //   !this.isValid() ||
                //   this.state.userCreatingidentity ||
                //   this.state.identityCreationSuccess
                // }
                buttonText={
                  // this.state.userCreatingidentity
                  //   ? "Add to School"
                  // :
                  "Add School"
                }
                type={Button.Types.Primary}
                block={Button.Block.Filled}
                onPress={() => this.createIdentity()}
              /> */}
            <AddSchoolCancelGroup
              acceptText={"Send"}
              cancelText={"Contact"}
              disabled
              onAccept={() => {
                this.submitTranscript();
              }}
              onCancel={() => {
                // this.submitTranscript();
                console.log("on cancel buttonText props is: ", this.props.data);
              }}
            />
            {/* </Container> */}
          </Container>
        }
      >
        {this.renderSendTranscriptScreenUI()}
      </Screen>
    );
  }

  /**
   * UI Render states
   */
  renderSendTranscriptScreenUI() {
    return (
      <Container
        disabled={
          this.state.userCreatingidentity || this.state.identityCreationSuccess
        }
      >
        <Container
          flex={1}
          justifyContent={"center"}
          paddingLeft={16}
          paddingRight={16}
        >
          <Container paddingTop={Theme.spacing.default16}>
            <BaseCard
              {...this.props}
              data={{ ...this.props.data, expandable: true }}
              onPress={() =>
                Navigation.push(this.props.componentId, {
                  component: {
                    name: SCREENS.SendTranscript,
                    options: {
                      topBar: {
                        elevation: 0,
                        drawBehind: false,
                        // rightButtons: [rightButtonsCredentialScreen],
                        title: {
                          text: "Send Transcript",
                          alignment: "center",
                          fontFamily: "bold"
                        },
                        backButton: {
                          visible: true
                        }
                      }
                    },
                    passProps: {
                      ...this.props,
                      data: {
                        schoolAddress: this.props.data.address,
                        schoolName: this.props.data.name,
                        schoolPosition: this.props.data.address,
                        expandable: true
                      }
                    }
                  }
                })
              }
              key={"keys"}
            />
          </Container>
        </Container>
      </Container>
    );
  }

  /**
   * Class methods
   */
}

const mapStateToProps = (state: any) => {
  return {
    address: currentAddress(state)
  };
};

export const mapDispatchToProps = (dispatch: any) => {
  return {
    trackSegment: (event: any) => {
      dispatch(track(`Onboarding Complete ${event}`));
    },

    storeOwnClaim: (address: string, claims: any) => {
      dispatch(addClaims(address, claims));
    },
    registerDeviceForNotifications: () => {
      dispatch(registerDeviceForNotifications());
    },
    addingSchool: (data: any) => {
      dispatch(addSchool(data));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SendTranscript);

const Styles = StyleSheet.create({
  input: {
    backgroundColor: "white",
    borderRadius: 8,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    paddingLeft: 20,
    height: 40
  }
});
