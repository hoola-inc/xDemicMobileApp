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
// Frameworks
import React from 'react'
// Components
import { Text } from 'react-native'
import Notification from '../Notification'
import Avatar from 'xdemic/lib/components/shared/Avatar'

import { textStyles } from 'xdemic/lib/styles/globalStyles'

const ConnectionNotification = props => {
  const issuer = props.issuer(props.activity.to) || {}
  const handleAuthorize = () => {
    props.authorize(props.activity)
  }
  const handleCancel = () => {
    props.cancel(props.activity)
  }

  return (
    <Notification
      title='Contact Request'
      cancelText='Decline'
      acceptText='Add Contact'
      cardPress={() => props.selectRequest(props.activity)}
      completed={props.activity.authorizedAt}
      canceled={props.activity.canceledAt}
      cancel={handleCancel}
      accept={handleAuthorize}
      noButtons={props.noButtons || false}
    >
      <Avatar source={issuer} size={72} />
      <Text style={[textStyles.h2, { margin: 10 }]}>{issuer.name}</Text>
      <Text style={[textStyles.p, { margin: 10 }]}>Add as a contact?</Text>
    </Notification>
  )
}

export default ConnectionNotification
