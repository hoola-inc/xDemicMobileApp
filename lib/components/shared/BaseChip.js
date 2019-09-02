import React, { Component } from "react";
import { Image, StyleSheet } from "react-native";
import { Left, Icon, Button, Body, View } from "native-base";
import { colors } from "xdemic/lib/styles/globalStyles";
// import { Images } from 'App/Theme'
import { Text } from "@kancha";

class BaseChip extends Component {
  render() {
    const { title, index } = this.props.data;
    return (
      <View style={Style.cardContent}>
        <Button light key={title} style={Style.button}>
          <Text
            type={Text.Types.H5}
            textAlign={"left"}
            textColor={colors.darkGrey}
            bold
            paddingTop={32}
            paddingBottom={13}
          />
        </Button>
      </View>
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
