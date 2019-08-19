import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { Images, Theme, Text, Icon, Container, Colors, Button } from "@kancha";

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
        padding
        flexDirection={"row"}
        alignItems={"center"}
        flex={1}
        backgroundColor={"#FFFFFF"}
        dividerLeft
        viewStyle={{
          shadowRadius: 20,
          elevation: 3,
          shadowColor: "#75a4ff",
          shadowOpacity: 0.8,
          borderRadius: 5
        }}
      >
        <Container flex={3} alignItems={"center"} dividerRight>
          <Container>
            <Text type={Text.Types.ListItemNote} bold textColor={Colors.BLACK}>
              {ranking}
            </Text>
          </Container>
          <Container backgroundColor={"#DCE8FF"} padding={0}>
            <Text type={Text.Types.ListItemNote} bold textColor={Colors.BLACK}>
              he {ranking}
            </Text>
          </Container>
        </Container>
        <Container flex={3} alignItems={"center"} dividerRight>
          <Container>
            <Text type={Text.Types.ListItemNote} bold textColor={Colors.BLACK}>
              {enrollment}
            </Text>
          </Container>
          <Container backgroundColor={"#DCE8FF"} padding={0}>
            <Text type={Text.Types.ListItemNote} bold textColor={Colors.BLACK}>
              ll {enrollment}
            </Text>
          </Container>
        </Container>
        <Container flex={3} alignItems={"center"}>
          <Container>
            <Text type={Text.Types.ListItemNote} bold textColor={Colors.BLACK}>
              {deadline}
            </Text>
          </Container>
          <Container backgroundColor={"#DCE8FF"} padding={0}>
            <Text type={Text.Types.ListItemNote} bold textColor={Colors.BLACK}>
              ow {deadline}
            </Text>
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
