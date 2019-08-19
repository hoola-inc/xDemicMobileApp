import React, { Component } from "react";
import { PropTypes } from "prop-types";
import {
  Images,
  Theme,
  Text,
  Icon,
  Container,
  Colors as kanchaColors,
  Button
} from "@kancha";

class DataCard extends Component {
  constructor(props) {
    super(props);
    this.onPress = this.onPress.bind(this);
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
            <Text type={Text.Types.ListItemNote} bold>
              {ranking}
            </Text>
          </Container>
        </Container>
        <Container flex={3} alignItems={"center"} dividerRight>
          <Text type={Text.Types.ListItemNote} bold>
            {enrollment}
          </Text>
        </Container>
        <Container flex={3} alignItems={"center"}>
          <Text type={Text.Types.ListItemNote} bold>
            {deadline}
          </Text>
        </Container>
      </Container>
    );
  }
}

DataCard.propTypes = {
  data: PropTypes.object
};

export default DataCard;
