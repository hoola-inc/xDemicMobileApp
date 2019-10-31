// *Example of Collapsible - Accordion - Expandable View in React Native*/
import React, { Component } from "react";
//import react in our project
import { StyleSheet, Text } from "react-native";
//import basic react native components
import * as Animatable from "react-native-animatable";
import { Navigation } from "react-native-navigation";

import { Theme, Card, Container } from "@kancha";
import SCREENS from "../../screens/Screens";
import DataCard from "xdemic/lib/components/shared/DataCard";
import CardCollapsibleHeader from "xdemic/lib/components/shared/CardCollapsibleHeader";

export default class BaseCollapsible extends Component {
  state = {
    //default active selector
    activeSections: [],
    //collapsed condition for the single collapsible
    collapsed: true,
    //multipleSelect is for the Multiple Expand allowed
    //true: You can expand multiple at a time
    //false: One can be expand at a time and other will be closed automatically
    multipleSelect: false,
    isBorderActive: false,
    isLongPressEnable: false
  };

  toggleExpanded = () => {
    //Toggling the state of single Collapsible
    const { isBorderActive, collapsed, isLongPressEnable } = this.state;
    // if(isBorderActive){
    this.setState({
      collapsed: !collapsed,
      isBorderActive: isLongPressEnable
        ? true
        : !collapsed
        ? !isBorderActive
        : true
    });
    // }
  };

  setSections = sections => {
    //setting up a active section state
    this.setState({
      activeSections: sections.includes(undefined) ? [] : sections
    });
  };

  renderHeader = (section, _, isActive) => {
    //Accordion Header view
    return (
      <Animatable.View
        duration={400}
        style={[styles.header, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor"
      >
        <Text style={styles.headerText}>{section.title}</Text>
      </Animatable.View>
    );
  };

  renderContent(section, _, isActive) {
    //Accordion Content view
    return (
      <Animatable.View
        duration={400}
        style={[styles.content, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor"
      >
        <Animatable.Text
          animation={isActive ? "bounceIn" : undefined}
          style={{ textAlign: "center" }}
        >
          {section.content}
        </Animatable.Text>
      </Animatable.View>
    );
  }

  render() {
    const {
      multipleSelect,
      activeSections,
      isBorderActive,
      isLongPressEnable,
      collapsed
    } = this.state;
    const {
      name,
      uri,
      courseCode,
      courseGrade,
      courseGPA,
      coursePercentage,
      schoolName,
      creditUniteValue
    } = this.props.data;
    return (
      <Container marginBottom={Theme.spacing.default}>
        <Card
          borderLeft={isBorderActive}
          onLongPress={() => {
            console.log("BaseCollapsible onLongPress is calling!");
            this.setState({
              isBorderActive: !isBorderActive,
              isLongPressEnable: !isLongPressEnable
            });
            // !this.state.collapsed;
          }}
          onPress={() =>
            Navigation.push(this.props.componentId, {
              component: {
                name: SCREENS.SendTranscript,
                options: {
                  topBar: {
                    elevation: 0,
                    drawBehind: false,
                    // rightButtons: [rightButtonsCredentialScreen],
                    title: {
                      text: "Send Transcript",
                      alignment: "center",
                      fontFamily: "bold"
                    },
                    backButton: {
                      visible: false
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
                }
              }
            })
          }
        >
          {/*Code for Single Collapsible Start*/}

          <CardCollapsibleHeader
            name={name.trim()}
            subTitle={collapsed ? "" : schoolName.trim()}
            schoolPosition={courseCode.trim()}
            detailed={true}
            collapsed={!collapsed}
            toggleExpanded={this.toggleExpanded}
          >
            {!collapsed && (
              <Container
                flexDirection={"row"}
                // paddingLeft={Theme.spacing.default}
                alignItems={"center"}
                // justifyContent={"center"}
                marginLeft={Theme.spacing.default32}
                marginBottom={Theme.spacing.default16}
                w={"80%"}
              >
                <DataCard
                  {...this.props}
                  data={{
                    ranking: creditUniteValue.trim(),
                    enrollment: coursePercentage.trim(),
                    deadline: courseGrade.trim()
                  }}
                  cardOptions={["CREDIT", "PERCENTAGE", "GRADE"]}
                />
              </Container>
            )}
          </CardCollapsibleHeader>
          {/*Code for Single Collapsible end */}
        </Card>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    paddingTop: 30
  },
  title: {
    textAlign: "left",
    fontSize: 18,
    fontWeight: "300",
    marginBottom: 20,
    color: "blue"
  },
  header: {
    backgroundColor: "white",
    padding: 0
  },
  headerText: {
    textAlign: "left",
    fontSize: 16,
    fontWeight: "500",
    color: Theme.colors.primary.brand
  },
  content: {
    padding: 0,
    // margin: "-10",
    backgroundColor: "white"
  },
  active: {
    // backgroundColor: "black"
  },
  inactive: {
    backgroundColor: "transparent"
  },
  selectors: {
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "center"
  },
  selector: {
    backgroundColor: "transparent",
    padding: 0
  },
  activeSelector: {
    fontWeight: "bold"
  },
  selectTitle: {
    fontSize: 14,
    fontWeight: "500",
    padding: 0,
    textAlign: "left"
  },
  multipleToggle: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 30,
    alignItems: "center"
  },
  multipleToggle__title: {
    fontSize: 16,
    marginRight: 8
  }
});
