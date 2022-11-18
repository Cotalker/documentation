---
id: existing_routines
title: Routine Stage Types
sidebar_label: Routine Stage Types
---
import useBaseUrl from '@docusaurus/useBaseUrl'; 
import Highlight from '@theme/Highlight';
import Bots, {toc as Title1TOC} from '/docs/documentation/automation/bots/_table.mdx';

<img alt="design" className="img_sizing" src={useBaseUrl('img/design/Platforms.svg')} />


## Overview {#overview}

**Routine stage types** can be thought of as _stage bots_ or _predefined routines_. By using these bots, you can easily automate processes by being part of [routines](/docs/documentation/automation/admin_routine) summoned through surveys, slash commands, SLAs, workflows, and others.


## Stage Types List {#stage-list}
_Stage Types_ are explained on the following table.  
Click links for more detailed information.

<Bots/>

## Stage Type Versions {#stage-type-versions}

_Stage types_ are actually predefined system bots. Every once in a while, we update these bots adding new features and options, or just improving automations. But, because these changes might affect your existing _routines_, the older versions remain available.

_In the image below, you can see where the **version** field is located and the alert message that indicates a newer version is available:_

<img alt="stage type versions" className="img_sizing_small item shadow--tl" src={useBaseUrl('img/automations_routines_stage_type_version_00.png')} />
<br/>
<br/>

:::note Take into account
- Newer versions might contain different settings fields.
- When changing to a new version, all current settings will be erased and must be set again manually.
- Although older versions remain available for existing routines, they cannot be chosen for new stages.
:::

:::caution Attention
- If you change the version of a stage type, you will not be able to go back to previous versions after saving.
:::

## Extra Information {#extra}

:::info
On the backend, **stage types** use [COTLang](/docs/documentation/automation/cotlang/admin_cotlang) (Cotalker Script Language) for settings fields. Depending on your needs, you can input any text characters and even use _HTML_ or _COTLang_ on the various settings fields.
:::

:::caution Using variables
- Variables declared within a _stage routine_ are always read by the system as strings.
- Therefore, if you are to use a function in relation to a variable, such as to cast a number as an integer, that function must be used when the variable is being used, and not when the variable is being declared or defined.  
  
  **For example:**  
  The function `[cast=>parseInt]` **should not** be used when declaring the variable as shown below:
  ```  
  {
      "key" : "lastStock",
      "value" : "$CODE#property#qty|[cast=>parseInt]"
  },
  {
      "key" : "actualStock",
      "value" : "$VAR#lastStock|[math=>add=($VALUE#qty)]"
  },  
  ```  
  But **should rather** be used when the variable is used, as shown below:  
    ```
  {
      "key" : "lastStock",
      "value" : "$CODE#property#qty"
  },
  {
      "key" : "actualStock",
      "value" : "(($VAR#lastStock)|[cast=>parseInt])|[math=>add=($VALUE#qty)]"
  },  
    
    ```
:::

:::caution Characters that must be escaped
Since **stage type** fields have a COTLang underlying, certain characters must be escaped within all stage settings fields (except the source code in the _Custom Javascript Code_ stage type).
- If the text input is wrapped in triple backticks ` ``` `, only ``` ` ``` need to be escaped using a backslash. For example: ``` \` ```.
- Otherwise, `= | ( ) [ ] #` must be escaped. Example: ` \= `
:::

:::info
When using _automation logs_, stage types will be referred to by the _key_ indicated in this table.
:::