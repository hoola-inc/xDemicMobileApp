import React, { Component } from 'react'
import { Image, StyleSheet } from 'react-native'
import { Left, Icon, Button, Body, View, Text } from 'native-base'
import Colors from 'App/Theme/Colors'
import Fonts from 'App/Theme/Fonts'
import { Col, Row, Grid } from 'react-native-easy-grid'
// import { Images } from 'App/Theme'

class BaseChip extends Component {
  render() {
    const { title, index } = this.props.data
    return (
      <View style={Style.cardContent}>
        <Button light key={title} style={Style.button}>
          <Text style={Style.text}>
            {title} {index}
          </Text>
        </Button>
      </View>
    )
  }
}

export default BaseChip

const Style = StyleSheet.create({
  button: {
    borderRadius: 8,
    height: 26,
    margin: 5,
  },
  text: {
    color: Colors.chipTextColor,
    ...Fonts.style.chipTextFontSize,
    textTransform: 'capitalize',
    minWidth: 84,
    textAlign: 'center',
  },
})
