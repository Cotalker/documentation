---
title: Using the Notes Tool
---

:::caution Advertencia
Esta página aún no se encuentra traducida al español.
:::
import useBaseUrl from '@docusaurus/useBaseUrl';
import TOCInline from '@theme/TOCInline';
import Mermaid from '@theme/Mermaid';

<img alt="design" className="img_sizing" src={useBaseUrl('img/design/Videocall.svg')} />
<br/>
<br/>

## Overview {#overview}

Easily create notes to share and edit in real-time among other users within the Cotalker environment. Thanks to our powerful [search tool](/docs/documentation/client/client_search#shared-documents), _task notes_ can be made accessible to all users, thus creating a dynamic knowledge base for your company that all users can help build.

The _Notes_ tool uses [markdown syntax](/docs/documentation/client/notes_markdown) to help you focus on writing the text and forget about formatting. 

Notes can be shared and accessed through [tasks](#task-notes), hyperlinks, the _Notes_ [dashboard](/docs/documentation/client/notes#dashboard), and even [surveys](#survey-notes).

:::info
While _notes_ are fully available in _tasks_, the _Notes dashboard_ is still in its _alpha_ phase and is subject to change.
:::

<div className="alert alert--secondary">

_Here's an example of how the Notes tool turns markdown syntax (left) into a readable document (right):_

<img alt="markdown example" className="img_sizing_menu item shadow--tl" src={useBaseUrl('img/notes_05.png')} />
<br/>
<br/>

:::note
Go to our [Markdown Syntax](/docs/documentation/client/notes_markdown) page for information and examples on how to format text, insert images, add links, create diagrams, and much more.
:::

</div>
<br/>

## Task Notes {#task-notes}
_Task notes_ are a great way to register and share relevant information concerning your individual tasks. You can even create _tasks notes_ with the goal of collecting information and building your knowledge base. 

All _task notes_ are indexed for [search queries](/docs/documentation/client/client_search#shared-documents), making it easier to find the information you need. 

Create as many _notes_ as you want within your _tasks_.

### Creating Task Notes {#create-task-note}
To create a _task note_, go to the _task's details_, either from the [_channel workspace_](/docs/documentation/client/taskview#tasks-channel) or [_task view_](/docs/documentation/client/taskview#task-view). 

Here are three ways to create a note within a task:

- _the Channel Workspace's task panel_
  
  <img alt="associate note to task 1" className="img_sizing item shadow--tl" src={useBaseUrl('img/notes_11.png')} />
  <br/>

- _the Task View_
  <img alt="associate note to task 2" className="img_sizing item shadow--tl" src={useBaseUrl('img/notes_12.png')} />
  <br/>

- _the Task View_
  <img alt="associate note to task 3" className="img_sizing item shadow--tl" src={useBaseUrl('img/notes_13.png')} />
  <br/>

:::note
Only new notes can be associated directly to a task. To associate existing notes to a task, use the API tools.
:::

### Accessing Task Notes {#accessing-task-notes}

There are multiple ways to access a _task note_.

From the _Task View_:

<img alt="task notes 0" className="img_sizing item shadow--tl" src={useBaseUrl('img/notes_19.png')} />
<br/>

From _Task Details_:

<img alt="task notes 1" className="img_sizing item shadow--tl" src={useBaseUrl('img/notes_17.png')} />
<br/>
<br/>

From _Task Files_:

<img alt="task notes 2" className="img_sizing item shadow--tl" src={useBaseUrl('img/notes_18.png')} />
<br/>

<div className="alert alert--secondary">

## Notes Layout & Toolbar {#layout-toolbar}
The Notes tool can appear either within the task view or as an individual web browser tab. In both cases, its layout and tools are distributed in a similar manner. Below is an example and description of the layout.

<div className="text-center">
<img alt="notes layout" className="img_sizing item shadow--tl" src={useBaseUrl('img/notes_06.png')} />

[1. Main Toolbar](#main-notes-toolbar) – [2. Network Tools](#network-toolbar) – [3. Editor](#editor) – [4. Document View](#doc-view)

</div>
<br/>

---

### 1. Main Toolbar {#main-notes-toolbar}

<img alt="main toolbar" className="img_sizing_small item shadow--tl" src={useBaseUrl('img/notes_07.png')} />
<br/>

<div className="padding-left--lg">

1. **Edit**: See only the editor.
2. **View**: See only the result.
3. **Both**: See both in split view.
4. **Copy**: Copy link to clipboard.
5. **Pop-out**: Open note in new tab.

</div>
<br/>

### 2. Network Tools {#network-toolbar}

<img alt="secondary toolbar" className="img_sizing_small item shadow--tl" src={useBaseUrl('img/notes_09.png')} />
<br/>

<div className="padding-left--lg">

1. **Menu**: See revision history.
2. **Online**: See contributing online users.

</div>
<br/>

### 3. Editor {#editor}

<img alt="editor" className="img_sizing item shadow--tl" src={useBaseUrl('img/notes_08.png')} />
<br/>

<div className="padding-left--lg">

1. **Toolbar**: Formatting tools that add [markdown syntax](/docs/documentation/client/notes_markdown) to text.
2. **Write pad**: Text in [markdown syntax](/docs/documentation/client/notes_markdown) written here.
3. **Status bar**: Note stats, Spell Checker, Night Mode, Indent, Editor, and other options.

</div>
<br/>

### 4. Document View {#doc-view}

<img alt="doc view" className="img_sizing item shadow--tl" src={useBaseUrl('img/notes_10.png')} />
<br/>

<div className="padding-left--lg">

1. **History summary**: Last change and ownership
2. **Navegation menu**: Automatically created with document # headings
3. **Document**: Formatted output for users to read.

</div>
<br/>

</div>
<br/>

## Adding Notes on a Survey Form {#survey-notes}
Some survey forms will give you the option to attach a note. You can either create a new note or add an existing one by indicating its URL or Id. Below are some examples.

- _Submit a new note:_

  <img alt="add survey note 1" className="img_sizing_small item shadow--tl" src={useBaseUrl('img/notes_15.png')} />
  <br/>

- _Submit an existing note:_

  <img alt="add note survey 2" className="img_sizing_small item shadow--tl" src={useBaseUrl('img/notes_16.png')} />
  <br/>

:::tip
- To obtain an existing note's URL, click the copy icon in the [Notes Toolbar](#main-notes-toolbar) or copy it from your browser's address bar.
- To obtain an existing note's Id, find it among the string in your browser's address bar.
:::


-----
<span className="hero__subtitle">⚠️ The Notes Dashboard is still in its alpha phase.</span>

## Accessing Notes Dashboard {#dashboard}

To access the **Notes Dashboard**, press <span className="badge badge--primary">Notes</span> on the **Main Menu Bar**:

<img alt="accessing notes" className="img_sizing item shadow--tl" src={useBaseUrl('img/notes_00.png')} />
<br/>

<div className="alert alert--secondary">

## Notes Dashboard Layout {#layout}

From the **Notes Dashboard**, you can view and edit the notes you and your coworkers have written. You can also create new notes from here.

<img alt="notes dashboard layout" className="img_sizing item shadow--tl" src={useBaseUrl('img/notes_01.png')} />
<br/>

1. **My Notes**: Access the notes you have created.
2. **Shared with me**: Access all the notes your coworkers have created.
3. **Deleted**: View and recover deleted notes.
4. **Note Card**: Press the card to open the note in a pop-up window ([more options](#note-options) are also available).
5. **Add icon**: Press to create a new note.

### Note Options {#note-options}
On every **note card**, you have access to the following options: 

<img alt="more note options" className="img_sizing_50 item shadow--tl" src={useBaseUrl('img/notes_02.png')} />
<br/>

1. **Edit Icon**: Opens the note in a new browser tab.
2. **Kebab Icon**: Opens menu with more options.
    
    - **a. View**: Opens the note in a pop-up window.
    - **b. Edit**: Opens the note in a new browser tab.
    - **c. Copy**: Copies the note's link to the clipboard.
    - **d. Delete**: Moves the note to the _Deleted_ section.

</div>
<br/>

## Creating Notes from the Dashboard{#create-note}

To create a note, follow these simple steps:

<img alt="create notes" className="img_sizing item shadow--tl" src={useBaseUrl('img/notes_04.png')} />
<br/>

1. From the [Notes Dashboard](#layout), press the <span className="badge badge--primary">+</span> icon in the lower-right corner.
2. In the pop-up window, fill in the details for the new note.
3. To add content to your new note, choose the note from the [Notes Dashboard](#layout).
