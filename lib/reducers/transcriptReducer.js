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
  GET_TRANSCRIPTS,
  ADD_COURSE_IN_TRANSCRIPT,
  GET_COURSE_FROM_TRANSCRIPT
} from "../constants/TranscriptActionTypes";

const initialState = [
  {
    "@context": [
      "https://www.w3.org/2018/credentials/v1",
      "https://purl.imsglobal.org/ctx/extended-transcript/v1p0"
    ],
    id: "urn:uuid:bbba8553-8ec1-445f-82c9-a57251dd731c",
    type: ["VerifiableCredential", "ExtendedTranscript"],
    issuer: "did:example:23adb1f712ebc6f1c276eba4dfa",
    issuanceDate: "2010-01-01T19:73:24Z",
    claim: {
      id: "did:example:BcRisGnqV4QPb6bRmDCqEjyuubBarS1Y1nhDwxBMTXY4",
      records: [
        {
          id: "urn:uuid:7F74C3E7-BF81-4F87-BE1D-689CC0A1BA96",
          type: "Record",
          date: "2016-12-01T00:00:0000Z",
          term: "Fall 2016",
          result: "A-",
          credits: 4,
          recordOf: {
            id: "urn:uuid:b6d70c67-d41b-4a3e-8f06-4a57e7b82379",
            type: "TranscriptEntityLink",
            entityType: "Course",
            entityId: "urn:uuid:0147F2A5-799A-47E6-832F-B114A7674AA7"
          },
          status: {
            id: "urn:uuid:D4ACF5F3-3627-4739-911F-A61D252D1EC0",
            type: "RecordStatus",
            completed: true
          }
        }
      ],
      transcriptEntities: {
        courses: [
          {
            id: "urn:uuid:0147F2A5-799A-47E6-832F-B114A7674AA7",
            type: "Course",
            name: "Introduction to Computer Science",
            courseCode: "CS101",
            associations: [
              {
                id: "urn:uuid:626db4d7-5bd5-4cbd-a8d9-68da9d84a687",
                type: "Association",
                entityType: "Degree",
                entityId: "urn:uuid:6010E1DF-E925-4710-A17C-4DD9D576FAD8",
                associationType: "isPartOf"
              }
            ],
            degrees: [
              {
                id: "urn:uuid:6010E1DF-E925-4710-A17C-4DD9D576FAD8",
                type: "Degree",
                name: "Computer Science undergraduate degree",
                programName: "Bachelor of Computer Science",
                areaOfStudy: "Computer Science",
                level: "Bachelor of Science",
                associations: []
              }
            ]
          }
        ]
      }
    },
    proof: {
      type: "ES256K",
      created: "2017-06-18T21:19:10Z",
      proofPurpose: "assertionMethod",
      verificationMethod: "did:example:ebfeb1f712ebc6f1c276e12ec21#key1",
      jws:
        "eyJhbGciOiJSUzI1NiIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..TCYt5XsITJX1CxPCT8yAV-TVkIEq_PbChOMqsLfRoPsnsgw5WEuts01mq-pQy7UJiN5mgRxD-WUcX16dUEMGlv50aqzpqh4Qktb3rk-BuQy72IFLOqV0G_zS245-kronKb78cPN25DGlcTwLtjPAYuNzVBAh4vGHSrQyHUdBBPM"
    }
  }
];

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

    case ADD_COURSE_IN_TRANSCRIPT:
      return {
        ...state,
        claim: {
          ...state[0].claim,
          transcriptEntities: {
            ...state[0].claim.transcriptEntities,
            courses: state[0].claim.transcriptEntities.courses.concat({
              id: "urn:uuid:0147F2A5-799A-47E6-832F-B114A7674AA7",
              type: "Course",
              name: "Introduction to Computer Science 1",
              courseCode: "CS101-1",
              associations: [
                {
                  id: "urn:uuid:626db4d7-5bd5-4cbd-a8d9-68da9d84a687",
                  type: "Association",
                  entityType: "Degree01",
                  entityId: "urn:uuid:6010E1DF-E925-4710-A17C-4DD9D576FAD8",
                  associationType: "isPartOf"
                }
              ],
              degrees: [
                {
                  id: "urn:uuid:6010E1DF-E925-4710-A17C-4DD9D576FAD8",
                  type: "Degree-1",
                  name: "Computer Science undergraduate degree-1",
                  programName: "Bachelor of Computer Science-1",
                  areaOfStudy: "Computer Science-1",
                  level: "Bachelor of Science-1",
                  associations: []
                }
              ]
            })
          }
        }
      };
    case GET_COURSE_FROM_TRANSCRIPT:
      return;
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
