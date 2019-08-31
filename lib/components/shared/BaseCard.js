import React, { Component } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Navigation } from "react-native-navigation";
import { PropTypes } from "prop-types";
import { View, Text, CardItem } from "native-base";
import { Col, Grid } from "react-native-easy-grid";
import Fonts from "xdemic/lib/Theme/Fonts";
import Colors from "xdemic/lib/Theme/Colors";
import { Images, Container, Card } from "@kancha";
import Avatar from "xdemic/lib/components/shared/Avatar";
import { font } from "xdemic/lib/styles/globalStyles";
import SCREENS from "xdemic/lib/screens/Screens";
import { Theme, Icon, COLORS } from "@kancha";
import ExpandableBaseCard from "xdemic/lib/components/shared/ExpandableBaseCard";
import AvatarNameWithSubHeader from "xdemic/lib/components/shared/AvatarNameWithSubHeader";
import { colors, textStyles } from "xdemic/lib/styles/globalStyles";

class BaseCard extends Component {
  constructor(props) {
    super(props);
    this.onPress = this.onPress.bind(this);
    this.state = {
      _isExpandable: this.props.data.expandable
    };
  }
  onPress() {
    console.log("onPress is calling! ", this.props.data);
    // console.warn("onPress is calling!");
    this.setState({ _isExpandable: true });
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
    // !expandable ? (this.props.data["expandable"] = true) : null;

    console.log("BaseCard props is: ", this.props.data);
    return (
      <Container paddingBottom={8}>
        {!this.state._isExpandable ? (
          <Card
            onPress={() =>
              !expandable
                ? Navigation.push(this.props.componentId, {
                    component: {
                      name: SCREENS.AddSchoolInformation,
                      options: {
                        topBar: {
                          elevation: 0,
                          drawBehind: false,
                          // rightButtons: [rightButtonsCredentialScreen],
                          title: {
                            text: "Add School",
                            alignment: "center",
                            fontFamily: "bold"
                          },
                          backButton: {
                            visible: true
                          }
                        }
                        // fab: {
                        //   id: "androidScan",
                        //   visible: true,
                        //   backgroundColor: Theme.colors.primary.brand,
                        //   clickColor: "#FFF",
                        //   rippleColor: "#ddd",
                        //   icon: scanIcon,
                        //   iconColor: "#FFF"
                        // }
                      },
                      passProps: {
                        ...this.props,
                        data: { ...this.props.data, expandable: true }
                      }
                    }
                  })
                : this.onPress()
            }
            style={Styles.cardStyle}
          >
            <AvatarNameWithSubHeader
              avator={Images.branding.avatar}
              name={courseName}
              subTitle={schoolName}
            />
          </Card>
        ) : (
          <ExpandableBaseCard data={{ ...this.props.data, expandable: true }} />
        )}
      </Container>
    );
  }
}

BaseCard.propTypes = {
  data: PropTypes.object
};

export default BaseCard;

const BorderSize = 8;
const Styles = StyleSheet.create({
  inputWrap: {
    flex: 1
  },
  nameStyle: {
    flex: 1,
    marginLeft: 15,
    textAlign: "left",
    paddingLeft: 2
  },
  cardCourseCode: {
    ...Fonts.style.cardTitleSmallHeadingFontSize,
    fontFamily: font,
    color: Colors.chipTextColor
    // fontWeight: "500"
  },
  cardCourseName: {
    borderBottomLeftRadius: BorderSize,
    borderBottomRightRadius: BorderSize,
    borderTopLeftRadius: BorderSize,
    borderTopRightRadius: BorderSize,
    ...Fonts.style.cardCourseNameFontSize,
    fontFamily: font,
    // fontWeight: "600",
    color: Colors.pageTitleColor
  },
  cardCourseNameText: {
    ...Fonts.style.cardCourseNameFontSize,
    fontFamily: font,
    marginTop: "0%",
    marginLeft: 8
    // fontWeight: "bold"
    // color: Colors.schoolNameTextColor
  },
  cardDisplayDate: {
    ...Fonts.style.cardTitleSmallHeadingFontSize,
    fontFamily: font,
    color: Colors.chipTextColor,
    // fontWeight: "500",
    // lineHeight: 50,
    textAlign: "right"
  },

  cardItemStyles: {
    fontFamily: font,
    borderTopLeftRadius: BorderSize,
    borderTopRightRadius: BorderSize
  },
  cardSchoolName: {
    fontFamily: font,
    borderBottomLeftRadius: BorderSize,
    borderBottomRightRadius: BorderSize,
    borderTopLeftRadius: BorderSize,
    fontFamily: font,
    borderTopRightRadius: BorderSize
  },
  cardSchoolNameText: {
    ...Fonts.style.cardTitleSmallHeadingFontSize,
    fontFamily: font,
    color: Colors.schoolNameTextColor,
    marginLeft: 50,
    marginTop: "-15%"
    // fontWeight: "bold"
  },
  cardStyle: {
    height: 72,
    paddingBottom: 0,
    paddingTop: 0,
    fontFamily: font,
    // borderColor: 'white',
    // borderLeftColor: Colors.appPrimaryBorderColor,

    borderColor: "#75A4FF",
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
