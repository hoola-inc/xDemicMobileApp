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
import { Icon, Colors, Container, Theme, Button } from "@kancha";

const styles = StyleSheet.create({
  viewWraper: {
    alignItems: "center",
    flexDirection: "row",
    // justifyContent: "center",
    padding: Theme.spacing.default16
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

const CardCollapsibleHeader = props => {
  return props.detailed ? (
    <View flex={1} flexDirection={"column"} padding={0}>
      <View style={styles.viewWraper}>
        <View style={styles.inputWrap}>
          {props.schoolPosition && (
            <Text style={[textStyles.caption2, styles.nameStyle]}>
              {props.schoolPosition}
            </Text>
          )}
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

          {props.subTitle && (
            <Text
              style={[textStyles.caption2, styles.nameStyle, { paddingTop: 4 }]}
            >
              {props.subTitle}
            </Text>
          )}
        </View>
        <View
          style={{
            // flex: 1,
            flexDirection: "row",
            position: "absolute",
            right: 10,
            top: 10
          }}
        >
          <Icon
            name={"menuUp"}
            font={"materialcommunityicons"}
            color={Colors.DARK_GREY}
            size={20}
            animated={false}
            // textStyles={{ top: 0 }}
          />
          <Icon
            name={"menuDown"}
            font={"materialcommunityicons"}
            color={Colors.DARK_GREY}
            size={20}
            animated={false}
            // textStyles={{ top: 0, right: 30 }}
          />
        </View>
      </View>
      {props.children && (
        <Container
          padding={Theme.spacing.default32}
          paddingTop={Theme.spacing.default}
          flex={1}
          flexDirection={"row"}
        >
          {props.children}
        </Container>
      )}

      {/* <Container
        // flex={1}
        flexDirection={"row"}
        alignItems={"stretch"}
        // justifyContent={"space-between"}
      >
        <Button
          // testID={TESTID.ONBOARDING_CREATE_IDENTITY}
          // icon={
          //   this.state.userCreatingidentity && (
          //     <ActivityIndicator color={"white"} style={{ marginRight: 10 }} />
          //   )
          // }
          fullWidth
          // disabled={
          //   !this.isValid() ||
          //   this.state.userCreatingidentity ||
          //   this.state.identityCreationSuccess
          // }
          buttonText={
            // this.state.userCreatingidentity
            //   ? "Add to School"
            // :
            "Skip"
          }
          type={Button.Types.Primary}
          block={Button.Block.Filled}
          onPress={() => console.log("on press button")}
        />
        <Button
          // testID={TESTID.ONBOARDING_CREATE_IDENTITY}
          // icon={
          //   this.state.userCreatingidentity && (
          //     <ActivityIndicator color={"white"} style={{ marginRight: 10 }} />
          //   )
          // }
          fullWidth
          // disabled={
          //   !this.isValid() ||
          //   this.state.userCreatingidentity ||
          //   this.state.identityCreationSuccess
          // }
          buttonText={
            // this.state.userCreatingidentity
            //   ? "Add to School"
            // :
            "Skip"
          }
          type={Button.Types.Primary}
          block={Button.Block.Filled}
          onPress={() => console.log("on press button")}
        />
      </Container> */}
    </View>
  ) : (
    <View style={styles.viewWraper}>
      <Avatar size={props.avatarSize || 40} source={props.avatar} />
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

export default CardCollapsibleHeader;
