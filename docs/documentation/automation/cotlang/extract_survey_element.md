---
title: Micro-Tutorial
---

import useBaseUrl from '@docusaurus/useBaseUrl'; 

<span className="hero__title">COTLang Guide</span><br/>
<span className="hero__subtitle">How to obtain the element data submitted through a survey form.</span>

## Introduction {#intro}
Suppose you have a [survey with a multiple-choice question that obtains its options from the elements within a collection](/docs/documentation/admin/survey/components/multiple_choice#collection-type). Since the selected option is an element found within the database, using some COTLang script, you can use the element's data within an automated routine associated with the survey.

<div className="container align-center">

_Below is a simple automated routine used for demonstration purposes. It is triggered after a survey form has been submitted. The routine takes the chosen element's display name and uses it in a system message._

<iframe src={useBaseUrl('img/cotlang_example_00.mp4')} width="80%" height="400" title="tutorial"></iframe>
<br/>

</div>

_In the following section, you can find more information and a brief tutorial on how use COTLang scripts within automated routines to obtain element data submitted through a survey._

:::tip
Using _element_ data gathered from submitted survey forms provides enormous potential for creating automations that can handle and update your database information.
:::

## Summary {#summary}
Before passing on to the [step-by-step example](#example), we provide a quick reference summary of the settings used to set up the automation.

### Automated API Request {#api_summary}

<div className="alert alert--secondary">

We can use a [_Network Request_](/docs/documentation/automation/bots/nwrequest-2.0.0), i.e., a parameterized bot used to make [API requests](/docs/documentation/api/databases/properties#get-by-id), to help us obtain element data submitted through a survey. This type of bot can be set as a [stage](/docs/documentation/automation/existing_routines) within a [routine](/docs/documentation/automation/admin_routine). 

Below is a list of bot settings and COTLang scripts that can be used to make this API request: `https://www.cotalker.com/api/v2/properties/{id}`.

:::note
In the table below:
- Underneath the Administrative Panel's user interface field names, the [COTParametrizedBot.stages[ ]](/docs/documentation/models/automations/model_parametrizedbot) nomenclature is indicated in italics.
- When UI and data model nomeclature differ, both sample types are indicated.
:::

<div className="container box">
<div className="row table-row-1">
<div className="col col--3"><b>Code</b><br/><em>key</em></div>
<div className="col col--9">

`get_property`

</div>
</div>
<div className="row table-row-2">
<div className="col col--3"><b>Type</b><br/><em>name</em></div>
<div className="col col--9">

Network Request

`NWRequest`

</div>
</div>
<div className="row table-row-1">
<div className="col col--3"><b>URL</b><br/><em>data.url</em></div>
<div className="col col--9">

1- `$JOIN#/#($ENV#BASEURL)#(api)#(v2)#(properties)#($VALUE#data|[find=>identifier=identifier_code]|process|0)`  
<br/>

2- `$JOIN##https://www.cotalker.com/api/v2/properties/#($VALUE#data|[find=>identifier=identifier_code]|process|0)"`  
<br/>

3- `$JOIN#/#($ENV#BASEURL)#api#v2#properties#($VALUE#data|[find=>identifier=identifier_code]|process|0)`  
<br/>

_NOTES:_
- _Option 1 is the best choice because it helps indicate the different parts of the URL path._
- _`identifier_code` refers to a survey question's identifier._

</div>
</div>
<div className="row table-row-2">
<div className="col col--3"><b>Method</b><br/><em>data.method</em></div>
<div className="col col--9">

`GET`

</div>
</div>
<div className="row table-row-1">
<div className="col col--3"><b>Default Authentication</b><br/><em>data.defaultAuth</em></div>
<div className="col col--9">

_Switch ON on the Admin Panel._

`true`

</div>
</div>
<div className="row table-row-2">
<div className="col col--3"><b>Headings</b><br/><em>data.headers</em></div>
<div className="col col--9">

`{"admin":true}`

</div>
</div>

</div>
<br/>

</div>
<br/>

### Obtaining Output Data {#output_summary}

<div className="alert alert--secondary">

#### $OUTPUT {#output}
The `OUTPUT` command can be used to obtain the previous stage's data.

_Example (obtaining an element's display name):_  
`$OUTPUT#get_property#data|data|name|display`

_Example (obtaining an element's code name):_  
`$OUTPUT#get_property#data|data|name|code`

#### $CODE {#code}
The `CODE` command transforms the code into an object which can be used within the routine.

_Example (using an element's display name):_  
`($CODE#property#id#($VALUE#data|[find=>identifier=identifier_code]|process|0))|name|display`

_Example (using an element's code name):_
`($CODE#property#id#($VALUE#data|[find=>identifier=identifier_code]|process|0))|name|code`

:::note
`identifier_code` refers to a survey question's identifier.
:::

</div>
<br/>


## Step-by-Step Example {#example}
Below is an example that uses the suggested scripts for obtaining element data submitted through a survey form.

### Previous Steps {#previous}

<div className="alert alert--secondary">

#### Survey Field Identifier {#identifier}
First, you need to know which survey and the identifier of the field the _element_ will be found on.

Here we go to a survey we made called _Choose Equipment_.

<img alt="survey element extraction" className="img_sizing_small item shadow--tl" src={useBaseUrl('img/cotlang_example_01.png')} />
<br/>

1. We open the field labeled _Choose equipment from list:_.
2. The field's identifier is `equipment`. We will need to remember this name.
3. The _elements_ displayed as options in this multiple choice question are taken from the _Equipment_ collection.

#### Set Up the Bot {#bot}

Next, you need to create a bot and set it up to work with the survey.

<img alt="survey element extraction" className="img_sizing_small item shadow--tl" src={useBaseUrl('img/cotlang_example_02.png')} />
<br/>

Make sure it has at least the following:

**A. Functions**
- Set the `It's a survey command` option. 
- In the **Form** field, choose the survey form to associate with the bot.  

**B. Routine Builder**
- Press **+ Add Routine** to configure the bot's automated routine that will be triggered every time the survey form is submitted.

</div>
<br/>

<div className="alert alert--secondary">

## Configure First Stage {#stage-one}
Once the **+Add Routine** button is pressed, the _Routine Builder_ opens up, as shown below. 

For this first stage, we will make an [API request to get into the database and extract the chosen element's data](/docs/documentation/api/databases/properties#get-by-id). In order to make the request, we will need to use the _Network Request_ stage bot. Setup details are shown below:

<img alt="survey element extraction" className="img_sizing_small item shadow--tl" src={useBaseUrl('img/cotlang_example_03.png')} />
<br/>

1. Press **+Add Stage** to configure the first stage.

<img alt="survey element extraction" className="img_sizing_small item shadow--tl" src={useBaseUrl('img/cotlang_example_04.png')} />
<br/>

2. **Code**: Give the stage a name, e.g., `get_property`.
3. **Type**: Choose _Network request_ as the stage type.
4. **URL**: This field requires the URL needed to make an API request. Add the following COTLang script to automatically generate the URL using the element chosen in the survey:  
`$JOIN#/#($ENV#BASEURL)#(api)#(v1)#(properties)#($VALUE#data|[find=>identifier=equipment]|process|0)`.
5. **Method**: For this example, we'll use the `GET` method.
6. **Add Optional Inputs**: Press this button to add the _Headings_ field. Repeat to add the _Default Authentication_ field.
7. **Headings**: Add the necessary request headings in JSON format in a single line.
8. **Default Authentication**: Turn on this option to automatically and securely send the required authentication bearer token.
9. **Outputs**: Indicate the next stage in the routine. The stage must be already created. If it has not yet been created, you can return here later after the next stage has been created and configured. Below is an example of how to set up the second stage.

</div>
<br/>

<div className="alert alert--secondary">

## Send Data to Second Stage {#stage-two}

We can add a second stage to the routine, which will use the data extracted by the network request. To begin, we must press the **+ Add Stage** button again and then set up the stage. An example is shown below:

<img alt="survey element extraction" className="img_sizing_small item shadow--tl" src={useBaseUrl('img/cotlang_example_05.png')} />
<br/>

10. **Code**: Write a name for the stage.
11. **Type**: Choose a stage-type bot. For this example, we chose the _Send Message_ stage bot.
12. **Content**: We will include the data gathered from the network request in the message content. To do this, we use the COTLang command `JOIN` to append the content text with the gathered data. We also use the `OUTPUT` command to obtain the data retrieved in the previous stage.  
_For example:_  
`$JOIN# #You have successfully chosen#($OUTPUT#get_property#data|name|display)#.`
13. **Content Type**: We used `text/system` option to send a system message through the chat channel.
14. **User**: This field requires a [user's ObjectId](/docs/documentation/models/users/model_users). To get this information automatically from the context, we use the COTLang `VALUE` command.  
_For example:_ `$VALUE#user`
15. **Item**: This field requires the [ObjectId of the channel](/docs/documentation/models/communication/model_channels) in which the message is to be posted. We can obtain the Id of the channel from which the survey was submitted and where we wish to post the message by using the COTLang `VALUE` command.  
_For example:_ `$VALUE#channel`

:::note
If you haven't already done so, remember to add this stage to the previous stage's _Output_ setting.
:::

</div>
<br/>

Once you are done, you should be able to see something like the image below:

<img alt="result" className="img_sizing item shadow--tl" src={useBaseUrl('img/cotlang_example_06.png')} />
<br/>

The name of the equipment chosen from a multiple choice list is placed in the automatically generated system message.

:::tip
Use the [**Run Routine**](/docs/documentation/automation/admin_routine#run-routine) or [**Logs**](/docs/documentation/automation/automation_log) options to further understand [triggers and contexts](/docs/documentation/automation/cotlang/triggers_and_contexts).

<img alt="result" className="img_sizing item shadow--tl" src={useBaseUrl('img/cotlang_example_07.png')} />
<br/>
:::

:::caution Attention
On this micro-tutorial, we only shared a very simple example of how COTLang can be used to extract information from data contexts. Much more can be accomplished using these tools with a bit of ingenuity!
:::

---
## Related Resources {#related}
- [COTLang Guide](/docs/documentation/automation/cotlang/admin_cotlang) 
- [Triggers & Contexts](/docs/documentation/automation/cotlang/triggers_and_contexts)
- [Bots Section](/docs/documentation/admin/admin_bots)
- [Routine Builder](/docs/documentation/automation/admin_routine)
- [Routine Stage Types](/docs/documentation/automation/existing_routines)
- [Automation Log](/docs/documentation/automation/automation_log)