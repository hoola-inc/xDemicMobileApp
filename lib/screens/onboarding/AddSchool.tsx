import * as React from "react";
import { ActivityIndicator, Modal, StyleSheet, Alert } from "react-native";
import { Navigation } from "react-native-navigation";
import { connect } from "react-redux";
import { Item, Input as InputNative } from "native-base";
import { Screen, Container, Text, Button, Theme, Icon, Colors } from "@kancha";
import SCREENS from "xdemic/lib/screens/Screens";

import { currentAddress } from "../../selectors/identities";

import { track } from "xdemic/lib/actions/metricActions";
import { startMain } from "xdemic/lib/navigators/navigation";

import BaseCard from "xdemic/lib/components/shared/BaseCard";

import { font } from "xdemic/lib/styles/globalStyles";

import TESTID from "xdemic/lib/e2e/testIDs";

import {
  getGlobalSchools,
  populateSchools,
  addSchool
} from "xdemic/lib/actions/schoolActions";

interface AddSchoolProps {
  componentId: string;
  navigator: Navigator;
  address: string;
  schoolsList: any[];
  coursesList: any[];

  //**Redux Actions */

  finishOnboarding: () => void;
  populateSchools: () => any;
  addingSchool: (data: any) => any;
  getSchools: () => any;
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
      identityCreationSuccess: false
    };
  }

  componentDidMount() {
    console.log("adds school componentDidMount");
    this.props.getSchools();
  }

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
        type={Screen.Types.Primary}
        config={Screen.Config.SafeScroll}
        // statusBarHidden
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
    const { schoolsList, componentId } = this.props;
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
              semiBold
              paddingTop={29}
              paddingBottom={13}
            >
              Search Result
            </Text>
            {schoolsList.length !== 0 &&
              schoolsList.map((data: any, i: any) => {
                return (
                  <BaseCard
                    {...this.props}
                    data={{
                      ...data,
                      expandable: false
                    }}
                    key={i + "sdf"}
                    onPress={() =>
                      Navigation.push(componentId, {
                        component: {
                          name: SCREENS.AddSchoolInformation,
                          options: {
                            topBar: {
                              elevation: 0,
                              drawBehind: false,
                              title: {
                                text: "Add School",
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
                              ...data,
                              // schoolAddress: data.address,
                              // schoolName: data.name,
                              // schoolPosition: data.address,
                              expandable: true
                            }
                          }
                        }
                      })
                    }
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
              semiBold
              paddingTop={29}
              paddingBottom={13}
            >
              Near You
            </Text>
            {schoolsList.length !== 0 &&
              schoolsList.map((data: any, i: any) => {
                return (
                  <BaseCard
                    {...this.props}
                    data={{
                      ...data,
                      expandable: false
                    }}
                    onPress={() =>
                      Navigation.push(componentId, {
                        component: {
                          name: SCREENS.AddSchoolInformation,
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
                                visible: true
                              }
                            }
                          },
                          passProps: {
                            ...this.props,
                            data: {
                              ...data,
                              // schoolAddress: data.address,
                              // schoolName: data.name,
                              // schoolPosition: data.address,
                              expandable: true
                            }
                          }
                        }
                      })
                    }
                    key={i + "dfe"}
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
    address: currentAddress(state),
    schoolsList: state.school.globalSchools
  };
};

export const mapDispatchToProps = (dispatch: any) => {
  return {
    finishOnboarding: () => {
      dispatch(track("Onboarding Complete Finished"));
      //**Start app after tracking events fire */
      startMain();
    },
    getSchools: () => {
      dispatch(getGlobalSchools());
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
