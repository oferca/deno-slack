// deno-lint-ignore-file
import { SlackAPIClient } from "https://deno.land/x/deno_slack_api@2.1.1/types.ts";

export const syncGoogleGroups = async (client: SlackAPIClient) => {
  console.log("syncGoogleGroups start")
  const res = await client.usergroups.create({
    name: `Test User Group`
  })

  // This also doesn't work
  // const res = await client.usergroups.create({
  //   name: `Test User Group`,
  //   handle: "test-user-group",
  //   team_id: "T02A1ARR8",
  //   channels: "C05R7NMK27R"
  // })
  console.log("syncGoogleGroups result: ", res)
};
