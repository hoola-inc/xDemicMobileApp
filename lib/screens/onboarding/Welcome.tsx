import * as React from "react";
import { Image } from "react-native";
import { connect } from "react-redux";
import didJWT from "did-jwt";
import { Screen, Container, Button, Text, Images, Theme } from "@kancha";
import SCREENS from "../Screens";
import { Navigation } from "react-native-navigation";
import { RNUportHDSigner, getSignerForHDPath } from "react-native-uport-signer";
import { Credentials } from "uport-credentials";
import base64 from "base-64";
import { track } from "xdemic/lib/actions/metricActions";
import { segmentId } from "xdemic/lib/selectors/identities";

import TESTID from "xdemic/lib/e2e/testIDs";
import axios from "axios";

interface WelcomeProps {
  trackSegment: (event: any) => any;
  componentId: string;
}
var seedAlias = "";
const base64EncodedJwt =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NksifQ.eyJpYXQiOjE1NjM1MjI4MzAsImF1ZCI6ImRpZDpldGhyOjB4M2ZkNTU0NWQwNDk5ZjJlMTI4ZGY2NjMyYzViOGI5YWQ5MmZmYTZiOSIsImV4cCI6MTk1NzQ2MzQyMSwibmFtZSI6IlJpendhbiBEZXZlbG9wZXIiLCJpc3MiOiJkaWQ6ZXRocjoweDNmZDU1NDVkMDQ5OWYyZTEyOGRmNjYzMmM1YjhiOWFkOTJmZmE2YjkifQ.-Xw5C7h-lW-mmsvXxi0zlfKpinpIGxtRCslJO3DbTfx9_jCjqm5h8RwyJ94wWanYSsOq0oi7OT2dcrSVfDvo9w";

// const myClaim = {
//   "@context": "https://w3id.org/openbadges/v2",
//   id: "https://example.org/assertions/123",
//   type: "Assertion",
//   recipient: {
//     type: "email",
//     identity: "alice@example.org"
//   },
//   issuedOn: "2016-12-31T23:59:59+00:00",
//   verification: {
//     type: "hosted"
//   },
//   badge: {
//     type: "BadgeClass",
//     id: "https://example.org/badges/5",
//     name: "3-D Printmaster",
//     description:
//       "This badge is awarded for passing the 3-D printing knowledge and safety test.",
//     image: "https://example.org/badges/5/image",
//     criteria: {
//       narrative:
//         "Students are tested on knowledge and safety, both through a paper test and a supervised performance evaluation on live equipment"
//     },
//     issuer: {
//       id: "https://example.org/issuer",
//       type: "Profile",
//       name: "Example Maker Society",
//       url: "https://example.org",
//       email: "contact@example.org",
//       verification: {
//         allowedOrigins: "example.org"
//       }
//     }
//   }
// };

const myClaim = {
  type: "BadgeClass",
  id: "https://example.org/badges/5",
  name: "Hamza Developer"
};
class Welcome extends React.Component<WelcomeProps> {
  componentDidMount() {
    this.props.trackSegment("Start");
  }
  async callAPI() {
    // RNUportHDSigner.createSeed().then((seed: any) => {
    //   const credentialsParams = {};
    //   // Get Signer function to be used by credentials, address given by RNUportHDSigner
    //   credentialsParams.signer = getSignerForHDPath(seed.address);
    //   // set did of the issuer
    //   credentialsParams.did = `did:ethr:${seed.address}`;

    //   const cred = new Credentials(credentialsParams);

    //   cred
    //     .createVerification({
    //       sub: subject, //Address of receiver of the verification
    //       claim: { name: "John Smith" }
    //     })
    //     .then(verification => {
    //       const url = `https://id.uport.me/req/${verification}`;
    //       Linking.openURL(url).catch(err =>
    //         console.error("An error occurred", err)
    //       );
    //     });
    // });

    RNUportHDSigner.createSeed("prompt").then((addressOj: any) => {
      //keep a record of it to reference the seed when signing
      console.warn("addressOj.addressOj is: ", addressOj.address);
      seedAlias = addressOj.address;
      const encodedbase64 = base64.encode(addressOj.address);
      console.warn("encodedbase64 is: ", encodedbase64);
      RNUportHDSigner.addressForPath(
        seedAlias,
        `m/7696500'/0'/0'/0'`,
        addressOj.address
      )
        .then((addressObj: any) => {
          console.warn("addressObj is: ", addressObj);
          // Signing a JWT
          RNUportHDSigner.signJwt(
            seedAlias,
            "m/7696500/0/0/0",
            encodedbase64,
            `sign a claim ${myClaim}`
          )
            .then((jwtSig: any) => {
              console.warn("jwtSig is: ", jwtSig);
              axios
                .post("https://xdemic-api.herokuapp.com/school", {
                  schema: jwtSig
                })
                .then(res => {
                  console.warn("1");
                  // const json = await data.json();
                  // updateSignPosts(dataJson);
                  console.warn("json is: ", res);
                  console.warn("decodet jwt is: ", res);
                })
                .catch(e => {
                  console.warn("2");
                  console.warn("error # 3 in catch ", e);
                });
            })
            .catch((e: any) => {
              console.warn("jwtSig 8");
              console.warn("jwtSig error # 9 in catch ", e);
            });
        })
        .catch((e: any) => {
          console.warn("7");
          console.warn("error # 7 in catch ", e);
        });
    });

    // console.warn("1 ");
    // const signer = didJWT.SimpleSigner(
    //   "fa09a3ff0d486be2eb69545c393e2cf47cb53feb44a3550199346bdfa6f53245"
    // );

    // console.warn("2");
    // let jwt = "";
    // didJWT
    //   .createJWT(
    //     {
    //       aud: "did:uport:2osnfJ4Wy7LBAm2nPBXire1WfQn75RrV6Ts",
    //       exp: 1957463421,
    //       name: "uPort Developer"
    //     },
    //     { issuer: "did:uport:2osnfJ4Wy7LBAm2nPBXire1WfQn75RrV6Ts", signer }
    //   )
    //   .then(async response => {
    //     console.warn("3");
    //     jwt = response;
    //     console.warn("in then jwt is: ", jwt);
    //     axios
    //       .post("https://xdemic-api.herokuapp.com/school", {
    //         schema: response
    //       })
    //       .then(data => {
    //         console.warn("6");
    //         // const json = await data.json();
    //         // updateSignPosts(dataJson);
    //         console.warn("json is: ", data);
    //         const decodejson = didJWT.decodeJWT(jwt);
    //         console.warn("decodet jwt is: ", decodejson);
    //       })
    //       .catch(e => {
    //         console.warn("7");
    //         console.warn("error # 7 in catch ", e);
    //       });
    //   })
    //   .catch(e => {
    //     console.warn("4");
    //     console.warn("error in catch ", e);
    //   });
    // console.warn("5");
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
            paddingTop={50}
          >
            {/* <Image
              source={Images.branding.logoWhite}
              style={{ height: 100 }}
              resizeMode={"contain"}
            /> */}
            <Text
              type={Text.Types.H3}
              textColor={"white"}
              bold
              textAlign={"center"}
            >
              Get started by creating a new identity.
            </Text>
          </Container>
          <Container flex={1} paddingTop alignItems={"center"}>
            <Container w={300}>
              <Button
                testID={TESTID.ONBOARDING_GET_STARTED}
                bold
                fullWidth
                buttonText={"Get Started"}
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
                type={Button.Types.Custom}
                block={Button.Block.Filled}
              />
              <Button
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
              />
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
