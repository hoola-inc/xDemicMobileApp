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
import {
  AppState,
  NativeModules,
  Platform,
  PushNotificationIOS
} from "react-native";
import firebase from "react-native-firebase";

import { eventChannel, END } from "redux-saga";
import {
  takeEvery,
  call,
  put,
  select,
  take,
  spawn,
  all
} from "redux-saga/effects";
import { waitUntilConnected } from "./networkState";
import { currentAddress } from "xdemic/lib/selectors/identities";
import { notificationCount } from "xdemic/lib/selectors/activities";
// import { deviceToken } from 'xdemic/lib/selectors/snsRegistrationStatus'
import {
  REGISTER_DEVICE_FOR_NOTIFICATIONS,
  RECEIVE_DEVICE_TOKEN,
  UPDATE_BADGE_COUNT,
  INIT_NOTIFICATIONS,
  SEND_LOCAL_NOTIFICATION,
  CANCEL_SCHEDULED_NOTIFICATION
} from "xdemic/lib/constants/SnsRegistrationActionTypes";
import { GET_SCHOOL, ADD_SCHOOL } from "xdemic/lib/constants/SchoolActionTypes";

import { OPEN_ACTIVITY } from "xdemic/lib/constants/UportActionTypes";
import {
  storeDeviceToken,
  storeEndpointArn,
  skipPushNotifications,
  handleEncryptedMessage
} from "xdemic/lib/actions/snsRegistrationActions";
import { handleURL, selectRequest } from "xdemic/lib/actions/requestActions";
import {
  saveError,
  saveMessage,
  clearMessage,
  startWorking,
  stopWorking
} from "xdemic/lib/actions/processStatusActions";

import axios from "axios";

export function fetchSchool(schoolDid) {
  console.log("fetchSchool(schoolDid) is: ", schoolDid);
  // `axios` function returns promise, you can use any ajax lib, which can
  // return promise, or wrap in promise ajax call
  if (schoolDid)
    return axios.get(`https://xdemic-api.herokuapp.com/schools/${schoolDid}`);
  else return axios.get("https://xdemic-api.herokuapp.com/schools");
}

function* getSchool({ schoolDid }) {
  console.log("School saga getSchool did is: ", schoolDid);
  const res = yield call(fetchSchool, schoolDid);
  console.log("res is: ", res);

  yield put({
    type: ADD_SCHOOL,
    payload: res.data.data
  });

  // yield put(saveMessage("push", `Registering ${deviceToken} on SNS`));
  // yield put(storeDeviceToken(deviceToken));
  // const address = yield select(currentAddress);
  // yield call(waitUntilConnected);
  // const endpointArn = yield call(MySNS.registerDevice, deviceToken, address);
  // // console.log(endpointArn)
  // yield put(storeEndpointArn(endpointArn));
  // yield put(clearMessage("push"));
}

function* schoolSaga() {
  yield all([takeEvery(GET_SCHOOL, getSchool)]);
}

export default schoolSaga;
