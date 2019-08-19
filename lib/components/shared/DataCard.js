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
      ranking: "#1 US",
      enrollment: "2,061",
      deadline: "06/19"
    };
  }
  onPress() {
    console.log("DataCard onPress is calling!");
  }
  render() {
    // const {
    //   courseCode,
    //   DateTime,
    //   courseName,
    //   schoolName,
    //   expandable
    // } = this.props.data;
    const { ranking, enrollment, deadline } = this.state;
    console.log("DataCard props is: ", this.props);
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
