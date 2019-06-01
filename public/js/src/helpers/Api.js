export const fetchResults = jsonData => jsonData["results"];

export const fetchInfo = jsonData => jsonData["info"];

export const getNextPage = nextUrl => {
    var pageStr = nextUrl.split("page=");
    var regex = /\d+/;
    var res = pageStr[1];
    return parseInt(res.match(regex)[0]);
}