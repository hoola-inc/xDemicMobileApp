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
import { GET_COURSE, ADD_COURSE } from "xdemic/lib/constants/CourseActionTypes";

import axios from "axios";

const BASE_URL = "https://xdemic-api.herokuapp.com/";

export function fetchCourse(courseDid) {
  console.log("fetchCourse(courseDid) is: ", courseDid);
  // `axios` function returns promise, you can use any ajax lib, which can
  // return promise, or wrap in promise ajax call
  if (courseDid)
    return axios.get(`https://xdemic-api.herokuapp.com/courses/${courseDid}`);
  else return axios.get("https://xdemic-api.herokuapp.com/courses");
}

// fetchHttpCourses = async () => {
//   const response = await fetch("https://xdemic-api.herokuapp.com/httpcourse");
//   const json = await response.json();

//   if (!json.status) {
//     Alert.alert(
//       "Http Courses",
//       "Http Courses not found!",
//       [
//         {
//           text: "Cancel",
//           onPress: () => console.log("Cancel Pressed"),
//           style: "cancel"
//         }
//         // {
//         //   text: " Event ClearQueue",
//         //   style: "destructive",
//         //   onPress: () => console.log("on Pressed")
//         // }
//       ],
//       { cancelable: true }
//     );
//   } else {
//     this.setState({
//       httpcoursesList: json.data.graph
//     });
//   }
//   // updatecoursesList(json)
// };

function* getCourse({ courseDid }) {
  console.log("course saga getCourse did is: ", courseDid);
  const { data } = yield call(fetchCourse, courseDid);
  console.log("res is: ", data);

  if (!data.status) {
    console.log("in if");
    Alert.alert(
      "Courses",
      "Saga Courses not found!",
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
    console.log("in !data.status else");
    yield put({
      type: ADD_COURSE,
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

function* courseSaga() {
  yield all([takeEvery(GET_COURSE, getCourse)]);
}

export default courseSaga;
