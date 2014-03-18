$(document).on("pagebeforehide", "#list", function(e, data) {
    entrySetEntryList.empty();
    entrySetEntriesDiv.hide();
});

$(document).on("pagebeforeshow", "#list", function(e, data) {

    var entry_set_id  = store.p1;
    
    if (entry_set_id === null) {
        $.mobile.navigate('#entrySets');
    }
    
    // Get general data about the list
    $.getJSON(getApiCall('lists/'+entry_set_id), null, function(entrySet) {

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

    // Get the entries for the list, sorted by id
    $.getJSON(getApiCall('entries', 'fields=id,name&entrySet_id='+entry_set_id+'&sort_by=id'), null, function(entries) {

        // Get votes for all entries in this list, sorted by entry id
        $.getJSON(getApiCall('votes', 'fields=idea,user&idea_details="entrySet_id='+entry_set_id+'"&sort_by=idea'), null, function(votes) {

            if (votes.length > 0) {
                var this_entry_id = votes[0].idea;
                var vote_counter  = 0;
                var entry_idx     = 0;

                // Iterate through the votes and update the data in the entry list
                for (var v in votes) {

                    // Fast forward past entries that don't have votes
                    for (; entry_idx < entries.length; entry_idx++) {
                        if (entries[entry_idx].id == this_entry_id) {
                            break;
                        }
                    }
                    
                    // // If this vote was made by the current user, change the vote button for this entry to an unvote button
                    // if (votes[v].user == username) {
                    //     entries[entry_idx].voted = true;
                    // }

                    // If we are done with this entry, record the number of votes, reset the counter, and move on to the next one
                    if (votes[v].idea != this_entry_id) {
                        entries[entry_idx].num_votes = vote_counter;
                        entry_idx++;
                        vote_counter = 0;
                        this_entry_id = votes[v].idea;
                    } 

                    // Increment the vote counter for the current entry
                    vote_counter++;

                    // If this is the last vote, record the number of votes now, as there won't be another iteration to do it in
                    if (v == votes.length-1) {
                        entries[entry_idx].num_votes = vote_counter;
                    }

                }
            }

            // Sort entry list by number of votes
            entries.sort(function(a, b) {
                if (a.num_votes === undefined) { a.num_votes = 0; }
                if (b.num_votes === undefined) { b.num_votes = 0; }
                return b.num_votes - a.num_votes;
            });

            // Populate list with entry data and vote buttons
            if (entries.length > 0) {
                var entriesHtml = '';
                for (var i = 0; i < entries.length; i++) {

                    entriesHtml += '<li><a href="#entry" data-p1='+entries[i].id+'>'+entries[i].name+'<p>'+entries[i].num_votes+' votes</p></a><a href="javascript:void(0);" data-id='+entries[i].id;

                    // if (entries[i].voted !== undefined) {
                    //     entriesHtml += ' class="unVoteBtn" data-icon="arrow-d"></a></li>';
                    // } else {
                        entriesHtml += ' class="voteBtn" data-icon="arrow-u"></a></li>';
                    // }
                }
                entrySetEntryList.html(entriesHtml);
                listify(entrySetEntryList);
                entrySetEntriesDiv.show();
            }
        });
    });
});