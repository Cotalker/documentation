---
title: Bots
sidebar_label: Bots
---
import useBaseUrl from '@docusaurus/useBaseUrl'; 
import Mermaid from '@theme/Mermaid';


Bots represent actions that trigger based on their configuration.

:::tip additional resources
These are just some of the most basic API requests. For a complete list of endpoints, consult our [API documentation on Swagger](https://www.cotalker.com/swagger/core/?key=woubtjf4olr0t4zgutuwn6scbcm6hd3qh1cgl5obmohpbm3mfublnwcvv67lodgjvd3h86s9ppshtvmf95gepsqh6nizq9liu7f#/).
:::



## Parametrized Bots {#parametrized-bots}
<img alt="Docusaurus with Keytar" src={useBaseUrl('img/bot_flow.png')} />

Parametrized bots is programming language for Cotalker that allows

| Parametrized Bots        | Description |
| ------------- | ----- | 
|  PBAnswerChecker | Checks the value of a survey |
|  PBChangeState| Changes the state of a task |
|  PBChannelAddUser| Modify channel users |
|  PBChannelToTaskSE| Modify task channel |
|  PBCleanChannel| Removes message from channel  |
|  PBConditional| Flow execution depending on condition |
|  PBCopySurvey| Copy survey to channel |
|  PBCreateChannel| Creates a new channel  |
|  PBCreateProperty| Creates a new property |
|  PBCreateTask| Create a new task |
|  PBCreateUser| Create a new User  |
|  PBEmail| Send an email |
|  PBCalendar| Create a ICS |
|  PBGiphy| Send image from [giphy](https://giphy.com) |
|  PBHideMessages| Remove messages from channel |
|  PBMessage| Send message to channel |
|  PBPdf| Convert HTML to PDF |
|  PBQRCode| Generate QR-code image |
|  PBSendSurvey| Send survey to channel |
|  PBSwitchList| Conditional flow execution | 
|  PBTaskAddEditor| Edit Task editors |
|  PBTemplate | Create HTML from template and data |
|  PBUpdateChannel| Modify channel |
|  PBUpdateProperty| Modify property |
|  PBUpdateTask| Modify Task |
|  PBUpdateUser| Modify User |
|  FCEach| Flow Control: Execute rountine for each data |
|  FCIfElse| Flow Control: Conditional execution |
|  FCSwitchAll| Flow Control: Exectute all matching |
|  FCSwitchOne| Flow Control: Execute first matching |
|  FCSleep| Flow Control: Wait N seconds before continuing |
|  NWRequest| Perform custom network request |
|  COTScript | Cotalker custom script |
