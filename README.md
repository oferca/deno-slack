# Welcome Bot

This sample automation creates, stores, and sends friendly welcome messages when
users join a channel. 

**Guide Outline**:

- [Included Workflows](#included-workflows)
- [Understanding Welcome Bot](#understanding-welcome-bot)
- [Setup](#setup)
  - [Install the Slack CLI](#install-the-slack-cli)
  - [Clone the Sample App](#clone-the-sample-app)
- [Creating Triggers](#creating-triggers)
- [Datastores](#datastores)
- [Testing](#testing)
- [Deploying Your App](#deploying-your-app)
- [Viewing Activity Logs](#viewing-activity-logs)
- [Project Structure](#project-structure)
- [Resources](#resources)

---

## Included Workflows

- **Welcome Message Setup**: Create and store a welcome message for a specified
  channel
- **Send Welcome Message**: Retrieve a stored message and send it when a new
  user joins the channel

## Understanding Welcome Bot

When working with this app it helps to think about it as two separate series of
steps.

<img src="assets/deno-welcome-bot-flow.png" alt="Welcome bot flow diagram" width="500">

### Creating and storing messages

- A link trigger starts the `MessageSetupWorkflow` workflow.
- The `MessageSetupWorkflow` workflow has three steps, steps are the action
  components of a workflow.
  1. The `OpenForm` Slack function that opens a form.
  2. The `SendEphemeralMessage` Slack function that sends a confirmation
     message.
  3. Passes data to the `WelcomeMessageSetupFunction` custom function.
- When the form is submitted, the `WelcomeMessageSetupFunction` function saves
  the message to the datastore and creates an event trigger to listen in on
  `user_joined_channel` events in the specified channel.

### Sending messages

- The `user_joined_channel` event trigger starts the
  `SendWelcomeMessageWorkflow` workflow.
- The `SendWelcomeMessageWorkflow` workflow has one additional step:
  1. Pass data to the `SendWelcomeMessageFunction` custom function.
- The `SendWelcomeMessageFunction` function retrieves the saved message and
  sends it to the selected channel.

**⚠️ Note: In order for this automation to send welcome messages, please make
sure to invite your app to the channel(s) where you are configuring the messages
once it has been [installed to your workspace](#running-your-project-locally).**

## Setup

Before getting started, first make sure you have a development workspace where
you have permission to install apps. **Please note that the features in this
project require that the workspace be part of
[a Slack paid plan](https://slack.com/pricing).**

### Install the Slack CLI

To use this template, you need to install and configure the Slack CLI.
Step-by-step instructions can be found in our
[Quickstart Guide](https://api.slack.com/automation/quickstart).

### Clone the Sample App

Start by cloning this repository:

```zsh
# Clone this project onto your machine
$ slack create my-app -t slack-samples/deno-welcome-bot

# Change into the project directory
$ cd my-app
```

## Running Your Project Locally

While building your app, you can see your changes appear in your workspace in
real-time with `slack run`. You'll know an app is the development version if the
name has the string `(local)` appended.

```zsh
# Run app locally
$ slack run

Connected, awaiting events
```

To stop running locally, press `<CTRL> + C` to end the process.

## Creating Triggers

[Triggers](https://api.slack.com/automation/triggers) are what cause workflows
to run. These triggers can be invoked by a user, or automatically as a response
to an event within Slack.

When you `run` or `deploy` your project for the first time, the CLI will prompt
you to create a trigger if one is found in the `triggers/` directory. For any
subsequent triggers added to the application, each must be
[manually added using the `trigger create` command](#manual-trigger-creation).

When creating triggers, you must select the workspace and environment that you'd
like to create the trigger in. Each workspace can have a local development
version (denoted by `(local)`), as well as a deployed version. _Triggers created
in a local environment will only be available to use when running the
application locally._

### Link Triggers

A [link trigger](https://api.slack.com/automation/triggers/link) is a type of
trigger that generates a **Shortcut URL** which, when posted in a channel or
added as a bookmark, becomes a link. When clicked, the link trigger will run the
associated workflow.

Link triggers are _unique to each installed version of your app_. This means
that Shortcut URLs will be different across each workspace, as well as between
[locally run](#running-your-project-locally) and
[deployed apps](#deploying-your-app).

With link triggers, after selecting a workspace and environment, the output
provided will include a Shortcut URL. Copy and paste this URL into a channel as
a message, or add it as a bookmark in a channel of the workspace you selected.
Interacting with this link will run the associated workflow.

**Note: triggers won't run the workflow unless the app is either running locally
or deployed!**

### Manual Trigger Creation

To manually create a trigger, use the following command:

```zsh
$ slack trigger create --trigger-def triggers/welcome_message_trigger.ts
```

## Datastores

For storing data related to your app, datastores offer secure storage on Slack
infrastructure. For an example of a datastore, see
`datastores/welcome_message_db.ts`. The use of a datastore requires the
`datastore:write`/`datastore:read` scopes to be present in your manifest.

## Testing

Test filenames should be suffixed with `_test`.

Run all tests with `deno test`:

```zsh
$ deno test
```

## Deploying Your App

Once development is complete, deploy the app to Slack infrastructure using
`slack deploy`:

```zsh
$ slack deploy
```

When deploying for the first time, you'll be prompted to
[create a new link trigger](#creating-triggers) for the deployed version of your
app. When that trigger is invoked, the workflow should run just as it did when
developing locally (but without requiring your server to be running).

## Viewing Activity Logs

Activity logs of your application can be viewed live and as they occur with the
following command:

```zsh
$ slack activity --tail
```

## Project Structure

### `.slack/`

Contains `apps.dev.json` and `apps.json`, which include installation details for
development and deployed apps.

### `datastores/`

[Datastores](https://api.slack.com/automation/datastores) securely store data
for your application on Slack infrastructure. Required scopes to use datastores
include `datastore:write` and `datastore:read`.

### `functions/`

[Functions](https://api.slack.com/automation/functions) are reusable building
blocks of automation that accept inputs, perform calculations, and provide
outputs. Functions can be used independently or as steps in workflows.

### `triggers/`

[Triggers](https://api.slack.com/automation/triggers) determine when workflows
are run. A trigger file describes the scenario in which a workflow should be
run, such as a user pressing a button or when a specific event occurs.

### `workflows/`

A [workflow](https://api.slack.com/automation/workflows) is a set of steps
(functions) that are executed in order.

Workflows can be configured to run without user input or they can collect input
by beginning with a [form](https://api.slack.com/automation/forms) before
continuing to the next step.

### `manifest.ts`

The [app manifest](https://api.slack.com/automation/manifest) contains the app's
configuration. This file defines attributes like app name and description.

### `slack.json`

Used by the CLI to interact with the project's SDK dependencies. It contains
script hooks that are executed by the CLI and implemented by the SDK.

## Resources

To learn more about developing automations on Slack, visit the following:

- [Automation Overview](https://api.slack.com/automation)
- [CLI Quick Reference](https://api.slack.com/automation/cli/quick-reference)
- [Samples and Templates](https://api.slack.com/automation/samples)
