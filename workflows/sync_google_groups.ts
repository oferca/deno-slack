import { DefineWorkflow } from "deno-slack-sdk/mod.ts";
import { SyncGoogleGroupsFunction } from "../functions/sync_google_groups.ts";

export const SyncGoogleGroupsWorkflow = DefineWorkflow({
  callback_id: "sync_google_groups",
  title: "Sync Google Groups",
  description: "Sync google groups with slack groups",
  input_parameters: {
    properties: {},
    required: [],
  },
});

SyncGoogleGroupsWorkflow.addStep(SyncGoogleGroupsFunction, {});
