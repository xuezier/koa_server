# Custom request Module

send a http.request,allowed 'POST','GET','PUT','DELETE'.

## Usage 
````javascript
    request(url[,options,callback]);  // default Get

    request({
        url:url,
        method:'GET',    // if null , default 'GET'
        ...
    }[,callback]);
````

## options
    url
    method
    headers
    data

## callback
    has 3 paramters 
    statusCode
    response
    body


