import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { View, StyleSheet } from "react-native";
import { Header, Item, Input, Button } from "native-base";
import { colors, heightRatio } from "xdemic/lib/styles/globalStyles";

import {
  Screen,
  Container,
  Text,
  Card,
  Credential,
  Theme,
  Colors,
  Icon,
  SignPost,
  SignPostCardType
} from "@kancha";
import SCREENS from "./Screens";
import BaseCard from "xdemic/lib/components/shared/BaseCard";
import BaseChip from "xdemic/lib/components/shared/BaseChip";
import { parseClaimItem } from "xdemic/lib/utilities/parseClaims";
import { onlyLatestAttestationsWithIssuer } from "xdemic/lib/selectors/attestations";
import dataJson from "xdemic/lib/stubbs/signposts";
import config from "xdemic/lib/config";

interface DashboardProps {
  credentials: any[];
  componentId: string;
  signPosts: any[];
}

export const Dashboard: React.FC<DashboardProps> = props => {
  const [signPosts, updateSignPosts] = useState([]);
  const fetchSignPosts = async () => {
    const response = await fetch(
      "https://uport-mobile-store.s3.us-east-2.amazonaws.com/dashboard-signposts/signposts.json"
    );
    const json = await response.json();
    // updateSignPosts(dataJson);
    updateSignPosts(json);
  };
  const showSignPosts =
    signPosts.length > 0 &&
    props.credentials.length === 0 &&
    signPosts.map((card: SignPostCardType) => {
      return <SignPost key={card.id} card={card} />;
    });

  useEffect(() => {
    fetchSignPosts();
  }, []);

  const showCredentials = props.credentials.map(credential => {
    const { claimCardHeader } = parseClaimItem(credential);

    return (
      <Container key={credential.token} marginBottom>
        <Credential
          componentId={props.componentId}
          screen={SCREENS.Credential}
          verification={credential}
          claimType={claimCardHeader}
          issuer={credential.issuer}
          noMargin
        />
      </Container>
    );
  });
  return (
    <Screen>
      <Container padding>
        <Item style={Styles.input}>
          <Icon name={"search"} font={"feather"} color={"black"} size={40} />
          <Input style={{ fontSize: 14 }} placeholder="Search..." />
        </Item>
        {/* <Button transparent>
          <Text>Search</Text>
        </Button> */}
        <View style={{ marginTop: 32 }}>
          <Text
            textStyle={{ fontWeight: "bold" }}
            textColor={"#000000"}
            type={Text.Types.ListItem}
          >
            Search Result
          </Text>
        </View>
        {config.dummyData.BaseCardData.map((data: any, i: any) => {
          return <BaseCard data={data} key={i} />;
        })}
        <View style={{ marginTop: 32 }}>
          <Text textStyle={{ fontWeight: "bold" }} textColor={"#000000"}>
            Near you
          </Text>
        </View>
        {config.dummyData.NearYouData.map((data: any, i: any) => {
          return <BaseCard data={data} key={i} />;
        })}
      </Container>
    </Screen>
  );
};

const mapStateToProps = (state: any) => {
  return {
    credentials: onlyLatestAttestationsWithIssuer(state)
  };
};

export default connect(mapStateToProps)(Dashboard);

const Styles = StyleSheet.create({
  input: {
    backgroundColor: "white",
    borderRadius: 8,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    height: 40
  }
});
