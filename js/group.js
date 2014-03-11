$(document).on("pagebeforeshow", "#group", function(e, data) {

    var groupId  = store.p1;
    
    $.getJSON(getApiCall('groups/'+groupId), null, function(group) {

        if (group === null) {
            alert('group not found!');
            $.mobile.navigate('#groups');
        }

        /*if (group.avatarPath !== null) {
            $('.group-logo').attr('src', group.avatarPath);
            $('.group-title').empty();
        } else {*/
        $('.group-logo').attr('src', "images/logo-campsite-GA.png");
        $('.group-title').html(group.name);
        //}

        $('.group-description').html('<p>'+group.description+'</p>');


       /*var groupEntrySetList = $('.group-entrySet-list');
        var groupEntrySetDiv  = $('.group-entrySets');
        
        if (group.entrySets !== null && group.entrySets.length > 0) {
            var entrySets = '';
            for (i = 0; i < group.entrySets.length; i++) {
                entrySets += '<li><a href="#entrySet" data-p1='+group.entrySets[i].id+' data-p2="group" data-p3='+group.id+'>'+group.entrySets[i].name+'</a></li>';
            }
            groupEntrySetList.html(entrySets);
            listify(groupEntrySetList);
            groupEntrySetDiv.show();
        } else {
            groupEntrySetList.empty();
            groupEntrySetDiv.hide();
        }

        var groupEventList = $('.group-event-list');
        var groupEventsDiv = $('.group-events');
        
        if (group.upcomingEvents != null && group.upcomingEvents.length > 0){
            var events = '';
            for (i = 0; i < group.upcomingEvents.length; i++) {
                events += '<li><a href="#event" data-p1=' + group.upcomingEvents[i].id + ' data-p2=' + group.id + '>' + group.upcomingEvents[i].name + '</a></li>';
            }
            groupEventList.html(events);
            listify(groupEventList);
            groupEventsDiv.show();
        } else {
            groupEventList.empty();
            groupEventsDiv.hide();
        }
        
        var groupPastEventList = $('.group-past-event-list');
        var groupPastEventsDiv = $('.group-past-events');
        
        if (group.pastEvents != null && group.pastEvents.length > 0){
            var events = '';
            for (i = 0; i < group.pastEvents.length; i++) {
                events += '<li><a href="#event" data-p1=' + group.pastEvents[i].id + ' data-p2=' + group.id + '>' + group.pastEvents[i].name + '</a></li>';
            }
            groupPastEventList.html(events);
            listify(groupPastEventList);
            groupPastEventsDiv.show();
        } else {
            groupPastEventList.empty();
            groupPastEventsDiv.hide();
        }
        
        var groupGroupList = $('.group-group-list');
        var groupGroupDiv  = $('.group-groups');
        
        if (group.children != null && group.children.length > 0){
            var children = '';
            for (i = 0; i < group.children.length; i++) {
                children += '<li><a href="#group" data-p1=' + group.children[i].id + ' data-p2=' + group.id + ' data-ajax="false">' + group.children[i].name + '</a></li>';
            }
            groupGroupList.html(children)
            listify(groupGroupList);
            groupGroupDiv.show();
        } else {
            groupGroupList.empty();
            groupGroupDiv.hide();
        }*/
        
        if (group.parentGroup_id !== null ){
            upButton.html('<a href="#group" class="ui-btn ui-icon-arrow-l ui-btn-icon-left" data-p1='+parentId+' data-direction="reverse">Parent</a>');
        }
        else {
            upButton.html('<a href="#groups" class="ui-btn ui-icon-arrow-l ui-btn-icon-left" data-direction="reverse">Groups</a>');
        }

    });


});