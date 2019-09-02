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

import { storeHubHead, catchupHub, queueEvent, takeQueuedEvent, clearQueue, importSnapshot } from 'xdemic/lib/actions/hubActions.js'

it('creates a STORE_HUB_HEAD action', () => {
  expect(storeHubHead('abcdefg')).toMatchSnapshot()
})

it('creates a CATCHUP_HUB action', () => {
  expect(catchupHub()).toMatchSnapshot()
})

it('creates a STORE_HUB_HEAD action', () => {
  expect(queueEvent({type: 'SOME_EVENT', data: 'stuff'})).toMatchSnapshot()
})

it('creates a CATCHUP_HUB action', () => {
  expect(takeQueuedEvent()).toMatchSnapshot()
})

it('creates a CLEAR_QUEUE action', () => {
  expect(clearQueue()).toMatchSnapshot()
})

it('creates an IMPORT_SNAPSHOT action', () => {
  expect(importSnapshot({uport: [], hdwallet: {}})).toMatchSnapshot()
})
