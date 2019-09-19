import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { View, StyleSheet, Alert } from "react-native";
import { colors, heightRatio } from "xdemic/lib/styles/globalStyles";

import { schools } from "xdemic/lib/selectors/school";

import { getSchool } from "xdemic/lib/actions/schoolActions";

import {
  Screen,
  Container,
  Text,
  Theme,
  Icon,
  Colors,
  SignPost,
  SignPostCardType,
  Section,
  Images,
  Button
} from "@kancha";
import BaseCollapsible from "xdemic/lib/components/shared/BaseCollapsible";
import {
  AvatarNameWithSubHeader,
  BaseAddSchoolButton
} from "xdemic/lib/components/shared";

const SELECTORS = [
  { title: "T&C", value: 0 },
  { title: "Privacy Policy", value: 1 },
  { title: "Return Policy", value: 2 },
  { title: "Reset all" }
];

interface DashboardProps {
  credentials: any[];
  componentId: string;
  // coursesList: any[];
  schoolsState: any[];

  /**
   * Redux actions
   */
  getSchools: () => any;
}
interface DashboardState {
  coursesList: any;
}
export class Dashboard extends React.Component<DashboardProps, DashboardState> {
  constructor(props: DashboardProps) {
    super(props);

    this.state = {
      coursesList: []
    };

    // Navigation.events().bindComponent(this);
    this.fetchCourses = this.fetchCourses.bind(this);
    this.renderInfoBar = this.renderInfoBar.bind(this);
  }
  fetchCourses = async () => {
    const response = await fetch("https://xdemic-api.herokuapp.com/courses");
    const json = await response.json();

    console.log("json before state save is: ", json);

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
      console.log("json after state save is: ", json);
    }
    // updatecoursesList(json)
  };

  componentDidMount() {
    console.log("working");
    this.fetchCourses();
    // this.props.getSchools();
    // this.props.updateShareToken(this.props.address);
  }

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
    console.log("school props from map state is: ", this.state.coursesList);
    return (
      <Screen type={"secondary"}>
        {/* {showSearchResult}
      {showNearToYou} */}
        <Container>
          <AvatarNameWithSubHeader
            avatar={Images.branding.avatar}
            avatarSize={Theme.avatarSize.default}
            name={"Bilal Javed Awan"}
            subTitle={"N/A"}
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
            <Container>
              <BaseAddSchoolButton
                {...this.props}
                iconSize={23}
                name={"Add Schools"}
              />
              {/* {this.state.coursesList.length > 0 &&
                this.state.coursesList.map((data: any) => (
                  <BaseAddSchoolButton
                    {...this.props}
                    iconSize={23}
                    name={"Add Schools"}
                    key={data.name}
                  />
                ))} */}
            </Container>

            {/*   {config.dummyData.BaseCardData.map((data: any, i: any) => {
            return (
              <BaseCard
                {...props}
                data={{ ...data, expandable: false }}
                key={i}
              />
            );
          })} */}
          </Container>

          <Container paddingTop={Theme.spacing.default16}>
            <Text
              type={Text.Types.H1}
              textAlign={"left"}
              textColor={Colors.BLACK}
              bold
            >
              Records
            </Text>
          </Container>
          {this.state.coursesList.length > 0 &&
            this.state.coursesList.map((data: any, i: any) => (
              <Container paddingTop={Theme.spacing.default} key={i}>
                <BaseCollapsible {...this.props} data={data} />
              </Container>
            ))}

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

const mapStateToProps = (state: any) => {
  return {
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
