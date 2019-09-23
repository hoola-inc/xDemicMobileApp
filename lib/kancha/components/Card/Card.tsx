import * as React from "react";
import { Container, ContainerProps, Colors, Theme } from "@kancha";
import { TouchableHighlight } from "react-native";

interface Card extends ContainerProps {
  onPress?: () => void;
  borderLeft?: any;
}

/**
 * Card component inherits all properties from Container. It has a default shadow and border radius. If an onPress function
 * is provided then it becomes a button
 */
const Card: React.FC<Card> = props => {
  const br = 5;
  return (
    <TouchableHighlight
      disabled={!props.onPress}
      onPress={props.onPress}
      style={{
        backgroundColor: "transparent",
        borderRadius: 8,
        padding: 0
      }}
    >
      <Container
        flexDirection={"row"}
        backgroundColor={"#FFFFFF"}
        br={br}
        viewStyle={{
          // shadowColor: "#000000",
          // shadowRadius: 8,
          // shadowOpacity: 0.2,
          // elevation: 3,
          // shadowRadius: 10,
          // elevation: 10,
          shadowColor: "#4f4f4f",
          // shadowOpacity: 0.8,
          borderRadius: 5,
          shadowRadius: 4,
          shadowOpacity: 0.2,
          elevation: 3,

          borderColor: props.borderLeft
            ? Theme.colors.primary.brand
            : Colors.WHITE,

          // borderBottomColor: "white",
          // borderRightColor: "white",
          // borderTopColor: "white",

          borderBottomLeftRadius: Theme.card.borderSize,
          borderBottomRightRadius: Theme.card.borderSize,

          borderRightWidth: 0,
          borderTopWidth: 0,
          borderBottomWidth: 0,

          borderLeftWidth: props.borderLeft
            ? Theme.card.borderSize
            : Theme.card.borderSize,
          borderWidth: Theme.card.borderSize,

          borderTopLeftRadius: Theme.card.borderSize,
          borderTopRightRadius: Theme.card.borderSize
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
