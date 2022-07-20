---
displayed_sidebar: documentation
---
# Custom Javascript Code 1.0.0

import useBaseUrl from '@docusaurus/useBaseUrl';

<img alt="title image" className="img_sizing" src={useBaseUrl('img/design/Main_menu.svg')} />
<br/>

## Overview {#overview}

With the _Custom JavaScript Code_ stage-bot, you can add extra customization to your routines. This powerful tool runs safely in a sandboxed _node.js_ environment with the ability to extract, process, and return data for use in the rest of your routine.

Simply add your JavaScript code into the **source code** field in the stage-bot's settings panel:

<img alt="ccjs settings panel" className="img_sizing item shadow--tl" src={useBaseUrl('img/automations_routines_stage_ccjs_00.png')} />
<br/>

### Default Variables {#default-variables}

By default, your function can access two variables:

- `value` is an object that contains the [context](/docs/documentation/automation/triggers_and_contexts) data, this will depend on the [trigger](/docs/documentation/automation/triggers_and_contexts).
- `output` is an array of objects -e.g.,`{ key: 'step-name', result: Object }`- with all the previous executed steps.

:::caution Attention:
- The JavaScript code runs in a sandboxed _node.js_ environment without access to `require` `Buffer` or `process.env`.
Therefore no network or IO activity will work. This means that this block is intended to transform data from the `value` and `output` variables, not to store o gather external information.
- The code must always return a value. This value can later be used in the following stages as [COTLang](/docs/documentation/automation/admin_cotlang) script, e.g., `$OUTPUT#step-name#data`.
:::

<div className="alert alert--secondary">

### <span className="hero__subtitle">Examples:</span> {#example}

One common example of how this tool can be used -but not limited to- is automated data extraction from _collections_ and returning the results in string format for use in the routine's upcoming stage.

Another example -like the one shown below- takes a `list-input` value of "email" or "name", to either convert a list of `COTUsers` into a list of `emails` or `names`.

```javascript
const users = output.find(o => o.key === 'user_step').data;
const type = value.answer.data.find(d => d.identifier === 'survey_identifier').result;

switch (type) {
  case 'email': return users.map(u => u.email);
  case 'name': return users.map(u => `${u.name.names} ${u.name.lastName || ''}`);
  default throw new Error('Unknown type');
}
```

</div>
<br/>

-----------
  
**Sandboxed JS runner.**  
key: CCJS  
## Inputs  
### 1. Source Code (key: src)  
Must return an Object. e.g., return { hello: 'world' };. Variables 'value' and 'output' can be read.  
Required: true  
Data Type: string   
## Next Stages  
### 1. SUCCESS  
  
### 2. ERROR  
  
## Outputs  
### 1. statusCode  
Status code number: 0 if successful  
Required: no  
Data Type: number   
### 2. error  
Error message.  
Required: no  
Data Type: string   
### 3. data  
Returned value.  
Required: no  
Data Type: any 