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
import { put, select } from "redux-saga/effects";
import { uuid } from "xdemic/lib/utilities/uuid";
import { segmentId } from "xdemic/lib/selectors/identities";
import { saveSegmentId } from "xdemic/lib/actions/uportActions";

export function* trackId() {
  let segId = yield select(segmentId);
  if (!segId) {
    const newSegmentId = uuid();
    segId = newSegmentId;
    console.log(`The segment id is ${segId}`);
    yield put(saveSegmentId(newSegmentId));
  } else {
    return segId;
    // yield put(uportActions.saveSegmentId(segId))
  }
  return segId;
}
