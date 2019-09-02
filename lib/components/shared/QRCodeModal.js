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
import React from 'react'
import { Dimensions, StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import Modal from 'xdemic/lib/components/shared/Modal'
import QRCode from 'react-native-qrcode'
import globalStyles, { onboardingStyles, textStyles } from 'xdemic/lib/styles/globalStyles'
export const windowWidth = Dimensions.get('window').width
import { colors } from 'xdemic/lib/styles/globalStyles'
import { Navigation } from 'react-native-navigation'

class QRCodeModal extends React.Component {
  render() {
    return (
      <Modal>
        <Text style={onboardingStyles.title}>{this.props.title}</Text>
        <QRCode value={this.props.url} size={windowWidth - 50} bgColor={'#333333'} fgColor='white' />

        <View style={globalStyles.modalButtonRow}>
          <TouchableOpacity
            style={[globalStyles.modalButton]}
            onPress={() => Navigation.dismissModal(this.props.componentId)}
          >
            <Text style={[textStyles.p, textStyles.buttonLabel]}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    )
  }
}

export default QRCodeModal
