import React, { Component } from "react";
import { Image, StyleSheet } from "react-native";
import { Left, Icon, Button, Body, View } from "native-base";
import { colors } from "xdemic/lib/styles/globalStyles";
// import { Images } from 'App/Theme'
import { Text, Card, Theme, Colors, Container } from "@kancha";

class BaseChip extends Component {
  render() {
    const { title, index } = this.props;
    return (
      <Container w={129} paddingRight={Theme.spacing.default}>
        <Card onPress={() => console.log("Pressed is working from chip")}>
          <Text
            type={Text.Types.CAPTION1}
            textAlign={"center"}
            transform={"capitalize"}
            textColor={Colors.DARK_GREY}
            padding={Theme.spacing.default}
            semiBold
          >
            {title}, 19
          </Text>
        </Card>
      </Container>
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
