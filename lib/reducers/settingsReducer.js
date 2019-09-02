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
import { SET_CHANNEL, START_SWITCHING_DATABACKUP, SET_DATABACKUP, SET_OPT_OUT } from 'xdemic/lib/constants/SettingsActionTypes'
import { RESET_DEVICE } from 'xdemic/lib/constants/GlobalActionTypes'

const initialState = {dataBackup: false, analyticsOptOut: false}

function settingsReducer (state = initialState, action) {
  switch (action.type) {
    case SET_CHANNEL:
      return { ...state, channel: action.channel }
    case SET_DATABACKUP:
      return { ...state, dataBackup: action.isOn }
    case SET_OPT_OUT:
      return { ...state, analyticsOptOut: action.analyticsOptOut }
    case RESET_DEVICE:
      return {...initialState, channel: state.channel}
    default:
      return state
  }
}

export default settingsReducer
