import { Trigger } from "deno-slack-api/types.ts";
import { TriggerEventTypes, TriggerTypes } from "deno-slack-api/mod.ts";
import { RenameChannelWorkflow } from "../workflows/rename_channel.ts";

const trigger: Trigger<typeof RenameChannelWorkflow.definition> = {
  type: TriggerTypes.Event,
  name: "Channel Created",
  description: "Responds to a channel renaming",
  workflow: `#/workflows/${RenameChannelWorkflow.definition.callback_id}`,
  event: {
    event_type: TriggerEventTypes.ChannelRenamed,
  },
  inputs: {},
};

export default trigger;
