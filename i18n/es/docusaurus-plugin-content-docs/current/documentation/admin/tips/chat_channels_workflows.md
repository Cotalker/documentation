---
title: Chat Channels in Workflows
---

:::caution Advertencia
Esta página aún no se encuentra traducida al español.
:::

import useBaseUrl from '@docusaurus/useBaseUrl'; 

<span className="hero__subtitle">Settings Panel Guide</span>

In the [Create Workflow settings panel](/docs/documentation/admin/workflows/settings_panels/workflow_create_edit#general-information), workflow chat channels can be set to one of three options. Each option permits a different relationship between the task and its channel. The options are explained below:

*Bound* (two-way data binding):
- Task copies main-state and sub-states to bounded channel.
- Channel can change main-state and other parameters with surveys.
- Only one task can be bound to a channel, and vice-versa.
- This channel can only be unset manually.

*Unbound* (directly assigned to a task):
- Task only sends status-updates to this channel.
- A channel may have many un-bounded tasks.
- This channel can only be unset manually.

*Unbound-Hierarchy* (related through parent)
- Task only sends status-updates to this channel.
- Doesn't have a channel id, and always checks parent on update.
- This channel will be automatically set or unset depending on the current task hierarchy.
