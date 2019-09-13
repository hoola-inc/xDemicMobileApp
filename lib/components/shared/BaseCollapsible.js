// *Example of Collapsible - Accordion - Expandable View in React Native*/
import React, { Component } from "react";
//import react in our project
import {
  Switch,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from "react-native";
//import basic react native components
import * as Animatable from "react-native-animatable";
//import for the animation of Collapse and Expand
import Collapsible from "react-native-collapsible";
//import for the collapsible/Expandable view
import Accordion from "react-native-collapsible/Accordion";
//import for the Accordion view

import { Images, Theme, Container, Card } from "@kancha";

import ExpandableCollapsiableCard from "xdemic/lib/components/shared/ExpandableCollapsiableCard";
import BaseCard from "xdemic/lib/components/shared/BaseCard";
import DataCard from "xdemic/lib/components/shared/DataCard";
import CardCollapsibleHeader from "xdemic/lib/components/shared/CardCollapsibleHeader";

//Dummy content to show
//You can also use dynamic data by calling web service

//To make the selector (Something like tabs)
const SELECTORS = [
  { title: "T&C", value: 0 },
  { title: "Privacy Policy", value: 1 },
  { title: "Return Policy", value: 2 },
  { title: "Reset all" }
];

export default class BaseCollapsible extends Component {
  state = {
    //default active selector
    activeSections: [],
    //collapsed condition for the single collapsible
    collapsed: true,
    //multipleSelect is for the Multiple Expand allowed
    //true: You can expand multiple at a time
    //false: One can be expand at a time and other will be closed automatically
    multipleSelect: false
  };

  toggleExpanded = () => {
    //Toggling the state of single Collapsible
    this.setState({ collapsed: !this.state.collapsed });
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
    const { multipleSelect, activeSections } = this.state;
    return (
      <Card onPress={this.toggleExpanded}>
        {/* // <Container
      // // flex={1}
      // // flexDirection={"column"}
      // //style={styles.container}
      // > */}
        {/* <ScrollView contentContainerStyle={{ padding: 0 }}> */}
        {/*Code for Single Collapsible Start*/}

        <CardCollapsibleHeader
          name={"click me to expand"}
          subTitle={"The International School of Education"}
          schoolPosition={"MS101-SCA"}
          detailed={true}
        >
          {this.state.collapsed && (
            <DataCard
              {...this.props}
              data={{
                ranking: "#1 US",
                enrollment: "2,061",
                deadline: "06/19"
              }}
              cardOptions={["GPA", "PERCENTAGE", "GRADE"]}
            />
          )}
        </CardCollapsibleHeader>
        {/*Heading of Single Collapsible*/}
        {/* </ScrollView> */}
        {/* </Container> */}
      </Card>
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
    backgroundColor: "transparent",
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
    backgroundColor: "black"
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
