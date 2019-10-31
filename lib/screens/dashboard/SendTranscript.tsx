import * as React from "react";
import axios from "axios";
import { ActivityIndicator, Image, StyleSheet, Alert } from "react-native";
import { connect } from "react-redux";
import { addSchool } from "xdemic/lib/actions/schoolActions";
import { Screen, Container, Text, Theme, Icon, Images } from "@kancha";
import { AddSchoolCancelGroup } from "xdemic/lib/components/shared/Button";
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
import TESTID from "xdemic/lib/e2e/testIDs";

interface ImageObj {
  fileSize: number;
  uri: string;
}

interface CreateIdentityProps {
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
  createIdentity: () => void;
  finishOnboarding: () => void;
  addImage: (address: string, claimType: string, image: ImageObj) => void;
  storeOwnClaim: (address: string, claims: any) => void;
  trackSegment: (event: any) => any;
  addSchool: (data: any) => any;
  addingSchool: (data: any) => any;
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

class SendTranscript extends React.Component<
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
      identityCreationSuccess: false
    };

    this.addImage = this.addImage.bind(this);
    this.studentAddSchool = this.studentAddSchool.bind(this);
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

  isValid() {
    const { name, termsAccepted, privacyAccepted } = this.state;
    return name && termsAccepted && privacyAccepted;
  }
  /**
   * Api Funnctions for right now
   * after that we will need to change this
   */
  studentAddSchool = async () => {
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
              onAccept={() => {
                this.studentAddSchool();
              }}
              onCancel={() => {
                // this.studentAddSchool();
                console.log("on cancel buttonText props is: ", this.props.data);
              }}
            />
            {/* </Container> */}
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
              key={"keys"}
            />
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
