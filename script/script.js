var boxes = [];

$(document).ready(function(){

    boxes.push(new Box("elof", "md-home", "http://www.eloflindalvsgymnasium.kungsbacka.se/", "true", "blue"));
    boxes.push(new Box("fronter", "md-chevron-right", "https://fronter.com/kungsbacka/", "true", "indigo"));
    boxes.push(new Box("bamba", "md-local-restaurant", "http://meny.dinskolmat.se/elof-lindalvs-gymnasium/", "true", "red"));
    boxes.push(new Box("schema", "md-event", "http://www.novasoftware.se/webviewer/(S(woosp355gavkls55molunc55))/design1.aspx?schoolid=29540&code=123774", "true", "purple"));

    boxes.push(new Box("office", "md-cloud", "https://www.office.com/", false, "orange"));
    boxes.push(new Box("bibliotek", "md-book", "http://www.eloflindalvsgymnasium.kungsbacka.se/For-elever/Bibliotek1/", false, "red"));
    boxes.push(new Box("skola24", "md-access-time", "https://kungsbacka.skola24.se/", false, "green"));
    boxes.push(new Box("mail", "md-email", "https://webmail.kungsbacka.se/owa/auth/logon.aspx?replaceCurrent=1&reason=3&url=https%3a%2f%2fwebmail.kungsbacka.se%2fowa%2f", false, "orange"));
    boxes.push(new Box("print", "md-print", "https://pullprint.kungsbacka.se/login.cfm?dest=index.cfm&", false, "lightGreen"));
    boxes.push(new Box("facebook", "md-account-box", "https://www.facebook.com/", false, "indigo"));
    boxes.push(new Box("wikipedia", "md-bookmark", "http://www.wikipedia.org/", false, "black"));
    boxes.push(new Box("legacy", "md-add", "http://jumpsite.crew11.se/", false, "pink"));

    $(".cookies").text(document.cookie);

    $('.sliderButton').click(function() {
        $('.sliderIcon').toggleClass('slide');
        $('.slider').toggleClass('slideOut');
        $('.fader').toggleClass('faded');
    });

    $('.fader').click(function() {
        $('.sliderIcon').toggleClass('slide');
        $('.slider').toggleClass('slideOut');
        $('.fader').toggleClass('faded');
    });

    $('h3').hover(function() {
        $(this).addClass('active');
    }, function() {
        $(this).removeClass('active');
    });


    $('h3').click(function() {
        $(this).toggleClass('read');
        var text = $(this).text();

        $('.' + text).toggleClass('click');

        if($('.' + text).hasClass('click')) {
            $('.' + text).css({'max-height': '1000px'});
        } else {
            $('.' + text).css({'max-height' : '0'});
        }
    });

    $('.deleteCookies').click(function() {
        var cookies = document.cookie.split(";");

        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            var eqPos = cookie.indexOf("=");
            var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }
        return render();
    });

    $('.useCookies').click(function() {
        if($.cookie("isSet") == "true") {
            $.cookie("isSet", "false");
            location = location;
        } else {
            $.cookie("isSet", "true");
        }

        for(var i = 0; i < boxes.length; i++) {
            $.cookie(i + "name", boxes[i].name);
            $.cookie(i + "link", boxes[i].link);
            $.cookie(i + "color", boxes[i].color);
            $.cookie(i + "icon", boxes[i].icon);
            $.cookie(i + "frequent", boxes[i].frequent);
        }

        return render();
    });

    render();

});


function Box(name, icon, link, frequent, color) {
    this.link = link;
    this.name = name;
    this.icon = icon; 
    this.frequent = frequent;
    this.color = color;
}

function findBox(name) {
    for(var i = 0; i < boxes.length; i++) {
        if (name == boxes[i].name) {
            return i;
        }
    }
}

function render() {
    $('.cookies').text(document.cookie);

    if($.cookie("isSet") == "true") {
        for(var i = 0; i < boxes.length; i++) {
            boxes[i].name = $.cookie(i + "name");
            boxes[i].icon = $.cookie(i + "icon");
            boxes[i].link = $.cookie(i + "link");
            boxes[i].frequent = $.cookie(i + "frequent");
            boxes[i].color = $.cookie(i + "color");
        }
    }

    $('#frequent').html(null);
    $('#less').html(null);

    for(var i = 0; i < boxes.length; i++) {
        if(boxes[i].frequent == "true") {
            $('#frequent').append('<div class="box ' + boxes[i].color + '"><i class="md-expand-more boxSettings"></i><i class=" ' + boxes[i].icon + ' boxIcon"></i><h4>' + boxes[i].name + '</h4><div class = "options"><h6>Options</h6><input type="text" class="name" value="' + boxes[i].name + '"></input><input type="text" class="link" value="' + boxes[i].link + '"></input><div><select class="icon"></select><select class="color"></select></div><i class="delete md-delete"></i><i class="save md-check"></i></div></div>');
        } else {
            $('#less').append('<div class="box ' + boxes[i].color + '"><i class="md-expand-more boxSettings"></i><i class=" ' + boxes[i].icon + ' boxIcon"></i><h4>' + boxes[i].name + '</h4><div class = "options"><h6>Options</h6><input type="text" class="name" value="' + boxes[i].name + '"></input><input type="text" class="link" value="' + boxes[i].link + '"></input><div><select class="icon"></select><select class="color"></select></div><i class="delete md-delete"></i><i class="save md-check"></i></div></div>');
        }
    }

    var colors = ["red", "pink", "purple", "deepPurple", "indigo", "blue", "lightBlue", "cyan", "teal", "green", "lightGreen", "lime", "yellow", "amber", "orange", "deepOrange", "black"];
    for(var i = 0; i < colors.length; i++) {
        $('.color').append('<option class="' + colors[i] + '">' + colors[i] +'</option>');
    }

    var icons = [""]

    function findBox(name) {
        for(var i = 0; i < boxes.length; i++) {
            if (name == boxes[i].name) {
                return i;
            }
        }
    }

    if($('body').width() > 1320) {
        
        $('.box').hover(function() {
            $(this).addClass('highlighted');
        }, function() {
            $(this).removeClass('highlighted');
        });

        $('.boxSettings').click(function () {

            $(this).toggleClass('rotate');

            $(this).siblings('.options').toggleClass('open');
        });

        $('.box').dblclick(function() {
            window.open(boxes[findBox($('h4', this).text())].link, '_blank');
        });

    } else {
        $('.box').on('tap', function() {
            window.open(boxes[findBox($('h4', this).text())].link, '_blank');
    });
        $('.box').on('taphold', function () {

            $(this).children('.options').toggleClass('open');
        });
    }

    $('.delete').click(function() {
        boxes.splice(findBox($(this).parents('.options').siblings('h4', this).text()), 1);
        render();
    });

    $('.save').click(function() {
        var x = findBox($(this).parents('.options').siblings('h4', this).text());
        boxes[x].name = $(this).siblings('.name', this).val();
        boxes[x].link = $(this).siblings('.link', this).val();
        boxes[x].color = $(this).siblings('div', this).children('.color').find(':selected').text();

        $.cookie(x + "name", boxes[x].name);
        $.cookie(x + "link", boxes[x].link);
        $.cookie(x + "color", boxes[x].color);

        $.cookie("isSet", "true");
        for(var i = 0; i < boxes.length; i++) {
            $.cookie(i + "name", boxes[i].name);
            $.cookie(i + "link", boxes[i].link);
            $.cookie(i + "color", boxes[i].color);
            $.cookie(i + "icon", boxes[i].icon);
            $.cookie(i + "frequent", boxes[i].frequent);
        }

        render();
    });
}