import React, { Component } from "react";
import { Theme, Colors } from "@kancha";
import { PrimaryButton } from "xdemic/lib/components/shared/Button";

class BaseChip extends Component {
  render() {
    const { title } = this.props;
    const {
      defaultShadowColor,
      defaultShadowRadius,
      defaultShadowOpacity,
      defaultShadowOffset,
      defaultElevation
    } = Theme.button;
    return (
      <PrimaryButton
        onPress={() => console.log("chip button clicked!")}
        style={{
          width: 109,
          height: 40,
          marginLeft: Theme.spacing.default4,
          marginRight: Theme.spacing.default4,
          marginBottom: Theme.spacing.default8,
          backgroundColor: Colors.WHITE,
          shadowColor: defaultShadowColor,
          shadowRadius: defaultShadowRadius,
          shadowOpacity: defaultShadowOpacity,
          shadowOffset: {
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
