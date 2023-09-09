import { SlackAPIClient } from "https://deno.land/x/deno_slack_api@2.1.1/types.ts";
import { getRenameMessageText } from "../helpers/index.ts"
import { allowedPrefixes } from "../helpers/prefixes.ts";
import { ChannelType, allowedPrefixesType } from "../helpers/types.ts";


export const alertUser = async (channel: ChannelType, channelType: allowedPrefixesType, client: SlackAPIClient) => {

  const info = await client.users.info({
    user: channel.creator
  });

  const text = getRenameMessageText(
    info.user.real_name,
    channel.name,
    allowedPrefixes[channelType],
    channelType,
  )
  await client.chat.postMessage({
    channel: channel.creator,
    text
  });
}