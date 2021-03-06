var seriesChart1, seriesChart2, seriesChart3, demoChart1, demoChart2;
var colorNo = "#00FF00"
var colorYes = "#FF00FF"
var underVal = 5;
var est1 = 4;
var est2 = 4;
var isActiveState = false;
var demonstration = false;
var flag = true;
var isactiveInterval, intervalSelectLevels, intervalSelectMessage, sendTimout, isActiveSend;

function sendGet(url, callback){
  $.get(url)
  .done(function( data ) {
    if(callback){
      callback(data);
    }
  })
  .fail(function() {
    cl( "error" );
  });
}

function sendPost(url, data, callback){
  $.post(url, data)
  .done(function( data ) {
    if(callback){
      callback(data);
    }
  })
  .fail(function() {
    cl( "error" );
  });
}
function cl(m) {
  console.log(m);
}
function cd(o) {
  console.dir(o);
}

function outputMessage(data) {
  var html = '';
  $(data).each(function (i, el) {
    html += '<div id="mess'+el.id+'" class="message-body"><div onclick="deleteMessage('+el.id+')" class="mess-cancel">x</div><div class="message-text">' + el.text + '</div></div>';
  });
  if(demonstration){
    $('#message-aside').html(html);
  }else {
    $('#message-on-client').html(html);
  }
}
function deleteMessage(id) {
  var url = "controllers/message_controller.php?url=deleteMessage";
  sendPost(url, {id: id}, function (data) {
    $('#mess'+id).remove();
  });
}

$( document ).ready(function() {
    // set random id to cookie
    setLang(1); // FIX THIS
    if(!getCookie("id")){
      setCookie("id", randomID, {"path": "/"});
    }
    changeLang();
    if(getCookie("isAdmin")){
      $('.main-content').addClass('admin');
    }
    if(!getCookie("isVoit")){
      $(".one-time-voit").show();
      $('.main-content').hide();
    }else{
      $(".one-time-voit").hide();
      $('.main-content').show();
    }

    requestForMainStat();

    isactiveInterval = setInterval(function(){
      var url = "controllers/level_controller.php?url=isactive";
      sendGet(url, function (data) {
        if(data == "active" && !isActiveState){
          initStart();
        }else if(data == "not active" && isActiveState){
          initStop();
        }
      });
    }, 10000);

    $("#start").click(function() {
      sendGet("controllers/level_controller.php?url=start");
      initStart();
    });
    $("#stop").click(function () {
      sendGet("controllers/level_controller.php?url=stop");
      initStop();
    });
    $("#sentOneVoit").click(function () {
      setCookie("isVoit", true, {"path": "/"});
      est1 = $('#estimate1 option:selected').val();
      est2 = $('#estimate2 option:selected').val();
      tryToSend(1);
      tryToSend();
      $(".one-time-voit").hide(500);
      $('.main-content').show();
    });

    $(".onoffswitch-label").click(function() {
      if(underVal === 1){
        underVal = 5;
      }else{
        underVal = 1;
      }
      initSendInfo();
    });

    $("#send_question").click(function () {
      var text = $("#enter_question").val();
      var sendData = {text: text, userId:1};
      sendPost("controllers/message_controller.php?url=addQuestion", sendData, function(data) {
        $("#enter_question").val('');
        $('.info-sent').show(500);
        setTimeout(function () {
          $('.info-sent').hide(500);
        }, 3000);
      });

    });

    function initStart() {
      $(".blink").show();
      isActiveState = true;
      regularEvents();
    }

    function initStop() {
      $(".blink").hide();
      isActiveState = false;
      clearInterval(intervalSelectLevels);
      clearInterval(intervalSelectMessage);
      flag = true;
    }

    function regularEvents() {
      if(flag){
        flag = false;
        intervalSelectLevels = setInterval(function(){
          requestForLevel1();
        }, 8000);

        intervalSelectMessage = setInterval(function(){
          requestForMessage();
          requestForMainStat();
        }, 15000);

      }
    }
});

function requestForLevel1() {
  var url = "controllers/level_controller.php?url=selectLevels";
  sendGet(url, function (data) {
    setLevelsAndUpdate(JSON.parse(data));
  });
}

function requestForMainStat() {
  var urlMainStat = "controllers/level_controller.php?url=mainStat";
  sendGet(urlMainStat, function (data) {
    if(data){
      if(seriesChart2 && seriesChart3)
        updateLevel2and3(JSON.parse(data));
    }
  });
}

function requestForMessage() {
  var url = "controllers/message_controller.php?url=selectMessage";
  sendGet(url, function (data) {
    if(data){
      outputMessage(JSON.parse(data))
    }
  });
}

function setLevelsAndUpdate(data) {
  // start Refresh chart
  if(seriesChart1)
    updateLevel1(data);
  if(demoChart1)
    updateDemoChart1(data);
}

function initSendInfo() {
  if(isActiveSend){
    clearTimeout(sendTimout);
    tryToSend();
  }else{
    tryToSend();
  }
}

function tryToSend(type) {
  if(!demoChart1 ){
    isActiveSend = true;
    sendTimout = setTimeout(function(){
      var level1 = !type ? underVal : 0;
      var level2 = type == 1 ? est1 : 0;
      var level3 = type == 1 ? est2 : 0;
      var url = "controllers/level_controller.php?url=addLevel";
      var userId = getCookie("id");
      var typeId = type ? type : 0;
      var data = {userId: parseInt(userId), clientIP: clientIP, level1: level1, level2:level2, level3:level3, typeId: typeId};
      sendPost(url, data, function () { isActiveSend = false; });
    }, 2000);
  }
}

function updateLevel1(data) {
  // chart of understanding
  $(".count-users").text(" Отметили: " + data.total_users + " человек(а)");
  var x = (new Date()).getTime(), // current time
      y = parseFloat(data.middle_value);
  seriesChart1.addPoint([x, y], true, true);
}

function getNameForChart2(num) {
  switch (num) {
    case "2":
      name = 'Не владею';
      break;
    case "3":
      name = 'Слабо';
      break;
    case "4":
      name = 'Средне';
      break;
    case "5":
      name = 'Хорошо';
      break;
    default:
      name = 'no name';
  }
  return name;
}

function getNameForChart3(num) {
  switch (num) {
    case "2":
      name = 'Не интересна';
      break;
    case "3":
      name = 'Слабый';
      break;
    case "4":
      name = 'Средний';
      break;
    case "5":
      name = 'Сильный';
      break;
    default:
      name = 'no name';
  }
  return name;
}

function updateLevel2and3(data) {
  // chart of relevance
  var chart2 = [];
  var chart3 = [];
  $(data).each(function (ind, item) {
    var level2 = parseFloat(item.count_lvl2);
    var level3 = parseFloat(item.count_lvl3);
    if(level2 > 0){
      chart2.push({
        name: getNameForChart2(item.lvl),
        y: level2
      });
    }

    if(level3 > 0){
      chart3.push({
        name: getNameForChart3(item.lvl),
        y: level3
      });
    }
  });
  seriesChart2.setData(chart2, true);
  seriesChart3.setData(chart3, true);
}

function updateDemoChart1(data) {
  // chart of understanding
  var x = (new Date()).getTime(), // current time
      y = parseFloat(data.middle_value);
  demoChart1.addPoint([x, y], true, true);
}

addEventListener("keyup", function(event) {
    var forword = 39;
    var backword = 37;
    var down = 40;
    var up = 38;
    var controlFF = 34;
    var controlBK = 33;
    if(event.keyCode == forword || event.keyCode == down || event.keyCode == controlFF){
      initNextSlide();
    }else if (event.keyCode == backword || event.keyCode == up || event.keyCode == controlBK) {
      initPrevSlide();
    }
});

function initNextSlide() {
  var flag1 = false;
  var elArr = $(".img-slide");
  $(elArr).each(function(i) {
    if(flag1){
      $(this).addClass('active');
      return false;
    }else{
      if($(this).hasClass('active')){
        if(i < elArr.length - 1){
          $(this).removeClass('active');
        }
        flag1 = true;
      }
    }
  });
}

function initPrevSlide() {
  var prevEl = false;
  $(".img-slide").each(function(i) {
      if($(this).hasClass('active')){
        if(i>0){
          $(this).removeClass('active');
          $(prevEl).addClass('active');
        }
        return false;
      }else{
        prevEl = this;
      }
  });
}

function dw(m) {
  return document.write(m);
}

function getCookie(name) {
  var matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setCookie(name, value, options) {
  options = options || {};

  var expires = options.expires;

  if (typeof expires == "number" && expires) {
    var d = new Date();
    d.setTime(d.getTime() + expires * 1000);
    expires = options.expires = d;
  }
  if (expires && expires.toUTCString) {
    options.expires = expires.toUTCString();
  }

  value = encodeURIComponent(value);

  var updatedCookie = name + "=" + value;

  for (var propName in options) {
    updatedCookie += "; " + propName;
    var propValue = options[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }

  document.cookie = updatedCookie;
}

function deleteCookie(name) {
  setCookie(name, "", {
    expires: -1
  })
}
