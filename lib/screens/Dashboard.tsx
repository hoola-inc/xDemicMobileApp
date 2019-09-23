import React from "react";
import { connect } from "react-redux";
import Mori from "mori";
import { StyleSheet, Alert } from "react-native";

import { ownClaims } from "xdemic/lib/selectors/identities";

import { Screen, Container, Text, Theme, Icon, Colors, Button } from "@kancha";
import BaseCollapsible from "xdemic/lib/components/shared/BaseCollapsible";
import BaseCard from "xdemic/lib/components/shared/BaseCard";
import BaseChip from "xdemic/lib/components/shared/BaseChip";
import {
  AvatarNameWithSubHeader,
  BaseAddSchoolButton
} from "xdemic/lib/components/shared";

const CHIP_DATA = ["Spring", "Summer", "Fall"];
interface DashboardProps {
  credentials: any[];
  componentId: string;
  // coursesList: any[];
  schoolsState: any[];
  name: string;
  avatar: string;

  /**
   * Redux actions
   */
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
    this.renderInfoBar = this.renderInfoBar.bind(this);
    this.fetchSchools = this.fetchSchools.bind(this);
  }
  componentDidMount() {
    this.fetchSchools();
    this.fetchCourses();
    this.fetchHttpCourses();
    // this.props.getSchools();
    // this.props.updateShareToken(this.props.address);
  }

  fetchCourses = async () => {
    const response = await fetch("https://xdemic-api.herokuapp.com/courses");
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
  fetchHttpCourses = async () => {
    const response = await fetch("https://xdemic-api.herokuapp.com/httpcourse");
    const json = await response.json();

    if (!json.status) {
      Alert.alert(
        "Http Courses",
        "Http Courses not found!",
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
        httpcoursesList: json.data.graph
      });
    }
    // updatecoursesList(json)
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

  renderInfoBar() {
    return (
      <Container
        padding
        flexDirection={"row"}
        alignItems={"center"}
        flex={1}
        backgroundColor={Theme.colors.primary.background}
        dividerBottom
        w={1000}
      >
        <Container flex={3} alignItems={"center"}>
          <Button
            block={Button.Block.Clear}
            icon={
              <Icon
                name={"addBox"}
                font={"materialcommunityicons"}
                color={Theme.colors.primary.accessories}
              />
            }
            onPress={() => console.log("etisfdsn")}
          />
          <Container>
            <Text type={Text.Types.ListItemNote}>Credentials</Text>
          </Container>
        </Container>
        <Container flex={3} alignItems={"center"}>
          <Button
            block={Button.Block.Clear}
            icon={
              <Icon
                name={"addBox"}
                font={"materialcommunityicons"}
                color={Theme.colors.primary.accessories}
              />
            }
            onPress={() => console.log("dsfsdfs")}
          />
          <Text type={Text.Types.ListItemNote}>QR Code</Text>
        </Container>
        <Container flex={3} alignItems={"center"}>
          <Button
            block={Button.Block.Clear}
            icon={
              <Icon
                name={"addBox"}
                font={"materialcommunityicons"}
                color={Theme.colors.primary.accessories}
              />
            }
            onPress={() => console.log("etin")}
          />
          <Text type={Text.Types.ListItemNote}>Share</Text>
        </Container>
        <Container flex={3} alignItems={"center"}>
          <Button
            block={Button.Block.Clear}
            icon={
              <Icon
                name={"addBox"}
                font={"materialcommunityicons"}
                color={Theme.colors.primary.accessories}
              />
            }
            onPress={() => console.log("etin")}
          />
          <Text type={Text.Types.ListItemNote}>Share</Text>
        </Container>
      </Container>
    );
  }

  render() {
    const { name, avatar } = this.props;
    return (
      <Screen type={Screen.Types.Secondary}>
        <Container>
          <AvatarNameWithSubHeader
            avatar={avatar}
            avatarSize={Theme.avatarSize.default}
            name={name || "Bilal Javed Awan"}
            address={"N/A"}
            type={"personInformation"}
            detailed={false}
          />
        </Container>
        {/* {this.renderInfoBar()} */}
        <Container
          padding={Theme.spacing.default16}
          flex={1}
          flexDirection={"column"}
        >
          <Container>
            <Text
              type={Text.Types.H1}
              textAlign={"left"}
              textColor={Colors.BLACK}
              bold
            >
              My Schools
            </Text>
            <Container flexDirection={"row"} padding={0} marginLeft={0}>
              {this.state.schools.length === 0 && (
                <Container>
                  <BaseAddSchoolButton
                    {...this.props}
                    iconSize={23}
                    name={"Add Schools"}
                  />
                </Container>
              )}
              {this.state.schools.length !== 0 &&
                this.state.schools.map((data: any, i: any) => (
                  <Container w={202} key={data.address}>
                    <BaseCard
                      {...this.props}
                      data={{
                        schoolAddress: data.address,
                        schoolName: data.name,
                        schoolPosition: data.offer,
                        expandable: false
                      }}
                      key={"schoolPosition"}
                    />
                  </Container>
                ))}
            </Container>
          </Container>

          <Container paddingTop={Theme.spacing.default}>
            <Text
              type={Text.Types.H1}
              textAlign={"left"}
              textColor={Colors.BLACK}
              bold
            >
              Records
            </Text>
          </Container>

          {/* Rendering the Chip According to semester */}
          {this.state.coursesList.length > 0 && (
            <Container flexDirection={"row"}>
              {CHIP_DATA.map(data => (
                <BaseChip title={data} key={data} />
              ))}
            </Container>
          )}

          {this.state.coursesList.length > 0 &&
            this.state.coursesList.map((data: any, i: any) => (
              <Container paddingTop={Theme.spacing.default} key={i}>
                <BaseCollapsible {...this.props} data={data} />
              </Container>
            ))}

          {/* this data show in inforation dialog box */}
          {/* {this.state.httpcoursesList.length > 0 &&
            this.state.httpcoursesList.map((data: any, i: any) => {
              console.log(
                'data["ceterms:name"].value is: ',
                data["ceterms:name"].value
              );
              return (
                <Container paddingTop={Theme.spacing.default} key={i}>
                  <BaseCollapsible
                    {...this.props}
                    data={{
                      name: data["ceterms:name"].value,
                      courseCode: data["ceterms:prerequisite"],
                      DateTime: data.id,
                      courseName: data["ceterms:name"].value,
                      schoolName: data["ceterms:name"].value,
                      courseGPA: i + 1,
                      coursePercentage: i + 1 * 13,
                      courseGrade: i + 1,
                      schoolPosition: data.id,
                      schoolAddress: data["ceterms:ctid"]
                    }}
                  />
                </Container>
              );
            })} */}

          {/* <Section title={"My Schools"}>
            <Container marginBottom>
              <Credential
                claimType={"Standard Credential"}
                issuer={{
                  name: "xDemic Apps Team",
                  avatar: {
                    uri:
                      "https://cloudflare-ipfs.com/ipfs/QmdxTrTSiQGY8GzY2wLJzWcuRcV3jKfLjFGWnc3fsUk1bK"
                  }
                }}
              />
            </Container>
            <Container marginBottom>
              <Credential
                claimType={"Missing Credential"}
                issuer={{ name: "xDemic Apps Team" }}
                missing
                spec={{}}
              />
            </Container>
          </Section> */}
        </Container>
      </Screen>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => {
  const userData = Mori.toJs(ownClaims(state)) || {};
  return {
    ...ownProps,
    avatar:
      typeof state.myInfo.changed.avatar !== "undefined"
        ? state.myInfo.changed.avatar
        : userData.avatar,
    name:
      typeof state.myInfo.changed.name !== "undefined"
        ? state.myInfo.changed.name
        : userData.name
    // schoolsState: schools(state)
    // credentials: onlyLatestAttestationsWithIssuer(state)
  };
};

export const mapDispatchToProps = (dispatch: any) => {
  return {
    // getSchools: () => {
    //   dispatch(getSchool());
    // }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);

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
