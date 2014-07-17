$(function() {
    var group_slug = getQueryVariable('group');

    $.getJSON(getApiCall('groups', 'slug='+group_slug+'&fields=id'), function(groups) {
        if (groups[0].id) {
            store.p1 = groups[0].id;
            $.mobile.navigate('#group');
        }
    });
});
