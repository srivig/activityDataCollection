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
    events: new Array()
  });
  //================================
}
