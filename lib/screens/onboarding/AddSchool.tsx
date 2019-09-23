import * as React from "react";
import { ActivityIndicator, Modal, StyleSheet, Alert } from "react-native";
import { connect } from "react-redux";
import { Item, Input as InputNative } from "native-base";
import { Screen, Container, Text, Button, Theme, Icon, Colors } from "@kancha";

import { currentAddress } from "../../selectors/identities";

import { track } from "xdemic/lib/actions/metricActions";
import { startMain } from "xdemic/lib/navigators/navigation";

import BaseCard from "xdemic/lib/components/shared/BaseCard";

import { font } from "xdemic/lib/styles/globalStyles";

import TESTID from "xdemic/lib/e2e/testIDs";

interface AddSchoolProps {
  componentId: string;
  navigator: Navigator;
  address: string;

  //**Redux Actions */

  finishOnboarding: () => void;
}

interface AddSchoolState {
  valid: boolean;
  name: string;
  search: string;
  termsAccepted: boolean;
  privacyAccepted: boolean;
  userAddingInfo: boolean;
  userCreatingidentity: boolean;
  identityCreationSuccess: boolean;

  schools: any[];
}

/**
 * This will be extracted to a new Avatar component
 */

const navOptions = {
  topBar: {
    background: {
      color: Theme.colors.primary.background
    },
    backButton: { color: Theme.colors.primary.brand }
  }
};
class AddSchool extends React.Component<AddSchoolProps, AddSchoolState> {
  static options(passProps: any) {
    return {
      ...navOptions
    };
  }

  constructor(props: AddSchoolProps) {
    super(props);

    this.state = {
      valid: false,
      name: "",
      search: "",
      termsAccepted: false,
      privacyAccepted: false,
      userAddingInfo: true,
      userCreatingidentity: false,
      identityCreationSuccess: false,
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
                onPress={() => this.props.finishOnboarding()}
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
          <Modal
            onRequestClose={() => ""}
            animationType={"slide"}
            transparent={true}
            visible={this.state.identityCreationSuccess}
          >
            {this.renderIdentityCreationSuccess()}
          </Modal>
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
}

const mapStateToProps = (state: any) => {
  return {
    address: currentAddress(state)
  };
};

export const mapDispatchToProps = (dispatch: any) => {
  return {
    finishOnboarding: () => {
      dispatch(track("Onboarding Complete Finished"));
      //**Start app after tracking events fire */
      startMain();
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
