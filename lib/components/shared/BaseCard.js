import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { PropTypes } from "prop-types";
import { View, Text, Card, CardItem } from "native-base";
import { Col, Grid } from "react-native-easy-grid";
import Fonts from "xdemic/lib/Theme/Fonts";
import Colors from "xdemic/lib/Theme/Colors";

class BaseCard extends Component {
  render() {
    const { courseCode, DateTime, courseName, schoolName } = this.props.data;
    return (
      <View
      // style={{
      //   borderWidth: 0.5,
      //   borderColor: 'blue',
      //   borderRadius: 8,
      //   borderTopColor: 'red',
      // }}
      >
        {/* <Card key={title} dataArray={SECTIONS} >
          <CardItem button onPress={() => alert('This is Card Header')}>
            <Body style={Styles.cardStyle}>
              <Text style={{ marginRight: 5 }}>{title}</Text>
            </Body>
          </CardItem>
        </Card> */}
        <Card style={Styles.cardStyle}>
          {/* <CardItem style={Styles.cardItemStyles}>
            <Grid>
              <Col>
                <Text style={Styles.cardCourseCode}>{courseCode}</Text>
              </Col>
              <Col>
                <Text style={Styles.cardDisplayDate}>{DateTime}</Text>
              </Col>
            </Grid>
          </CardItem> */}
          {/* <CardItem header style={{ borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }}>
            <Body style={{ borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }}>
              <Text style={{ borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }}>
                NativeBase is a free and open source framework that enable developers to build
                high-quality mobile apps using React Native iOS and Android apps with a fusion of
                ES6.
              </Text>
            </Body>
          </CardItem> */}
          <CardItem style={Styles.cardCourseName}>
            <Text style={Styles.cardCourseNameText}>{courseName}</Text>
          </CardItem>
          <CardItem style={Styles.cardSchoolName}>
            <Text style={Styles.cardSchoolNameText}>{schoolName}</Text>
          </CardItem>
        </Card>
      </View>
    );
  }
}

BaseCard.propTypes = {
  data: PropTypes.object
};

export default BaseCard;

const BorderSize = 8;
const Styles = StyleSheet.create({
  cardCourseCode: {
    ...Fonts.style.cardTitleSmallHeadingFontSize,
    color: Colors.chipTextColor,
    fontWeight: "500"
  },
  cardCourseName: {
    borderBottomLeftRadius: BorderSize,
    borderBottomRightRadius: BorderSize,
    borderTopLeftRadius: BorderSize,
    borderTopRightRadius: BorderSize,
    ...Fonts.style.cardCourseNameFontSize,
    fontWeight: "600",
    color: Colors.pageTitleColor
  },
  cardCourseNameText: {
    ...Fonts.style.cardCourseNameFontSize,
    marginTop: "0%"
  },
  cardDisplayDate: {
    ...Fonts.style.cardTitleSmallHeadingFontSize,
    color: Colors.chipTextColor,
    fontWeight: "500",
    // lineHeight: 50,
    textAlign: "right"
  },

  cardItemStyles: {
    borderTopLeftRadius: BorderSize,
    borderTopRightRadius: BorderSize
  },
  cardSchoolName: {
    borderBottomLeftRadius: BorderSize,
    borderBottomRightRadius: BorderSize,
    borderTopLeftRadius: BorderSize,
    borderTopRightRadius: BorderSize
  },
  cardSchoolNameText: {
    ...Fonts.style.cardTitleSmallHeadingFontSize,
    color: Colors.schoolNameTextColor,
    marginTop: "-8%"
  },
  cardStyle: {
    // borderColor: 'white',
    // borderLeftColor: Colors.appPrimaryBorderColor,

    borderColor: Colors.appPrimaryBorderColor,
    borderBottomColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: "transparent",

    borderBottomLeftRadius: BorderSize,
    borderBottomRightRadius: BorderSize,
    borderRightWidth: 0,
    borderLeftWidth: BorderSize,
    borderRadius: BorderSize,
    // borderBottomWidth: 0,
    // borderRightWidth: 0,
    // borderTopWidth: 0,

    // borderTopColor: 'white',

    // borderBottomColor: Colors.appPrimaryBorderColor,
    // borderBottomLeftRadius: 10,
    // borderBottomRightRadius: 10,
    // borderBottomWidth: 10,

    borderTopLeftRadius: BorderSize,
    borderTopRightRadius: BorderSize

    // shadowOffset: { width: 0, height: -1 },
    // shadowOpacity: 0.05,
    // shadowRadius: 10,
  }
});
