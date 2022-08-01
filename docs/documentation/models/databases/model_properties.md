---
title: Properties (Elements) Data Model
sidebar_label: COTProperty
---
import useBaseUrl from '@docusaurus/useBaseUrl'; 

<span className="hero__subtitle"><em>COTProperty</em></span>
<br/>

## Description {#description}

[_Properties_ (_also known as _elements_)](/docs/documentation/admin/database/admin_elements) are like the rows of a database table, but much more. Properties are contained within [_property types_ (_collections_)](/docs/documentation/admin/database/admin_collections). 

_Properties_ are used to establish a relationship or define something. That's why you can use them sometimes as a resource and others as an asset. For example, you can send a specific text to all the users that have the "Special Message" _property_. Since each _user_ is simply a _collection or property type_, you can add _properties_ to them.

Additionally, [workflows use _properties_ to define their states](/docs/documentation/admin/workflows/settings_panels/workflow_create_edit#additional-fields).

As you can see, the versatility of _properties_ is quite significant.

_Properties_ can also contain extra information through [additional fields](/docs/documentation/admin/database/admin_collections#additional-fields) set by their _property type_.

## JSON Sample
_Property with additional fields:_
```json
{
    "__v": 0,
    "_id": "6185cfd61cdf6b755245e18d",
    "company": "6185d0ddd7b7517c8e0fb40b",
    "createdAt": "2021-05-27T15:20:26.487Z",
    "isActive": true,
    "modifiedAt": "2021-11-04T16:31:03.967Z",
    "name": {
        "code": "ford_mustang",
        "display": "Ford Mustang"
    },
    "propertyType": "car_model_00",
    "subproperty": [
        "6185cfe1ef46d0aee4c2b653",
        "6185cfe8b420610501b280d8"
    ],
    "search": [
        "ford",
        "00",
        "ford00"
    ],
    "schemaInstance": {
        "origin": "USA",
        "year": "1969",
        "color": "black",
        "car_picture": "6185d0e7c6f325c5ecb1ce3d"
    }
}
```

_Property associated with a user:_
```json
    {
        "__v": 0,
        "_id": "6185cbe62b21d41b5744e27e",
        "company": "6185cdd32b0e783a0fbef35a",
        "createdAt": "2021-08-16T16:04:16.843Z",
        "isActive": true,
        "modifiedAt": "2021-10-26T10:16:47.891Z",
        "name": {
            "code": "user_6185cbfc457214abaed8019f_6185cbe62b21d41b5744e27e",
            "display": "jane@company.com"
        },
        "owner": {
            "$ref": "users",
            "$id": "6185cbfc457214abaed8019f",
            "$db": ""
        },
        "propertyType": "birthdays_00",
        "search": [
            "jane",
            "company",
            "com",
            "user",
            "6185cbfc457214abaed8019f",
            "6185cbe62b21d41b5744e27e",
            "janecompanycom",
            "user6185cbfc457214abaed8019f6185cbe62b21d41b5744e27e"
        ],
        "schemaInstance": {
            "birthdate_00": "1985-06-01T04:00:00.000Z"
        },
        "subproperty": [],
    }
```


## Fields {#fields}

| Field | Description | [Type](/docs/documentation/models/overview_model#data-types) | Note |
| --- | --- | --- | --- |
| **\_id** | System generated property ID. | ObjectId<COTProperty\> |
| **company** | The ID of the company the property is found in. | [ObjectId<COTCompany\>](/docs/documentation/models/model_company) |
| **createdAt** | Indicates when the property was created. | ISODate | YYYY-MM-DDTHH:mm:ss.SSSZ
| **isActive** | Indicates if the property is active or not. | boolean |
| **modifiedAt** | Indicates the last time the property's configuration was modified. | ISODate | YYYY-MM-DDTHH:mm:ss.SSSZ
| **name** | Name settings. | object |
| **name.code** | The property's identification code. | string | Maximum 60 characters; only lowercase letters, numbers, and underscores allowed; must be unique.
| **name.display** | The property's displayed name. | string |
| **owner** | References a _task_ or _user_ that _ownes_ or uses the _property_ as an additional field value. | object |
| **owner.$db** | Contains database information regarding the referenced owner. | string |
| **owner.$id** | Contains the ObjectId of the referenced owner, i.e., _task_ or _user_. | ObjectId | For example,[ObjectId<COTTask\>](/docs/documentation/models/tasks/model_tasks) or [ObjectId<COTUser\>](/docs/documentation/models/users/model_users), accordingly.
| **owner.$ref** | Contains the reference type. | string | For example, `"users"` when a _user_ is associated with the element. If the _property_ is related to a _task_, a generated string is used, e.g., `"task-{COTCompany.subdomain}-{COTTaskGroup.collectionName}"`
| **propertyType** | The `code` of the [COTPropertyType](/docs/documentation/models/databases/model_propertytypes) associated with the property. | string |
| **schemaInstance** | Contains [additional field](/docs/documentation/admin/database/admin_collections#additional-fields) data. | object | The general format is `property.schemaInstance = { [field]: data-type }`.<br/>COTPropertyType's `schemaNodes[x].key` defines the _field_ and `schemaNodes[x].basicType` defines the _data type_.
| **search** | System search keywords. | string[ ] | Do not modify. 
| **subproperty** | Contains child elements. | string[ ] | 



## Deprecated {#deprecated}
| Field | Description | [Type](/docs/documentation/models/overview_model#data-types) | Note |
| --- | --- | --- | --- |
| **extra** | Additional attributes that consist of any _name_ and _value_. Format: `{"name":"value"}` | object | DEPRECATED
| **geo** | Localization attributes. | object | DEPRECATED 
| **geo.geometry** | | object | DEPRECATED
| **geo.properties** | | object | DEPRECATED
| **geo.properties.address** | | string | DEPRECATED
| **geo.properties.city** | | string | DEPRECATED
| **geo.properties.country** | | string | DEPRECATED
| **geo.properties.phone** | | string | DEPRECATED
| **geo.properties.phoneFormatted** | | string | DEPRECATED
| **geo.properties.postalCode** | | string | DEPRECATED
| **geo.properties.region** | | string | DEPRECATED
| **geo.properties.state** | | string | DEPRECATED
| **geo.type** | | string | DEPRECATED
| **name.subDisplay** | Subtitle | string | DEPRECATED
| **sextra** | | string | DEPRECATED
| **skipCodeValidation** | **WARNING**: Do not set, disables many features. Deprecated, but still in use with some legacy settings. | boolean | DEPRECATED
| **superProperty** | Displays parent _property_ data model. | COTProperty | DEPRECATED
| **superProperties** | Displays list of parent _property_ data models. | COTProperty[ ] | DEPRECATED
| **users** | | string[ ] | DEPRECATED

## Additional Resources {#resources}
- [Elements (Properties)](/docs/documentation/admin/database/admin_elements): Details about elements (properties)
- [Create Collection](/docs/tutorials/basic/create_database): Basic tutorial on how to create a collection (property type) with elements (properties)
- ["Properties (Elements)" API documentation](/docs/documentation/api/databases/properties): basic "Properties" API requests
- [API documentation in Swagger](https://www.cotalker.com/swagger/core/?key=woubtjf4olr0t4zgutuwn6scbcm6hd3qh1cgl5obmohpbm3mfublnwcvv67lodgjvd3h86s9ppshtvmf95gepsqh6nizq9liu7f): complete with data models (schemas)
- [COTLang](/docs/documentation/automation/cotlang/admin_cotlang): use COTLang for extracting data from models in routines
- [Triggers and Contexts](/docs/documentation/automation/cotlang/triggers_and_contexts): more information on using data models within routines

## Help {#help}

- [Cotalker Platform Community](https://github.com/Cotalker/documentation/discussions): post your questions or search for previous answers given in the forum
