$(document).on("pagebeforeshow", "#session", function(e, data) {

    var sessionId   = store.p1;
    var eventId     = store.p2;
    
    var session = null;
    var event = null;
    
    for (i = 0; i < events.length; i++) {
        if (events[i].id == eventId){
            event = events[i];
            break;
        }
    }
    
    if (event == null) {
        alert('event not found!');
    }
    
    for (i = 0; i < event.sessions.length; i++){
        if (event.sessions[i].id == sessionId){
            session = event.sessions[i];
            break;
        }
    }
    
    if (session == null) {
        alert('session not found!');
    }
    
    if (event.avatarPath != null) {
        $('.session-logo').attr('src', event.avatarPath);
    } else {
        $('.session-logo').attr('src', "images/logo-campsite-GA.png");
    }

    $('.session-title').html(session.name);
    $('.session-time').html(session.date+'<br/>'+session.time);
    $('.session-description').html('<p>'+session.description+'</p>');
    
    var eventList = $('.session-event-list');
    var eventDiv  = $('.session-event');
    
    eventList.html('<li><a href="#event" data-p1='+event.id+' data-p2='+event.group+' data-direction="reverse">'+event.name+'</a></li>');
    listify(eventList);
    eventDiv.show();
});