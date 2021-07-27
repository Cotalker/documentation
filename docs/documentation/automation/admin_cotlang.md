---
id: admin_cotlang
title: COTLang
sidebar_label: COTLang
---
import useBaseUrl from '@docusaurus/useBaseUrl'; 
import Highlight from '@theme/Highlight';

<span className="hero__subtitle"><em>Cotalker Scripting Language</em></span>
<br/>
<br/>
<br/>


<img alt="design" class="img_title" src={useBaseUrl('img/design/scheduler.svg')} />
<br/>
<br/>

<div className="alert alert--primary">

## Overview {#cotlang-overview}

COTLang is a scripting language created by Cotalker, primarily used in its _routines_.
It is used to extract data from different [_contexts_](/docs/documentation/automation/triggers_and_contexts) in Cotalker.

</div>
<br/>

## COTLang Commands {#how-to-use-cotlang}
When setting up routine stages, COTLang can be used for getting information from Cotalker databases.

_Below is a table with COTLang commands, their descriptions, and format:_

<div className="container box">

<div className="row table-row-1">
<div className="col col--3"><b>VALUE</b>:</div>
<div className="col col--4">Extracts data from stages data of a routine.</div>
<div className="col col--5">

`$VALUE#[EXTRACTOR]`

</div>
</div>
<div className="row table-row-1">
<div className="col col--3"><b>OUTPUT</b>:</div>
<div className="col col--4"></div>
<div className="col col--5">

`$OUTPUT#[stage-name]#[EXTRACTOR]`

</div>
</div>
<div className="row table-row-2">
<div className="col col--3"><b>ENV</b>:</div>
<div className="col col--4">Access the environment variable.</div>
<div className="col col--5">

`$ENV# environment-var`

</div>
</div>
<div className="row table-row-1">
<div className="col col--3"><b>CODE</b>:</div>
<div className="col col--4">Transform the code into an object.</div>
<div className="col col--5">

`$CODE#[model]#[EXTRACTOR]#[INPUT]`

</div>
</div>
<div className="row table-row-2">
<div className="col col--3"><b>JOIN</b>:</div>
<div className="col col--4">Concatenate values.</div>
<div className="col col--5">

`$JOIN#[Some char to join]#[ARG A]#[ARG B]#...#[ARG N]`

</div>
</div>
<div className="row table-row-1">
<div className="col col--3"><b>TIME</b>:</div>
<div className="col col--4">Generates date, relative to the current date.</div>
<div className="col col--5">

`$$TIME#[PARAM1]#[PARAM2]`

</div>
</div>
<div className="row table-row-2">
<div className="col col--3"><b>META</b>:</div>
<div className="col col--4">Extracts data from message.meta (Questions).</div>
<div className="col col--5">

`$META#[EXTRACTOR]`

</div>
</div>
<div className="row table-row-1">
<div className="col col--3"><b>EXTRACTOR</b>:</div>
<div className="col col--4">

Token values: 
1. *Values*: Dive into value.
2. *Operators*: Apply function to current data.

</div>
<div className="col col--5"></div>
</div></div>
<br/>

<div className="alert alert--secondary">

### <span className="hero__subtitle">Examples</span> {#examples}

-----

**META**
- question.display = `["$META#somekey"]`

- message.meta = '`{"somekey":"Happy New Year"}'`

  When a value is required, question.display should return `["$META#somekey"]`

------

**EXTRACTOR**
- Operators: `... |[find => identifier = keyname]|...  | [TOKEN1]|[TOKEN2]|...|[TOKEN-N]`
- General Example: 
`{a: { b: { c1: 'Hola', c2: 'Mundo' }  }  }`

  To access the info of variable _c1_, use the following token: `a|b|c1`. It wil respond with `Hola`.

</div>
<br/>

## Function {#function}

:::note The format of the function is as follows:
`[ function_name => token = Syntax | token ]`
:::

_The following list shows the available COTLang functions along with a brief description and example:_

<div className="container box">

<div className="row table-row-1">
<div className="col col--3"><b>size</b>:</div>
<div className="col col--4">Returns the size of an array.</div>
<div className="col col--5">

 `$VALUE#array|[size=>*]`

</div>
</div>
<div className="row table-row-2">
<div className="col col--3"><b>toString</b>:</div>
<div className="col col--4">Returns the input in string type.</div>
<div className="col col--5"></div>
</div>
<div className="row table-row-1">
<div className="col col--3"><b>cast</b>:</div>
<div className="col col--4">Returns the input in float or boolean type.</div>
<div className="col col--5">

`$VALUE#anyValue|[cast=>parseFloat]`

</div>
</div>
<div className="row table-row-2">
<div className="col col--3"><b>map</b>:</div>
<div className="col col--4">Map elements from one type to another.</div>
<div className="col col--5">

`$VALUE#populatedChannelUsers|[map=>email]`

</div>
</div>
<div className="row table-row-1">
<div className="col col--3"><b>arrayToObject</b>:</div>
<div className="col col--4">Returns the object in array.</div>
<div className="col col--5">

`$VALUE#data|[arrayToObject=>key=value]...`

</div>
</div>
<div className="row table-row-2">
<div className="col col--3"><b>isDefinedFilter</b>:</div>
<div className="col col--4">

Return only values that are not *0*, *""*, *null* or *undefined*.

</div>
<div className="col col--5">

`$VALUE#data|[isDefinedFilter=>meta]`

</div>
</div>
<div className="row table-row-1">
<div className="col col--3"><b>filter</b>:</div>
<div className="col col--4">Return all the arguments that apply to the condition.</div>
<div className="col col--5">

`$VALUE#data|[filter=>contentType=application/vnd.cotalker.survey+text]`

</div>
</div>
<div className="row table-row-2">
<div className="col col--3"><b>notEqualFilter</b>:</div>
<div className="col col--4">Filter the unequal values ​​of an array.</div>
<div className="col col--5">

`$VALUE#data|[notEqualFilter=>contentType=application/vnd.cotalker.survey+text]`

</div>
</div>
<div className="row table-row-1">
<div className="col col--3"><b>simpleNotEqualFilter</b>:</div>
<div className="col col--4">Filter unequal values ​​from an array to a condition.</div>
<div className="col col--5">

`$VALUE#data|[simpleNotEqualFilter=>125938f23295sd0]`

</div>
</div>
<div className="row table-row-2">
<div className="col col--3"><b>simpleEqualFilter</b>:</div>
<div className="col col--4">Filter equal values ​​from an array to a condition.</div>
<div className="col col--5">

`$VALUE#data|[simpleEqualFilter=>125938f23295sd0]`

</div>
</div>
<div className="row table-row-1">
<div className="col col--3"><b>concat</b>:</div>
<div className="col col--4">Concatenate values.</div>
<div className="col col--5"></div>
</div>
<div className="row table-row-2">
<div className="col col--3"><b>find</b>:</div>
<div className="col col--4">Return a particular element of the array.</div>
<div className="col col--5">

`$VALUE#data|[find=>identifier=minuta-fecha]`

</div>
</div>
<div className="row table-row-1">
<div className="col col--3"><b>push</b>:</div>
<div className="col col--4">Add an element on the back.</div>
<div className="col col--5">

`$VALUE#populatedChannelUsers|[map=>email]|[push=>string=ignacio@cotalker.com]`

</div>
</div>
<div className="row table-row-2">
<div className="col col--3"><b>add</b>:</div>
<div className="col col--4">Add an element on the back, if it doesn't exists.</div>
<div className="col col--5">

`$VALUE#populatedChannelUsers|[map=>email]|[add=>string=ignacio@cotalker.com]`

</div>
</div>
<div className="row table-row-2">
<div className="col col--3"><b>math</b>:</div>
<div className="col col--4">

Perform a mathematical operation on the values. The operation ar *add* or *subtract*.

</div>
<div className="col col--5">

`$VALUE#answer|anyNumber|[math=>add=2]`

</div>
</div>
<div className="row table-row-1">
<div className="col col--3"><b>date</b>:</div>
<div className="col col--4">Allows parsing dates.</div>
<div className="col col--5">

`$VALUE#createdAt|[date=>format=DD-MM-YYYY]`

</div>
</div>
<div className="row table-row-2">
<div className="col col--3"><b>every</b>:</div>
<div className="col col--4">

Perform the operation on each element of the array. The operator can be *>= x*, *> x*, *< x*, *<= x* or *=== x*. And the key are *gte*, *gt*, *lt*, *lte* or *eq*, respectively.

</div>
<div className="col col--5">

`$VALUE#data|[filter=>contentType=application/vnd.cotalker.survey+textnumber]|[map=>responses]|[every=>lte=2]`

</div>
</div>
<div className="row table-row-1">
<div className="col col--3"><b>some</b>:</div>
<div className="col col--4">

Return the values that apply to one of the following conditions: *>= x*, *> x*, *< x*, *<= x* or *=== x*. And the key are *gte*, *gt*, *lt*, *lte* or *eq*, respectively.

</div>
<div className="col col--5">

`$VALUE#data|[filter=>contentType=application/vnd.cotalker.survey+textnumber]|[map=>responses]|[some=>lte=2]`

</div>
</div>
<div className="row table-row-2">
<div className="col col--3"><b>json</b>:</div>
<div className="col col--4">Convert a JSON to string.</div>
<div className="col col--5">

`$VALUE#populatedChannelUsers|[json=>parse]`

</div>
</div>
<div className="row table-row-1">
<div className="col col--3"><b>querystring</b>:</div>
<div className="col col--4">Generate a query string from an object.</div>
<div className="col col--5">

`$VALUE#someValue|[querystring=>string]`

</div>
</div>
<div className="row table-row-2">
<div className="col col--3"><b>cotanswer_list</b>:</div>
<div className="col col--4">Generate text answer from an array.</div>
<div className="col col--5">

`$VALUE#answer_data|[cotanswer_list=>array]`

</div>
</div>
<div className="row table-row-1">
<div className="col col--3"><b>gencode</b>:</div>
<div className="col col--4">Generate a code from a string.</div>
<div className="col col--5">

`$VALUE#path|to|string|[gencode=>*]`

</div>
</div>
</div>
<br/>

## Quick Reference Guide & Command Tester {#command-quick-reference-guide}

<iframe scrolling="yes" className="framedPage" src="https://www.cotalker.com/function/cotlang/"></iframe>
<br/>