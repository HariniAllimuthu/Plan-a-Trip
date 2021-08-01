$(document).ready(function() {
    var city_name = $('.city-name');
    var weather_icon = $('.weather-icon');
    var city_temp = $('.city-temp');  
    var dest_image = $('.dest-info');
    var dest_city = $('.dest-city');
    var submit_btn = $('.js-submit');
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    var mobile_regex = /^[0-9-+]+$/;

    function timer () {
        var date = new Date("Aug 8, 2021 18:00:00").getTime();
        var now = new Date();
        var diff = (date-now) / 1000;
        var days = parseInt(diff / 3600 / 24);
        var hours = parseInt(diff % (3600 * 24) / 3600);
        var minutes = parseInt(diff % 3600 / 60);
        var seconds = parseInt(diff % 60);
        var $timer = $('.js-timer');
 
        $timer.text(days +'d' + ' ' + hours +'h' + ' ' + minutes +'m' + ' ' + seconds +'s');
    }
    timer();
    setInterval(timer, 1000);
    $.getJSON("weather.json", 
        function (data) {
            $.each(data.result, function (key, value) {
                $(city_name[key]).text(value.city);
                $(city_temp[key]).text(value.temp_Celsius).append('&deg;');
            });
        });
        $.getJSON("destination.json", 
        function (data) {
            $.each(data.result, function (key, value) {
                $(dest_city[key]).text(value.city);
                //$(img_src[key]).attr('src',value.imageUrl);
                $(dest_image[key]).css('background-image','url(' + value.imageUrl + ')');
            });
        });

        submit_btn.click(function(event){
            event.preventDefault();
            if(($('input#name').val().length === 0)) {
                $('input#name').addClass('error');
            } else {
                $('input#name').removeClass('error');
            }
            if(($('input#phone').val().length === 0) || !(mobile_regex.test($('input#phone').val()))) {
                $('input#phone').addClass('error');
            } else {
                $('input#phone').removeClass('error');
            }
            if((($('input#email').val().length === 0) || !(regex.test($('input#email').val())))) {
                $('input#email').addClass('error');
            } else {
                $('input#email').removeClass('error');
            }
            
        });

});
