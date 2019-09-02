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

// text/icon 4dp or vertical/horizontal of 8dp
// 4 is base dp
import { StyleSheet } from "react-native";

export default {
  buttonHeight: 54,
  navBar: {
    button: 44,
    menuIcon: 40,
    notificationsIcon: 16
  },
  tabBar: {
    button: 32
  },
  checkBoxHeight: 30,
  borderWidth: {
    medium: 2,
    small: StyleSheet.hairlineWidth
  },
  borderRadius: {
    medium: 8,
    small: 4
  },

  spacing: {
    horizontal: {
      extraLarge: 64,
      large: 32,
      medium: 16,
      small: 8
    },
    vertical: {
      extraLarge: 64,
      large: 32,
      medium: 16,
      small: 8
    }
  },

  font: {
    poppins: "Poppins",
    size: {
      extraLarge: 38,
      large: 24,
      medium: 16,
      regular: 14,
      small: 12
    },
    lineHeight: {
      extraLarge: 40,
      large: 30,
      medium: 27,
      regular: 22,
      small: 19
    },
    name: {}
  }
};
