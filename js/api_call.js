
var groups      = null;
var events      = null;
var entrySets   = null;
var entries     = null;


$.getJSON(getApiCall('groups', api_key), null, function(groups) {

    if (groups !== null) {
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
});

$.getJSON(getApiCall('events', api_key), null, function(events) {

    if (events !== null) {
        var eventList = '';
        for (i = 0; i < events.length; i++) {
            if (events[i].upcoming === true){
                eventList += '<li data-daterange="'+getDateRangeString(events[i].starts_at, events[i].ends_at)+'"><a href="#event" data-p1=' + events[i].id + ' data-p2=' + events[i].group_id + '>' + events[i].name + '</a></li>';
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
});

// $.getJSON(entrySetsRoute, null, function(entrySets) {
    
//     if (entrySets !== null) {
//         var entrySetList = '';
//         for (i = 0; i < entrySets.length; i++) {
//             entrySetList += '<li><a href="#entrySet" data-p1='+entrySets[i].id+' data-p2='+entrySets[i].parentType+' data-p3='+entrySets[i].parentId+'><h1>'+entrySets[i].name+'</h1><p>'+entrySets[i].parentName+'</p><p>'+entrySets[i].entries.length+' ideas</p></a></li>';
//         }
//         var entrySetsList = $('.entrySets-entrySet-list');
//         entrySetsList.append(entrySetList);
//         listify(entrySetsList);
//     }

//     $('.loading').hide();
//     $('.hidden').show();

// });
    

    