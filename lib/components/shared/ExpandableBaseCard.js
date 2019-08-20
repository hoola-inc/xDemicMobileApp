import React, { Component } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Navigation } from "react-native-navigation";
import { PropTypes } from "prop-types";
import { View, CardItem } from "native-base";
import { Col, Grid } from "react-native-easy-grid";
import Fonts from "xdemic/lib/Theme/Fonts";
import Colors from "xdemic/lib/Theme/Colors";
import {
  Images,
  Theme,
  Text,
  Icon,
  Card,
  Container,
  Colors as kanchaColors
} from "@kancha";
import SCREENS from "xdemic/lib/screens/Screens";
import Avatar from "xdemic/lib/components/shared/Avatar";
import DataCard from "xdemic/lib/components/shared/DataCard";

class ExpandableBaseCard extends Component {
  constructor(props) {
    super(props);
    this.onPress = this.onPress.bind(this);
  }
  onPress() {
    console.log("expendable onPress is calling!");
    // console.warn("onPress is calling!");
    return;
  }
  render() {
    const scanIcon = Icon.getImageSource("ionicons", Icon.Names.scan, 30);
    const {
      courseCode,
      DateTime,
      courseName,
      schoolName,
      expandable
    } = this.props.data;
    console.log("ExpandableBaseCard props is: ", this.props.data);
    return (
      <Container padding paddingTop={8} paddingRight={8} paddingLeft={8}>
        <Card>
          <CardItem style={Styles.cardCourseName}>
            <Container flexDirection={"row"}>
              <Container padding>
                <Avatar
                  source={Images.branding.avatar}
                  size={40}
                  style={{
                    borderWidth: 2,
                    borderColor: "white",
                    paddingTop: 30
                  }}
                />
              </Container>
              <Container padding={0} justifyContent="flex-end">
                <Text
                  type={Text.Types.SubTitle}
                  color={kanchaColors.LIGHT_GREY}
                >
                  {schoolName}
                </Text>
                <Text type={Text.Types.H5} color={kanchaColors.BLACK}>
                  {courseName}
                </Text>
                <Text
                  type={Text.Types.SubTitle}
                  color={kanchaColors.LIGHT_GREY}
                >
                  {schoolName}
                </Text>
              </Container>
            </Container>
            <Container padding b={15} alignItems={"flex-end"}>
              <Icon
                name={"heart"}
                font={"feather"}
                color={kanchaColors.LIGHT_GREY}
                size={20}
                paddingLeft={70}
                marginLeft={70}
                animated={false}
              />
            </Container>
          </CardItem>

          <CardItem>
            <DataCard
              {...this.props}
              data={{
                ranking: "#1 US",
                enrollment: "2,061",
                deadline: "06/19"
              }}
            />
          </CardItem>
          <CardItem style={Styles.cardSchoolName}>
            <Container
              lexDirection={"row"}
              justifyContent={"flex-end"}
              paddingTop
            >
              <Text
                type={Text.Types.h6}
                fontWeight={100}
                color={kanchaColors.LIGHT_GREY}
              >
                Williams College, a private institution in Williamstown,
                Massachusetts, has three undergraduate academic branches:
                humanities and the arts, social sciences, and science and
                mathematics.
              </Text>
            </Container>
          </CardItem>
          <CardItem style={Styles.cardSchoolName}>
            <Container
              lexDirection={"row"}
              justifyContent={"flex-end"}
              paddingTop
            >
              <Text
                type={Text.Types.h6}
                fontWeight={100}
                color={kanchaColors.LIGHT_GREY}
              >
                Williams College, a private institution in Williamstown,
                Massachusetts, has three undergraduate academic branches:
                humanities and the arts, social sciences, and science and
                mathematics.
              </Text>
            </Container>
          </CardItem>
        </Card>
      </Container>
    );
  }
}

ExpandableBaseCard.propTypes = {
  data: PropTypes.object
};

export default ExpandableBaseCard;

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
    // flex: 2,
    // flexDirection: "row"
    // justifyContent: "space-between"
  },
  cardCourseNameSub: {
    borderBottomLeftRadius: BorderSize,
    borderBottomRightRadius: BorderSize,
    borderTopLeftRadius: BorderSize,
    borderTopRightRadius: BorderSize,
    ...Fonts.style.cardCourseNameFontSize,
    fontWeight: "600",
    color: Colors.pageTitleColor
    // flex: 1,
    // flexDirection: "row"
    // justifyContent: "center",
    // alignContent: "center"
  },
  cardCourseNameText: {
    ...Fonts.style.cardCourseNameFontSize
    // marginTop: "0%",
    // marginLeft: 8
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
    // flexDirection: "row",
    // justifyContent: "space-between",
    borderBottomLeftRadius: BorderSize,
    borderBottomRightRadius: BorderSize,
    borderTopLeftRadius: BorderSize,
    borderTopRightRadius: BorderSize
  },
  cardSchoolNameText: {
    ...Fonts.style.cardTitleSmallHeadingFontSize,
    color: Colors.schoolNameTextColor,
    marginTop: "-14%"
    // marginLeft: 50
  },
  cardStyle: {
    height: 305,
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
