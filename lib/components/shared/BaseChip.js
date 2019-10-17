import React, { Component } from "react";
import { Image, StyleSheet } from "react-native";
import { Left, Icon, Body, View } from "native-base";
import { colors } from "xdemic/lib/styles/globalStyles";
// import { Images } from 'App/Theme'
import { Text, Card, Theme, Colors, Container, Button } from "@kancha";
import { PrimaryButton } from "xdemic/lib/components/shared/Button";

class BaseChip extends Component {
  render() {
    const { title, index } = this.props;
    const {
      defaultShadowColor,
      borderSize,
      defaultBorderColor,
      defaultShadowRadius,
      defaultShadowOpacity,
      defaultShadowOffset,
      defaultElevation,
      selectedBorderColor,
      selectedShadowOpacity,
      selectedShadowOffset
    } = Theme.button;
    return (
      // <Container w={109} h={40} paddingRight={Theme.spacing.default}>
      //   <Card onPress={() => console.log("Pressed is working from chip")}>
      //     <Text
      //       type={Text.Types.CAPTION1}
      //       textAlign={"center"}
      //       transform={"capitalize"}
      //       textColor={Colors.DARK_GREY}
      //       padding={Theme.spacing.default}
      //       semiBold
      //     >
      //       {title}, 19
      //     </Text>
      //   </Card>
      // </Container>
      <PrimaryButton
        onPress={() => console.log("chip button clicked!")}
        style={{
          width: 109,
          height: 40,
          backgroundColor: Colors.WHITE,
          shadowColor: defaultShadowColor,
          shadowRadius: defaultShadowRadius,
          // shadowOpacity: this.props.borderLeft
          //   ? selectedShadowOpacity
          //   : defaultShadowOpacity,
          shadowOffset: this.props.borderLeft
            ? {
                width: selectedShadowOffset.w,
                height: selectedShadowOffset.h
              }
            : {
                width: defaultShadowOffset.w,
                height: defaultShadowOffset.h
              },
          elevation: defaultElevation
        }}
        textStyle={{ color: Colors.DARK_GREY }}
      >
        {title}
      </PrimaryButton>
    );
  }
}

export default BaseChip;

const Style = StyleSheet.create({
  button: {
    borderRadius: 8,
    height: 26,
    margin: 5
  },
  text: {
    color: colors.black,
    textTransform: "capitalize",
    minWidth: 84,
    textAlign: "center"
  }
});
