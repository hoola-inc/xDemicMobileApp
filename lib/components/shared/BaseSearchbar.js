import React, { Component } from "react";
import { Input } from "native-base";
import { PropTypes } from "prop-types";
import { StyleSheet } from "react-native";
import Colors from "xdemic/lib/Colors";

class BaseSearchbar extends Component {
  render() {
    const { type, placeholder } = this.props;
    return <Input placeholder={placeholder} type={type} style={Styles.input} />;
  }
}

BaseSearchbar.propTypes = {
  type: PropTypes.any,
  placeholder: PropTypes.string
};

export default BaseSearchbar;

const Styles = StyleSheet.create({
  input: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1
  }
});
