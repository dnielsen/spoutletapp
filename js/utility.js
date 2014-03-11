// Host address for API calls
api_channel = 'http';
api_host    = 'api.campsite.org';
api_key     = localStorage['api-key'];

/**
 * Construct the api call
 * 
 * route 
 *     - the route for the api call
 * auth1 
 *     - If using username/password, this is the username. 
 *     - If using api key, this is the api key
 * auth2 
 *     - If using username/password, this is the password. 
 *     - If using api key, do not include this parameter
 */
function getApiCall(route, auth1, auth2) {

    var api_call         = api_channel + '://';
    var api_host_segment = api_host;

    if (arguments.length > 1) {
        api_call += auth1;
        api_host_segment = '@' + api_host_segment;
    }

    if (arguments.length == 3) {
        api_call += ':' + auth2;
    }

    api_call += api_host_segment + '/' + route + '?callback=?';

    return api_call;
}

/**
 * Takes starts_at and ends_at timestamps
 * Returns a pretty date range string
 */
function getDateRangeString(starts_at, ends_at) {

    var monthNames = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];

    var start = new Date(starts_at);
    var end   = new Date(ends_at);

    var startDate = monthNames[start.getMonth()]+' '+start.getDate();
    var startYear = start.getFullYear();

    var endDate = monthNames[end.getMonth()]+' '+end.getDate();
    var endYear  = end.getFullYear();


    if (startYear == endYear) {
        return (startDate == endDate) ? startDate+', '+endYear : startDate+' - '+endDate+', '+startYear;
    } else {
        return startDate+', '+startYear+' - '+endDate+', '+endYear;
    }
}

/**
 * Give me a listview object, I'll make sure it's a jquery listview
 */
function listify(listObject) {
    try { listObject.listview('refresh'); } catch (e) { listObject.listview(); }
}
