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
  CONTACTS_SELECT_CONTACT
} from 'xdemic/lib/constants/ContactsActionTypes'

const initialState = {
  index: 0,
  key: 'contacts',
  selectedContact: false
}

function contactsReducer (state = initialState, action) {
  switch (action.type) {
    case CONTACTS_SELECT_CONTACT:
      const selectedContact = action.contact
      return { ...state, selectedContact }

    default:
      return state
  }
}

export default contactsReducer
