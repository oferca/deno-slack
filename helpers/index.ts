// deno-lint-ignore-file
import { allowedPrefixes } from "./prefixes.ts";
import { allowedPrefixesType } from "./types.ts";

export const isLessThanHalfAMinuteAgo = (channel: { created: number; }) => {
  const timestamp = channel.created
  const currentTimestamp = Math.floor(Date.now() / 1000); 
  const differenceInSeconds = currentTimestamp - timestamp;
  return differenceInSeconds < 30;
}

export const getRenameMessageText = (
  userRealName: string,
  channelName: string,
  allowed: string[],
  channelType: allowedPrefixesType,
) => {
  const prefList =
    (allowed.length > 1 ? " one of the following prefixes: " : "") +
    allowed.map((pref) => `"${pref}-"`).join();
  return `Dear ${userRealName}, \n
Your channel "${channelName}" has been archived as ${channelType} channel names in Tikal must begin with *${prefList}*. \n
A new channel will be created: *${allowed[0]}-${channelName}*. An invitation to join will be sent. \n
Kind regards,\n
Tikal Slack Bot
`;
};

export const isLegalChannelName = (channelName: string, channelType: allowedPrefixesType) => (allowedPrefixes[channelType] as any[]).reduce(
  (accumulator: boolean, prefix: allowedPrefixesType) => accumulator || channelName.startsWith(prefix),
  false
);

