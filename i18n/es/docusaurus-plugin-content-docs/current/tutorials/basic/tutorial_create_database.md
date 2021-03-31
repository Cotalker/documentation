---
id: create_database
title: Create Collection
---
import useBaseUrl from '@docusaurus/useBaseUrl'; 

Tutorial on how to create a _collection_.

Time: 10 minutes

:::tip Vocabulary Note:
A _collection_ gathers different _elements_ within a database. _Collections_ are like tables but more versatile because the _elements_ they hold are not bound to columns or fields. Many _collections_ can exist within a database and can interact with each other.
:::

## Company Requirements {#company-requirements}
#### Tutorial Objectives {#tutorial-objectives}
Our mock company is organized in different areas, each having specific activities and needs. For example, an employee from the technology division doesn't have to attest incurred expenses while visiting a client as an executive would have to do.<br/>

The areas within the company are:

- board of directors
- financial control
- cybersecurity
- commercial
- treasury
- risk management
- human resources
- IT

A reliable way to separate each area is by using [**collections**](../../documentation/admin/admin_properties) because they allow you to arrange interdependencies.

## Pre-Requistes {#pre-requistes}
#### Access Role {#access-role}

* _User_ with the `admin-properties-write` and `admin-users-write` permissions to create and modify _access roles_ and _users_. 

:::tip Vocabulary note:
- _**Property** and **element** are equivilant terms used to refer to the objects of a Collection._
:::
* Or`admin-*-write` permission which allows all of the above. 
* _User_ with the `web-admin-write` and `web-admin-read` permissions to set up the admin.
* User with the `read admin` access role .

## Steps {#steps}
### I. Create Collection {#i-create-collection}
<div class="alert alert--secondary">

1. From the **Main Menu Bar**, access the <span class="badge badge--primary">Administrator</span> and open <span class="badge badge--primary">Database</span>.

  _The following settings panel will open up:_

<img alt="collection panel" class="img_sizing item shadow--tl" src={useBaseUrl('img/tutorial_collection_step_00.png')} />
<br/>

</div>
<br></br>

<div class="alert alert--secondary">

2. Press the <span class="badge badge--primary">+</span> icon to create a new _Collection_.

<img alt="create collection icon" class="img_sizing item shadow--tl" src={useBaseUrl('img/tutorial_collection_step_00a.png')} /> 
<br/>

_The following settings panel will open up:_

<img alt="create collection panel" class="img_sizing item shadow--tl" src={useBaseUrl('img/tutorial_collection_step_01.png')} /> 
<br/>

</div>
<br/>

<div class="alert alert--secondary">

3. From the settings panel, set the following:

    - **Code**: `department_1`
    - **Name**: `Department`

:::note 
- **Code** is an identifier that only allows lower case letters, numbers, and underscores.
:::

</div>
<br></br>

<div class="alert alert--secondary">

4. Select the option **Don't show this collection in the database section**.

<img alt="option" class="img_sizing item shadow--tl" src={useBaseUrl('img/tutorial_collection_step_02.png')} /> 
<br/>

</div>
<br/>

<div class="alert alert--secondary">

5. Press <span class="badge badge--primary">Save</span>.

:::note
- Once you press **Save**, you will be then taken to the _Department_ collection's settings panel.
:::

</div>
<br/>

### II. Create Elements {#ii-create-elements}

<div class="alert alert--secondary">

6. From the **Department** collection's settings panel, press the <span class="badge badge--primary">+</span> icon to create a new _Element_, as shown in the next image:

<img alt="create element icon" class="img_sizing item shadow--tl" src={useBaseUrl('img/tutorial_collection_step_03.png')} />
<br/>
<br/>

_The following settings panel will open up:_

<img alt="element settings panel" class="img_sizing item shadow--tl" src={useBaseUrl('img/tutorial_element_step.png')} /> 
<br/>

</div>
<br/>

<div class="alert alert--secondary">

7. From the **Create element** panel, set the following: 

    - **Name**: `Board of Directors`
    - **Code**: `board_of_directors_1`

</div>
<br/>

<div class="alert alert--secondary">

8. Press <span class="badge badge--primary">Save</span>.

</div>
<br></br>

<div class="alert alert--secondary">

9. Repeat steps 6, 7, and 8 for each area of the company.<br/>

:::note 
- _For this tutorial, adding at least four company areas as elements is just fine._
:::

</div>
<br/>

## Result {#result}
The list of all _elements_ inside the _collection_ will look like this:

<img alt="element list" class="img_sizing item shadow--tl" src={useBaseUrl('img/tutorial_elements.png')} /> 
<br/>
