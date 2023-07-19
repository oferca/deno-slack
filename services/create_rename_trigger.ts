import { SlackAPIClient } from "https://deno.land/x/deno_slack_api@2.1.1/types.ts";
import { TriggerTypes } from "deno-slack-api/mod.ts";
import { ChannelType } from "../helpers/types.ts";

export const createRenameTrigger = async (channel: ChannelType, client: SlackAPIClient) => {
  
  const msSchedule = 500
  const scheduledTrigger = await client.workflows.triggers.create({
    name: `Channel Archive Rename Schedule`,
    workflow: "#/workflows/archive_create_channel",
    type: TriggerTypes.Scheduled,
    inputs: {
      channel_to_archive_id: { value: channel.id },
      channel_to_create_name: { value: "tikal-" + channel.name },
      creator: { value: channel.creator },
      is_private: { value: channel.is_private },
    },
    schedule: {
      // Starts 5 seconds after creation
      start_time: new Date(new Date().getTime() + msSchedule * 10).toISOString(),
      timezone: "asia/jerusalem",
      frequency: {
        type: "once",
      },
    },
  });

  if (!scheduledTrigger.trigger) {
    return {
      error: "Trigger could not be created",
    };
  }

  setTimeout(async () => {
    console.log('Deleting trigger', scheduledTrigger.id);
    await client.workflows.triggers.delete({
      trigger_id: scheduledTrigger.id
    });
  }, msSchedule + 1800000)
  
  console.log("scheduledTrigger has been created");
}
