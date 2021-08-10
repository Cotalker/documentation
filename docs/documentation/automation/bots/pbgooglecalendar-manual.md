import useBaseUrl from '@docusaurus/useBaseUrl';

<img alt="title image" className="img_sizing" src={useBaseUrl('img/design/Main_menu.svg')} />
<br/>

## Overview {#overview}

This stage-bot integrates Cotalker with Google Calenders. Create meetings or events and send invitations via email. 

Before beginning, you will need to have a Google email account associated with the company's Google Workspace.

:::note keep in mind
- The **Organizer ID** must contain a valid domain email, i.e., a Google email account that belongs to the organization's Google Workspace. Events will be scheduled in the organization's Google Workspace Calendar.
- _Date & Time_ must be in Javascript Format: `YYYY-MM-DDTHH:mm:ss.sssZ`
- The **Invitees IDs** field supports email addresses or Cotalker ID numbers. Press the <span className="badge badge--primary">+ Add Item</span> button for each invitation recipient. 
- **Timezone** must be set using the TZ Database name format, e.g., America/Santiago, America/Sao_Paulo, Asia/Dubai, Asia/Shanghai, etc.
- Invitations can be sent to any user, even those **not** in the organization's Google Workspace.
:::

<div className="alert--secondary">

## Setup Example {#setup-example}

```json
    {
        "_id" : "5f59923c42d99d000982d0aa", 
        "key" : "calendar", 
        "name" : "PBCalendar", 
        "version" : "2.0.0", 
        "data" : {
            "title" : "PBCalendar Event", 
            "description" : "Description of event", 
            "initialDate" : ISODate("2021-08-05T20:51:30.551+0000"), 
            "durationMinutes" : 30.0, 
            "invitedById" : [
                "5f6cfcaf7e081c0008502f3a", 
                "5bc9ffc7f25ac42f0410179d"
            ], 
            "invitedByEmail" : [
                "sample@gmail.com"
            ], 
            "owner" : "5f57dc679d700e0008cc131e"
        }, 
        "customNetworkRequest" : [
        ], 
        "next" : {
            "DEFAULT" : null
        }
    }
```

</div>
<br/>

## Expected Result {#expected-result}

<img alt="email" className="img_sizing item shadow--tl" src={useBaseUrl('img/pbcalendar_00.png')} />
<br/>

