$(document).on("pagebeforeshow", "#entrySet", function(e, data) {

    var entrySetId  = store.p1;
    var parentType  = store.p2;
    var parentId    = store.p3;
    
    for (i = 0; i < entrySets.length; i++) {
        if (entrySets[i].id == entrySetId){
            entrySet = entrySets[i];
            break;
        }
    }
    
    var parent = null;
    var parentCollection = null;
    
    if (parentType == 'group') {
        parentCollection = groups;
    }
    else {
        parentCollection = events;
    }
    
    
    for (i = 0; i < parentCollection.length; i++) {
        if (parentCollection[i].id == parentId){
            parent = parentCollection[i];
            break;
        }
    }
    
    if (parent == null) {
        alert(parentType + ' not found!');
    }
    
    if (parent.avatarPath != null) {
        $('.entrySet-logo').attr('src', parent.avatarPath);
    } else {
        $('.entrySet-logo').attr('src', "images/logo-campsite-GA.png");
    }

    $('.entrySet-title').html(entrySet.name);
    $('.entrySet-description').html('<p>'+entrySet.description+'</p>');
    
    var entryList = $('.entrySet-entry-list');
    var entriesDiv  = $('.entrySet-entries');
    
    if (entrySet.entries != null && entrySet.entries.length > 0){
        var entries = '';
        for (i = 0; i < entrySet.entries.length; i++) {
            entries += '<li><a href="#entry" data-p1='+entrySet.entries[i].id+' data-p2='+entrySet.id+'>'+entrySet.entries[i].name+'<p>'+entrySet.entries[i].numVotes+' votes</p></a></li>';
        }
        entryList.html(entries);
        listify(entryList);
        entriesDiv.show();
    } else {
        entryList.empty();
        entriesDiv.hide();
    }
    
    var parentLink = '';
    
    if (parentType == 'group') {
        parentLink = '<a href="#group" class="ui-btn ui-icon-arrow-l ui-btn-icon-left" data-p1='+parentId+' data-p2='+parent.parentId+' data-direction="reverse">Group</a>';
    }
    else {
        parentLink = '<a href="#event" class="ui-btn ui-icon-arrow-l ui-btn-icon-left" data-p1='+parentId+' data-p2='+parent.group+' data-direction="reverse">Event</a>';
    }
    
    upButton.html(parentLink);

});