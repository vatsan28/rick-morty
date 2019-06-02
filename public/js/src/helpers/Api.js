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
            // if (value != "") {
                qs += encodeURIComponent(key) + "=" + encodeURIComponent(value) + "&";
            // }
        }
    }
    if (qs.length > 0) {
        qs = qs.substring(0, qs.length - 1);
        url = url + "?" + qs;
    }

    return url;
}