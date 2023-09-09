import { DefineWorkflow } from "deno-slack-sdk/mod.ts";
import { RenameChannelFunction } from "../functions/rename_channel.ts";

export const RenameChannelWorkflow = DefineWorkflow({
  callback_id: "rename_channel",
  title: "Renames a channel",
  description: "Renames a channel according to Tikal's naming conventions",
  input_parameters: {
    properties: {},
    required: [],
  },
});

RenameChannelWorkflow.addStep(RenameChannelFunction, {});
