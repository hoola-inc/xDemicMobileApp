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

import { Images, Icon, Container, Card } from "@kancha";

import ExpandableBaseCard from "xdemic/lib/components/shared/ExpandableBaseCard";
import BaseCard from "xdemic/lib/components/shared/BaseCard";

//Dummy content to show
//You can also use dynamic data by calling web service
const CONTENT = [
  {
    title: "Terms and Conditions",
    content:
      'The following terms and conditions, together with any referenced documents (collectively, "Terms of Use") form a legal agreement between you and your employer, employees, agents, contractors and any other entity on whose behalf you accept these terms (collectively, “you” and “your”), and ServiceNow, Inc. (“ServiceNow,” “we,” “us” and “our”).'
  },
  {
    title: "Privacy Policy",
    content:
      "A Privacy Policy agreement is the agreement where you specify if you collect personal data from your users, what kind of personal data you collect and what you do with that data."
  },
  {
    title: "Return Policy",
    content: (
      <Text style={{ textAlign: "center" }}>
        Rizwan This is a dummy text of Single Collapsible View
      </Text>
    )
  }
];

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
      <Container
        flex={1}

        //style={styles.container}
      >
        <ScrollView
        //contentContainerStyle={{ paddingTop: 30 }}
        >
          {/* <Text style={styles.title}>Collapsible/Accordion Example</Text> */}

          {/*Code for Single Collapsible Start*/}
          <TouchableOpacity onPress={this.toggleExpanded}>
            <View style={styles.header}>
              <Text style={styles.headerText}>Single Collapsible</Text>
              {this.state.collapsed && (
                <BaseCard
                  {...this.props}
                  data={{
                    courseName: "courseName",
                    schoolName: "schoolName",
                    schoolPosition: "schoolPosition",
                    expandable: false
                  }}
                  key={"dfsdfsd"}
                />
              )}

              {/*Heading of Single Collapsible*/}
            </View>
          </TouchableOpacity>
          {/*Content of Single Collapsible*/}
          <Collapsible collapsed={this.state.collapsed} align="center">
            <View style={styles.content}>
              <Text style={{ textAlign: "center" }}>
                This is a dummy text of Single Collapsible View
              </Text>
              <ExpandableBaseCard
                {...this.props}
                data={{
                  ...this.props.data,
                  map: false,
                  expandable: true,
                  detailed: true
                }}
              />
            </View>
          </Collapsible>
          {/*Code for Single Collapsible Ends*/}

          {/* <View
            style={{
              backgroundColor: "#000",
              height: 1,
              marginTop: 10
            }}
          /> */}
          {/* <View style={styles.multipleToggle}>
            <Text style={styles.multipleToggle__title}>
              Multiple Expand Allowed?
            </Text>
            <Switch
              value={multipleSelect}
              onValueChange={multipleSelect =>
                this.setState({ multipleSelect })
              }
            />
          </View> */}
          {/* <Text style={styles.selectTitle}>
            Please select below option to expand
          </Text> */}

          {/*Code for Selector starts here*/}
          {/* <View style={styles.selectors}>
            {SELECTORS.map(selector => (
              <TouchableOpacity
                key={selector.title}
                onPress={() => this.setSections([selector.value])}
                //on Press of any selector sending the selector value to
                // setSections function which will expand the Accordion accordingly
              >
                <View style={styles.selector}>
                  <Text
                    style={
                      activeSections.includes(selector.value) &&
                      styles.activeSelector
                    }
                  >
                    {selector.title}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View> */}
          {/*Code for Selector ends here*/}

          {/*Code for Accordion/Expandable List starts here*/}
          <Accordion
            activeSections={activeSections}
            //for any default active section
            sections={CONTENT}
            //title and content of accordion
            touchableComponent={TouchableOpacity}
            //which type of touchable component you want
            //It can be the following Touchables
            //TouchableHighlight, TouchableNativeFeedback
            //TouchableOpacity , TouchableWithoutFeedback
            expandMultiple={multipleSelect}
            //Do you want to expand mutiple at a time or single at a time
            renderHeader={this.renderHeader}
            //Header Component(View) to render
            renderContent={this.renderContent}
            //Content Component(View) to render
            duration={400}
            //Duration for Collapse and expand
            onChange={this.setSections}
            //setting the state of active sections
          />
          {/*Code for Accordion/Expandable List ends here*/}
        </ScrollView>
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
    textAlign: "center",
    fontSize: 18,
    fontWeight: "300",
    marginBottom: 20,
    color: "blue"
  },
  header: {
    backgroundColor: "transparent",
    padding: 10
  },
  headerText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500"
  },
  content: {
    // padding: 20,
    // backgroundColor: "black"
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
    padding: 10
  },
  activeSelector: {
    fontWeight: "bold"
  },
  selectTitle: {
    fontSize: 14,
    fontWeight: "500",
    padding: 10,
    textAlign: "center"
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
