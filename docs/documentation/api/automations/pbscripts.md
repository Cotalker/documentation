---
title: PBScripts
---
import useBaseUrl from '@docusaurus/useBaseUrl'; 
import Highlight from '@theme/Highlight';

## Overview {#overview}
A _PBScript_ (parametrized bot script) is a [routine](/docs/documentation/admin/routines/) that can be created and saved for later use as a stage in any [routine builder](/docs/documentation/automation/admin_routine).

:::tip additional resources
These are just some of the most basic API requests. For a complete list of endpoints, consult our [API documentation on Swagger](https://www.cotalker.com/swagger/core/?key=woubtjf4olr0t4zgutuwn6scbcm6hd3qh1cgl5obmohpbm3mfublnwcvv67lodgjvd3h86s9ppshtvmf95gepsqh6nizq9liu7f#/).
:::

## Get PBScripts {#get-pbscripts}
_Lists the PBScripts in the company._

<span className="hero__subtitle"><span className="badge badge--success">GET</span> /pbscripts</span>

#### Endpoint URL {#get-pbscripts-url}
`https://www.cotalker.com/api/v2/pbscripts`

#### Headers {#get-pbscripts-headers}
Header | Description | Required | Values
--- | --- | --- | ---
**Authorization** | Sends your _access token_ to make an API request.<br/>[Click here to see how to obtain an _access token_.](/docs/documentation/api/auth#how-to) | Required | Bearer $ACCESS_TOKEN
**Admin** | Grants administrative access to view _PBScripts_. | Required | true

#### Query Parameters {#get-pbscripts-parameters}
Parameter | Description | Type | Required | Notes
--- | --- | --- | --- | ---
**limit** | Limits the amount of _routines_ that are returned in the response. | number | Optional | By default, the _limit_ is set to 10.
**page** | Makes the response display data from the indicated page number. | number | Optional | 
**count** | Adds the `counter` field with the total amount of _routines_.| boolean | Optional | 
**orderBy** | Orders the _routines_ by ascending or descending order according to the value of the `sortBy` field. | string | Optional | Options: `asc`, `desc`
**sortBy** | Sorts the _routines_ by the indicated value. | string | Optional | Options: <br/>`createdAt`, `modifiedAt`, `collectionName`
**isActive** | Returns _routines_ that are active according to their _isActive_ field. | string | Optional | `all`, `true`, `false`
**debug** | Adds the `debug` field with error notificaciones. | string | Optional | Option: `true`

#### Request Sample {#get-pbscripts-sample}
```bash
curl --location --request GET 'https://www.cotalker.com/api/v2/pbscripts' \
--header 'Admin: true' \
--header 'Authorization: Bearer $ACCESS_TOKEN'
```

#### Response Sample {#get-pbscripts-response}
Responses follow the [**COTPBScript**](/docs/documentation/models/automations/model_scheduler) data model.

---

## Get PBScripts by Id {#get-pbscripts-by-id}
_Returns the inidicated routines._

<span className="hero__subtitle"><span className="badge badge--success">GET</span> /pbscripts/&#123;id&#125;</span>

#### Endpoint URL {#get-pbscript-by-id-url}
`https://www.coltaker.com/api/v2/pbscripts/{id}`

#### Path Parameters {#get-taskgroup-by-id-path}
Parameter | Description | Type | Required | Notes
--- | --- | --- | --- | ---
**id** | The ObjectId of the _routine_ that is to be returned. | [ObjectId<COTPBScript\>](/docs/documentation/models/automations/model_pbscripts) | Required |

#### Headers {#get-pbscript-by-id-headers}
Header | Description | Required | Values
--- | --- | --- | ---
**Admin** | Gives administrative access to the endpoint. | Optional | true
**Authorization** | Sends your _access token_ to make an API request.<br/>[Click here to see how to obtain an _access token_.](/docs/documentation/api/auth#how-to) | Required | Bearer $ACCESS_TOKEN

#### Query Parameters {#get-pbscript-by-id}
Parameter | Description | Type | Required | Notes
--- | --- | --- | --- | ---
**debug** | Adds the `debug` field with error notifications. | string | Optional | Option: `true`

#### Request Sample {#get-pbscript-by-id-request}
```bash
curl --location --request GET 'https://www.cotalker.com/api/v2/pbscripts/61af6469c80d5d9498753673' \
--header 'Admin: true' \
--header 'Authorization: Bearer $ACCESS_TOKEN'
```

#### Response Sample {#get-pbscript-by-id-response}
The response follows the [COTPBScript](/docs/documentation/models/automations/model_pbscripts) data model.

---

## Create New PBScript {#post-pbscript}
_Create a new routine within the company._

<span className="hero__subtitle"><span className="badge badge--info">POST</span> /pbscripts</span>

#### Endpoint URL {#post-url}
`https://www.coltaker.com/api/v2/pbscripts`

#### Headers {#post-headers}
Header | Description | Required | Values
--- | --- | --- | ---
**Admin** | Grants administrative access to create a new _routine_. | Required | true
**Authorization** | Sends your _access token_ to make an API request.<br/>[Click here to see how to obtain an _access token_.](/docs/documentation/api/auth#how-to) | Required | Bearer $ACCESS_TOKEN
**Content-Type** | Indicates the body's format. | Required | application/json

#### Query Parameters {#post-query}
Field | Description | Type | Required | Notes
--- | --- | --- | --- | ---
**debug** | Adds the `debug` field with error notifications. | string | Optional | Option: `true`


#### Request Body {#post-body}
_Only required fields are listed below. For a complete schema description, please go to the [COTPBScript data model](/docs/documentation/models/automations/model_pbscripts). Unrequired fields that are not submitted are either filled in automatically or left blank._

Element | Description | Type | Required | Notes
--- | --- | --- | --- | ---
**code** | The routine's unique code name. | string | Required | Maximum 60 characters; only lowercase letters, numbers, and underscores allowed; must be unique.
**documentation** | Contains the structure and descriptions of the various fields used to set up the routine. | object | Required | WIP
**documentation.key** | Indicates the documentation's `code` name. | string | Required | The value usually repeats the `code` field.


#### Request Sample {#post-request}
_Routine created with minimum required fields._

```bash
curl --location --request POST 'https://www.cotalker.com/api/v2/pbscripts?debug=true' \
--header 'Admin: true' \
--header 'Authorization: Bearer $ACCESS_TOKEN' \
--data-raw '{
    "code": "sendemail_00",
    "documentation": {
        "key": "sendemail_00"
    }
}'
```

#### Response Sample {#post-response}
Go to [COTPBScripts](/docs/documentation/models/automations/model_pbscripts) for a complete description of the response.
```json {11-13}
{
    "data": {
        "parametrizedBot": {
            "default": {
                "stages": []
            },
            "stages": []
        },
        "isActive": true,
        "_id": "61afbfa726427d00078c4949",
        "code": "sendemail_00",
        "documentation": {
            "key": "sendemail_00",
            "dataType": [],
            "nextType": []
        },
        "company": "6136968b580aaf2b0e49d844",
        "createdAt": "2021-12-07T20:10:15.355Z",
        "modifiedAt": "2021-12-07T20:10:15.357Z",
        "__v": 0
    },
    "debug": {
        "data": {
            "body": {
                "code": "sendemail_00",
                "documentation": {
                    "key": "sendemail_00"
                }
            }
        }
    }
}
```

---

## Update PBScript {#patch-pbscript}
_Updates or edits the indicated routine._

<span className="hero__subtitle"><span className="badge badge--warning">PATCH</span> /pbscripts/&#123;id&#125;</span>

#### Endpoint URL {#patch-taskgroup-permissions-url}
`https://www.cotalker.com/api/v2/pbscripts/{id}`

#### Path Parameters {#permissions-parameters}
Parameter | Description | Type | Required | Notes
--- | --- | --- | --- | ---
**id** | The routine's ID. | [ObjectId<COTPBScripts\>](/docs/documentation/models/automations/model_pbscripts) | Required |

#### Headers {#permissions-headers}
Header | Description | Required | Values
--- | --- | --- | ---
**Admin** | Grants administrative access to edit the _routine_. | Required | true
**Authorization** | Sends your _access token_ to make an API request.<br/>[Click here to see how to obtain an _access token_.](/docs/documentation/api/auth#how-to) | Required | Bearer $ACCESS_TOKEN
**Content-Type** | Sets the body's format. | Required | application/json

#### Request Body {#permissions-body}
_Only the fields that are being updated or added are required to be put into the body. For a complete schema description, please go to the [COTPBScripts data model](/docs/documentation/models/automations/model_pbscripts)._


#### Request Sample {#permissions-sample}

```bash
curl --location --request PATCH 'https://www.cotalker.com/api/v2/pbscripts/61af6469c80d5d9498753673' \
--header 'Admin: true' \
--header 'Authorization: Bearer $ACCESS_TOKEN' \
--header 'Content-Type: application/json' \
--data-raw '{
    "parametrizedBot": {
        "maxIterations": 2,
        "stages": [
            {
                "_id": "618a6968eec811dbba542170",
                "key": "email",
                "name": "PBEmail",
                "version": null,
                "data": {
                    "subject": "Hey! We need to talk to you.",
                    "content": {
                        "recipientName": "",
                        "recipientEmail": "",
                        "companyName": "ACME",
                        "title": [
                            "Your team is looking for you."
                        ],
                        "action": "",
                        "code": "",
                        "messageA": "$JOIN# #Your presence is requested in the #($VALUE#channel|nameDisplay)# channel.",
                        "messageB": ""
                    },
                    "targets": [
                        "$VALUE#cmdArgs"
                    ]
                },
                "next": {
                    "DEFAULT": "message"
                },
                "customNetworkRequest": []
            },
            {
                "_id": "618a6974b4b9f668deab7b3e",
                "key": "message",
                "name": "PBMessage",
                "data": {
                    "content": "📩 Email sent ✅",
                    "contentType": "text/system",
                    "sentBy": "$VALUE#user|_id",
                    "channelIds": "$VALUE#channel|_id"
                },
                "next": {},
                "customNetworkRequest": []
            }
        ],
        "start": "email",
        "version": "v3"
    }
}'
```

#### Response Sample {#permissions-response}
Go to [COTPBScripts](/docs/documentation/models/automations/model_pbscripts) for a complete description of the response.
```json {2-52}
{
    "parametrizedBot": {
        "default": {
            "stages": []
        },
        "stages": [
            {
                "_id": "618a6968eec811dbba542170",
                "key": "email",
                "name": "PBEmail",
                "version": null,
                "data": {
                    "subject": "Hey! We need to talk to you.",
                    "content": {
                        "recipientName": "",
                        "recipientEmail": "",
                        "companyName": "ACME",
                        "title": [
                            "Your team is looking for you."
                        ],
                        "action": "",
                        "code": "",
                        "messageA": "$JOIN# #Your presence is requested in the #($VALUE#channel|nameDisplay)# channel.",
                        "messageB": ""
                    },
                    "targets": [
                        "$VALUE#cmdArgs"
                    ]
                },
                "next": {
                    "DEFAULT": "message"
                },
                "customNetworkRequest": []
            },
            {
                "_id": "618a6974b4b9f668deab7b3e",
                "key": "message",
                "name": "PBMessage",
                "data": {
                    "content": "📩 Email sent ✅",
                    "contentType": "text/system",
                    "sentBy": "$VALUE#user|_id",
                    "channelIds": "$VALUE#channel|_id"
                },
                "next": {},
                "customNetworkRequest": []
            }
        ],
        "maxIterations": 2,
        "start": "email",
        "version": "v3"
    },
    "documentation": {
        "key": "sendemail_00",
        "dataType": [],
        "nextType": []
    },
    "isActive": true,
    "_id": "61af6469c80d5d9498753673",
    "code": "sendemail_00",
    "company": "6136968b580aaf2b0e49d844",
    "createdAt": "2021-12-07T20:10:15.355Z",
    "modifiedAt": "2021-12-09T10:13:29.955Z",
    "__v": 0
}
```

---
