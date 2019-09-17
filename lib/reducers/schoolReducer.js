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
import { GET_SCHOOL } from "xdemic/lib/constants/SchoolActionTypes";

const initialState = {
  schools: [
    {
      name: "",
      subjectWebpage: "",
      address: "",
      offers: "",
      agentSectorType: "",
      agentType: "",
      DID: "",
      email: "",
      telephone: ""
    }
  ]
};

const fetchSignPosts = async () => {
  const response = await fetch("https://xdemic-api.herokuapp.com/school");
  const { data } = await response.json();
  console.log("school reducer json before state save is: ", data);
  //  this.setState({
  //    signPosts: data
  //  });
  console.log("school reducer data after state save is: ", data);
  // updateSignPosts(data)
  return data;
};

function schoolReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SCHOOL:
      console.log(" before GET_SCHOOL is calling!");
      return Object.assign({}, state, {
        newSchools: {
          name: "",
          subjectWebpage: "",
          address: "",
          offers: "",
          agentSectorType: "",
          agentType: "",
          DID: "",
          email: "",
          telephone: ""
        }
      });

    default:
      return state;
  }
}

export default schoolReducer;
