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
import { Alert } from "react-native";
import { takeEvery, call, put, all } from "redux-saga/effects";
import { GET_SCHOOL, ADD_SCHOOL } from "xdemic/lib/constants/SchoolActionTypes";

import axios from "axios";

export function fetchSchool(schoolDid) {
  console.log("fetchSchool(schoolDid) is: ", schoolDid);
  // `axios` function returns promise, you can use any ajax lib, which can
  // return promise, or wrap in promise ajax call
  if (schoolDid)
    return axios.get(
      `https://xdemic-api.herokuapp.com/schoolwithstudentenroll/${schoolDid}`
    );
  else return axios.get("https://xdemic-api.herokuapp.com/schools");
}

function* getSchool({ schoolDid }) {
  const { data } = yield call(fetchSchool, schoolDid);

  if (!data.status) {
    Alert.alert(
      "Schools",
      "Saga Schools not found!",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        }
        // {
        //   text: " Event ClearQueue",
        //   style: "destructive",
        //   onPress: () => console.log("on Pressed")
        // }
      ],
      { cancelable: true }
    );
  } else {
    yield put({
      type: ADD_SCHOOL,
      payload: data.data
    });
  }

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
