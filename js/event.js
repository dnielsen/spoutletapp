/*
 * p1: id of group to load
 * p2: If this is a regional group, the id of the parent group. Null otherwise
 */
$(document).on("pagebeforeshow", "#event", function(e, data) {

    // Get storage variables and clear them out
    var eventId  = store.p1;
    var groupId  = store.p2;
    
    var event = null;
    var group = null;
    
    for (i = 0; i < events.length; i++) {
        if (events[i].id == eventId){
            event = events[i];
            break;
        }
    }
    
    for (i = 0; i < groups.length; i++) {
        if (groups[i].id == groupId){
            group = groups[i];
            break;
        }
    }
    
    if (event == null) {
        alert('event not found!');
    }
    if (group == null) {
        alert('group not found!');
    }
    
    if (event.avatarPath != null) {
        $('.event-logo').attr('src', event.avatarPath);
    } else {
        $('.event-logo').attr('src', "images/logo-campsite-GA.png");
    }

    $('.event-title').html(event.name);
    $('.event-description').html('<p>'+event.description+'</p>');
    
    $('#event-info').html('<h1>When?</h1><p>'+event.daterange+'</p><p>'+event.timerange+'</p><h1>Where?</h1><p>'+event.location+'</p><p>'+event.address1+'</p><p>'+event.address2+'</p>');
    
    var scheduleList    = $('.event-schedule-list');
    var unscheduledList = $('.event-unscheduled-list');
    var scheduleDiv     = $('.event-schedule');
    var unscheduledDiv  = $('.event-unscheduled');
    
    if (event.sessions != null ) {
        var sessions = '';
        var unscheduledSessions = '';
        
        for (i = 0; i < event.sessions.length; i++) {
            if (event.sessions[i].time != null) {
                sessions += '<li data-datestring="'+event.sessions[i].date+'"><a href="#session" data-p1=' + event.sessions[i].id + ' data-p2=' + eventId + '>' + event.sessions[i].name+'<p>'+event.sessions[i].time+'</p></a></li>';
            } else {
                unscheduledSessions += '<li><a href="#session" data-p1=' + event.sessions[i].id + ' data-p2=' + eventId + '>' + event.sessions[i].name+'</a></li>';
            }
        }
        
        scheduleList.html(sessions);
        unscheduledList.html(unscheduledSessions);
        
        scheduleList.listview({
            autodividers: true,
            autodividersSelector: function (li) {
                return $(li).data('datestring');
            }
        });
        
        if (sessions.length > 0) {
            listify(scheduleList);
            scheduleDiv.show();
        } else {
            scheduleList.empty();
            scheduleDiv.hide();   
        }
        if (unscheduledSessions.length > 0) {
            listify(unscheduledList);
            unscheduledDiv.show();
        } else {
            unscheduledList.empty();
            unscheduledDiv.hide();   
        }
    }
    
    var eventEntrySetList = $('.event-entrySet-list');
    var eventEntrySetDiv  = $('.event-entrySets');
    
    if (event.entrySets != null && event.entrySets.length > 0){
        var entrySets = '';
        for (i = 0; i < event.entrySets.length; i++) {
            entrySets += '<li><a href="#entrySet" data-p1=' + event.entrySets[i].id + ' data-p2="event" data-p3='+event.id+'>' + event.entrySets[i].name + '</a></li>';
        }
        eventEntrySetList.html(entrySets);
        listify(eventEntrySetList);
        eventEntrySetDiv.show();
    } else {
        eventEntrySetList.empty();
        eventEntrySetDiv.hide();
    }
    
    upButton.html('<a href="#group" class="ui-btn ui-icon-arrow-l ui-btn-icon-left" data-p1='+groupId+' data-p2='+group.parentId+' data-direction="reverse">Group</a>');

});