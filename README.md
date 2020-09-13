# Amizone Fetch
REST API to fetch data from Amizone using puppeteer

## Table of Contents
* [Tech Used](#tech-used)
* [Environment Setup](#environment-setup)
* [API Docs](#api-docs)
    * [/courses](#courses)
    * [/photo](#photo)
    * [/reginfo](#reginfo)
    * [Error response](#error-response)

## Endpoint
Live endpoint: https://amizone-fetch.herokuapp.com  
> You can deploy your own instance on Heroku:

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/PawanKolhe/amizone-fetch)

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

* Use **`POST`** request method for all requests.  
* Pass the following JSON body for all requests:
```json
{
    "username": <YOUR-AMIZONE-USERNAME>,
    "password": <YOUR-AMIZONE-PASSWORD>
}
```
> These Amizone login credentials are required to fetch data.

### `/courses`
Get all courses
#### Response
```javascript
{
    "courses": [
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
        }
        ...
    ]
}
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
    "": ""
}
```

### Error Response
HTTP Code: 408
```javascript
{
    "error": "Request Timeout"
}
```
