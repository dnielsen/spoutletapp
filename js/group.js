// Clear out all the data when you leave the page
$(document).on("pagebeforehide", "#group", function(e, data) {
    groupEntrySetList.empty();
    groupEntrySetDiv.hide();

    groupUpcomingEventsList.empty();
    groupUpcomingEventsDiv.hide();
   
    groupPastEventsList.empty();
    groupPastEventsDiv.hide();

    groupChildrenList.empty();
    groupChildrenDiv.hide();
});

$(document).on("pagebeforeshow", "#group", function(e, data) {

    var group_id = store.p1;

    if (group_id === null) {
        $.mobile.navigate('#groups');
    }
    
    $.getJSON(getApiCall('groups/'+group_id, 'fields=id,name,description,entrySetRegistration_id,parentGroup_id'), null, function(group) {

        $.getJSON(getApiCall('lists', 'fields=id,name&entrySetRegistration_id='+group.entrySetRegistration_id), null, function(lists) {

            if (lists !== null && lists.length > 0) {
                var entrySetsHtml = '';

                for (i = 0; i < lists.length; i++) {
                    entrySetsHtml += '<li><a href="#list" data-p1='+lists[i].id+' data-p2="group" data-p3='+group.id+'>'+lists[i].name+'</a></li>';
                }

                groupEntrySetList.html(entrySetsHtml);
                listify(groupEntrySetList);
                groupEntrySetDiv.slideDown();
            }
        });

        $.getJSON(getApiCall('events', 'fields=id,name&group_id='+group_id+'&private=0&starts_at=>'+(new Date()).toString()), null, function(upcomingEvents) {

            if (upcomingEvents.length > 0) {
                var upcomingEventsHtml = '';

                for (i = 0; i < upcomingEvents.length; i++) {
                    upcomingEventsHtml += '<li><a href="#event" data-p1=' + upcomingEvents[i].id + '>' + upcomingEvents[i].name + '</a></li>';
                }

                groupUpcomingEventsList.html(upcomingEventsHtml);
                listify(groupUpcomingEventsList);
                groupUpcomingEventsDiv.slideDown();
            }
        });

        $.getJSON(getApiCall('events', 'fields=id,name&group_id='+group_id+'&private=0&ends_at=<'+(new Date()).toString()), null, function(pastEvents) {

            if (pastEvents.length > 0) {
                var pastEventsHtml = '';

                for (i = 0; i < pastEvents.length; i++) {
                    pastEventsHtml += '<li><a href="#event" data-p1=' + pastEvents[i].id + '>' + pastEvents[i].name + '</a></li>';
                }

                groupPastEventsList.html(pastEventsHtml);
                listify(groupPastEventsList);
                groupPastEventsDiv.slideDown();
            }
        });

        $.getJSON(getApiCall('groups', 'fields=id,name&parentGroup_id='+group_id), null, function(regionalGroups) {

            if (regionalGroups.length > 0){
                var childrenHtml = '';

                for (i = 0; i < regionalGroups.length; i++) {
                    childrenHtml += '<li><a href="#group" data-p1=' + regionalGroups[i].id + ' data-ajax="false">' + regionalGroups[i].name + '</a></li>';
                }

                groupChildrenList.html(childrenHtml);
                listify(groupChildrenList);
                groupChildrenDiv.slideDown();
            }

        });

        /*if (group.avatarPath !== null) {
            $('.group-logo').attr('src', group.avatarPath);
            $('.group-title').empty();
        } else {*/
        $('.group-logo').attr('src', "images/logo-campsite-GA.png");
        $('.group-title').html(group.name);
        //}

        $('.group-description').html('<p>'+group.description+'</p>');

        if (group.parentGroup_id !== null ){
            upButton.html('<a href="#group" class="ui-btn ui-icon-arrow-l ui-btn-icon-left" data-p1='+group.parentGroup_id+' data-direction="reverse">Parent</a>');
        }
        else {
            upButton.html('<a href="#groups" class="ui-btn ui-icon-arrow-l ui-btn-icon-left" data-direction="reverse">Groups</a>');
        }
    });
    
});