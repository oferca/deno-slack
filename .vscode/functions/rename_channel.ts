// deno-lint-ignore-file
import { ChannelType } from "../helpers/types.ts";
import { renameChannel } from "../services/rename_channels.ts";
import { DefineFunction, SlackFunction } from "deno-slack-sdk/mod.ts";
import { getRecentlyAdded } from "../services/recently_added.ts";

export const RenameChannelFunction = DefineFunction({
  callback_id: "rename_channel_function",
  title: "Rename Channel",
  description: "Renames a channel according to Tikal's naming conventions",
  source_file: "functions/rename_channel.ts",
});

export default SlackFunction(RenameChannelFunction, async (
  { client },
) => {
  const recentlyAdded = await getRecentlyAdded(client);

  recentlyAdded.forEach(
    (channel: ChannelType) => renameChannel(channel, client)
  );

  return {
    outputs: {},
  };
});
