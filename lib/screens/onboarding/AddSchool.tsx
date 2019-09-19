import * as React from "react";
import { ActivityIndicator, Image, StyleSheet, Alert } from "react-native";
import { connect } from "react-redux";
import { Item, Input as InputNative } from "native-base";
import {
  Screen,
  Container,
  Text,
  Button,
  Theme,
  Icon,
  Images,
  Colors
} from "@kancha";
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
import BaseCard from "xdemic/lib/components/shared/BaseCard";
import config from "xdemic/lib/config";
import { textStyles, font } from "xdemic/lib/styles/globalStyles";

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
  search: string;
  termsAccepted: boolean;
  privacyAccepted: boolean;
  userAddingInfo: boolean;
  userCreatingidentity: boolean;
  identityCreationSuccess: boolean;
  image: ImageObj | undefined;

  schools: any[];
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

class AddSchool extends React.Component<
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
      search: "",
      termsAccepted: false,
      privacyAccepted: false,
      image: undefined,
      userAddingInfo: true,
      userCreatingidentity: false,
      identityCreationSuccess: false,
      schools: []
    };

    this.addImage = this.addImage.bind(this);
    this.fetchSchools = this.fetchSchools.bind(this);
  }

  componentDidMount() {
    this.props.trackSegment("Open");
    this.fetchSchools();
  }

  onChangeText = (text: string) => {
    this.setState({
      ...this.state,
      name: text
    });
  };
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

  isValid() {
    const { name, termsAccepted, privacyAccepted } = this.state;
    return name && termsAccepted && privacyAccepted;
  }

  /**
   * UI Render main Screen
   */
  render() {
    return (
      <Screen
        type={Screen.Types.Secondary}
        config={Screen.Config.SafeScroll}
        statusBarHidden
        // footerNavDivider
        footerNavComponent={
          <Container alignItems={"center"} paddingBottom paddingLeft>
            <Container w={300}>
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
                  "Skip"
                }
                type={Button.Types.Primary}
                block={Button.Block.Filled}
                onPress={() => this.createIdentity()}
              />
            </Container>
          </Container>
        }
      >
        {this.renderUserAddingInfo()}
      </Screen>
    );
  }

  /**
   * UI Render states
   */
  renderUserAddingInfo() {
    console.log("renderUserAddingInfo is: ", this.state.schools);
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
          <Container paddingTop={20}>
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
              paddingTop={29}
              paddingBottom={13}
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
              paddingTop={29}
              paddingBottom={13}
            >
              Near You
            </Text>
            {this.state.schools.length !== 0 &&
              this.state.schools.map((data: any, i: any) => {
                return (
                  <BaseCard
                    {...this.props}
                    data={{
                      schoolName: data.subjectWebpage,
                      courseName: data.name,
                      schoolPosition: data.address,
                      expandable: false
                    }}
                    key={i}
                  />
                );
              })}
          </Container>
        </Container>
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
              name={"search"}
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
              name: this.state.name
            });
        }

        /**
         * Fire get started event
         */
        this.props.trackSegment("Get Started");

        /**
         * Onboarding complete
         */
        this.props.finishOnboarding();
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
    createIdentity: () => dispatch(createIdentity()),
    finishOnboarding: () => {
      dispatch(activationEvent("ONBOARDED"));
      dispatch(track("Onboarding Complete Finished"));
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
)(AddSchool);

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

    paddingLeft: 20,
    height: 40
  }
});
