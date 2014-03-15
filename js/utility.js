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
 *     - If no auth needed, leave null
 * auth2 
 *     - If using username/password, this is the password. 
 *     - If using api key, leave null
 * params
 *     - Any additional parameters on the call
 *     - i.e., expand, verbose, etc.
 */
function getApiCall(route, auth1, auth2, params) {

    var api_call         = api_channel + '://';
    var api_host_segment = api_host;

    if (auth1 !== undefined && auth1 !== null) {
        api_call += auth1;
        api_host_segment = '@' + api_host_segment;
    }

    if (auth2 !== undefined && auth2 !== null) {
        api_call += ':' + auth2;
    }
    
    if (params !== undefined && params !== null) {
        route += '?' + params + '&callback=?';
    } else {
        route += '?callback=?';
    }
    
    api_call += api_host_segment + '/' + route;

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
        return (startDate == endDate) ? startDate+', '+startYear : startDate+' - '+endDate+', '+startYear;
    } else {
        return startDate+', '+startYear+' - '+endDate+', '+endYear;
    }
}

/**
 * Takes starts_at and ends_at timestamps
 * Returns a pretty time range string
 */
function getTimeRangeString(starts_at, ends_at) {

    var start       = new Date(starts_at);
    var end         = new Date(ends_at);

    var startHours  = start.getHours();
    var endHours    = end.getHours();
    var startSuffix = 'am';
    var endSuffix   = 'am';

    if (startHours > 12) {
        startHours -= 12;
        startSuffix = 'pm';
    }
    if (endHours > 12) {
        endHours -= 12;
        endSuffix = 'pm';
    }

    var startMinutes = start.getMinutes();
    var endMinutes   = end.getMinutes();

    if (startMinutes < 10) {
        startMinutes = '0' + startMinutes;
    }
    if (endMinutes < 10) {
        endMinutes = '0' + endMinutes;
    }

    return startHours+':'+startMinutes+startSuffix+' - '+endHours+':'+endMinutes+endSuffix;
}

/**
 * Give me a listview object, I'll make sure it's a jquery listview
 */
function listify(listObject) {
    try { listObject.listview('refresh'); } catch (e) { listObject.listview(); }
}
