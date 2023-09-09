const fs = require('fs').promises;
const path = require('path');
const process = require('process');
const {authenticate} = require('@google-cloud/local-auth');
const {google} = require('googleapis');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/admin.directory.user',
  'https://www.googleapis.com/auth/admin.directory.group',
  'https://www.googleapis.com/auth/admin.directory.group.member',
  'https://apps-apis.google.com/a/feeds/groups/',
  'https://www.googleapis.com/auth/admin.directory.group.readonly',
];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = path.join(process.cwd(), 'token.json');
const CREDENTIALS_PATH = path.join(process.cwd(), 'keys/oauth-test.json');

/**
 * Reads previously authorized credentials from the save file.
 *
 * @return {Promise<OAuth2Client|null>}
 */
async function loadSavedCredentialsIfExist() {
  try {
    const content = await fs.readFile("/Users/ofer/projects/tikal/slack/welcome-bot-app/tests/token.json");
    const credentials = JSON.parse(content);
    return google.auth.fromJSON(credentials);
  } catch (err) {
    return null;
  }
}

/**
 * Serializes credentials to a file comptible with GoogleAUth.fromJSON.
 *
 * @param {OAuth2Client} client
 * @return {Promise<void>}
 */
async function saveCredentials(client) {
  const content = await fs.readFile(CREDENTIALS_PATH);
  const keys = JSON.parse(content);
  const key = keys.installed || keys.web;
  const payload = JSON.stringify({
    type: 'authorized_user',
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  });
  await fs.writeFile(TOKEN_PATH, payload);
}

/**
 * Load or request or authorization to call APIs.
 *
 */
async function authorize() {
  let client = await loadSavedCredentialsIfExist();
  if (client) {
    return client;
  }
  client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  });
  if (client.credentials) {
    await saveCredentials(client);
  }
  return client;
}

/**
 * Lists the first 10 users in the domain.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
async function listUsers(auth) {
  const service = google.admin({version: 'directory_v1', auth});
  const res2 = await service.users.list({
    customer: 'my_customer',
    maxResults: 10,
    orderBy: 'email',
    groupKey: "00zu0gcz2zku8z0"
  });
  const res = await service.groups.list({ domain: "tikalk.com" });
  const res1 = await service.members.list({ domain: "tikalk.com", groupKey: "00zu0gcz2zku8z0", memberKey: "*"});
  return console.log(res1.data)
  const users = res.data.users;
  if (!users || users.length === 0) {
    console.log('No users found.');
    return;
  }

  console.log('Users:');
  users.forEach((user) => {
    console.log(`${user.primaryEmail} (${user.name.fullName})`);
  });
}

authorize().then(listUsers).catch(console.error);