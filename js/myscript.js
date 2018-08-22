var NtmFlashCard = (function () {
    var container = $("#deck");
    var cards = [];
    var currentCardId = 0;
    var isFrond = {};
    var isPlaying = false;
    var init = function () {
        NtmFlashCard.loadData("https://raw.githubusercontent.com/minhnhatbka/minhnhatbka.github.io/master/n2.txt");
        initEvent();
    };
    var initEvent = function () {
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
                        play();
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
        var time = 2000;
        if (numberOfMinisecond) {
            time = numberOfMinisecond;
        }
        setInterval(function () {
            if(isPlaying && currentCardId<=cards.length){
                next();
                setTimeout(function(){
                    flip();
                },time/2);
            }else {
                isPlaying = false;
                return;
            }
        }, time); //default is 2000 = 2s
    };
    var pause = function () {
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
        return '<li class="card"><div class="side_one" style="font-size: 120px;"><p>' + key + '</p></div><div class="side_two" style="font-size: 60px;"><p>' + value + '</p></div></li>';
    };
    var clearCard = function () {
        container.empty();
        var helloCard = '<li class="card"><div class="side_one"><p>Hello</p></div><div class="side_two"><p>Xin chào</p></div></li>';
        container.append(helloCard);
    }
    var open = function () {
        alert("ahihi");
    };
    var loadData = function (fileName) {
        var card = {};
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
            createCards(cards);
        });
    }
    return {
        createCards: createCards,
        clearCard: clearCard,
        loadData: loadData,
        createCard: createCard,
        init: init,
        open: open
    }
})();

$(function () {
    NtmFlashCard.init();
});