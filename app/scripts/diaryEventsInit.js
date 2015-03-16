jQuery(document).ready(function() {
  //================================

if ( !$('#diaryEvents._diaryEvents').children().length){
  initCalendar();
}


});

function initCalendar(){
  $('#diaryEvents._diaryEvents').diaryEvents({
    nowdate: new Date(),
    firstday: 1,
    lcesize: 100,
    returntonow: true,
    returndelay: 4000,
    showScroll: false,
    showMonthYear: true,
    showDayOfWeek: true,
    showNumberOfWeek: false,
    links: new Array({
      date: '20140207',
      title: 'Go to http://codecanyon.net in new window',
      href: 'http://codecanyon.net',
      newwindow: true
    }),
    events: new Array({
      date: '20140201',
      title: 'You can write the title',
      time: '03:00',
      description: 'Test description: <br>Workplace - is the physical location where someone works. Such a place can range from a home office to a large office building or factory.<br>There may also be a <a href="http://codecanyon.net" target="_blank">link</a>',
      sc_color: '#FFD131'
    }, {
      date: '20140201',
      title: 'Link to codecanyon.net',
      time: '05:00',
      href: 'http://codecanyon.net',
      description: 'This description will be ignored'
    }, {
      date: '20140205',
      title: 'Title 1',
      time: '10:00',
      description: 'Test description: <br>Friend Tom I congratulate you on holiday!'
    }, {
      date: '20140205',
      title: 'Title 2 - without set time (move to top)',
      description: 'Test description: <br><b>Fact</b> - is something that has really occurred or is actually the case. <i>The usual test for a statement of fact is verifiability, that is whether it can be proven to correspond to experience.</i>'
    }, {
      date: '20140205',
      title: 'Title 3',
      time: '12:00',
      description: 'Test description: <br>..........................................<br>..........................................<br>..........................................<br>'
    }, {
      date: '20140130',
      title: 'Title 1',
      time: '13:00',
      description: 'Test description: <br>..........................................<br>..........................................<br>..........................................<br>'
    }, {
      date: '20140130',
      title: 'Title 2',
      time: '17:00',
      description: 'Test description: <br>..........................................<br>..........................................<br>..........................................<br>'
    })
  });
  //================================

  $('input:radio[id=dyellow]').prop("checked", true);
  $("input:radio[name=tplclr]").on('click', function() {
    switch ($("input:radio[name=tplclr]:checked").val()) {
      case "dyellow":
        $('#cssmain').attr('href', 'css/licogray_yellow_fd.css');
        $('html, body').css('background', 'url(images/darkbg.png)');
        $('.csscode').html('&lt;link rel="stylesheet" type="text/css" href="[YOUR_CSS_DIR]/licogray_yellow_fd.css"&gt;');
        break;
      case "dlime":
        $('#cssmain').attr('href', 'css/licogray_lime_fd.css');
        $('html, body').css('background', 'url(images/darkbg.png)');
        $('.csscode').html('&lt;link rel="stylesheet" type="text/css" href="[YOUR_CSS_DIR]/licogray_lime_fd.css"&gt;');
        break;
      case "dblue":
        $('#cssmain').attr('href', 'css/licogray_blue_fd.css');
        $('html, body').css('background', 'url(images/darkbg.png)');
        $('.csscode').html('&lt;link rel="stylesheet" type="text/css" href="[YOUR_CSS_DIR]/licogray_blue_fd.css"&gt;');
        break;
      case "dpink":
        $('#cssmain').attr('href', 'css/licogray_pink_fd.css');
        $('html, body').css('background', 'url(images/darkbg.png)');
        $('.csscode').html('&lt;link rel="stylesheet" type="text/css" href="[YOUR_CSS_DIR]/licogray_pink_fd.css"&gt;');
        break;

      case "dbrown":
        $('#cssmain').attr('href', 'css/licogray_brown_fd.css');
        $('html, body').css('background', 'url(images/darkbg.png)');
        $('.csscode').html('&lt;link rel="stylesheet" type="text/css" href="[YOUR_CSS_DIR]/licogray_brown_fd.css"&gt;');
        break;
      case "dred":
        $('#cssmain').attr('href', 'css/licogray_red_fd.css');
        $('html, body').css('background', 'url(images/darkbg.png)');
        $('.csscode').html('&lt;link rel="stylesheet" type="text/css" href="[YOUR_CSS_DIR]/licogray_red_fd.css"&gt;');;
        break;
      case "dgreen":
        $('#cssmain').attr('href', 'css/licogray_green_fd.css');
        $('html, body').css('background', 'url(images/darkbg.png)');
        $('.csscode').html('&lt;link rel="stylesheet" type="text/css" href="[YOUR_CSS_DIR]/licogray_green_fd.css"&gt;');
        break;
      case "dviolet":
        $('#cssmain').attr('href', 'css/licogray_violet_fd.css');
        $('html, body').css('background', 'url(images/darkbg.png)');
        $('.csscode').html('&lt;link rel="stylesheet" type="text/css" href="[YOUR_CSS_DIR]/licogray_violet_fd.css"&gt;');
        break;

      case "lyellow":
        $('#cssmain').attr('href', 'css/licogray_yellow_fl.css');
        $('html, body').css('background', 'url(images/lightbg.png)');
        $('.csscode').html('&lt;link rel="stylesheet" type="text/css" href="[YOUR_CSS_DIR]/licogray_yellow_fl.css"&gt;');
        break;
      case "llime":
        $('#cssmain').attr('href', 'css/licogray_lime_fl.css');
        $('html, body').css('background', 'url(images/lightbg.png)');
        $('.csscode').html('&lt;link rel="stylesheet" type="text/css" href="[YOUR_CSS_DIR]/licogray_lime_fl.css"&gt;');
        break;
      case "lblue":
        $('#cssmain').attr('href', 'css/licogray_blue_fl.css');
        $('html, body').css('background', 'url(images/lightbg.png)');
        $('.csscode').html('&lt;link rel="stylesheet" type="text/css" href="[YOUR_CSS_DIR]/licogray_blue_fl.css"&gt;');
        break;
      case "lpink":
        $('#cssmain').attr('href', 'css/licogray_pink_fl.css');
        $('html, body').css('background', 'url(images/lightbg.png)');
        $('.csscode').html('&lt;link rel="stylesheet" type="text/css" href="[YOUR_CSS_DIR]/licogray_pink_fl.css"&gt;');
        break;

      case "lbrown":
        $('#cssmain').attr('href', 'css/licogray_brown_fl.css');
        $('html, body').css('background', 'url(images/lightbg.png)');
        $('.csscode').html('&lt;link rel="stylesheet" type="text/css" href="[YOUR_CSS_DIR]/licogray_brown_fl.css"&gt;');
        break;
      case "lred":
        $('#cssmain').attr('href', 'css/licogray_red_fl.css');
        $('html, body').css('background', 'url(images/lightbg.png)');
        $('.csscode').html('&lt;link rel="stylesheet" type="text/css" href="[YOUR_CSS_DIR]/licogray_red_fl.css"&gt;');
        break;
      case "lgreen":
        $('#cssmain').attr('href', 'css/licogray_green_fl.css');
        $('html, body').css('background', 'url(images/lightbg.png)');
        $('.csscode').html('&lt;link rel="stylesheet" type="text/css" href="[YOUR_CSS_DIR]/licogray_green_fl.css"&gt;');
        break;
      case "lviolet":
        $('#cssmain').attr('href', 'css/licogray_violet_fl.css');
        $('html, body').css('background', 'url(images/lightbg.png)');
        $('.csscode').html('&lt;link rel="stylesheet" type="text/css" href="[YOUR_CSS_DIR]/licogray_violet_fl.css"&gt;');
        break;

      case "test":
        $('#cssmain').attr('href', 'css/licogray_test_fd.css');
        $('html, body').css('background', 'url(images/darkbg.png)');
        $('.csscode').html('&lt;link rel="stylesheet" type="text/css" href="css/licogray_test_fd.css"&gt;');
        break;
    }
  });
}
