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
  GET_SCHOOL,
  POPULATE_SCHOOL,
  ADD_SCHOOL,
  GET_PRIVATE_SCHOOL,
  GET_GLOBAL_SCHOOL
} from "xdemic/lib/constants/SchoolActionTypes";

export function getPrivateSchools(schoolDid) {
  return {
    type: GET_SCHOOL,
    schoolDid
  };
}
export function getGlobalSchools() {
  return {
    type: GET_GLOBAL_SCHOOL
  };
}

export function addSchool(data) {
  console.log("add schoool is calling!");
  return {
    type: ADD_SCHOOL,
    payload: data
  };
}
export function populateSchools() {
  return {
    type: POPULATE_SCHOOL
  };
}

// export function skipPushNotifications() {
//   return {
//     type: SKIP_PUSH_NOTIFICATIONS
//   };
// }

// export function storeEndpointArn(endpointArn) {
//   return {
//     type: STORE_ENDPOINT_ARN,
//     endpointArn
//   };
// }

// export function receiveDeviceToken(deviceToken) {
//   return {
//     type: RECEIVE_DEVICE_TOKEN,
//     deviceToken
//   };
// }

// export function storeDeviceToken(deviceToken) {
//   return {
//     type: STORE_DEVICE_TOKEN,
//     deviceToken
//   };
// }

// export function sendLocalNotification(activityId, message, repeatInterval) {
//   return {
//     type: SEND_LOCAL_NOTIFICATION,
//     message,
//     activityId,
//     repeatInterval
//   };
// }

// export function cancelScheduledNotification(activityId) {
//   return {
//     type: CANCEL_SCHEDULED_NOTIFICATION,
//     activityId
//   };
// }

// export function updateBadgeCount() {
//   return {
//     type: UPDATE_BADGE_COUNT
//   };
// }

// export function checkForNotifications() {
//   return {
//     type: CHECK_FOR_NOTIFICATIONS
//   };
// }

// export function pollForNotifications() {
//   return {
//     type: POLL_FOR_NOTIFICATIONS
//   };
// }

// export function handleEncryptedMessage(id) {
//   return {
//     type: HANDLE_ENCRYPTED_MESSAGE,
//     id
//   };
// }

// export function initNotifications() {
//   return {
//     type: INIT_NOTIFICATIONS
//   };
// }
