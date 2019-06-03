/*1. Convert to json. 
1. Needed params: The URL, params, method.
2. Append the API URL to the incoming url.
2. Return resource and page info data.
*/
export const makeAPICall = (url, queryParams=null, method) =>  {
    const finalUrl = buildUrl(API_URL+url, queryParams);
    return fetch(finalUrl, {method})
        .then(response => {
            console.log(response);
            if (response.status == 404) {
                return Promise.reject(404);
            } else if (response.status == 200) {
                return response.json()
                    .then((responseJson) => {
                        const resourceResults = fetchResults(responseJson);
                        const resultInformation = fetchInfo(responseJson);
                        
                        return ({resourceResults, resultInformation});
                    })
            } else {
                return Promise.reject(500);
            }
        })
        .catch(error => {
            return Promise.reject(error);
        });
}

export const fetchResults = jsonData => jsonData["results"];

export const fetchInfo = jsonData => jsonData["info"];

export const getNextPage = nextUrl => {
    console.log(nextUrl);
    var pageStr = nextUrl.split("page=");
    var regex = /\d+/;
    var res = pageStr[1];
    return parseInt(res.match(regex)[0]);
}

export const buildUrl = (url, parameters) => {
    let qs = "";
    for (const key in parameters) {
        if (parameters.hasOwnProperty(key)) {
            const value = parameters[key];
            if (value != "") {
                qs += encodeURIComponent(key) + "=" + encodeURIComponent(value) + "&";
            }
        }
    }
    if (qs.length > 0) {
        qs = qs.substring(0, qs.length - 1);
        url = url + "?" + qs;
    }

    return url;
}