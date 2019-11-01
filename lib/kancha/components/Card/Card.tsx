import * as React from "react";
import { Container, ContainerProps, Colors, Theme } from "@kancha";
import { TouchableHighlight } from "react-native";

interface Card extends ContainerProps {
  onPress?: () => void;
  onLongPress?: () => void;
  borderLeft?: any;
  typeButton?: any;
}

/**
 * Card component inherits all properties from Container. It has a default shadow and border radius. If an onPress function
 * is provided then it becomes a button
 */
const Card: React.FC<Card> = props => {
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
  } = Theme.card;
  const br = 5;
  return (
    <TouchableHighlight
      disabled={!props.onPress}
      onPress={props.onPress}
      onLongPress={props.onLongPress}
      style={{
        backgroundColor: "transparent",
        borderRadius: 8,
        padding: 0
      }}
      underlayColor="#fff"
      // activeOpacity={0.6}
      delayLongPress={1000}
    >
      <Container
        flexDirection={"row"}
        backgroundColor={Theme.colors.primary.background}
        br={br}
        viewStyle={{
          borderRadius: borderSize,
          shadowColor: defaultShadowColor,
          shadowRadius: defaultShadowRadius,
          shadowOpacity: props.borderLeft
            ? selectedShadowOpacity
            : defaultShadowOpacity,
          shadowOffset: props.borderLeft
            ? {
                width: selectedShadowOffset.w,
                height: selectedShadowOffset.h
              }
            : {
                width: defaultShadowOffset.w,
                height: defaultShadowOffset.h
              },
          elevation: defaultElevation,

          borderColor: props.borderLeft
            ? selectedBorderColor
            : defaultBorderColor,

          // borderBottomColor: "blue",
          // borderRightColor: "blue",
          // borderTopColor: "blue",

          borderRightWidth: 0,
          borderTopWidth: 0,
          borderBottomWidth: 0,

          borderLeftWidth: props.borderLeft ? borderSize : borderSize,
          borderWidth: borderSize,

          borderBottomLeftRadius: borderSize,
          borderBottomRightRadius: borderSize,

          borderTopLeftRadius: borderSize,
          borderTopRightRadius: borderSize
        }}
        {...props}
      >
        <Container flex={1} br={br} viewStyle={{ overflow: "hidden" }}>
          {props.children}
        </Container>
      </Container>
    </TouchableHighlight>
  );
};

export default Card;
