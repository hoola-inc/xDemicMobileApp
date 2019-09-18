import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { View, StyleSheet } from "react-native";
import { colors, heightRatio } from "xdemic/lib/styles/globalStyles";

import { schools } from "xdemic/lib/selectors/school";

import { getSchool } from "xdemic/lib/actions/schoolActions";

import {
  Screen,
  Container,
  Text,
  Credential,
  Theme,
  Icon,
  Colors,
  SignPost,
  SignPostCardType,
  Section,
  Images,
  Button
} from "@kancha";
import SCREENS from "./Screens";
import BaseCard from "xdemic/lib/components/shared/BaseCard";
import BaseChip from "xdemic/lib/components/shared/BaseChip";
import BaseCollapsible from "xdemic/lib/components/shared/BaseCollapsible";
import {
  AvatarNameWithSubHeader,
  BaseAddSchoolButton
} from "xdemic/lib/components/shared";
import { parseClaimItem } from "xdemic/lib/utilities/parseClaims";
import { onlyLatestAttestationsWithIssuer } from "xdemic/lib/selectors/attestations";
import dataJson from "xdemic/lib/stubbs/signposts";
import config from "xdemic/lib/config";

const SELECTORS = [
  { title: "T&C", value: 0 },
  { title: "Privacy Policy", value: 1 },
  { title: "Return Policy", value: 2 },
  { title: "Reset all" }
];

interface DashboardProps {
  credentials: any[];
  componentId: string;
  signPosts: any[];
  schoolsState: any[];

  /**
   * Redux actions
   */
  getSchools: () => any;
}
interface DashboardState {
  signPosts: any;
}
export class Dashboard extends React.Component<DashboardProps, DashboardState> {
  constructor(props: DashboardProps) {
    super(props);

    this.state = {
      signPosts: []
    };

    // Navigation.events().bindComponent(this);
    this.fetchSignPosts = this.fetchSignPosts.bind(this);
    this.renderInfoBar = this.renderInfoBar.bind(this);
  }
  fetchSignPosts = async () => {
    const response = await fetch("https://xdemic-api.herokuapp.com/school");
    const json = await response.json();

    console.log("json before state save is: ", json);
    this.setState({
      signPosts: json.data
    });
    console.log("json after state save is: ", json);
    // updateSignPosts(json)
  };

  componentDidMount() {
    console.log("working");
    this.fetchSignPosts();
    this.props.getSchools();
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
    console.log("school props from map state is: ", this.state.signPosts);
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
              {this.state.signPosts !== "" &&
                this.state.signPosts.map((data: any) => (
                  <BaseAddSchoolButton
                    {...this.props}
                    iconSize={23}
                    name={"Add Schools"}
                    key={data.name}
                  />
                ))}
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
          {SELECTORS.map((data, i) => (
            <Container paddingTop={Theme.spacing.default} key={i}>
              <BaseCollapsible {...this.props} />
            </Container>
          ))}
          <Section title={"My Schools"}>
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
          </Section>
        </Container>
      </Screen>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    schoolsState: schools(state)
    // credentials: onlyLatestAttestationsWithIssuer(state)
  };
};

export const mapDispatchToProps = (dispatch: any) => {
  return {
    getSchools: () => {
      dispatch(getSchool());
    }
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
