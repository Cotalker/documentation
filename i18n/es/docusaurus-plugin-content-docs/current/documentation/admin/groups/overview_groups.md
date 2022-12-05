---
title: Standard Groups Section Overview
sidebar_label: Overview
---
import useBaseUrl from '@docusaurus/useBaseUrl';
import Highlight from '@theme/Highlight';

<img alt="design" className="img_title" src={useBaseUrl('img/design/Groups.svg')} />
<br/>

## Introduction {#introduction}

[_Standard Groups_](/docs/documentation/client/groups#regular-groups), simply referred to as _"groups"_, are to be differentiated from _workflow (task) groups_ and _link groups_. As the other group types, _standard groups_ can be accessed through the **Main Menu Bar** or in the **Group Panel** as sub-groups of other groups. _Standard groups_ are mainly used for communication purposes. Users can be added as participants in the group, allowing them to use the group panel's _actions button_, access _sub-groups_, open _link groups_, access the group's _channels_, and other resources that can be added to a group and its channels. 

Through _Channel Workspaces_ within _Standard Groups_, users associated with a channel can send messages, share files, answer surveys, and view other users participating in the channel.

## Accessing Groups Section {#access-groups}
To access the <span className="badge badge--primary">Groups</span> section:

<img alt="accessing groups" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_group_00.png')} />
<br/>

1. Press the <span className="badge badge--primary">Administrator</span> in the **Main Menu Bar**.
2. Select <span className="badge badge--primary">Groups</span> in the **Administrative Panel**.
3. The [**Groups**](#layout) section opens up.

<div className="alert alert--secondary">

## Groups Section Layout {#layout}
_The Groups section consists of a table displaying all the standard groups that exist within the company._

<img alt="accessing groups" className="img_sizing item shadow--tl" src={useBaseUrl('img/admin_group_01.png')} />
<br/>

_Actions:_
- **1. Create group**: Press the <span className="badge badge--primary">+</span> icon to open a [group settings panel](/docs/documentation/admin/groups/admin_groups#group-settings-panel-layout) to create a new group.
- **2. More actions**: Shows option for displaying disabled groups.

_Settings and Options:_
- **A. Icon**: Displays the icon that represents the group in the **Main Menu Bar** or **Group Panel**.
- **B. Name**: Indicates the group's display name.
- **C. Channel creation**: Indicates if channels can be created in the group.
- **D. Last modified**: Indicates the last time the group was edited.
- **E. Channels | Edit**: The respective icons permit either [viewing all the channels within the group](/docs/documentation/admin/groups/admin_channels#channels-panel-layout) or [editing the group](/docs/documentation/admin/groups/admin_groups#group-settings-panel-layout).


</div>
<br/>

---
## Related Topics {#related-topics}
- [Group Basics](/docs/documentation/client/groups)
- [Channel Workspace Basics](/docs/documentation/client/channels)
- [Group Data Model (COTGroup)](/docs/documentation/models/communication/model_groups)
- [Channel Data Model (COTChannel)](/docs/documentation/models/communication/model_channels)
- [Group API Requests](/docs/documentation/api/communication/groups)
- [Channel API Requests](/docs/documentation/api/communication/channels)

