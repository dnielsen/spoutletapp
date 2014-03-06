$(document).on("pagebeforeshow", "#entry", function(e, data) {

    var entryId     = store.p1;
    var entrySetId  = store.p2;
    
    for (i = 0; i < entrySets.length; i++) {
        if (entrySets[i].id == entrySetId){
            entrySet = entrySets[i];
            break;
        }
    }
    
    for (i = 0; i < entrySet.entries.length; i++){
        if (entrySet.entries[i].id == entryId){
            entry = entrySet.entries[i];
            break;
        }
    }
    
    if (entry == null) {
        alert('entry not found!');
    }
    if (entrySet == null) {
        alert('entrySet not found!');
    }
    
    if (entrySet.avatarPath != null) {
        $('.entry-logo').attr('src', entrySet.avatarPath);
    } else {
        $('.entry-logo').attr('src', "images/logo-campsite-GA.png");
    }

    $('.entry-title').html(entry.name);
    $('.entry-description').html('<p>'+entry.description+'</p>');
    
    upButton.html('<a href="#entrySet" class="ui-btn ui-icon-arrow-l ui-btn-icon-left" data-p1='+entrySet.id+' data-p2='+entrySet.parentType+' data-p3='+entrySet.parentId+' data-direction="reverse">List</a>');
    
});