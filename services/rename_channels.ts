// deno-lint-ignore-file
import { alertUser } from "./send_message.ts";
import { ChannelType } from "../helpers/types.ts";
import { isLegalChannelName } from "../helpers/index.ts"
import { createRenameTrigger } from "./create_rename_trigger.ts";
import { SlackAPIClient } from "https://deno.land/x/deno_slack_api@2.1.1/types.ts";

export const renameChannel = async (
  channel: ChannelType,
  client: SlackAPIClient,
) => {

  if (!channel?.is_channel || channel?.is_archived) return;
  
  const typeOfChannel = channel.is_private ? "private" : "public"

  if (isLegalChannelName(channel.name, typeOfChannel)) return;
  await alertUser(channel, typeOfChannel, client)

  createRenameTrigger(channel, client)

};
