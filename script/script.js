var boxes = [];

$(document).ready(function(){

    boxes.push(new Box("Elof", "md-home", "http://www.eloflindalvsgymnasium.kungsbacka.se/", true, "blue"));
    boxes.push(new Box("fronter", "md-chevron-right", "https://fronter.com/kungsbacka/", true, "indigo"));
    boxes.push(new Box("bamba", "md-local-restaurant", "http://meny.dinskolmat.se/elof-lindalvs-gymnasium/", true, "deepOrange"));
    boxes.push(new Box("schema", "md-event", "http://www.novasoftware.se/webviewer/(S(woosp355gavkls55molunc55))/design1.aspx?schoolid=29540&code=123774", true, "purple"));

    boxes.push(new Box("drive", "md-cloud", "https://drive.google.com", false, "amber"));
    boxes.push(new Box("bibliotek", "md-book", "http://www.eloflindalvsgymnasium.kungsbacka.se/For-elever/Bibliotek1/", false, "red"));
    boxes.push(new Box("skola24", "md-access-time", "https://kungsbacka.skola24.se/", false, "green"));
    boxes.push(new Box("mail", "md-email", "https://webmail.kungsbacka.se/owa/auth/logon.aspx?replaceCurrent=1&reason=3&url=https%3a%2f%2fwebmail.kungsbacka.se%2fowa%2f", false, "orange"));
    boxes.push(new Box("print", "md-print", "https://pullprint.kungsbacka.se/login.cfm?dest=index.cfm&", false, "lightGreen"));
    boxes.push(new Box("facebook", "md-account-box", "https://www.facebook.com/", false, "indigo"));
    boxes.push(new Box("legacy", "md-add", "http://jumpsite.crew11.se/", false, "pink"));
    
    render();

});

function Box(name, icon, link, frequent, color) {
    this.link = link;
    this.name = name;
    this.icon = icon;
    this.frequent = frequent;
    this.color = color;
}

function render() {
    $('#frequent').html(null);
    $('#less').html(null);

    for(var i = 0; i < boxes.length; i++) {
        if(boxes[i].frequent) {
            $('#frequent').append('<div class="box ' + boxes[i].color + '"><i class="md-expand-more boxSettings"></i><i class=" ' + boxes[i].icon + ' boxIcon"></i><h4>' + boxes[i].name + '</h4><div class = "options"><h6>Options</h6><input type="text" class=""></input><input type="text" class=""></input></div></div>');
        } else {
            $('#less').append('<div class="box ' + boxes[i].color + '"><i class="md-expand-more boxSettings"></i><i class=" ' + boxes[i].icon + ' boxIcon"></i><h4>' + boxes[i].name + '</h4></div>');
        }
        
        function findBox(name) {
        for(var i = 0; i < boxes.length; i++) {
            if (name == boxes[i].name) {
                return boxes[i].link;
            }
        }
    }

    jQuery.fn.rotate = function(degrees) {
        $(this).css({'-webkit-transform' : 'rotate('+ degrees +'deg)',
                     '-moz-transform' : 'rotate('+ degrees +'deg)',
                     '-ms-transform' : 'rotate('+ degrees +'deg)',
                     'transform' : 'rotate('+ degrees +'deg)'});
        return $(this);
    };

    $('.box').hover(function() {
        $(this).addClass('highlighted');
    }, function() {
        $(this).removeClass('highlighted');
    });

    var rotation = 0;

    $('.boxSettings').click(function () {
        if(rotation == -180) {
            rotation = 0;
        } else if(rotation == 0) {
            rotation = -180;
        }

        $(this).rotate(rotation);

        $(this).siblings('.options').toggleClass('open');
    });

    $('.box').dblclick(function() {
        window.open(findBox($('h4', this).text()), '_blank');
    });

    }
}