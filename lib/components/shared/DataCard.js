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

class DataCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ranking: props.data.ranking,
      enrollment: props.data.enrollment,
      deadline: props.data.deadline
    };
  }
  render() {
    const { ranking, enrollment, deadline } = this.state;
    return (
      <Container
        flexDirection={"column"}
        paddingTop={10}
        alignItems={"center"}
        flex={1}
        backgroundColor={"#FFFFFF"}
        viewStyle={{
          shadowRadius: 20,
          elevation: 3,
          shadowColor: "#75a4ff",
          shadowOpacity: 0.8,
          borderRadius: 5,
          height: 80
        }}
        // marginTop={10}
        // marginBottom={10}
      >
        <Container padding flexDirection={"row"} alignItems={"center"} flex={1}>
          <Container flex={3} alignItems={"center"} dividerRight>
            <Container>
              <Text
                type={Text.Types.ListItemNote}
                bold
                textColor={Colors.BLACK}
              >
                {ranking}
              </Text>
            </Container>
          </Container>
          <Container flex={3} alignItems={"center"} dividerRight>
            <Container>
              <Text
                type={Text.Types.ListItemNote}
                bold
                textColor={Colors.BLACK}
              >
                {enrollment}
              </Text>
            </Container>
          </Container>
          <Container flex={3} alignItems={"center"}>
            <Container>
              <Text
                type={Text.Types.ListItemNote}
                bold
                textColor={Colors.BLACK}
              >
                {deadline}
              </Text>
            </Container>
          </Container>
        </Container>

        <Container
          padding
          paddingTop={10}
          flexDirection={"row"}
          alignItems={"center"}
          flex={1}
          backgroundColor={"#DCE8FF"}
        >
          <Container flex={3} alignItems={"center"}>
            <Container>
              <Text type={Text.Types.ListItemNote} bold textColor={"#75A4FF"}>
                RANKING
              </Text>
            </Container>
          </Container>
          <Container flex={3} alignItems={"center"}>
            <Container>
              <Text type={Text.Types.ListItemNote} bold textColor={"#75A4FF"}>
                ENROLLMENT
              </Text>
            </Container>
          </Container>
          <Container flex={3} alignItems={"center"}>
            <Container>
              <Text type={Text.Types.ListItemNote} bold textColor={"#75A4FF"}>
                DEADLINE
              </Text>
            </Container>
          </Container>
        </Container>
      </Container>
    );
  }
}

DataCard.propTypes = {
  data: PropTypes.object
};

export default DataCard;
