import { SlackAPIClient } from "https://deno.land/x/deno_slack_sdk@2.1.4/types.ts";
import { isLessThanHalfAMinuteAgo } from "../helpers/index.ts";

export const getRecentlyAdded = async (client: SlackAPIClient) => {
  let response;
  let allChannels: any[] = [];
  
  // Get all channels
  while (!response || response.response_metadata?.next_cursor) {
    response = await client.conversations.list({
      cursor: response?.response_metadata?.next_cursor,
    });
    allChannels = allChannels.concat(response.channels);
  }

  
  // Filter recent channels
  const recent = allChannels.filter(isLessThanHalfAMinuteAgo);


  return recent;
}
