// deno-lint-ignore-file
import { allowedPrefixes } from "./prefixes.ts";

export type ChannelType = {
  id?: any;
  name?: any;
  creator?: any;
  is_channel: any;
  is_private: any;
  is_archived: any;
};

export type allowedPrefixesType = keyof typeof allowedPrefixes;
