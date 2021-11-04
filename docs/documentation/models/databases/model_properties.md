---
title: Elements (Properties) Data Model
sidebar_label: COTProperty
---
import useBaseUrl from '@docusaurus/useBaseUrl'; 
import Highlight from '@theme/Highlight';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

__Elements__ or __Properties__ of a database...

| Field | Description | [Type](/docs/documentation/models/overview_model#data-types) | Note |
| --- | --- | --- | --- |

- [ ] **company** | The ID of the company the property is found in. | [ObjectId<COTCompany\>](/docs/documentation/models/model_company) |
- [ ] **createdAt** | Indicates when the property was created | ISODate | YYYY-MM-DDTHH:mm:ss.SSSZ
- [ ] **extra** | Additional attributes that consist of any _name_ and _value_.  | object | Format: `{"name":"value"}`
- [ ] **geo** | Localization attributes. | object | |
- [ ] **geo.geometry** | | object |
- [ ] **geo.properties** | | object |
- [ ] **geo.properties.address** | | string |
- [ ] **geo.properties.city** | | string |
- [ ] **geo.properties.country** | | string |
- [ ] **geo.properties.phone** | | string |
- [ ] **geo.properties.phoneFormatted** | | string |
- [ ] **geo.properties.postalCode** | | string |
- [ ] **geo.properties.region** | | string |
- [ ] **geo.properties.state** | | string |
- [ ] **geo.type** | | string
- [ ] **isActive** | Indicates if the property is active or not. | boolean |
- [ ] **modifiedAt** | Indicates the last time the property's configuration was modified. | ISODate | YYYY-MM-DDTHH:mm:ss.SSSZ
- [ ] **name** | Name settings. | object |
- [ ] **name.code** | The property's identification code. | string | Maximum 60 characters; only lowercase letters, numbers, and underscores allowed; must be unique.
- [ ] **name.display** | The property's displayed name. | string |
- [ ] **name.subDisplay** | ??? | string |
- [ ] **owner** | ??? | object |
- [ ] **owner.\$db** | | object |
- [ ] **owner.\$db.type** | | string |
- [ ] **owner.\$id** | | object |
- [ ] **owner.\$id.required** | | boolean |
- [ ] **owner.\$id.type** | | object |
- [ ] **owner.\$ref** | | object |
- [ ] **owner.\$ref.required** | | boolean |
- [ ] **owner.\$ref.type** | | string |
- [ ] **propertyType** | The `code` of the [COTPropertyType](/docs/documentation/models/databases/model_propertytypes) associated with the property. | string |
- [ ] **schemaInstance** | Contains additional field data. Format will depend on the data type. | object |
- [ ] **search** | System search keywords. | string[ ] | Do not modify.
- [ ] **sextra** | | string |
- [ ] **skipCodeValidation** | | boolean |
- [ ] **subproperty** | Child elements. | string[ ] |
- [ ] **superProperty** | Contains parent property data models. | COTProperty |
- [ ] **superProperties** | Contains list of parent property data models. | COTProperty[ ] |


