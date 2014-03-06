var campsiteApi  = 'http://www.campsite.org/api/mobile/';
var campsiteData = null;
var groups       = null;
var events       = null;

// Make mobile API call and populate Browse Groups and Upcoming Events pages
$.getJSON(campsiteApi, null, function(campsiteData) {

    groups = campsiteData.groups;
    if (groups != null) {
        var groupList = '';
        for (i = 0; i < groups.length; i++) {
            if (groups[i].category == 'topic'){
                groupList += '<li><a href="#group" data-p1=' + groups[i].id + ' data-ajax="false">' + groups[i].name + '</a></li>';
            }
        }
        var groupsList = $('.groups-group-list');
        groupsList.append(groupList);
        listify(groupsList);
    }

    events = campsiteData.events;
    if (events != null) {
        var eventList = '';
        for (i = 0; i < events.length; i++) {
            if (events[i].upcoming == true){
                eventList += '<li data-daterange="'+events[i].startDateString+'"><a href="#event" data-p1=' + events[i].id + ' data-p2=' + events[i].group + '>' + events[i].name + '</a></li>';
            }
        }
        var eventsList = $('.events-event-list');
        eventsList.append(eventList);
        
        eventsList.listview({
            autodividers: true,
            autodividersSelector: function (li) {
                return $(li).data('daterange');
            }
        });
        
        listify(eventsList);
    }
    
    entrySets = campsiteData.entrySets;
    if (entrySets != null) {
        var entrySetList = '';
        for (i = 0; i < entrySets.length; i++) {
            entrySetList += '<li><a href="#entrySet" data-p1='+entrySets[i].id+' data-p2='+entrySets[i].parentType+' data-p3='+entrySets[i].parentId+'><h1>'+entrySets[i].name+'</h1><p>'+entrySets[i].parentName+'</p><p class="ul-li-count">'+entrySets[i].entries.length+'</p></a></li>';
        }
        var entrySetsList = $('.entrySets-entrySet-list');
        entrySetsList.append(entrySetList);
        listify(entrySetsList);
    }
    
});

    