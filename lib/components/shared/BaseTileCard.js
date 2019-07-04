import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { PropTypes } from "prop-types";
import { Body, View, Text, Card, CardItem } from "native-base";
import Colors from "xdemic/lib/Colors";

class BaseTileCard extends Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={Styles.cardContent}>
        {this.props.data.map(index => {
          return (
            <Card style={Styles.cardStyle} key={index.title}>
              <CardItem button onPress={() => navigate(index.routingPage)}>
                <Body style={Styles.cardBody}>
                  <Text style={Styles.cardTextStyle}>{index.title}</Text>
                </Body>
              </CardItem>
            </Card>
          );
        })}
      </View>
    );
  }
}

BaseTileCard.propTypes = {
  data: PropTypes.array,
  navigation: PropTypes.object
};

export default BaseTileCard;

const Styles = StyleSheet.create({
  cardBody: {
    alignItems: "center",
    justifyContent: "center"
    // marginRight: 2,
  },
  cardContent: {
    // backgroundColor: 'red',
    flex: 1,
    // width: '100%',
    flexDirection: "row"
    // overflow: 'scroll',
    // justifyContent: 'center',
    // alignItems: 'center',
  },

  cardStyle: {
    borderColor: "#FFFFFF",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    borderWidth: 1,
    shadowColor: "rgb(0, 0, 0)",
    // flex: 1,
    // flexDirection: 'row',

    // shadowOffset: { width: 0, height: -1 },
    // shadowOpacity: 0.05,
    // shadowRadius: 10,

    borderBottomColor: Colors.appPrimaryBorderColor,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomWidth: 10,

    // borderTopLeftRadius: 10,
    // borderTopRightRadius: 10,
    // borderTopWidth: 10,
    // borderTopColor: '#FFFFFF',
    textAlign: "center",
    width: 120,
    height: 120,
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  cardTextStyle: { marginRight: 5 }
});
