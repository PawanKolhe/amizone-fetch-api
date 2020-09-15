# Amizone Fetch
REST API to fetch data from [Amizone](https://student.amizone.net/) using puppeteer

## Table of Contents
* [Endpoint](#endpoint)
* [Tech Used](#tech-used)
* [Environment Setup](#environment-setup)
* [API Docs](#api-docs)
    * [Getting Started](#getting-started)
    * [/courses](#courses)
    * [/credentials](#credentials)
    * [/faculty](#faculty)
    * [/grades](#grades)
    * [/photo](#photo)
    * [/reginfo](#reginfo)
    * [/schedule/today](#scheduletoday)
    * [/schedule/weekly](#scheduleweek)
    * [Error response](#how-to-use)
* [How to use](#how-to-use)
* [License](#license)

<a id="endpoint"></a>
## 📡 Endpoint
Live endpoint : `https://amizone-fetch.herokuapp.com`  

_or_
  
#### You can deploy your own instance on Heroku:  
[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/PawanKolhe/amizone-fetch-api)

<a id="tech-used"></a>
## 🧰 Tech Used
* [Node.js](https://nodejs.org/en/)
* [Express](https://expressjs.com/)
* [Puppeteer](https://github.com/puppeteer/puppeteer)
* [jsdom](https://github.com/jsdom/jsdom)

<a id="environment-setup"></a>
## ⚙️ Environment Setup
### Install dependencies
```bash
npm install
```
### Run locally
```bash
npm run dev
```

<a id="api-docs"></a>
## 📜 API Docs
### Getting Started

* Use **`POST`** request method for all requests.  
* Pass the following JSON body for all requests:
```javascript
{
    "username": "<YOUR-AMIZONE-USERNAME>",
    "password": "<YOUR-AMIZONE-PASSWORD>"
}
```
> These Amizone login credentials are required for authentication while fetching data.

### Resources
### `/courses`
Get all courses
#### Response
```javascript
[
    {
        "code": "IFTXXXX",
        "name": "Android Programming",
        "type": "Compulsory",
        "attendance": {
            "attended": 17,
            "total": 17,
            "unattended": 0,
            "percent": 100
        }
    },
    ...
]
```

### `/credentials`
Get all credentials available on the amizone home page
#### Response
```javascript
{
    "amityEmail": {
        "id": "",
        "password": ""
    },
    "msTeams": {
        "id": "",
        "password": ""
    },
    "opac": {
        "id": "",
        "password": ""
    },
    "formNumber": ""
}
```

### `/faculty`
Get faculty info
#### Response
```javascript
[
    {
        "subjectShort": "[Android Progr]  [IFTXXXX]",
        "subject": " Android Programming [Android Progr]  [IFTXXXX] ",
        "facultyPhoto": "https://...",
        "name": "Dr Someone"
    },
    ...
]
```

### `/grades`
Get grades info
#### Response
```javascript
[
    {
        "semester": "1",
        "sgpa": "9.36",
        "cgpa": "",
        "backPapers": "0"
    },
    {
        "semester": "2",
        "sgpa": "9.44",
        "cgpa": "9.40",
        "backPapers": "0"
    },
    ...
]
```

### `/photo`
Get photo link
#### Response
```javascript
{
    "photoUrl": "https://..."
}
```

### `/reginfo`
Get registration info
#### Response
```javascript
{
    "semester": "5",
    "photo": "https://...",
    "enrollmentno": "A...",
    "name": "John Doe",
    "program": "B.Sc. Comp. Sci.",
    "batch": "2018-2021",
    "dob": "",
    "email": "",
    "contactaddress": "",
    "contactpincode": "",
    "contactphone": "",
    "contactmobile": "",
    "fax": "",
    "fathername": "",
    "permanentaddress": "",
    "permanentpincode": "",
    "permanentphone": "",
    "permanentfax": "",
    "hostel": "",
    "homeaddress": "",
    "homecity": "",
    "homepincode": "",
    "hometelephone": "",
    "homemobile": "",
    "homeemail": ""
}
```

### `/schedule/today`
Get today's schedule
#### Response
```javascript
[
    {
        "courseTitle": "ASP.NET with C# Programming",
        "courseCode": "IFTXXXX",
        "facultyName": "Mr Someone",
        "start": "9/15/2020 9:10:00 AM",
        "end": "9/15/2020 10:00:00 AM",
        "roomNumber": "320",
        "attendanceColor": "#3a87ad",
        "allDay": false
    },
    ...
]
```

### `/schedule/week`
Get weekly schedule (Sunday to Saturday)
#### Response
```javascript
{
    "Monday": [
        {
            "fromTime": "09:10",
            "toTime": "10:00",
            "courseCode": "IFTXXXX",
            "courseTeacher": "Mr Someone",
            "classLocation": "120"
        },
        ...
    ],
    "Tuesday": [
        {
            "fromTime": "09:10",
            "toTime": "10:00",
            "courseCode": "IFTXXXX",
            "courseTeacher": "Ms Someone",
            "classLocation": "230" 
        }
        ...
    ],
    ...
}
```

### Error Response
HTTP Code: 408
```javascript
{
    "error": "Request Timeout"
}
```

<a id="how-to-use"></a>
## ❔ How to use
### JavaScript
You can use the browser's [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)  
```javascript
const endpoint = 'https://amizone-fetch.herokuapp.com';

fetch(`${endpoint}/courses`, {
    method: 'POST',
    body: JSON.stringify({
        'username': '<YOUR-AMIZONE-USERNAME>',
        'password': '<YOUR-AMIZONE-PASSWORD>'
    }),
    headers: {
        'Content-Type': 'application/json'
    }
})
.then(response => response.json())
.then(data => {
    console.log(data);
});
```
_or_ you can choose to use the [axios](https://github.com/axios/axios) library
```html
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
```
```javascript
axios.post(`/courses`, {
    'username': '<YOUR-AMIZONE-USERNAME>',
    'password': '<YOUR-AMIZONE-PASSWORD>'
  },{
    baseURL: 'https://amizone-fetch.herokuapp.com'
  })
  .then(function (response) {
    console.log(response.data);
  });
```

### Python
Install requests library
```bash
pip install requests
```
Make request
```python
import requests
response = requests.post("https://amizone-fetch.herokuapp.com/courses", data = {
    'username': '<YOUR-AMIZONE-USERNAME>',
    'password': '<YOUR-AMIZONE-PASSWORD>'
})
print(response.json())
```


<a id="license"></a>
## 📜 License
This software is open source, licensed under the [MIT License](https://github.com/PawanKolhe/amizone-fetch-api/blob/master/LICENSE).
