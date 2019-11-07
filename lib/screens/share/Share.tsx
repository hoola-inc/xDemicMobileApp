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
import { StyleSheet, Alert, ScrollView } from "react-native";
import { Screen, Theme, Container, Text, Icon, Colors } from "@kancha";
import { Navigation } from "react-native-navigation";
// import SCREENS from "../Screens";
import SCREENS from "xdemic/lib/screens/Screens";
import Mori from "mori";
import { AvatarNameWithSubHeader } from "xdemic/lib/components/shared";
import { ownClaims } from "xdemic/lib/selectors/identities";
import BaseCard from "xdemic/lib/components/shared/BaseCard";
import { font } from "xdemic/lib/styles/globalStyles";
import { TileButton } from "xdemic/lib/components/shared/Button";
import {
  getGlobalSchools,
  populateSchools,
  addSchool
} from "xdemic/lib/actions/schoolActions";

interface UserShareProps {
  componentId: string;
  avatar: any;
  name: string;
  phone: string;

  schoolsList: any[];

  //**Redux Actions */
  populateSchools: () => any;
  addingSchool: (data: any) => any;
  getSchools: () => any;
}

interface UserShareState {
  devMode: boolean;
}

export class UserShare extends React.Component<UserShareProps, UserShareState> {
  constructor(props: UserShareProps) {
    super(props);

    /**
     * Enable devmode in simulator by default
     */
    this.state = {
      devMode: __DEV__ ? true : false
    };
  }
  componentDidMount() {
    this.props.getSchools();
  }

  goToScreen(screenID: string, title: string, data?: any) {
    // Navigation.push(this.props.componentId, {
    //   component: {
    //     name: screenID,
    //     options: {
    //       topBar: {
    //         largeTitle: {
    //           visible: false
    //         }
    //       }
    //     }
    //   }

    /////////////////
    Navigation.push(this.props.componentId, {
      component: {
        name: screenID,
        options: {
          topBar: {
            elevation: 0,
            drawBehind: false,
            // rightButtons: [rightButtonsCredentialScreen],
            title: {
              text: title,
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
            schoolAddress: data.address,
            schoolName: data.name,
            schoolPosition: data.address,
            //expandable: false,
            expandable: true
          }
        }
      }
    });
  }

  /**
   * UI Render states
   */
  renderScreenUI() {
    const { schoolsList, componentId } = this.props;
    return (
      <Container
      // disabled={
      //   this.state.userCreatingidentity || this.state.identityCreationSuccess
      // }
      >
        <Container flex={1} justifyContent={"center"}>
          <Container
            marginRight={Theme.spacing.default16}
            marginLeft={Theme.spacing.default16}
          >
            <Text
              type={Text.Types.H1}
              textAlign={"left"}
              textColor={Colors.BLACK}
              semiBold
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
            <Container
              marginLeft={Theme.spacing.default16}
              marginTop={Theme.spacing.default16}
              marginBottom={Theme.spacing.default}
            >
              <Text
                type={Text.Types.H2}
                textAlign={"left"}
                textColor={Colors.BLACK}
                semiBold
              >
                Recent
              </Text>
            </Container>
            <Container margin={Theme.spacing.default}>
              <ScrollView
                style={{
                  width: 836,
                  height: 106
                  // padding: 0,
                  // margin: 0
                }}
                horizontal
                showsHorizontalScrollIndicator={false}
              >
                <Container flexDirection={"row"}>
                  {schoolsList.length !== 0 &&
                    schoolsList.map((data: any, i: any) => (
                      <BaseCard
                        {...this.props}
                        w={202}
                        h={84}
                        paddingTop
                        marginRight
                        data={{
                          ...data,
                          // schoolAddress: data.address,
                          // schoolName: data.name,
                          // schoolPosition: data.offer,
                          expandable: false
                        }}
                        onPress={() =>
                          this.goToScreen(
                            SCREENS.AddSchoolInformation,
                            "Add School",
                            data
                          )
                        }
                        key={data._id}
                      />
                    ))}
                  <Container margin={Theme.spacing.default}>
                    <TileButton
                      onPress={() =>
                        Navigation.push(componentId, {
                          component: {
                            name: SCREENS.AddSchool,
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
                            }
                          }
                        })
                      }
                    />
                  </Container>
                </Container>
              </ScrollView>
            </Container>
          </Container>

          <Container
            marginRight={Theme.spacing.default16}
            marginLeft={Theme.spacing.default16}
          >
            <Text
              type={Text.Types.H2}
              textAlign={"left"}
              textColor={Colors.BLACK}
              semiBold
              paddingTop={Theme.spacing.default32}
              paddingBottom={Theme.spacing.default}
            >
              Search Result
            </Text>
            {/* {schoolsList.length !== 0 &&
              schoolsList.map((data: any, i: any) => {
                return (
                  <BaseCard
                    {...this.props}
                    data={{
                      schoolAddress: data.address,
                      schoolName: data.name,
                      schoolPosition: data.address,
                      expandable: false
                    }}
                    onPress={() =>
                      this.goToScreen(
                        SCREENS.SendTranscript,
                        "Send Transcript",
                        data
                      )
                    }
                    key={i}
                  />
                );
              })} */}
          </Container>
        </Container>
        <Container
          flexDirection={"column"}
          marginRight={Theme.spacing.default16}
          marginLeft={Theme.spacing.default16}
        >
          <Container>
            <Text
              type={Text.Types.H2}
              textAlign={"left"}
              textColor={Colors.BLACK}
              semiBold
              paddingTop={Theme.spacing.default32}
              paddingBottom={Theme.spacing.default}
            >
              Favorites
            </Text>
            {/* {schoolsList.length !== 0 &&
              schoolsList.map((data: any, i: any) => {
                return (
                  <BaseCard
                    {...this.props}
                    data={{
                      schoolAddress: data.address,
                      schoolName: data.name,
                      schoolPosition: data.address,
                      expandable: false
                    }}
                    onPress={() =>
                      this.goToScreen(
                        SCREENS.SendTranscript,
                        "Send Transcript",
                        data
                      )
                    }
                    key={i}
                  />
                );
              })} */}
          </Container>
        </Container>
        {/* <Container padding justifyContent={"center"} alignItems={"flex-end"}>
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
        </Container> */}
      </Container>
    );
  }

  render() {
    const { name, avatar, phone } = this.props;
    return (
      <Screen type={Screen.Types.Primary} config={Screen.Config.SafeScroll}>
        <Container>
          <AvatarNameWithSubHeader
            avatar={avatar}
            avatarSize={Theme.avatarSize.default}
            name={name || "Bilal Javed Awan"}
            address={phone || "School Name"}
            type={"personInformation"}
            detailed={false}
          />
        </Container>
        {this.renderScreenUI()}
        <Container paddingBottom />
      </Screen>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => {
  const userData = Mori.toJs(ownClaims(state)) || {};
  return {
    ...ownProps,
    schoolsList: state.school.globalSchools,
    avatar:
      typeof state.myInfo.changed.avatar !== "undefined"
        ? state.myInfo.changed.avatar
        : userData.avatar,
    name:
      typeof state.myInfo.changed.name !== "undefined"
        ? state.myInfo.changed.name
        : userData.name,
    phone:
      typeof state.myInfo.changed.phone !== "undefined"
        ? state.myInfo.changed.phone
        : userData.phone
  };
};

export const mapDispatchToProps = (dispatch: any) => {
  return {
    getSchools: () => {
      dispatch(getGlobalSchools());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserShare);

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
