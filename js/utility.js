// On app load, configure jquery and get DOM elements
$(function() {

    $.mobile.defaultPageTransition = 'slide';  

    // This is necessary for navigating to a child/parent group, since it is the same "page"
    $.mobile.changePage.defaults.allowSamePageTransition = true;

    // Up button exists in footer of most pages, goes to either the items parent, or the collection it's in
    upButton                = $('.upButton');

    // All Group Containers
    groupEntrySetDiv        = $('.group-entrySets');
    groupEntrySetList       = $('.group-entrySet-list');
    groupUpcomingEventsDiv  = $('.group-upcoming-events');
    groupUpcomingEventsList = $('.group-upcoming-event-list');
    groupPastEventsDiv      = $('.group-past-events');
    groupPastEventsList     = $('.group-past-event-list');
    groupChildrenDiv        = $('.group-children');
    groupChildrenList       = $('.group-children-list');

    // All Event Containers
    eventScheduleDiv        = $('.event-schedule');
    eventScheduleList       = $('.event-schedule-list');
    eventUnscheduledDiv     = $('.event-unscheduled');
    eventUnscheduledList    = $('.event-unscheduled-list');
    eventEntrySetDiv        = $('.event-entrySets');
    eventEntrySetList       = $('.event-entrySet-list');

    // All List Containers
    entrySetEntriesDiv      = $('.entrySet-entries');
    entrySetEntryList       = $('.entrySet-entry-list');

    // Host address for API calls
    api_channel             = 'http';
    api_host                = 'localhost:3000';
});

/**
 * Links can pass data between pages by adding the data-px attribute
 * i.e, <a href="#group" data-p1=16>Group Sixteen</a>
 */
store = {
    p1: null,
    p2: null,
    p3: null
};
$(document).on('click', 'a', function(){
    store.p1 = $(this).data('p1');
    store.p2 = $(this).data('p2');
    store.p3 = $(this).data('p3');
});

/**
 * Get user credentials from localStorage, show login/logout links as needed
 * Only need to check for api_key, as that is the only thing deleted on logout
 */
$(document).on('pagebeforeshow', '#home', function(e, data) {

    api_key  = localStorage['api_key'];
    user_id  = localStorage['user_id'];
    username = localStorage['username'];

    if (api_key === undefined) {
        $('.login-link').show();
        $('.logout-link').hide();
    } else {
        $('.logout-link').show();
        $('.login-link').hide();
    }
});

/**
 * Construct the api call
 * 
 * route 
 *     - the route for the api call
 * params
 *     - Any additional parameters on the call
 *     - i.e., expand, verbose, fields etc.
 * auth1 
 *     - If using username/password, this is the username. 
 *     - If using api key, this is the api key
 *     - If no auth needed, leave null
 * auth2 
 *     - If using username/password, this is the password. 
 *     - If using api key, leave null
 */
function getApiCall(route, params, auth1, auth2) {

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
 * Prepopulate username field from last login
 */
$(document).on('pageshow', '#login', function() {
    if (username !== undefined) {
        $('.username').val(username);
        $('.password').focus();
    }
    else {
        $('.username').focus();
    }
});

/**
 * On login, authenticate with username/password to get API key and save it to local storage
 * All future calls requiring authentication will use the stored API key
 */
$(document).on('click', '.login-submit', function() {
    var username = $('.username').val();
    var password = $('.password').val();

    $.getJSON( getApiCall('api_key', null, username, password) , function (user_data) {
        localStorage.setItem('api_key',  user_data.api_key);
        localStorage.setItem('user_id',  user_data.id);
        localStorage.setItem('username', user_data.username);
        $('.login-link').hide();
        $('.logout-link').show();
    });

    $.mobile.navigate('#home', {transition: 'slideup'});
});

/**
 * Remove api key from local storage when user asks to logout
 */
$(document).on('click', '.logout-confirm', function() {

    localStorage.removeItem('api_key');
    $('.login-link').show();
    $('.logout-link').hide();

    $.mobile.navigate('#home', {transition: 'slideup'});
});

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
 * Takes a listview element and ensures it's a jquery listview object
 * Should be called whenever a list is created or updated
 */
function listify(listObject) {
    try { listObject.listview('refresh'); } catch (e) { listObject.listview(); }
}

// To display error message, set the data-message attribute of the message link and click it (wip)
// messageLink = $('#messageLink');
// $(document).on('click', '#messageLink', function(){
//     $('#message').html('<p>'+$(this).data('message')+'</p>');
// });
