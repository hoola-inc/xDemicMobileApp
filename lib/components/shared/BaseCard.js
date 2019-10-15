import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Navigation } from "react-native-navigation";
import { PropTypes } from "prop-types";
import { Images, Icon, Container, Card, Theme } from "@kancha";

import { colors, font } from "xdemic/lib/styles/globalStyles";
import SCREENS from "xdemic/lib/screens/Screens";
import ExpandableBaseCard from "xdemic/lib/components/shared/ExpandableBaseCard";
import AvatarNameWithSubHeader from "xdemic/lib/components/shared/AvatarNameWithSubHeader";

class BaseCard extends Component {
  constructor(props) {
    super(props);
    this.onPress = this.onPress.bind(this);
    this.state = {
      _isExpandable: this.props.data.expandable
    };
  }
  onPress() {
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
      expandable,
      schoolPosition,
      schoolAddress
    } = this.props.data;
    // !expandable ? (this.props.data["expandable"] = true) : null;

    return (
      <Container paddingBottom={Theme.spacing.default16}>
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
            borderLeft={!this.state._isExpandable}
            w={this.props.w}
            h={this.props.h}
            paddingTop={this.props.paddingTop && Theme.spacing.default4}
            marginRight={this.props.marginRight && Theme.spacing.default}
          >
            <AvatarNameWithSubHeader
              avatar={Images.branding.avatar}
              schoolAddress={schoolAddress}
              schoolName={schoolName}
              schoolPosition={schoolPosition}
              detailed={false}
            />
          </Card>
        ) : (
          <ExpandableBaseCard
            {...this.props}
            data={{ ...this.props.data, expandable: true, detailed: true }}
          />
        )}
      </Container>
    );
  }
}

BaseCard.propTypes = {
  data: PropTypes.object
};

export default BaseCard;

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
    fontFamily: font,
    color: colors.darkGrey
    // fontWeight: "500"
  },
  cardCourseName: {
    borderBottomLeftRadius: Theme.card.borderSize,
    borderBottomRightRadius: Theme.card.borderSize,
    borderTopLeftRadius: Theme.card.borderSize,
    borderTopRightRadius: Theme.card.borderSize,
    // ...Fonts.style.cardCourseNameFontSize,
    fontFamily: font,
    // fontWeight: "600",
    color: colors.black
  },
  cardCourseNameText: {
    // ...Fonts.style.cardCourseNameFontSize,
    fontFamily: font,
    marginTop: "0%",
    marginLeft: 8
    // fontWeight: "bold"
    // color: colors.black
  },
  cardDisplayDate: {
    fontFamily: font,
    color: colors.darkGrey,
    // fontWeight: "500",
    // lineHeight: 50,
    textAlign: "right"
  },

  cardItemStyles: {
    fontFamily: font,
    borderTopLeftRadius: Theme.card.borderSize,
    borderTopRightRadius: Theme.card.borderSize
  },
  cardSchoolName: {
    fontFamily: font,
    borderBottomLeftRadius: Theme.card.borderSize,
    borderBottomRightRadius: Theme.card.borderSize,
    borderTopLeftRadius: Theme.card.borderSize,
    fontFamily: font,
    borderTopRightRadius: Theme.card.borderSize
  },
  cardSchoolNameText: {
    fontFamily: font,
    color: colors.black,
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

    borderBottomLeftRadius: Theme.card.borderSize,
    borderBottomRightRadius: Theme.card.borderSize,
    borderRightWidth: 0,
    borderLeftWidth: Theme.card.borderSize,
    borderRadius: Theme.card.borderSize,
    // borderBottomWidth: 0,
    // borderRightWidth: 0,
    // borderTopWidth: 0,

    // borderTopColor: 'white',

    // borderBottomColor: Colors.appPrimaryBorderColor,
    // borderBottomLeftRadius: 10,
    // borderBottomRightRadius: 10,
    // borderBottomWidth: 10,

    borderTopLeftRadius: Theme.card.borderSize,
    borderTopRightRadius: Theme.card.borderSize

    // shadowOffset: { width: 0, height: -1 },
    // shadowOpacity: 0.05,
    // shadowRadius: 10,
  }
});
