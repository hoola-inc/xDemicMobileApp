import * as React from "react";
import { Image } from "react-native";
import { connect } from "react-redux";
import { Screen, Container, Button, Text, Images, Theme } from "@kancha";
import SCREENS from "../Screens";
import { Navigation } from "react-native-navigation";
import { track } from "xdemic/lib/actions/metricActions";
import { segmentId } from "xdemic/lib/selectors/identities";

import TESTID from "xdemic/lib/e2e/testIDs";

interface WelcomeProps {
  trackSegment: (event: any) => any;
  componentId: string;
}

class Welcome extends React.Component<WelcomeProps> {
  componentDidMount() {
    this.props.trackSegment("Start");
  }

  render() {
    return (
      <Screen
        backgroundImage={Images.backgrounds.purpleGradientWithPattern}
        type={Screen.Types.Custom}
        config={Screen.Config.SafeNoScroll}
        statusBarHidden
      >
        <Container flex={1}>
          <Container
            flex={1}
            justifyContent={"space-around"}
            alignItems={"center"}
            // paddingTop={50}
          >
            <Image
              source={Images.branding.xDemicLogo}
              style={{ height: 800 }}
              resizeMode={"contain"}
            />
            {/* <Text
              type={Text.Types.H3}
              textColor={"white"}
              // bold
              textAlign={"center"}
            >
              Get started by creating a new identity.
            </Text> */}
          </Container>
          <Container
            flex={1}
            justifyContent={"space-around"}
            alignItems={"flex-start"}
            padding={Theme.spacing.default32}
            paddingLeft={Theme.spacing.default16}
          >
            {/* <Image
              source={Images.branding.brandLogo}
              style={{ height: 100 }}
              resizeMode={"contain"}
            /> */}
            <Text
              type={Text.Types.HERO}
              textColor={"white"}
              bold
              // textAlign={"center"}
            >
              All your academic credentials. In one place.
            </Text>
          </Container>
          <Container flex={1} paddingTop alignItems={"center"}>
            <Container w={350}>
              <Button
                testID={TESTID.ONBOARDING_GET_STARTED}
                bold
                fullWidth
                marginTop={Theme.spacing.default16}
                buttonText={"Create New Identity"}
                onPress={() =>
                  Navigation.push(this.props.componentId, {
                    component: {
                      name: SCREENS.Learn,
                      options: {
                        topBar: {
                          elevation: 0
                        }
                      }
                    }
                  })
                }
                type={Button.Types.Primary}
                block={Button.Block.Filled}
              />
              <Button
                testID={TESTID.ONBOARDING_RECOVER}
                marginTop={Theme.spacing.default16}
                bold
                fullWidth
                buttonText={"Sign In"}
                onPress={() =>
                  Navigation.push(this.props.componentId, {
                    component: {
                      name: SCREENS.RECOVERY.RestoreSeedInstructions,
                      options: {
                        topBar: {
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
                type={Button.Types.Custom}
                block={Button.Block.Clear}
              />
              {/* <Button
                testID={TESTID.ONBOARDING_RECOVER}
                bold
                fullWidth
                buttonText={"Recover Identity"}
                onPress={() =>
                  Navigation.push(this.props.componentId, {
                    component: {
                      name: SCREENS.RECOVERY.RestoreSeedInstructions,
                      options: {
                        topBar: {
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
                type={Button.Types.Custom}
                block={Button.Block.Clear}
              /> */}
            </Container>
          </Container>
        </Container>
      </Screen>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => {
  return {
    ...ownProps,
    segmentId: segmentId(state)
  };
};

export const mapDispatchToProps = (dispatch: any) => {
  return {
    trackSegment: (event: any) => {
      dispatch(track(`Onboarding ${event}`));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Welcome);
