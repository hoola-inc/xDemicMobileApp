// This file is part of the xDemic Mobile App.

// The xDemic Mobile App is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// The xDemic Mobile App is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with The xDemic Mobile App.  If not, see <http://www.gnu.org/licenses/>.

// (C) Copyright (C) 2019 Hoola Inc

import {
  addMigrationTarget,
  runMigrations,
  startedMigrationStep,
  completedMigrationStep,
  failedMigrationStep
} from "../migrationActions";
import {
  MigrationStep,
  MigrationTarget
} from "xdemic/lib/constants/MigrationActionTypes";

it("creates a ADD_MIGRATION_TARGET action", () => {
  expect(addMigrationTarget(MigrationTarget.Legacy)).toMatchSnapshot();
});

it("creates a RUN_MIGRATIONS action", () => {
  expect(runMigrations(MigrationTarget.Legacy)).toMatchSnapshot();
});

it("creates a STARTED_MIGRATION_STEP action", () => {
  expect(startedMigrationStep(MigrationStep.MigrateLegacy)).toMatchSnapshot();
});

it("creates a COMPLETED_MIGRATION_STEP action", () => {
  expect(completedMigrationStep(MigrationStep.MigrateLegacy)).toMatchSnapshot();
});

it("creates a FAILED_MIGRATION_STEP action", () => {
  expect(failedMigrationStep(MigrationStep.MigrateLegacy)).toMatchSnapshot();
});
