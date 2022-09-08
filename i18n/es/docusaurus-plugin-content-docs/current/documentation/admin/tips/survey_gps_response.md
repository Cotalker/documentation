---
title: Survey+GPS Component Response
---

import useBaseUrl from '@docusaurus/useBaseUrl'; 


The data submitted when answering a **Location** _survey component_ question (`survey+gps` _question content type_) is displayed in the channel workspace as a map and address using Google Maps tools. In the backend, you can obtain all the submitted, plus latitude and longitude coordinates, by searching for the corresponding _COTAnswer_.

_Location submitted through a survey form:_

<img alt="map answer" className="img_sizing item shadow--tl" src={useBaseUrl('img/map_answer.png')} />
<br/>


_Below is a JSON sample of a [COTAnswer](/docs/documentation/models/surveys/model_answers) containing a geolocation response:_

## JSON Sample

```json {16-30}
"answers": [
            {
                "_id": "6266b17d26d86b3e8cb71339",
                "score": {
                    "scores": []
                },
                "isAuto": true,
                "properties": [
                    "6266b18973926d7db654c453"
                ],
                "propertyTypes": [
                    "surveytest"
                ],
                "extendsAnswer": [],
                "rExtendsAnswer": [],
                "data": [
                    {
                        "code": [
                            "{\"type\":\"freeLocation\"}"
                        ],
                        "display": [
                            "Choose Map Location"
                        ],
                        "responses": [
                            "{\"mapSmall\":\"https://maps.googleapis.com/maps/api/staticmap?center=50.10371904560687,8.683996430877938&zoom=16&size=600x250&maptype=roadmap&markers=size:mid%7Ccolor:red%7C50.10371904560687,8.683996430877938\",\"mapLarge\":\"https://maps.googleapis.com/maps/api/staticmap?center=50.10371904560687,8.683996430877938&zoom=15&size=600x800&maptype=roadmap&markers=size:mid%7Ccolor:red%7C50.10371904560687,8.683996430877938\",\"lat\":50.10371904560687,\"lng\":8.683996430877938,\"mapAddress\":\"Danneckerstraße 22, 60594 Frankfurt am Main, Germany\"}"
                        ],
                        "process": [
                            "50.10371904560687",
                            "8.683996430877938"
                        ],
                        "_id": "6266b1b3b4c89e960d11ede8",
                        "user": "6266b1c2ca49087bf726f7a5",
                        "question": "6266b1c87e98752461a0e77a",
                        "contentType": "application/vnd.cotalker.survey+gps",
                        "identifier": "map_location"
                    }
                ],
                "uuid": "6266b1eca27999374d51418e",
                "survey": "6266b1f59366bc54b0e50a72",
                "formId": "6266b1fe1dbb5cc56c374b0e",
                "company": "6266b2032d89a95a36e217ee",
                "user": "6266b208c2b6eb8c2f90cc59",
                "createdAt": "2022-04-22T16:53:26.285Z",
                "startDate": "2022-04-22T16:53:26.285Z",
                "modifiedAt": "2022-04-22T18:50:34.246Z",
                "target": null,
                "channel": "6266b20d3c6071d05b50ee99",
                "__v": 1,
                "identifiersNeeded": [],
                "propertiesNeeded": []
            }
        ]
```

## Description {#description}

_Description of `answer.data` related to map locations._

Field | Description | Type | Notes
--- | --- | --- | ---
code | Contains special component details. | string[ ] | Objects within the array are found in string format.
code[x].type | Indicates the map type. Available options: `currentLocation`, `freeLocation`. | string | Object found in string format.
display | Indicates the survey question's displayed name on the form. | string[ ] |
responses | Contains all the submited map data: map images, address, latitude, longitude. | string[ ] | The response is an object in string format.
responses[x].mapSmall | URL of small map image. | string |
responses[x].mapLarge | URL of large map image. | string |
responses[x].lat | Latitude of the location. | number | 
responses[x].lng | Longitude of the location. | number |
responses[x].mapAddress | Written postal address of the location. | string |
process | Contains the latitude and longitude of the location. | string[ ] | The first string in the array corresponds to the latitude, the second to the longitude.

:::note
For a complete description, go to the [COTAnswer data model](/docs/documentation/models/surveys/model_answers) documentation.
:::
