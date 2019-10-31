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
  ADD_PRIVATE_SCHOOL,
  GET_GLOBAL_SCHOOL,
  ADD_GLOBAL_SCHOOL
} from "xdemic/lib/constants/SchoolActionTypes";

import { cons, list } from "mori";

const initialState = {
  globalSchools: [],
  privateSchools: []
};

function schoolReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_SCHOOL:
      //  cons({ ...action, _time: new Date().getTime() }, history);
      console.log("action.payload of ADD_SCHOOL is: ", action.payload);
      return state.concat(action.payload);
    case ADD_PRIVATE_SCHOOL:
      //  cons({ ...action, _time: new Date().getTime() }, history);
      console.log("action.payload of ADD_SCHOOL is: ", action.payload);
      return {
        ...state,
        privateSchools: state.privateSchools.concat(action.payload)
      };
    case ADD_GLOBAL_SCHOOL:
      //  cons({ ...action, _time: new Date().getTime() }, history);
      console.log("action.payload of ADD_SCHOOL is: ", action.payload);
      return {
        ...state,
        globalSchools: state.globalSchools.concat(action.payload)
      };

    // case GET_SCHOOL:
    //   return { ...state.schools, name: "testing rizwan" };
    case POPULATE_SCHOOL:
      console.log(" before POPULATE_SCHOOL is calling!");
      return {
        ...state,
        privateSchools: state.schools.privateSchools.concat({
          name: "Rizwan",
          subjectWebpage: "adfa",
          address: "dfs",
          offers: "sdfa",
          agentSectorType: "eewer",
          agentType: "asdf",
          DID: "adf",
          email: "dsf",
          telephone: "sdf"
        })
      };

    default:
      return state;
  }
}

export default schoolReducer;
