import * as React from "react";
import { Container, ContainerProps } from "@kancha";
import { TouchableOpacity } from "react-native";

const BorderSize = 8;

interface Card extends ContainerProps {
  onPress?: () => void;
}

/**
 * Card component inherits all properties from Container. It has a default shadow and border radius. If an onPress function
 * is provided then it becomes a button
 */
const Card: React.FC<Card> = props => {
  const br = 5;
  return (
    <TouchableOpacity disabled={!props.onPress} onPress={props.onPress}>
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

          borderColor: "#868FEC",

          // borderBottomColor: "white",
          // borderRightColor: "white",
          // borderTopColor: "white",

          borderBottomLeftRadius: BorderSize,
          borderBottomRightRadius: BorderSize,

          borderRightWidth: 0,
          borderTopWidth: 0,
          borderBottomWidth: 0,

          borderLeftWidth: BorderSize,
          borderWidth: BorderSize,

          borderTopLeftRadius: BorderSize,
          borderTopRightRadius: BorderSize
        }}
        {...props}
      >
        <Container flex={1} br={br} viewStyle={{ overflow: "hidden" }}>
          {props.children}
        </Container>
      </Container>
    </TouchableOpacity>
  );
};

export default Card;
