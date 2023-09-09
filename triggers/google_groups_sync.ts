// triggers/daily_maintenance_job.ts
import { Trigger } from "deno-slack-sdk/types.ts";
import { SyncGoogleGroupsWorkflow } from "../workflows/sync_google_groups.ts";
import { TriggerTypes } from "deno-slack-api/mod.ts";

const msSchedule = 100

const trigger: Trigger<typeof SyncGoogleGroupsWorkflow.definition> = {
  type: TriggerTypes.Scheduled,
  name: "Periodical Google Groups Synce",
  workflow: `#/workflows/${SyncGoogleGroupsWorkflow.definition.callback_id}`,
  inputs: {},
  schedule: {
    start_time: new Date(new Date().getTime() + msSchedule).toISOString(),
    end_time: "2037-12-31T23:59:59Z",
    timezone: "asia/jerusalem",
    frequency: {
      type: "hourly",
      repeats_every: 1,
    },
  },
};

export default trigger;
