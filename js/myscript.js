var NtmFlashCard = (function () {
    var container = $("#deck");
    var cards = [];
    var currentCardId = 0;
    var isFrond = {};
    var isPlaying = false;
    var myInterval;
    var link = "";
    var init = function () {
        link = "https://raw.githubusercontent.com/minhnhatbka/minhnhatbka.github.io/master/n5.txt";
        NtmFlashCard.loadData(link, false);
        initEvent();
    };
    var initEvent = function () {
        $("#checkBox").on("change", function () {
            var val = $("#checkBox").is(':checked')
            if (val == true){
                NtmFlashCard.loadData(link, true);
            }else {
                NtmFlashCard.loadData(link, false);
            }
        });
        $("#playPause").on("click", function () {
            if (isPlaying) {
                $("#playPauseIcon").removeClass( "glyphicon glyphicon-play glyphicon-pause" ).addClass( "glyphicon glyphicon-play" );
                $("#playPauseTitle").text("P");
                pause();
            } else {
                $("#playPauseIcon").removeClass( "glyphicon glyphicon-play glyphicon-pause" ).addClass( "glyphicon glyphicon-pause" );
                $("#playPauseTitle").text("P");
                var val = $("#inputTimer").val();
                if (val){
                    play(val);
                }else {
                    play();
                }
            }
        });
        $("#prev").on("click", function () {
            if (currentCardId > 0) {
                currentCardId--;
                setActiveCard(currentCardId);
            }
        });
        $("#next").on("click", function () {
            if (currentCardId < cards.length - 1) {
                currentCardId++;
                setActiveCard(currentCardId);
            }
        });
        $("#flipper").on("click", function () {
            isFrond[currentCardId] = !isFrond[currentCardId];
            setFlipCard(currentCardId);
        });

        $('body').keydown(function (event) {
            switch (event.keyCode) {
                //back
                case 37:
                    back();
                    break;
                //next
                case 39:
                    next();
                    break;
                //flip
                case 32:
                    flip();
                    break;
                case 38:
                    flip();
                    break;
                case 40:
                    flip();
                    break;
                //play, pause
                case 80:
                    if (isPlaying) {
                        pause();
                        break;
                    } else {
                        var val = $("#inputTimer").val();
                        if (val){
                            play(val);
                        }else {
                            play();
                        }
                        break;
                    }
                    break;
                default:
                    break;
            }
            //console.log(event.keyCode, event.which);
        });
    }
    var next = function () {
        if (currentCardId < cards.length - 1) {
            currentCardId++;
            setActiveCard(currentCardId);
        }
    };
    var back = function () {
        if (currentCardId > 0) {
            currentCardId--;
            setActiveCard(currentCardId);
        }
    };
    var flip = function () {
        isFrond[currentCardId] = !isFrond[currentCardId];
        setFlipCard(currentCardId);
    };
    var play = function (numberOfMinisecond) {
        console.log("play");
        isPlaying = true;
        flip();
        var time = 2000;
        if (numberOfMinisecond) {
            time = numberOfMinisecond;
        }
        myInterval = setInterval(function () {
            if(isPlaying && currentCardId<=cards.length){
                next();
                setTimeout(function(){
                    flip();
                },time);
            }else {
                isPlaying = false;
                return;
            }
        }, time*1.6); //default is 2000 = 2s
    };
    var pause = function () {
        if (myInterval != null) {
            clearInterval(myInterval);
        }
        console.log("pause");
        isPlaying = false;
    };
    var setActiveCard = function (id) {
        $('#deck li').each(function (i, v) {
            if (i == id) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    };
    var setFlipCard = function (id) {
        $('#deck li .side_one').each(function (i, v) {
            if (i == id) {
                if (isFrond[id]) {
                    $(this).css({
                        '-webkit-transform': 'rotateX(0deg)',
                        '-moz-transform': 'rotateX(0deg)',
                        '-ms-transform': 'rotateX(0deg)',
                        '-o-transform': 'rotateX(0deg)',
                        'transform': 'rotateX(0deg)',
                    });
                    $(this).css({ 'z-index': '900' });
                } else {
                    $(this).css({
                        '-webkit-transform': 'rotateX(-180deg)',
                        '-moz-transform': 'rotateX(-180deg)',
                        '-ms-transform': 'rotateX(-180deg)',
                        '-o-transform': 'rotateX(-180deg)',
                        'transform': 'rotateX(-180deg)',
                    });
                    $(this).css({ 'z-index': '800' });
                }
            }
        });
        $('#deck li .side_two').each(function (i, v) {
            if (i == id) {
                if (isFrond[id]) {
                    $(this).css({
                        '-webkit-transform': 'rotateX(-180deg)',
                        '-moz-transform': 'rotateX(-180deg)',
                        '-ms-transform': 'rotateX(-180deg)',
                        '-o-transform': 'rotateX(-180deg)',
                        'transform': 'rotateX(-180deg)',
                    });
                    $(this).css({ 'z-index': '800' });
                } else {
                    $(this).css({
                        '-webkit-transform': 'rotateX(0deg)',
                        '-moz-transform': 'rotateX(0deg)',
                        '-ms-transform': 'rotateX(0deg)',
                        '-o-transform': 'rotateX(0deg)',
                        'transform': 'rotateX(0deg)',
                    });
                    $(this).css({ 'z-index': '900' });
                }
            }
        });
    };
    var createCards = function (data) {
        if (typeof data != undefined && data.length > 0) {
            container.empty();
            $.each(data, function (i, v) {
                container.append(createCard(v.key, v.value));
            });
        } else {
            NtmFlashCard.clearCard();
        }
    };
    var createCard = function (key, value) {
        return '<li class="card"><div class="side_one" style="font-size: 90px;"><p>' + key + '</p></div><div class="side_two" style="font-size: 50px;"><p>' + value + '</p></div></li>';
    };
    var clearCard = function () {
        container.empty();
        var helloCard = '<li class="card"><div class="side_one"><p>人</p></div><div class="side_two"><p>Nhân</p></div></li>';
        container.append(helloCard);
    }
    var open = function () {
        alert("ahihi");
    };
    var loadData = function (fileName, isRandom) {
        var card = {};
        cards = [];
        $.get(fileName, function (data) {
            var lines = data.split("\n");
            $.each(lines, function (i, v) {
                card = {};
                var keyvalue = v.split(':');
                if (typeof keyvalue != undefined && keyvalue.length > 0) {
                    card["key"] = keyvalue[0];
                    card["value"] = keyvalue[1];
                    cards.push(card);
                    isFrond[i] = true;
                }
            });
            if (isRandom){
                cards = random();
            }
            createCards(cards);
        });
    };
    var random = function(){
        function random_sort (thing)
        {
            return (0.5 - Math.random() );
        }
        var idRandoms = [];
        var cardReturn = [];
        $.each(cards, function (i,v) {
            idRandoms.push(i);
        });
        idRandoms.sort(random_sort);
        $.each(idRandoms, function (i,v) {
            cardReturn.push(cards[v]);
        });
        return cardReturn;
    };
    var setLesson = function(lesson){
        $("#playPauseIcon").removeClass( "glyphicon glyphicon-play glyphicon-pause" ).addClass( "glyphicon glyphicon-play" );
        $("#playPauseTitle").text("P");
        pause();
        link = "https://raw.githubusercontent.com/minhnhatbka/minhnhatbka.github.io/master/n"+lesson+".txt";
        var val = $("#checkBox").is(':checked')
        if (val == true){
            NtmFlashCard.loadData(link, true);
        }else {
            NtmFlashCard.loadData(link, false);
        }
    };
    var openNav = function() {
        document.getElementById("mySidenav").style.height = "320px";
    };
    var closeNav = function(){
        document.getElementById("mySidenav").style.height = "0";
    };
    return {
        createCards: createCards,
        openNav: openNav,
        closeNav: closeNav,
        clearCard: clearCard,
        loadData: loadData,
        createCard: createCard,
        setLesson: setLesson,
        init: init,
        open: open
    }
})();

$(function () {
    NtmFlashCard.init();
});