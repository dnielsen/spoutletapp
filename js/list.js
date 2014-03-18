// Clear out all the data when you leave the page
$(document).on("pagebeforehide", "#list", function(e, data) {
    entrySetEntryList.empty();
    entrySetEntriesDiv.hide();
});

$(document).on("pagebeforeshow", "#list", function(e, data) {

    var entry_set_id  = store.p1;
    
    if (entry_set_id === null) {
        $.mobile.navigate('#entrySets');
    }
    
    $.getJSON(getApiCall('lists/'+entry_set_id), null, function(entrySet){

        $.getJSON(getApiCall('entries', 'fields=id,name&entrySet_id='+entry_set_id), null, function(entries) {
            if (entries.length > 0) {
                var entriesHtml = '';
                for (i = 0; i < entries.length; i++) {
                    entriesHtml += '<li><a href="#entry" data-p1='+entries[i].id+'>'+entries[i].name+'<p>'+entries[i].popularity+' votes</p></a><a href="javascript:void(0);" id="vote" data-id='+entries[i].id+' data-icon="arrow-u" class="voteBtn"></a></li>';
                }
                entrySetEntryList.html(entriesHtml);
                listify(entrySetEntryList);
                entrySetEntriesDiv.show();
            }
        });
         
        // if (parent.avatarPath != null) {
        //     $('.entrySet-logo').attr('src', parent.avatarPath);
        // } else {
        $('.entrySet-logo').attr('src', "images/logo-campsite-GA.png");
        // }
        
        $('.entrySet-title').html(entrySet.name);

        if (entrySet.description !== null) {
            $('.entrySet-description').html('<p>'+entrySet.description+'</p>');    
        }
        
        var parentType = 'Event';
        if (entrySet.entrySetRegistration.scope == 'GroupBundle:Group') {
            parentType = 'Group';
        }
        upButton.html('<a href="#'+parentType.toLowerCase()+'" class="ui-btn ui-icon-arrow-l ui-btn-icon-left" data-p1='+entrySet.entrySetRegistration.containerId+' data-direction="reverse">'+parentType+'</a>');

    });
});