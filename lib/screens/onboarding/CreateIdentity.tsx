import * as React from "react";
import { Image, Modal } from "react-native";
import { ActivityIndicator } from "react-native";
import { connect } from "react-redux";
import {
  Screen,
  Container,
  Input,
  Text,
  Button,
  Theme,
  Icon,
  Images,
  Colors,
  Checkbox,
  Section,
  ListItem
} from "@kancha";
import { Navigation } from "react-native-navigation";
import SCREENS from "../Screens";
import photoSelectionHandler from "xdemic/lib/utilities/photoSelection";
import { currentAddress } from "../../selectors/identities";
import { activationEvent } from "xdemic/lib/actions/userActivationActions";
import { track } from "xdemic/lib/actions/metricActions";
import { startMain } from "xdemic/lib/navigators/navigation";
import {
  createIdentity,
  addClaims,
  addImage
} from "xdemic/lib/actions/uportActions";
import { registerDeviceForNotifications } from "xdemic/lib/actions/snsRegistrationActions";

import TESTID from "xdemic/lib/e2e/testIDs";

interface ImageObj {
  fileSize: number;
  uri: string;
}

interface CreateIdentityProps {
  componentId: string;
  navigator: Navigator;
  address: string;

  //**Redux Actions */
  createIdentity: () => void;
  finishOnboarding: () => void;
  addImage: (address: string, claimType: string, image: ImageObj) => void;
  storeOwnClaim: (address: string, claims: any) => void;
  trackSegment: (event: any) => any;
  registerDeviceForNotifications: () => void;
}

interface CreateIdentityState {
  valid: boolean;
  name: string;
  phoneNumber: string;
  identityNumber: string;
  dob: string;
  termsAccepted: boolean;
  privacyAccepted: boolean;
  userAddingInfo: boolean;
  userCreatingidentity: boolean;
  identityCreationSuccess: boolean;
  image: ImageObj | undefined;
}

/**
 * This will be extracted to a new Avatar component
 */
interface AvatarProps {
  image: string | undefined;
  text: string;
}

const navOptions = {
  topBar: {
    background: {
      color: Theme.colors.primary.background
    },
    backButton: { color: Theme.colors.primary.brand }
  }
};

const Avatar: React.FC<AvatarProps> = ({ image, text }) => {
  const avatar = image ? { uri: image } : Images.profile.avatar;
  return (
    <Image
      source={avatar}
      style={{ width: 150, height: 150, borderRadius: 75 }}
      resizeMode={"cover"}
    />
  );
};

class CreateIdentity extends React.Component<
  CreateIdentityProps,
  CreateIdentityState
> {
  static options(passProps: any) {
    return {
      ...navOptions
    };
  }

  constructor(props: CreateIdentityProps) {
    super(props);

    this.state = {
      valid: false,
      name: "",
      termsAccepted: false,
      privacyAccepted: false,
      image: undefined,
      userAddingInfo: true,
      userCreatingidentity: false,
      identityCreationSuccess: false,
      phoneNumber: "",
      identityNumber: "",
      dob: ""
    };

    this.addImage = this.addImage.bind(this);
  }

  componentDidMount() {
    this.props.trackSegment("Open");
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
  onChangeIdentityNumber = (text: string) => {
    this.setState({
      ...this.state,
      identityNumber: text
    });
  };
  onChangeDob = (text: string) => {
    this.setState({
      ...this.state,
      dob: text
    });
  };

  isValid() {
    const {
      name,
      dob,
      phoneNumber,
      identityNumber,
      termsAccepted,
      privacyAccepted
    } = this.state;
    return name && dob && phoneNumber;
    // && identityNumber;
    // && termsAccepted && privacyAccepted;
  }

  /**
   * UI Render main Screen
   */
  render() {
    return (
      <Screen
        type={Screen.Types.Primary}
        config={Screen.Config.SafeScroll}
        statusBarHidden
        // footerNavDivider
        // footerNavComponent={
        //   <Container alignItems={"flex-end"} paddingBottom paddingRight>
        //     <Container padding={0}>
        //       <Button
        //         testID={TESTID.ONBOARDING_CREATE_IDENTITY}
        //         icon={
        //           this.state.userCreatingidentity && (
        //             <ActivityIndicator
        //               color={"white"}
        //               style={{ marginRight: 10 }}
        //             />
        //           )
        //         }
        //         fullWidth
        //         disabled={
        //           !this.isValid() ||
        //           this.state.userCreatingidentity ||
        //           this.state.identityCreationSuccess
        //         }
        //         buttonText={
        //           this.state.userCreatingidentity
        //             ? "Generating keys...."
        //             : "Create Identity"
        //         }
        //         type={Button.Types.Primary}
        //         block={Button.Block.Filled}
        //         onPress={() => this.createIdentity()}
        //       />
        //     </Container>
        //   </Container>
        // }
      >
        {this.renderUserAddingInfo()}
      </Screen>
    );
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
        <Container flex={1} justifyContent={"center"} alignItems={"center"}>
          <Modal
            onRequestClose={() => ""}
            animationType={"slide"}
            transparent={true}
            visible={this.state.identityCreationSuccess}
          >
            {this.renderIdentityCreationSuccess()}
          </Modal>

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
              <Text type={Text.Types.H3} textColor={Colors.BLACK}>
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
              Name or username
            </Text>
          </Container>
          <Container flexDirection={"row"} w={280} paddingBottom>
            <Input
              testID={TESTID.ONBOARDING_NAME_INPUT}
              placeholder={"Name or username"}
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
              Phone Number
            </Text>
          </Container>
          <Container flexDirection={"row"} w={280} paddingBottom>
            <Input
              testID={TESTID.ONBOARDING_PHONE_NUMBER}
              placeholder={"Phone Number"}
              textType={Text.Types.H2}
              inputType={"filled"}
              value={this.state.phoneNumber}
              onChangeText={this.onChangePhoneNumber}
              valid={!!this.state.phoneNumber}
            />
          </Container>
          {/* <Container flexDirection={"row"} w={280} paddingBottom>
            <Text
              transform={"uppercase"}
              type={Text.Types.SubTitle}
              textAlign={"center"}
            >
              Identity Number
            </Text>
          </Container>
          <Container flexDirection={"row"} w={280} paddingBottom>
            <Input
              testID={TESTID.ONBOARDING_IDENTITY_NUMBER}
              placeholder={"Identity Number"}
              textType={Text.Types.H2}
              inputType={"filled"}
              value={this.state.identityNumber}
              onChangeText={this.onChangeIdentityNumber}
              valid={!!this.state.identityNumber}
            />
          </Container> */}
          <Container flexDirection={"row"} w={280} paddingBottom>
            <Text
              transform={"uppercase"}
              type={Text.Types.SubTitle}
              textAlign={"center"}
            >
              Date of Birth
            </Text>
          </Container>
          <Container flexDirection={"row"} w={280} paddingBottom>
            <Input
              testID={TESTID.ONBOARDING_DATE_OF_BIRTH}
              placeholder={"Date of Birth"}
              textType={Text.Types.H2}
              inputType={"filled"}
              value={this.state.dob}
              onChangeText={this.onChangeDob}
              valid={!!this.state.dob}
            />
          </Container>
          <Container padding>
            <Text type={Text.Types.SubTitle} textAlign={"center"}>
              You can always change this information later
            </Text>
          </Container>
        </Container>
        <Container alignItems={"center"}>
          <Container padding={Theme.spacing.default16} w={280}>
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
              disabled={
                !this.isValid() ||
                this.state.userCreatingidentity ||
                this.state.identityCreationSuccess
              }
              buttonText={
                this.state.userCreatingidentity
                  ? "Generating keys...."
                  : "Create new Identity"
              }
              type={Button.Types.Primary}
              block={Button.Block.Filled}
              onPress={() => this.createIdentity()}
            />
          </Container>
        </Container>
        {/* <Container>
          <Section>
            <ListItem
              accessible={false}
              avatarComponent={
                <Checkbox
                  testID={TESTID.ONBOARDING_TERMS_RADIO}
                  selected={this.state.termsAccepted}
                  toggleSelect={checked =>
                    this.setState({ termsAccepted: checked })
                  }
                />
              }
              onPress={() =>
                Navigation.push(this.props.componentId, {
                  component: {
                    name: SCREENS.Terms,
                    options: navOptions
                  }
                })
              }
            >
              Accept terms and conditions
            </ListItem>
            <ListItem
              accessible={false}
              last
              avatarComponent={
                <Checkbox
                  testID={TESTID.ONBOARDING_PRIVACY_RADIO}
                  selected={this.state.privacyAccepted}
                  toggleSelect={checked =>
                    this.setState({ privacyAccepted: checked })
                  }
                />
              }
              onPress={() =>
                Navigation.push(this.props.componentId, {
                  component: {
                    name: SCREENS.Privacy,
                    options: navOptions
                  }
                })
              }
            >
              Accept privacy policy
            </ListItem>
          </Section>
        </Container> */}
      </Container>
    );
  }

  /**
   * Todo - Create Modal component used below...
   */
  renderIdentityCreationSuccess() {
    return (
      <Container
        flex={1}
        justifyContent={"center"}
        alignItems={"center"}
        testID={TESTID.ONBOARDING_SUCCESS_MODAL}
      >
        <Container
          padding
          marginLeft
          marginRight
          background={"primary"}
          viewStyle={{
            shadowRadius: 30,
            elevation: 4,
            shadowColor: "black",
            shadowOpacity: 0.2,
            borderRadius: 5
          }}
        >
          <Container alignItems={"center"} paddingBottom paddingTop>
            <Text type={Text.Types.H2} bold>
              You are all set!
            </Text>
            <Container paddingTop={5}>
              <Text type={Text.Types.SubTitle}>Identity created</Text>
            </Container>
          </Container>
          <Container justifyContent={"center"} alignItems={"center"}>
            <Icon
              name={"rocket"}
              size={150}
              color={Theme.colors.confirm.accessories}
            />
          </Container>
          <Container flexDirection={"row"} justifyContent={"center"}>
            <ActivityIndicator style={{ marginRight: 10 }} />
            <Text type={Text.Types.ListItem}>Preparing dashboard...</Text>
          </Container>

          <Container padding>
            <Text type={Text.Types.SubTitle} textAlign={"center"}>
              You have successfully created a xDemic DID identity. Your private
              keys have been saved securely to your device
            </Text>
          </Container>
        </Container>
      </Container>
    );
  }

  /**
   * Class methods
   */
  addImage(response: any) {
    this.setState({
      image: response.avatar
    });
  }

  chooseProfileImage = () => {
    photoSelectionHandler({
      cameraStatus: "",
      photoStatus: "",
      segmentId: "",
      addFn: this.addImage
    });
  };

  createIdentity() {
    this.setState({
      ...this.state,
      userAddingInfo: false,
      userCreatingidentity: true
    });

    /**
     * Create identity
     */
    this.props.createIdentity();

    setTimeout(() => {
      this.showIdentityCreationStatus(this.props.address);

      setTimeout(() => {
        /**
         * Update the user profile with onboarding user data
         */
        if (this.props.address) {
          this.state.image &&
            this.props.addImage(this.props.address, "avatar", this.state.image);
          this.state.name &&
            this.props.storeOwnClaim(this.props.address, {
              name: this.state.name,
              dob: this.state.dob,
              phone: this.state.phoneNumber
              // country: this.state.identityNumber
            });
        }

        /**
         * Fire get started event
         */
        this.props.trackSegment("Get Started");

        /**
         * Onboarding complete
         */
        // this.props.finishOnboarding();
        // if you want to goo on add school then use this below code
        // otherwise uncommit "this.props.finishOnboarding()" & comment below code
        setTimeout(() => {
          this.setState({ ...this.state, identityCreationSuccess: false });
          Navigation.push(this.props.componentId, {
            component: {
              name: SCREENS.AddSchool,
              options: {
                topBar: {
                  elevation: 0,
                  drawBehind: false,
                  // rightButtons: [rightButtonsCredentialScreen],
                  title: {
                    text: "Add School",
                    alignment: "center",
                    fontFamily: "bold"
                  },
                  backButton: {
                    visible: false
                  }
                }
                // fab: {
                //   id: "androidScan",
                //   visible: true,
                //   backgroundColor: Theme.colors.primary.brand,
                //   clickColor: "#FFF",
                //   rippleColor: "#ddd",
                //   icon: scanIcon,
                //   iconColor: "#FFF"
                // }
              }
            }
          });
        }, 2000);
      }, 2000);
    }, 2600);
  }

  showIdentityCreationStatus(address: string) {
    this.setState({
      ...this.state,
      userCreatingidentity: false,
      identityCreationSuccess: true
    });
  }
}

const mapStateToProps = (state: any) => {
  return {
    address: currentAddress(state)
  };
};

export const mapDispatchToProps = (dispatch: any) => {
  return {
    createIdentity: () => {
      dispatch(createIdentity());
      dispatch(activationEvent("ONBOARDED"));
      dispatch(track("Onboarding Complete Finished"));
    },
    finishOnboarding: () => {
      // dispatch(activationEvent("ONBOARDED"));
      // dispatch(track("Onboarding Complete Finished"));
      //**Start app after tracking events fire */
      startMain();
    },
    trackSegment: (event: any) => {
      dispatch(track(`Onboarding Complete ${event}`));
    },
    addImage: (address: string, claimType: string, image: any) => {
      dispatch(addImage(address, claimType, image));
    },
    storeOwnClaim: (address: string, claims: any) => {
      dispatch(addClaims(address, claims));
    },
    registerDeviceForNotifications: () => {
      dispatch(registerDeviceForNotifications());
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateIdentity);
