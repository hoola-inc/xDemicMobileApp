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

const styles = StyleSheet.create({
  viewWraper: {
    alignItems: "center",
    flexDirection: "row",
    padding: 15
  },
  nameStyle: {
    flex: 1,
    marginLeft: 15,
    textAlign: "left",
    paddingLeft: 2
  },
  row: {
    flex: 1,
    flexDirection: "row"
  },
  inputWrap: {
    flex: 1
    // borderColor: "#cccccc",
    // borderBottomWidth: 1,
    // marginBottom: 10
  }
});

const AvatarNameWithSubHeader = props => {
  return (
    <View style={styles.viewWraper}>
      <Avatar size={40} source={props.avatar} />
      <View style={styles.inputWrap}>
        <Text
          style={[
            styles.label,
            textStyles.h3,
            styles.nameStyle,
            { paddingTop: 5 }
          ]}
        >
          {props.name}
        </Text>
        <Text style={[textStyles.caption2, styles.nameStyle]}>
          {props.subTitle}
        </Text>
      </View>
    </View>
  );
};

export default AvatarNameWithSubHeader;
