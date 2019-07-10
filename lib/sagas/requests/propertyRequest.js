// Copyright (C) 2018 ConsenSys AG
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
import { delay } from 'redux-saga'
import { call, put } from 'redux-saga/effects'

import { updateActivity } from 'xdemic/lib/actions/uportActions'

import { clearRequest } from 'xdemic/lib/actions/requestActions'
import { featureFlagsLoad } from 'xdemic/lib/actions/featureFlagsActions'
import { setChannel } from 'xdemic/lib/actions/settingsActions'

import { setUserProperty } from 'xdemic/lib/sagas/featureFlagsSaga'
import { persistReducer } from 'xdemic/lib/sagas/stateSaver'
import { verifyToken } from '../jwt'

import config from 'xdemic/lib/config'
import { track } from 'xdemic/lib/actions/metricActions'

export function * propertyRequest (request, parsed) {

  if (parsed.query && parsed.query.requestToken) {
    const { payload } = yield call(verifyToken, parsed.query.requestToken)

    if (payload.iss === config.profiles.uport.address) {
      if ( payload.property && payload.property.key && payload.property.value) {

        const { key, value } = payload.property

        if (key === 'channel') {
          yield put(setChannel(value))
          yield call(persistReducer, {reducer: 'settings'})
        }

        yield call(setUserProperty, key, value)
        yield call(delay, 1000)
        yield put(featureFlagsLoad())
      }
    } else {
      console.log('Invalid JWT')
    }
  }
  let props = { authorizedAt: new Date().getTime(), request: request}
  yield put(updateActivity(request.id, {authorizedAt: props.authorizedAt}))
  yield put(track('propertyRequest'))
  return true
}

export default {
  handleLegacy: propertyRequest
}
