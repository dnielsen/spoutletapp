
$(document).on('click', '.login-submit', function() {
    var username = $('.username').val();
    var password = $('.password').val();

    $.getJSON( getApiCall('api_key', username, password) , function (data) {


        localStorage.setItem('api-key', data);
        $('.login-link').hide();
        $('.logout-link').show();

    });

    $.mobile.navigate('#home', {transition: slideup});
});

$(document).on('click', '.logout-confirm', function() {

    localStorage.removeItem('api-key');
    $('.login-link').show();
    $('.logout-link').hide();

    $.mobile.navigate('#home', {transition: slideup});
});
