// Copyright (C) 2019 Hoola Inc
//
// This file is part of xDemic Mobile App.
//
// xDemic Mobile App is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// xDemic Mobile App is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with xDemic Mobile App.  If not, see <http://www.gnu.org/licenses/>.
//
// Frameworks
import React from "react";
import { Text } from "react-native";
import Notification from "../Notification";
import Avatar from "xdemic/lib/components/shared/Avatar";
import { textStyles, colors } from "xdemic/lib/styles/globalStyles";
import dateChecker from "xdemic/lib/utilities/dateChecker";
import { Images } from "@kancha";

const AttestationNotification = props => {
  const handleAuthorize = () => {
    props.authorize(props.activity);
  };
  const handleCancel = () => {
    props.cancel(props.activity);
  };
  if (!props.activity.attestations) return null;
  const verification = props.activity.attestations[0];
  const claimType = Object.keys(verification.claim)[0];
  const issuer = props.issuer(verification.iss) || Images.profile.avatar;
  const exp = verification.exp;
  // console.log(props.issuer(props.activity.attestations[0].iss))
  return (
    <Notification
      title="Verification Received"
      cardPress={() => props.selectRequest(props.activity)}
      cancelText="Dismiss"
      acceptText="View"
      completed={props.activity.authorizedAt}
      canceled={props.activity.canceledAt}
      cancel={handleCancel}
      accept={handleAuthorize}
      noButtons={false}
    >
      <Avatar
        source={issuer}
        size={72}
        borderWidth={4}
        borderColor={colors.white}
      />
      <Text style={[textStyles.h2, { margin: 10 }]}>{claimType}</Text>
      {exp ? (
        <Text style={[textStyles.p, { margin: 10 }]}>
          Expires: {dateChecker(exp)}
        </Text>
      ) : null}
    </Notification>
  );
};

export default AttestationNotification;
