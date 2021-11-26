---
title: Property Types (Collections) Data Model
sidebar_label: COTPropertyType
---
import useBaseUrl from '@docusaurus/useBaseUrl'; 

<span className="hero__subtitle"><em>COTPropertyType</em></span>
<br/>

## Description {#description}

[_Property types_, also know as _collections_](/docs/documentation/admin/admin_properties#collection), are versatile databases that can be set up to carry out diverse functions in the Cotalker environment. _Property types_ can store company assets, describe workflow states, act as a filter, contain options for multiple-choice questions in surveys, grant permissions, and much more. Some common examples include "Store Locations", "Company Departments", "Products", "Clients", "Contacts", "Brands", "Task States", among others.

_Property types_ contain [_properties_ or _elements_](/docs/documentation/models/databases/model_properties), which can be thought of as the rows in a table or better yet, as the documents in a MongoDB collection. Each _property_ has at least a "Name", a "Code" and a "Unique Id". These fields are the basic columns of the table. But each _collection_ may have more columns by [adding fields](/docs/documentation/admin/admin_properties#additional-fields), making _properties_ more descriptive. For example, a _collection_ that holds "store locales" can have _additional fields_ that contain address, employee number, store size, performance indicators, or any other information that needs to be associated with the collection's _properties_.

## JSON Sample {#json-sample}
```json
{
    "_id": "61846a668e23c5b68db39552",
    "code": "car_model_00",
    "company": "61846bfc1c42ad26669a7017",
    "createdAt": "2021-05-27T15:20:00.749Z",
    "display": "Car Model",
    "isActive": true,
    "modifiedAt": "2021-05-27T15:20:00.749Z",
    "schemaNodes": [  //Additional fields
        {
            "validators": {
                "required": true,
                "validator": [],
                "min": 1,
                "max": 20
            },
            "isArray": false,
            "weight": 1,
            "isActive": true,
            "key": "origin",
            "display": "Manufacturer Country",
            "description": "Indicates the manufacturer's country of origin",
            "basicType": "string"
        },
        {
            "validators": {
                "required": false,
                "validator": []
            },
            "isArray": false,
            "weight": 2,
            "isActive": true,
            "key": "car_picture",
            "display": "Image",
            "description": "Picture of the car model",
            "basicType": "file",
            "subType": "image"
        }
    ],    
    "viewPermissions": [
        "db-*-read"
    ]
}
```

## Fields {#fields}

| Field | Description | [Type](/docs/documentation/models/overview_model#data-types) | Note |
| --- | --- | --- | --- |
| **\_id** | System generated property type ID. | ObjectId<COTPropertyType\> |
| **code** | The property type's unique identification name. | string | Maximum 60 characters; only lowercase letters, numbers, and underscore allowed; must be unique.
| **company** | Indicates the company the survey is found in. | [ObjectId<COTCompany\>](/docs/documentation/models/model_company) |
| **createdAt** | Date the property type was created. | ISODate | YYYY-MM-DDTHH:mm:ss.SSSZ
| **display** | The property type's display name. | string |
| **isActive** | Indicates whether the workflow is active or not. | boolean |
| **modifiedAt** | Indicates the last time the property type was modified. | ISODate | YYYY-MM-DDTHH:mm:ss.SSSZ
| **schemaNodes** | Additional fields for all of the collection's elements. | object[ ] |
| **schemaNodes[index].basicType** | Indicates the additional field's input type. | string | Enum: ["string", "number", "date", "boolean", "link", "file", "COTProperty", "COTUser"]
| **schemaNodes[index].default** | Specifies the additional field's default value. | Type according to `basicType`. | Not yet implemented.
| **schemaNodes[index].description** | Brief description of the additional field. | string |
| **schemaNodes[index].display** | The additional field's displayed name. | string |
| **schemaNodes[index].isActive** | Indicates if the the additional field is active or not. | boolean |
| **schemaNodes[index].isArray** | Indicates if the input type is an array or not. | boolean |
| **schemaNodes[index].key** | The additional field's code name. | string | Maximum 60 characters; only lowercase letters, numbers, and underscore allowed; must be unique.
| **schemaNodes[index].subType** | Appears when `basicType` is set to "file" or "COTProperty". | string | "File" options: ["Video", "Picture", "File"]; "COTProperty" accepts [COTProperty](/docs/documentation/models/databases/model_properties) `code`.
| **schemaNodes[index].validators** | Validators' settings. | object |
| **schemaNodes[index].validators.arrayMax** | Maximum number of elements in array inputs. | number |
| **schemaNodes[index].validators.arrayMin** | Minimum number of elements in array inputs. | number |
| **schemaNodes[index].validators.max** | Maximum value of input type. Depending on `basicType`, values can represent characters, dates, numbers. | number |
| **schemaNodes[index].validators.min** | Minimum value of input type. Depending on `basicType`, values can represent characters, dates, numbers. | number |
| **schemaNodes[index].validators.required** | Indicates whether the additional field is required or not. | boolean
| **schemaNodes[index].validators.validator** | Custom validations. | string[ ] | Not yet implemented.
| **schemaNodes[index].visualization** | Special input visualization settings. | object |
| **schemaNodes[index].visualization.displayAs** | Appears when `basicType` is set to "link". | object | Enum: ["Embedded", "External", "Internal"]
| **schemaNodes[index].weight** | Indicates the order the additional field are listed in. Starts at "1". | number |
| **viewPermissions** | Permissions that enable users to view the collection in the [database viewer](/docs/documentation/client/database). | string[ ] |


## Deprecated {#deprecated}
| Field | Description | [Type](/docs/documentation/models/overview_model#data-types) | Note |
| --- | --- | --- | --- |
| **create** | Permits non-admin users to create specific properties. | object | DEPRECATED |
| **create.active** | | boolean | DEPRECATED |
| **create.requiredPermission** | | ObjectId<COTAccessRole\>[ ] | DEPRECATED |
| **hierarchyLevel** | | number | DEPRECATED |
| **newsLevel** | | number | DEPRECATED |
| **sextras** | String-extras. Deprecated, but still in use with some legacy settings. | boolean | DEPRECATED |
| **skipCodeValidation** | **WARNING**: Do not set, disables many features. Deprecated, but still in use with some legacy settings. | boolean | DEPRECATED |
| **visualization** | | object | DEPRECATED |
| **visualization.schemaNodesGroups** | | Object[] | DEPRECATED |

## Additional Resources {#resources}
- [Collections (Property Types)](/docs/documentation/admin/admin_properties#collection): Details about collections (property types)
- [Create Collection](/docs/tutorials/basic/create_database): Basic tutorial on how to create a collection (property type)
- ["Property Types (Collections)" API documentation](/docs/documentation/api/databases/property_types): basic "Property Types" API requests
- [API documentation in Swagger](https://www.cotalker.com/swagger/core/?key=woubtjf4olr0t4zgutuwn6scbcm6hd3qh1cgl5obmohpbm3mfublnwcvv67lodgjvd3h86s9ppshtvmf95gepsqh6nizq9liu7f): complete with data models (schemas)
- [COTLang](/docs/documentation/automation/admin_cotlang): use COTLang for extracting data from models in routines
- [Triggers and Contexts](/docs/documentation/automation/triggers_and_contexts): more information on using data models within routines

## Help {#help}

- [Cotalker Platform Community](https://github.com/Cotalker/documentation/discussions): post your questions or search for previous answers given in the forum
