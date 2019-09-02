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
import { Alert } from 'react-native'
import { connect } from 'react-redux'

// Selectors
import { working, statusMessage, errorMessage } from 'xdemic/lib/selectors/processStatus'
import {
  hubHead,
  hubQueueLength
} from 'xdemic/lib/selectors/hubs'

// Actions
import { catchupHub, clearQueue } from 'xdemic/lib/actions/hubActions'

// Components
import Menu from 'xdemic/lib/components/shared/Menu'
import MenuItem from 'xdemic/lib/components/shared/MenuItem'

// Utilities
import { abbr } from 'xdemic/lib/utilities/string'
import { colors } from 'xdemic/lib/styles/globalStyles'

class HubStatus extends React.Component {

  static navigatorStyle = {
    largeTitle: false,
    navBarBackgroundColor: colors.brand,
    navBarButtonColor: colors.white,
    navBarTextColor: colors.white,
  }

  render() {
    return (
      <Menu>
        <MenuItem title='Devices Latest Hash' value={abbr(this.props.hubHead)} onPress={this.props.catchupHub} />
        <MenuItem title='Queued' value={this.props.queueLength} working={this.props.working} />
        <MenuItem title='Status' value={this.props.error || this.props.message} danger={!!this.props.error} />
      </Menu>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    hubHead: hubHead(state),
    queueLength: hubQueueLength(state),
    working: working(state, 'sync'),
    message: statusMessage(state, 'sync'),
    error: errorMessage(state, 'sync'),
  }
}
export const mapDispatchToProps = (dispatch) => {
  return {
    catchupHub: () => {
      dispatch(catchupHub())
    },
    clearQueue: () => {
      // THIS IS FOR TESTING PURPOSES
      // A better way needs to be create (deleting and resyncing hub)
      Alert.alert(
        'Clear Event Queue',
        'This is destructive',
        [
          {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          {text: 'Clear Event Queue', style: 'destructive', onPress: () => dispatch(clearQueue())}
        ],
        { cancelable: true }
      )
      
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HubStatus)
