import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
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
import { parseClaimItem } from "uPortMobile/lib/utilities/parseClaims";
import { onlyLatestAttestationsWithIssuer } from "uPortMobile/lib/selectors/attestations";
import dataJson from "uPortMobile/lib/stubbs/signposts";

interface DashboardProps {
  credentials: any[];
  componentId: string;
  signPosts: any[];
}

export const Dashboard: React.FC<DashboardProps> = props => {
  const [signPosts, updateSignPosts] = useState([]);
  const fetchSignPosts = async () => {
    console.warn("json files is: ", dataJson);
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
        <Text>Working text</Text>
        {showSignPosts}
        {showCredentials}
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
