// deno-lint-ignore-file
import { syncGoogleGroups } from "../services/sync_google_groups.ts";
import { DefineFunction, SlackFunction } from "deno-slack-sdk/mod.ts";

export const SyncGoogleGroupsFunction = DefineFunction({
  callback_id: "sync_google_groups_function",
  title: "Sync Google Groups",
  description: "Renames a channel according to Tikal's naming conventions",
  source_file: "functions/sync_google_groups.ts",
});

export default SlackFunction(SyncGoogleGroupsFunction, async (
  { client },
) => {
  console.log("syncGoogleGroups call")
  await syncGoogleGroups(client)
  return {
    outputs: {},
  };
});
