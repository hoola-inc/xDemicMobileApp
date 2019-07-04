/**
 * This file contains metric values that are global to the application.
 */

import { Dimensions, Platform } from 'react-native'
const { width, height } = Dimensions.get('window')

const metrics = {
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
  navBarHeight: Platform.OS === 'ios' ? 54 : 66,
}

export default {
  // Examples of metrics you can define:
  // baseMargin: 10,
  // largeMargin: 20,
  // smallMargin: 5,
  // metrics,
}
