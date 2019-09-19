import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { PropTypes } from "prop-types";
import { CardItem } from "native-base";
import { Images, Text, Icon, Card, Container, Colors } from "@kancha";
import Avatar from "xdemic/lib/components/shared/Avatar";
import DataCard from "xdemic/lib/components/shared/DataCard";
import Map from "xdemic/lib/components/shared/Map";
import { colors } from "xdemic/lib/styles/globalStyles";
import AvatarNameWithSubHeader from "xdemic/lib/components/shared/AvatarNameWithSubHeader";

class ExpandableBaseCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      map: props.data || true
    };
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
      expandable,
      schoolAddress,
      schoolPosition
    } = this.props.data;
    console.log("ExpandableBaseCard props is: ", this.props.data);
    return (
      <Container
      //padding paddingTop={8} paddingRight={8} paddingLeft={8}
      >
        <Card borderLeft={expandable}>
          <AvatarNameWithSubHeader
            avatar={Images.branding.avatar}
            name={courseName}
            subTitle={schoolName}
            schoolPosition={schoolPosition}
            detailed={true}
            schoolAddress={schoolAddress}
            schoolName={schoolName}
            schoolPosition={schoolPosition}
          />

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
                color={Colors.DARK_GREY}
              >
                Williams College, a private institution in Williamstown,
                Massachusetts, has three undergraduate academic branches:
                humanities and the arts, social sciences, and science and
                mathematics.
              </Text>
            </Container>
          </CardItem>
        </Card>

        {this.props.map && (
          <Container paddingTop>
            <Map />
          </Container>
        )}
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
  // map: {
  //   height: 100,
  //   flex: 1
  // },
  cardCourseName: {
    borderBottomLeftRadius: BorderSize,
    borderBottomRightRadius: BorderSize,
    borderTopLeftRadius: BorderSize,
    borderTopRightRadius: BorderSize,
    fontSize: 14,
    fontWeight: "600",
    color: Colors.BLACK
    // flex: 2,
    // flexDirection: "row"
    // justifyContent: "space-between"
  },
  cardCourseNameSub: {
    borderBottomLeftRadius: BorderSize,
    borderBottomRightRadius: BorderSize,
    borderTopLeftRadius: BorderSize,
    borderTopRightRadius: BorderSize,
    fontSize: 14,
    fontWeight: "600",
    color: Colors.DARK_GREY
    // flex: 1,
    // flexDirection: "row"
    // justifyContent: "center",
    // alignContent: "center"
  },
  cardCourseNameText: {
    fontSize: 14
    // marginTop: "0%",
    // marginLeft: 8
  },
  cardDisplayDate: {
    fontSize: 9,
    color: Colors.DARK_GREY,
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
    fontSize: 9,
    color: Colors.BLACK,
    marginTop: "-14%"
    // marginLeft: 50
  },
  cardStyle: {
    height: 305,
    // borderColor: 'white',
    // borderLeftColor: Colors.appPrimaryBorderColor,

    borderColor: colors.brand,
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
