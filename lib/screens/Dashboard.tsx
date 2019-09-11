import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { View, StyleSheet } from "react-native";
import { colors, heightRatio } from "xdemic/lib/styles/globalStyles";

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
import {
  AvatarNameWithSubHeader,
  BaseAddSchoolButton
} from "xdemic/lib/components/shared";
import { parseClaimItem } from "xdemic/lib/utilities/parseClaims";
import { onlyLatestAttestationsWithIssuer } from "xdemic/lib/selectors/attestations";
import dataJson from "xdemic/lib/stubbs/signposts";
import config from "xdemic/lib/config";

interface DashboardProps {
  credentials: any[];
  componentId: string;
  signPosts: any[];
}

export class Dashboard extends React.Component<DashboardProps> {
  constructor(props: DashboardProps) {
    super(props);

    // this.state = {
    //   editMode: false
    // };

    // Navigation.events().bindComponent(this);
    // this.photoSelection = this.photoSelection.bind(this);
  }

  render() {
    return (
      <Screen>
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
        <Container padding={Theme.spacing.default16}>
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
          </Section>
          <Section title={"Records"}>
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
    // credentials: onlyLatestAttestationsWithIssuer(state)
  };
};

export default connect(mapStateToProps)(Dashboard);

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
