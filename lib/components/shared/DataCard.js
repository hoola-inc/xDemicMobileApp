import React, { Component } from "react";
import { PropTypes } from "prop-types";
import {
  Section,
  Images,
  Theme,
  Text,
  Icon,
  Container,
  Colors,
  Button
} from "@kancha";

const CARD_OPTIONS = ["RANKING", "ENROLLMENT", "DEADLINE"];

class DataCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ranking: props.data.ranking,
      enrollment: props.data.enrollment,
      deadline: props.data.deadline,
      cardOptions: props.cardOptions ? props.cardOptions : CARD_OPTIONS
    };
  }
  render() {
    const { ranking, enrollment, deadline, cardOptions } = this.state;
    return (
      <Container
        flexDirection={"column"}
        paddingTop={10}
        alignItems={"center"}
        flex={1}
        backgroundColor={"#FFFFFF"}
        viewStyle={{
          shadowColor: "#75a4ff",
          shadowOpacity: 0.08,
          shadowRadius: 50,
          shadowOffset: {
            w: 0,
            h: 0
          },
          elevation: 5,

          borderRadius: 5,
          height: 67,
          width: 280
        }}
      >
        <Container padding flexDirection={"row"} alignItems={"center"} flex={1}>
          <Container flex={3} alignItems={"center"}>
            <Container>
              <Text type={Text.Types.H2} semiBold textColor={Colors.BLACK}>
                {ranking}
              </Text>
            </Container>
          </Container>
          <Container flex={3} alignItems={"center"} dividerLeft>
            <Container>
              <Text type={Text.Types.H2} semiBold textColor={Colors.BLACK}>
                {enrollment}
              </Text>
            </Container>
          </Container>
          <Container flex={3} alignItems={"center"} dividerLeft>
            <Container>
              <Text type={Text.Types.H2} semiBold textColor={Colors.BLACK}>
                {deadline}
              </Text>
            </Container>
          </Container>
        </Container>

        <Container
          flexDirection={"row"}
          alignItems={"center"}
          flex={1}
          backgroundColor={"#DCE8FF"}
        >
          {cardOptions.map(val => (
            <Container flex={3} alignItems={"center"} key={val}>
              <Container>
                <Text type={Text.Types.CAPTION1} semiBold textColor={"#75A4FF"}>
                  {val}
                </Text>
              </Container>
            </Container>
          ))}
        </Container>
      </Container>
    );
  }
}

DataCard.propTypes = {
  data: PropTypes.object,
  cardOptions: PropTypes.array
};

export default DataCard;
