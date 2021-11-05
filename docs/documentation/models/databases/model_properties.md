---
title: Elements (Properties) Data Model
sidebar_label: COTProperty
---
import useBaseUrl from '@docusaurus/useBaseUrl'; 


__Elements__ or __Properties__ of a database...

## JSON Sample
```json
    {
        "_id": "611a8c80ab9abe000742fd23",
        "subproperty": [],
        "users": [],
        "isActive": true,
        "search": [
            "jane",
            "company",
            "com",
            "user",
            "60c48a3db79c0f000867dfa2",
            "611a8c80ab9abe000742fd23",
            "janecompanycom",
            "user60c48a3db79c0f000867dfa2611a8c80ab9abe000742fd23"
        ],
        "propertyType": "birthdays_00",
        "name": {
            "code": "user_60c48a3db79c0f000867dfa2_611a8c80ab9abe000742fd23",
            "display": "jane@company.com"
        },
        "owner": {
            "$ref": "users",
            "$id": "60c48a3db79c0f000867dfa2",
            "$db": ""
        },
        "schemaInstance": {
            "birthdate_00": "1985-06-01T04:00:00.000Z"
        },
        "company": "5f5a74a8fdf77a0008a6349a",
        "createdAt": "2021-08-16T16:04:16.843Z",
        "modifiedAt": "2021-10-26T10:16:47.891Z",
        "__v": 0
    }
```

```json
{
    "_id": "60afb8ba720e27000943d5d2",
    "subproperty": [
        "606b7a86da81640008a512c2",
        "606b7a959862850008740dc5"
    ],
    "users": [],
    "isActive": true,
    "search": [
        "ford",
        "00",
        "ford00"
    ],
    "name": {
        "code": "ford_mustang",
        "display": "Ford Mustang"
    },
    "propertyType": "car_model_00",
    "company": "5f5a74a8fdf77a0008a6349a",
    "createdAt": "2021-05-27T15:20:26.487Z",
    "modifiedAt": "2021-11-04T16:31:03.967Z",
    "__v": 0,
    "extra": {
        "In_Stock": "true"
    },
    "schemaInstance": {
        "origin": "USA",
        "car_picture": "6183ec2c9b5de11e225f3433"
    }
}
```
## Fields {#fields}

| Field | Description | [Type](/docs/documentation/models/overview_model#data-types) | Note |
| --- | --- | --- | --- |
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
| **schemaInstance** | Contains additional field data. | object | The general format is `property.schemaInstance = { [field]: data-type }`.<br/>COTPropertyType's `schemaNodes[x].key` defines the _field_ and `schemaNodes[x].basicType` defines the _data type_.
| **search** | System search keywords. | string[ ] | Do not modify. 
| **subproperty** | Contains child elements. | string[ ] | 
| **superProperty** | Displays parent _property_ data model. | COTProperty |
| **superProperties** | Displays list of parent _property_ data models. | COTProperty[ ] |



## Deprecated {#deprecated}
| Field | Description | [Type](/docs/documentation/models/overview_model#data-types) | Note |
| --- | --- | --- | --- |
| **extra** | Additional attributes that consist of any _name_ and _value_.  | object | Format: `{"name":"value"}` | DEPRECATED
| **geo** | Localization attributes. | object | | DEPRECATED 
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

## Additional Resources {#resources}
- [Elements (Properties)](/docs/documentation/admin/admin_properties#elements): Details about elements (properties)
- [Create Collection](/docs/tutorials/basic/create_database): Basic tutorial on how to create a collection (property type)
- ["Elements (Properties)" API documentation](/docs/documentation/api/databases/properties): basic "Properties" API requests
- [API documentation in Swagger](https://www.cotalker.com/swagger/core/?key=woubtjf4olr0t4zgutuwn6scbcm6hd3qh1cgl5obmohpbm3mfublnwcvv67lodgjvd3h86s9ppshtvmf95gepsqh6nizq9liu7f): complete with data models (schemas)
- [COTLang](/docs/documentation/automation/admin_cotlang): use COTLang for extracting data from models in routines
- [Triggers and Contexts](/docs/documentation/automation/triggers_and_contexts): more information on using data models within routines

## Help {#help}

- [Cotalker Platform Community](https://github.com/Cotalker/documentation/discussions): post your questions or search for previous answers given in the forum
