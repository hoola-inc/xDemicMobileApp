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
import React, { Component } from "react";
import { Text, TouchableHighlight, View, StyleSheet } from "react-native";
import {
  colors,
  font,
  fontBold,
  fontSemiBold,
  fontMedium
} from "xdemic/lib/styles/globalStyles";
import { throttle, debounce } from "lodash";
import { Theme, Container, Text as KText, Icon, Card, Colors } from "@kancha";

const styles = StyleSheet.create({
  button: {
    flex: 1,
    borderRadius: 8,
    padding: 10,
    margin: Theme.spacing.default,
    flexDirection: "row",
    justifyContent: "center"
  },
  iconButton: {
    flex: 1,
    borderRadius: 8,
    padding: Theme.spacing.default,
    margin: 0,
    flexDirection: "row",
    justifyContent: "center"
  },
  cancelButton: {
    borderColor: colors.grey,
    borderWidth: 1,
    padding: Theme.spacing.default
  },
  tileButton: {
    flex: 0,
    flexDirection: "column",
    width: 80,
    height: 84,
    borderRadius: 8,
    // padding: 10,
    backgroundColor: Colors.WHITE,
    alignItems: "center",
    justifyContent: "center",
    // alignSelf: "stretch",
    shadowColor: Theme.card.defaultShadowColor,
    shadowRadius: Theme.card.defaultShadowRadius,
    shadowOpacity: Theme.card.defaultShadowOpacity,
    elevation: Theme.card.defaultElevation
    // shadowOffset: {
    //   width: Theme.card.selectedShadowOffset.w,
    //   height: Theme.card.selectedShadowOffset.h
    // }
  },
  tileButtonText: {
    fontFamily: fontMedium,
    fontSize: Theme.text.sizes.caption2,
    textAlign: "center",
    lineHeight: 13
  },
  contactButton: {
    backgroundColor: colors.white,
    borderColor: colors.white,
    borderWidth: 1,
    padding: Theme.spacing.default
  },
  primaryButton: {
    backgroundColor: Theme.colors.primary.brand,
    padding: Theme.spacing.default
  },
  disabledButton: {
    borderWidth: 1,
    borderColor: colors.black,
    backgroundColor: colors.darkGrey,
    padding: Theme.spacing.default
  },
  buttonText: {
    fontFamily: fontSemiBold,
    fontSize: Theme.text.sizes.h2,
    textAlign: "center"
  },
  cancelButtonText: {
    color: colors.darkGrey
  },
  contactButtonText: {
    color: colors.darkGrey
  },
  disabledButtonText: {
    color: colors.darkGrey
  },
  primaryButtonText: {
    color: colors.white
  },
  centeredButton: {
    borderColor: colors.green,
    borderWidth: 1,
    marginLeft: 15,
    marginRight: 15
  },
  centeredButtonText: {
    color: colors.green,
    padding: 3,
    fontSize: 18,
    fontFamily: fontBold,
    lineHeight: Theme.text.lineHeights.body
  },
  skipButton: {
    borderWidth: 0,
    marginTop: 0
  },
  skipButtonText: {
    fontFamily: font,
    fontSize: 18,
    lineHeight: Theme.text.lineHeights.body,
    color: Theme.colors.primary.brand
  }
});

export class Button extends Component {
  constructor(props) {
    super();
    this.onPress = debounce(props.onPress, 1000, {
      leading: true,
      trailing: false
    });
  }
  render() {
    const props = this.props;
    const active = this.state && this.state.active;
    return (
      <TouchableHighlight
        disabled={props.disabled}
        style={[
          props.icon ? styles.iconButton : styles.button,
          props.disabled
            ? styles.disabledButton
            : props.style || styles.cancelButton
        ]}
        underlayColor={props.underlayColor || colors.purple}
        onPress={this.onPress}
        onShowUnderlay={() => this.setState({ active: true })}
        onHideUnderlay={() => this.setState({ active: false })}
      >
        {props.icon ? (
          <View
            style={{
              flex: 0,
              alignSelf: "stretch",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Icon
              name={props.iconName || "addBox"}
              font={props.fontName || "materialcommunityicons"}
              color={props.iconColor || Colors.LIGHT_GREY}
              size={props.iconSize || 20}
            />
            <Text
              style={[
                styles.buttonText,
                { paddingTop: Theme.spacing.default4 },
                props.textStyle || styles.cancelButtonText,
                props.disabled
                  ? styles.disabledButtonText
                  : active
                  ? { color: props.underlayTextColor || colors.white }
                  : {}
              ]}
            >
              {props.children}
            </Text>
          </View>
        ) : (
          <Text
            style={[
              styles.buttonText,
              props.textStyle || styles.cancelButtonText,
              props.disabled
                ? styles.disabledButtonText
                : active
                ? { color: props.underlayTextColor || colors.white }
                : {}
            ]}
          >
            {props.children}
          </Text>
        )}
      </TouchableHighlight>
    );
  }
}

export const PrimaryButton = props => (
  <Button
    disabled={props.disabled}
    style={[styles.primaryButton, props.style]}
    textStyle={[styles.primaryButtonText, styles.buttonText, props.textStyle]}
    onPress={props.onPress}
  >
    {props.children}
  </Button>
);

export const CancelButton = props => (
  <Button
    disabled={props.disabled}
    style={[styles.cancelButton, props.style]}
    textStyle={styles.cancelButtonText}
    onPress={props.onPress}
  >
    {props.children || "Cancel"}
  </Button>
);
export const ContactButton = props => (
  <Button
    disabled={props.disabled}
    style={[styles.contactButton, props.style]}
    textStyle={styles.contactButtonText}
    onPress={props.onPress}
  >
    {props.children || "Cancel"}
  </Button>
);

export const Centered = props => (
  <View
    style={{
      flex: 0,
      alignSelf: "stretch",
      flexDirection: "row",
      justifyContent: "center"
    }}
  >
    {props.children}
  </View>
);

export const SkipButton = props => (
  <Centered>
    <Button
      disabled={props.disabled}
      style={styles.skipButton}
      textStyle={styles.skipButtonText}
      onPress={props.onPress}
    >
      {props.title ? props.title : "Skip"}
    </Button>
  </Centered>
);

export const CenteredActionButton = props => {
  const buttonStyles = props.color
    ? [styles.centeredButton, { borderColor: props.color }]
    : styles.centeredButton;
  const textStyles = props.color
    ? [styles.centeredButtonText, { color: props.color }]
    : styles.centeredButtonText;
  return (
    <Centered>
      <Button
        disabled={props.disabled}
        style={buttonStyles}
        textStyle={textStyles}
        onPress={props.onPress}
      >
        {props.children}
      </Button>
    </Centered>
  );
};

export const OnboardingButton = props => (
  <CenteredActionButton
    disabled={props.disabled}
    color={props.disabled ? colors.grey216 : colors.purple}
    onPress={props.onPress}
  >
    {props.children}
  </CenteredActionButton>
);

export const AcceptCancelGroup = props => {
  return (
    <View
      style={{ flex: 0, flexDirection: "row", justifyContent: "space-between" }}
    >
      <CancelButton onPress={props.onCancel} style={{ marginRight: 10 }}>
        {props.cancelText}
      </CancelButton>
      <PrimaryButton disabled={props.disabled} onPress={props.onAccept}>
        {props.acceptText}
      </PrimaryButton>
    </View>
  );
};

export const AddSchoolCancelGroup = props => {
  return (
    <View
      style={{ flex: 0, flexDirection: "row", justifyContent: "space-between" }}
    >
      <ContactButton
        disabled={props.disabled}
        onPress={props.onCancel}
        style={{ marginRight: 10 }}
      >
        {props.cancelText}
      </ContactButton>
      <PrimaryButton disabled={props.disabled} onPress={props.onAccept}>
        {props.acceptText}
      </PrimaryButton>
    </View>
  );
};

export const DangerButton = props => (
  <CenteredActionButton
    disabled={props.disabled}
    color={props.disabled ? colors.grey216 : colors.red}
    onPress={props.onPress}
  >
    {props.children}
  </CenteredActionButton>
);

export const TileButton = props => {
  return (
    <Button
      icon
      style={[styles.tileButton]}
      textStyle={[styles.tileButtonText, styles.primaryButtonText]}
      onPress={props.onPress}
    >
      <KText
        type={KText.Types.CAPTION2}
        textAlign={"center"}
        textColor={Colors.DARK_GREY}
      >
        {props.title || "Add Schools"}
      </KText>
    </Button>
  );
};
