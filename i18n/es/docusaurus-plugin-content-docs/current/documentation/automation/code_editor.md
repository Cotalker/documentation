---
title: Embedded Code Editor
---

:::caution Advertencia
Esta página aún no se encuentra traducida al español.
:::

import useBaseUrl from '@docusaurus/useBaseUrl'; 

## Overview {#overiew}
Developers can use the _embedded code editor_ to write, edit, copy or paste a custom Javascript function wherever this option is available. The editor uses industry-standard text highlighting to facilitate reading and writing code, along with syntax error detection.

The _embedded code editor_ can be found in:
- [Question Code Automations](/docs/documentation/automation/surveys/question_exec)
- [Developer Mode Survey Editability](/docs/documentation/automation/surveys/survey_editable_code)
- [Developer Mode Survey Access](/docs/documentation/automation/surveys/survey_hidden_code)
- [Custom Javascript Code Routine Stage Bot](/docs/documentation/automation/bots/ccjs-2.0.1)

The code editor can also test your code by running the code in a sandboxed environment. Test _dummy_ data is automatically provided for contexts involved in the function.

:::caution Attention
The editor **does not do test runs** on the _Custom Javascript Code Routine Stage Bot_.
:::

:::info
- Asynchronous Javascript functions are allowed.

:::

## Initial Layout {#layout}
To write your code:

<img alt="initial layout" className="img_sizing_small item shadow--tl" src={useBaseUrl('img/automation_editor_00.png')} />
<br/>

<div className="margin margin-left--lg">

1. Choose from the list the available _contexts_ you can gather data from.
2. Write, edit, copy, or paste your Javascript function in this area.

:::tip
**A.** The _context_ is set as a variable.  
**B & C.** Object keys are used to indicate the values to fetch.
:::

</div>


## JSON Contexts {#contexts}
_Before testing your code:_

<img alt="initial layout" className="img_sizing_small item shadow--tl" src={useBaseUrl('img/automation_editor_01.png')} />
<br/>

<div className="margin margin-left--lg">

3. Press the **Enable Testing** button.
4. The **JSON Context** area appears with _dummy_ data to be used in the test. If you wish, you can modify the data for the test.

:::tip
**D.** The indicated context _dummy_ data appears in the JSON Context area.  
**E & F.** Show the values of the indicated object keys.
:::

</div>

## Test Function {#run}
_To test your code:_

<img alt="initial layout" className="img_sizing_small item shadow--tl" src={useBaseUrl('img/automation_editor_02.png')} />
<br/>

<div className="margin margin-left--lg">

5. Press the **Test Function** button.
6. In the **Result** area, all the returned data appears.

:::tip
**G & H.** The values are passed on to the _Result_.
:::

:::info
- In case of an error, it will appear in the _Results_ area.
- Errors with context syntaxis will appear in the _Function_ area.
- If the context or life cycle is changed, all the _dummy_ data will return to its default.
:::
</div>



-----

## Related Resources {#related}
- [Triggers & Contexts](/docs/documentation/automation/triggers_and_contexts)
- [Data Models Overview](/docs/documentation/models/overview_model)
- [Question Code Automations](/docs/documentation/automation/surveys/question_exec)
- [Developer Mode Survey Editability](/docs/documentation/automation/surveys/survey_editable_code)
- [Developer Mode Survey Access](/docs/documentation/automation/surveys/survey_hidden_code)
- [Custom Javascript Code Routine Stage Bot](/docs/documentation/automation/bots/ccjs-2.0.1)
