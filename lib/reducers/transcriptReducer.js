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
  CREATE_TRANSCRIPT,
  ADD_TRANSCRIPT,
  EDIT_TRANSCRIPT,
  GET_TRANSCRIPTS
} from "../constants/TranscriptActionTypes";

const initialState = [{}];

function transcriptReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_TRANSCRIPT:
      //  cons({ ...action, _time: new Date().getTime() }, history);
      console.log("action.payload of CREATE_TRANSCRIPT is: ", action.payload);
      return state.concat(action.payload);
    case ADD_TRANSCRIPT:
      //  cons({ ...action, _time: new Date().getTime() }, history);
      console.log("action.payload of ADD_TRANSCRIPT is: ", action.payload);
      return {
        ...state
      };
    case EDIT_TRANSCRIPT:
      //  cons({ ...action, _time: new Date().getTime() }, history);
      console.log("action.payload of EDIT_TRANSCRIPT is: ", action.payload);
      return {
        ...state
      };
    case GET_TRANSCRIPTS:
      console.log(" before POPULATE_SCHOOL is calling!");
      return {
        ...state
      };
    default:
      return state;
  }
}

export default transcriptReducer;
