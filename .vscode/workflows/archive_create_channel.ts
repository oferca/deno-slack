import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";

// Define a workflow that can pass the parameters for the Slack function
const ArchiveCreateWorkflow = DefineWorkflow({
  callback_id: "archive_create_channel",
  title: "Channel Archiver and Creator",
  input_parameters: {
    properties: {
      channel_to_archive_id: { type: Schema.types.string },
      channel_to_create_name: { type: Schema.types.string },
      creator: { type: Schema.types.string },
      is_private: { type: Schema.types.boolean },
    },
    required: [
      "channel_to_archive_id",
      "channel_to_create_name",
      "creator",
    ],
  },
});

ArchiveCreateWorkflow.addStep(
  Schema.slack.functions.ArchiveChannel,
  {
    channel_id: ArchiveCreateWorkflow.inputs.channel_to_archive_id,
  },
);

const createChannel = ArchiveCreateWorkflow.addStep(
  Schema.slack.functions.CreateChannel,
  {
    channel_name: ArchiveCreateWorkflow.inputs.channel_to_create_name,
    is_private: ArchiveCreateWorkflow.inputs.is_private,
  },
);

ArchiveCreateWorkflow.addStep(
  Schema.slack.functions.InviteUserToChannel,
  {
    channel_ids: [createChannel.outputs.channel_id],
    user_ids: [ArchiveCreateWorkflow.inputs.creator],
  },
);

export default ArchiveCreateWorkflow;
