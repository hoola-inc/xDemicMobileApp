// Copyright (C) 2019 Hoola Inc
//
// This file is part of xDemic Mobile App.
//
// xDemic Mobile App is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// xDemic Mobile App is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with xDemic Mobile App.  If not, see <http://www.gnu.org/licenses/>.
//
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TouchableHighlight
} from "react-native";
import { Navigation } from "react-native-navigation";
import Avatar from "./Avatar";
import { colors, textStyles } from "xdemic/lib/styles/globalStyles";
import { Icon, Colors, Theme, Container } from "@kancha";
import SCREENS from "xdemic/lib/screens/Screens";

const styles = StyleSheet.create({
  viewWraper: {
    alignItems: "center",
    flexDirection: "column",
    padding: 15,
    height: 84,
    width: 80,
    flex: 3,
    backgroundColor: "white",
    overflow: "visible",
    shadowColor: "#4f4f4f",
    shadowRadius: 4,
    shadowOpacity: 0.08,
    elevation: 3
  },
  nameStyle: {
    // flex: 1,
    // marginLeft: 15,
    textAlign: "center",

    paddingLeft: 2,
    overflow: "visible"
  },
  inputWrap: {
    // flex: 1,
    overflow: "visible",
    // borderColor: "#cccccc",
    // borderBottomWidth: 1,
    // marginBottom: 10
    marginTop: 4
  }
});

class BaseAddSchoolButton extends Component {
  constructor(props) {
    super(props);
    this._onPressButton = this._onPressButton.bind(this);
  }
  _onPressButton() {
    console.log("You tapped the button!");
  }
  render() {
    const { iconSize, name } = this.props;
    return (
      <TouchableWithoutFeedback
        onPress={() =>
          Navigation.push(this.props.componentId, {
            component: {
              name: SCREENS.AddSchool,
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
              }
            }
          })
        }
      >
        <View style={styles.viewWraper}>
          <Icon
            name={"addBox"}
            font={"materialcommunityicons"}
            color={Colors.LIGHT_GREY}
            size={iconSize || 20}
          />
          <View style={styles.inputWrap}>
            <Text style={[textStyles.caption2, styles.nameStyle]}>{name}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default BaseAddSchoolButton;
