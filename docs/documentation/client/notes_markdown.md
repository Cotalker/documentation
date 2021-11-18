---
title: Markdown Syntax
---
import useBaseUrl from '@docusaurus/useBaseUrl';
import TOCInline from '@theme/TOCInline';
import Mermaid from '@theme/Mermaid';

<img alt="design" className="img_sizing" src={useBaseUrl('img/design/routines.svg')} />
<br/>
<br/>

## Overview  {#markdown}

Editing [_notes_](/docs/documentation/client/notes) requires using _markdown_ – a simple syntax used for automatically formatting documents. It's easy to use. You just have to remember some of the character-syntax commands. With markdown, you can format text, insert images, add links, create diagrams, and much more. Once you get the hang of it, you'll end up liking markdown more than regular word processing, especially when you need to make quick notes and not worry much about formatting.

To make things easier, the [**note editor**](/docs/documentation/client/notes#editor) provides auto-complete hints for markdown. The [editor toolbar](/docs/documentation/client/notes#editor) also helps out by inserting the markdown syntax you need by clicking on the corresponding icon.

:::note
For more information about markdown syntax, visit the free and open-source _Markdown Guide_: 
- [Markdown Guide - Basic Syntax](https://www.markdownguide.org/basic-syntax/). 
- [Markdown Guide - Extended Syntax](https://www.markdownguide.org/extended-syntax/)
:::

## Basic Markdown Syntax {#basic-md}

### Title {#title-md}
Add titles or headings to your note with a number sign `#`. Titles are automatically set as links, added to the sidebar navigation menu, and added to the note's table of contents.

- `#` Heading level 1 
- `##` Heading level 2
- `###` Heading level 3
- `####` Heading level 4

_Alternative Syntax:_
- `===` The text above the line adopts Heading level 1
- `---` The text above the line adopts Heading level 2

---

### Table of Contents {#toc-md}
Use the syntax `[toc]` to embed a table of contents generated automatically using the titles `#` found in the note.

<TOCInline toc={toc} />

---

### Font Format {#font-md}
All text put between the respective syntax characters will adopt the format styling. There are different ways to arrange the syntax, here are some examples:

- `*italic*` or `_italic_` = _italic_
- `**bold**` or `__bold__` = **bold**
- `***bold – italic***`, `_**bold – italic**_` = ***bold – italic***
- `` `short code` `` = `short code`
- `~~Deleted text~~` = ~~Deleted text~~

---

### Links {#links-md}
To add a URL link:

`link to [Cotalker Documentation](http://doc.cotalker.com)` = link to [Cotalker Documentation](http://doc.cotalker.com)

To add an anchor link for a title within the document:

`Press here to [go back to Overview](#overview)` = Press here to [go back to Overview](#overview)

### Horizontal Rules {#horizontal-rules-md}
To create a _horizontal rule_, i.e., a line that goes across the document, use either:

`---`, `___`, or `***`. 

_Result:_

---

<br/>

---

### Blockquotes {#blockquotes-md}
Use `>` to add blockquotes. 

`> Lorem ipsum dolor sit amet, consectetur adipiscing elit...`

_Result:_

> Lorem ipsum dolor sit amet, consectetur adipiscing elit... 

---

### Lists {#lists-md}
Create numbered lists:

`1. This is the first item.`  
`2. This is the second item.`  
`3. This is the third item.`  
`4. This is the fourth item.`  

_Result:_

1. This is the first item.
2. This is the second item.
3. This is the third item.
4. This is the fourth item.

Create bullet lists:

`- This is the first item.`  
`- This is the second item.`  
`- This is the third item.`  
`- This is the fourth item.`  
_or_  
`* This is the first item.`  
`* This is the second item.`  
`* This is the third item.`  
`* This is the fourth item.`  

_Result:_

- This is the first item.
- This is the second item.
- This is the third item.
- This is the fourth item.

---

### Escaping Characters {#escaping-characters-md}
To display a literal character that would otherwise be used to format text, add `\` in front of the character.

- `\# Hastag` = \# Hastag

---

## Extended Markdown Syntax {#extended-md}

### Typography {#typography-md}
The Notes tool includes some extended typography not included in basic markdown syntax:

- `(c) (C) (r) (R) (tm) (TM) (p) (P) +-` = © © ® ® ™ ™ § § ±
- `Remarkable---no, awesome!` = Remarkable––no, awesome!  
- `During 1980--1988.` = During 1980–1988.
- `19^th^` = 19<sup>th</sup>  
- `H~2~O` = H<sub>2</sub>O  

---

### Code {#code-md}
Code blocks let you show code with adequate highlighting and indentation according to programming language. You can create code blocks either by:
- indenting lines by four spaces or one tab, or
- adding `` ``` `` before and after the code block.

_Example:_
    ```json  
    {  
        "item 1" : "string",  
        "item 2" : [  
            "array item 1",  
            "array item 2"  
        ]  
    }  
    ```

_Result:_
```json
{
    "item 1" : "string",
    "item 2" : [
        "array item 1",
        "array item 2"
    ]
}
```

:::note
Add the language or syntax type after the first `` ``` `` to highlight accordingly, e.g., `json`, `javascript`.
:::

---

### Tables {#tables-md}
Create tables with `|` to separate columns. Add `---` to indicate column headers.

_Example:_
```
Table | Column 1 | Column 2
---- | ---- | ----
row 1 | `item a` | *item b*
row 2 | item c | **item d**
```

_Result:_

Table | Column 1 | Column 2
--- | --- | ---
row 1 | `item a` | *item b*
row 2 | item c | **item d**

---

### Task Lists {#task-lists-md}
Make task lists or checklists that readers can mark or check when viewing the note in _document view_.

_Example:_

```
- [ ] This is the first task.
- [ ] This is the second task.
- [x] This task is checked.
- [ ] This task is unchecked.
```

_Result:_

- [ ] This is the first task.
- [ ] This is the second task.
- [x] This task is checked.
- [ ] This task is unchecked.

---

### Emojis {#emojis-md}
Use emoji shortcuts within your note:

- `:smile:` = :smile:
- `:joy:` = :joy:
- `:heart:` = :heart:

:::note
Check this [Emoji Cheat Sheet](https://www.webfx.com/tools/emoji-cheat-sheet/) for a complete list of emoji shortcuts.
:::

---

### Alert Area {#alert-md}
Create _alert boxes_ that contain special information for readers.

_Examples:_
```
:::success
Yes :tada:
:::

:::info
This is a message :mega:
:::

:::warning
Watch out :zap:
:::

:::danger
Oh No! :fire:
:::
```

_Result:_

<img alt="alert boxes" className="img_sizing_narrow" src={useBaseUrl('img/notes_markdown_00.png')} />
<br/>

---

### Adding Images {#images-md}
To add images to your notes, use the following syntax: `![title](https://example.com)`.

_Example:_

`![cotalker logo](https://doc.cotalker.com/img/logo.svg)`

_Result:_

![cotalker logo](https://doc.cotalker.com/img/logo.svg)

<br/>

:::tip
You can also _drag & drop_ images to the Note writing pad to automatically upload the image to the Cotalker server and create the markdown link in the note.
:::

<br/>

---

### Making Diagrams {#diagrams-md}
There are several built-in extensions that can generate in the Notes tools. Here is an example using [Mermaid](https://mermaid-js.github.io/mermaid/#/?id=diagram-types).

_Example:_  

    ```mermaid
    graph LR;
        S[COTSurvey] --> C1[COTSurveyChat #1]
        S --> C2[COTSurveyChat #2]
        S --> C3[COTSurveyChat]
        C1 --> Q1T[COTQuestion - Field Label]
        C1 --> Q1I[COTQuestion - Input Settings]
        C2 --> Q2T[COTQuestion - Field Label]
        C2 --> Q2I[COTQuestion - Input Settings]
        Q2I --> QE[COTQuestionExec]
        C3 --> Q3[COTQuestion - Label & Input]
    ```

_Result:_

<Mermaid chart={`
    graph LR;
        S[COTSurvey] --> C1[COTSurveyChat #1]
        S --> C2[COTSurveyChat #2]
        S --> C3[COTSurveyChat]
        C1 --> Q1T[COTQuestion - Field Label]
        C1 --> Q1I[COTQuestion - Input Settings]
        C2 --> Q2T[COTQuestion - Field Label]
        C2 --> Q2I[COTQuestion - Input Settings]
        Q2I --> QE[COTQuestionExec]
        C3 --> Q3[COTQuestion - Label & Input]
`}/>

:::note
Apart from [Mermaid](https://mermaid-js.github.io/mermaid/#/?id=diagram-types), other diagram mardown syntaxes available with the Notes tool are: [sequence diagrams](https://bramp.github.io/js-sequence-diagrams/), [flow charts](https://flowchart.js.org/), [graphviz](https://www.tonyballantyne.com/graphs.html).

**Try out these examples in your notes:**

_Sequence Diagrams_
    ```sequence
    Alice->Bob: Hello Bob, how are you?
    Note right of Bob: Bob thinks
    Bob-->Alice: I am good thanks!
    Note left of Alice: Alice responds
    Alice->Bob: Where have you been?
    ```  

_Flow Charts_
    ```flow
    st=>start: Start
    e=>end: End
    op=>operation: My Operation
    op2=>operation: lalala
    cond=>condition: Yes or No?
    
    st->op->op2->cond
    cond(yes)->e
    cond(no)->op2
    ```

_Graphviz_
    ```graphviz
    digraph hierarchy {
      nodesep=1.0 // Increases the separation between nodes
    
      node [color=Red,fontname=Courier,shape=box] // All nodes will this shape and colour
      edge [color=Blue, style=dashed] // All the lines look like this
    
      Headteacher->{Deputy1 Deputy2 BusinessManager}
      Deputy1->{Teacher1 Teacher2}
      BusinessManager->ITManager
      {rank=same;ITManager Teacher1 Teacher2} // Put them on the same level
    }
    ```

_Mermaid_
    ```mermaid
    gantt
      title A Gantt Diagram
    
      section Section
      A task: a1, 2014-01-01, 30d
      Another task: after a1, 20d
      
      section Another
      Task in sec: 2014-01-12, 12d
      Another task: 24d
    ```

:::
---

### Embed externals 
Embed external media or files in your notes.

_Youtube example:_  
`{%youtube 9BUoos0KSvs %}`

_Result:_

<iframe width="560" height="315" src="https://www.youtube.com/embed/9BUoos0KSvs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
<br/>
<br/>

_PDF example:_  
`{%pdf https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf %}`

_Result:_

<iframe width="100%" height="400" src="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"></iframe>

---