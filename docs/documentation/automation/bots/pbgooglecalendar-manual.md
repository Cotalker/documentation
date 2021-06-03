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
