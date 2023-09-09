import { Manifest } from "deno-slack-sdk/mod.ts";
import { RenameChannelWorkflow } from "./workflows/rename_channel.ts";
import { SyncGoogleGroupsWorkflow } from "./workflows/sync_google_groups.ts";
import ArchiveCreateWorkflow from "./workflows/archive_create_channel.ts";

export default Manifest({
  name: "Tikal Bot",
  description: "Keep channel naming conventions aligned",
  icon: "assets/default_new_app_icon.png",
  workflows: [
    RenameChannelWorkflow,
    ArchiveCreateWorkflow,
    SyncGoogleGroupsWorkflow
  ],
  outgoingDomains: [],
  botScopes: [
    "chat:write",
    "chat:write.public",
    "channels:read",
    "triggers:write",
    "triggers:read",
    "groups:read",
    "groups:write.invites",
    "im:read",
    "mpim:read",
    "mpim:write",
    "mpim:write.invites",
    "users:read",
    "channels:manage",
    "channels:join",
    "channels:write.invites",
    "groups:write",
    "usergroups:write",
    "im:write",
  ],
});
