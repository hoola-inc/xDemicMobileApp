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
import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Avatar from "./Avatar";
import { colors, textStyles } from "xdemic/lib/styles/globalStyles";
import { Icon, Colors } from "@kancha";

const styles = StyleSheet.create({
  viewWraper: {
    alignItems: "center",
    flexDirection: "column",
    padding: 15,
    // height: 84,
    width: 80,
    backgroundColor: "white",
    overflow: "visible",
    shadowColor: "#4f4f4f",
    shadowRadius: 4,
    shadowOpacity: 0.2,
    elevation: 3
  },
  nameStyle: {
    flex: 1,
    marginLeft: 15,
    textAlign: "center",
    paddingLeft: 2,
    overflow: "visible"
  },
  row: {
    flex: 1,
    flexDirection: "row"
  },
  inputWrap: {
    flex: 1,
    overflow: "visible"
    // borderColor: "#cccccc",
    // borderBottomWidth: 1,
    // marginBottom: 10
  }
});

const BaseAddSchoolButton = props => {
  return (
    <View style={styles.viewWraper}>
      <View style={styles.inputWrap}>
        <Avatar size={props.avatarSize || 40} source={props.avatar} />
        <Text style={[textStyles.caption2, styles.nameStyle]}>
          {props.name}
        </Text>
      </View>
    </View>
  );
};

export default BaseAddSchoolButton;
