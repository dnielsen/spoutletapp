$(document).on("pagebeforeshow", "#groups", function(e, data) {

    $.getJSON(getApiCall('groups', null, null, 'fields=id,name,category&sort_by=name'), null, function(groups) {

        var groupsList = $('.groups-group-list');

        if (groups !== null) {
            var groupHtml = '';

            for (i = 0; i < groups.length; i++) {
                if (groups[i].category == 'topic'){
                    groupHtml += '<li><a href="#group" data-p1=' + groups[i].id + ' data-ajax="false">' + groups[i].name + '</a></li>';
                }
            }

            groupsList.html(groupHtml);
            listify(groupsList);
        }

        $('.groups-loading').hide();
        groupsList.show();
    });
});

$(document).on("pagebeforeshow", "#events", function(e, data) {

    $.getJSON(getApiCall('events', null, null, 'fields=id,name,starts_at,ends_at&sort_by=starts_at'), null, function(events) {

        var eventsList = $('.events-event-list');

        if (events !== null) {
            var eventHtml = '';

            for (i = 0; i < events.length; i++) {
                if ((new Date(events[i].starts_at)) >= (new Date())){
                    eventHtml += '<li data-daterange="'+getDateRangeString(events[i].starts_at, events[i].ends_at)+'"><a href="#event" data-p1='+events[i].id+'>'+events[i].name+'</a></li>';
                }
            }

            eventsList.html(eventHtml);
            eventsList.listview({
                autodividers: true,
                autodividersSelector: function (li) {
                    return $(li).data('daterange');
                }
            });
            
            listify(eventsList);
        }
         $('.events-loading').hide();
         eventsList.show();
    });
});

$(document).on("pagebeforeshow", "#lists", function(e, data) {

    $.getJSON(getApiCall('lists/popular'), null, function(entrySets) {

        var entrySetsList = $('.entrySets-entrySet-list');
        
        if (entrySets !== null) {
            var entrySetHtml = '';

            for (i = 0; i < entrySets.length; i++) {
                entrySetHtml += '<li><a href="#entrySet" data-p1='+entrySets[i].id+'><h1>'+entrySets[i].name+'</h1><p>Parent Name</p><p>'+entrySets[i].popularity+' ideas</p></a></li>';
            }

            entrySetsList.html(entrySetHtml);
            listify(entrySetsList);
        }

        $('.entrySets-loading').hide();
        entrySetsList.show();

    });
});
    

    