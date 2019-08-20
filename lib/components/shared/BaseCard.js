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
import SCREENS from "xdemic/lib/screens/Screens";
import { Theme, Icon } from "@kancha";
import ExpandableBaseCard from "xdemic/lib/components/shared/ExpandableBaseCard";

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
      <Container paddingTop={8}>
        {!this.state._isExpandable ? (
          <TouchableOpacity
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
                        },
                        fab: {
                          id: "androidScan",
                          visible: true,
                          backgroundColor: Theme.colors.primary.brand,
                          clickColor: "#FFF",
                          rippleColor: "#ddd",
                          icon: scanIcon,
                          iconColor: "#FFF"
                        }
                      },
                      passProps: {
                        ...this.props,
                        data: { ...this.props.data, expandable: true }
                      }
                    }
                  })
                : this.onPress()
            }
          >
            <Card style={Styles.cardStyle}>
              <CardItem style={Styles.cardCourseName}>
                <Avatar
                  source={Images.branding.avatar}
                  size={40}
                  style={{
                    borderWidth: 2,
                    borderColor: "white",
                    paddingTop: 30
                  }}
                />
                <Text style={Styles.cardCourseNameText}>{courseName}</Text>
              </CardItem>
              <CardItem style={Styles.cardSchoolName}>
                <Text style={Styles.cardSchoolNameText}>{schoolName}</Text>
              </CardItem>
            </Card>
          </TouchableOpacity>
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
    marginTop: "0%",
    marginLeft: 8
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
    marginTop: "-14%",
    marginLeft: 50
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
