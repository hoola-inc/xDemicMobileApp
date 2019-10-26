import React from "react";
import { connect } from "react-redux";
import { Screen, Container, Text, Theme, Icon, Colors, Button } from "@kancha";
import SCREENS from "xdemic/lib/screens/Screens";
import Mori from "mori";
import { Alert, ScrollView } from "react-native";
import { ownClaims, currentAddress } from "xdemic/lib/selectors/identities";
import BaseCollapsible from "xdemic/lib/components/shared/BaseCollapsible";
import BaseCard from "xdemic/lib/components/shared/BaseCard";
import BaseChip from "xdemic/lib/components/shared/BaseChip";
import { AvatarNameWithSubHeader } from "xdemic/lib/components/shared";
import { TileButton, PrimaryButton } from "xdemic/lib/components/shared/Button";
import { Navigation } from "react-native-navigation";
import {
  getSchool,
  populateSchools,
  addSchool
} from "xdemic/lib/actions/schoolActions";

const CHIP_DATA = [
  "Spring",
  "Summer",
  "Fall",
  "Spring 1",
  "Summer 1",
  "Fall 1"
];
interface DashboardProps {
  credentials: any[];
  componentId: string;
  // coursesList: any[];
  schoolsState: any[];
  name: string;
  avatar: string;
  phone: string;
  did: any;
  schoolsList: any;
  /**
   * Redux actions
   */
  populateSchools: () => any;
  addingSchool: (data: any) => any;
  getSchools: () => any;
}
interface DashboardState {
  coursesList: any;
  httpcoursesList: any;
  schools: any;
}
export class Dashboard extends React.Component<DashboardProps, DashboardState> {
  constructor(props: DashboardProps) {
    super(props);

    this.state = {
      coursesList: [],
      httpcoursesList: [],
      schools: []
    };
    // Navigation.events().bindComponent(this);
    this.fetchCourses = this.fetchCourses.bind(this);

    this.fetchSchools = this.fetchSchools.bind(this);
  }
  componentDidMount() {
    console.log(
      "schoolsList in componentDidMount before is: ",
      this.props.schoolsList
    );
    this.fetchSchools();
    this.fetchCourses();
    // this.props.populateSchools();

    // setTimeout(() => {
    //   console.log(
    //     "componentDidMount this.props.getSchools() is calling!",
    //     this.props.getSchools()
    //   );
    //   // this.props.getSchools();
    // }, 1000);
    console.log(
      "schoolsList in componentDidMount after is: ",
      this.props.schoolsList
    );
    // this.props.getSchools();
  }

  fetchCourses = async () => {
    const response = await fetch(
      `https://xdemic-api.herokuapp.com/courses/${this.props.did}`
    );
    const json = await response.json();

    if (!json.status) {
      Alert.alert(
        "Courses",
        "Courses not found!",
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
        coursesList: json.data
      });
    }
    // updatecoursesList(json)
  };

  // fetchHttpCourses = async () => {
  //   const response = await fetch("https://xdemic-api.herokuapp.com/httpcourse");
  //   const json = await response.json();

  //   if (!json.status) {
  //     Alert.alert(
  //       "Http Courses",
  //       "Http Courses not found!",
  //       [
  //         {
  //           text: "Cancel",
  //           onPress: () => console.log("Cancel Pressed"),
  //           style: "cancel"
  //         }
  //         // {
  //         //   text: " Event ClearQueue",
  //         //   style: "destructive",
  //         //   onPress: () => console.log("on Pressed")
  //         // }
  //       ],
  //       { cancelable: true }
  //     );
  //   } else {
  //     this.setState({
  //       httpcoursesList: json.data.graph
  //     });
  //   }
  //   // updatecoursesList(json)
  // };

  fetchSchools = async () => {
    const response = await fetch(
      `https://xdemic-api.herokuapp.com/schoolwithstudentenroll/${
        this.props.did
      }`
    );
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

  render() {
    const { name, avatar, phone, did, schoolsList } = this.props;
    console.log("schoolsList in render is: ", schoolsList);
    return (
      <Screen type={Screen.Types.Primary}>
        <Container>
          <AvatarNameWithSubHeader
            avatar={avatar}
            avatarSize={Theme.avatarSize.default}
            name={name || "Bilal Javed Awan"}
            address={phone || "N/A"}
            type={"personInformation"}
            detailed={false}
          />
        </Container>

        <Button
          fullWidth
          block={Button.Block.Filled}
          type={Button.Types.Primary}
          buttonText={"Primary Button"}
          onPress={() => {
            console.log("this.props.addingSchool() press is calling!");
            const data = {
              name: "on press Rizwan",
              subjectWebpage: "adfa",
              address: "dfs",
              offers: "sdfa",
              agentSectorType: "eewer",
              agentType: "asdf",
              DID: "adf",
              email: "dsf",
              telephone: "sdf"
            };
            this.props.addingSchool(data);
            // setTimeout(() => {
            //   console.log("this.props.getSchools() is calling!");
            //   const newData = this.props.getSchools();
            //   console.log("new data is: ", newData);
            // }, 1000);
          }}
        />

        <Container paddingTop={0} flex={1} flexDirection={"column"}>
          <Container paddingLeft={Theme.spacing.default16}>
            <Text
              type={Text.Types.H1}
              textAlign={"left"}
              textColor={Colors.BLACK}
              semiBold
            >
              My Schools
            </Text>
          </Container>
          <Container paddingLeft={Theme.spacing.default}>
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
                {this.props.schoolsList.length !== 0 &&
                  this.props.schoolsList.map((data: any, i: any) => (
                    <BaseCard
                      {...this.props}
                      w={202}
                      h={84}
                      paddingTop
                      marginRight
                      data={{
                        schoolAddress: data.address,
                        schoolName: data.name,
                        schoolPosition: data.offer,
                        expandable: false
                      }}
                      key={`schoolPosition ${i}`}
                    />
                  ))}
                <Container margin={Theme.spacing.default}>
                  <TileButton
                    onPress={() =>
                      Navigation.push(this.props.componentId, {
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

          <Container
            marginTop={Theme.spacing.default}
            marginLeft={Theme.spacing.default16}
          >
            <Text
              type={Text.Types.H1}
              textAlign={"left"}
              textColor={Colors.BLACK}
              semiBold
            >
              Records
            </Text>
          </Container>

          <Container flexDirection={"row"} marginLeft={Theme.spacing.default12}>
            {/* Rendering the Chip According to semester */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {this.state.coursesList.length > 0 &&
                CHIP_DATA.map(data => <BaseChip title={data} key={data} />)}
            </ScrollView>
          </Container>
          <Container
            margin={Theme.spacing.default16}
            marginTop={Theme.spacing.default4}
          >
            {this.state.coursesList.length > 0 &&
              this.state.coursesList.map((data: any, i: any) => (
                <BaseCollapsible {...this.props} data={data} key={i} />
              ))}
          </Container>
        </Container>
      </Screen>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => {
  const userData = Mori.toJs(ownClaims(state)) || {};
  const address = currentAddress(state);
  const didParts = address && address.match(/^did:ethr:(0x[0-9a-fA-F]{40})/);
  const did = didParts ? address : `did:uport:${address}`;
  return {
    ...ownProps,
    did,
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
        : userData.phone,
    schoolsList: state.school
    // schoolsState: schools(state)
    // credentials: onlyLatestAttestationsWithIssuer(state)
  };
};

export const mapDispatchToProps = (dispatch: any) => {
  return {
    // getSchools: () => {
    //   dispatch(getSchool());
    // },
    populateSchools: () => {
      dispatch(populateSchools());
    },
    addingSchool: (data: any) => {
      dispatch(addSchool(data));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
