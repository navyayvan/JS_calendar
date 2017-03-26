// stores names of days
var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// stores names of months 

var months = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

// stores number of days in month, in month order
var numberDaysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

// date object, built in JS object
// referred to https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
var currentDate = new Date();

// calendar constructor 
// uses date object from above. 
function Calendar(month,year) {
  this.month = currentDate.getMonth();
  this.year = currentDate.getFullYear();
  this.html = '';
}

Calendar.prototype.generateHTML = function() {
  var firstDay = new Date(this.year, this.month, 1);
  var startingWeekDay = firstDay.getDay();

  // uses the month number to access array above to find number of days
  var monthLen = numberDaysInMonth[this.month];

  // leap year adjustment for february. looked this up on stack overflow.
  if (this.month === 1) {
    if ( (this.year % 4 === 0 && this.year % 100 != 0)  || this.year % 400 == 0) {
      monthLen = 29;
    }
  }

  var monthName = months[this.month];
  var html = '<table class="table table-striped table-bordered table-responsive">';
  html += '<tr> <th class="month-header" colspan = "7">';
  html += monthName + '&nbsp;' + this.year;
  html += '</th></tr>';
  html += '<tr class="cal-header">';
  for (var i = 0; i <= 6; i++ ) {
    html += '<td>';
    html += days[i];
    html += '</td>';
  }
  html += '</tr><tr>';

  var day = 1; 
  // loops to make weeks
  for (var j= 0; j < 9; j++) {
    // loop to make day cells 
    for (var k=0; k <= 6; k++) {
      html += '<td class="day"';
      if (day <= monthLen && (j > 0 || k >= startingWeekDay)) {
        html += ' "id=' + day + '">';
        html += day;
        html += '<input id="' + day + '">';
        html += '<button id="add"> add </button>';
        html += ''
        day++
      }
      html += '</td>';
    }
    // stop row making
    if (day > monthLen) {
      break;
    } else {
       html += '</tr><tr>';
    }
  }
  html += '</tr></table>';

   this.html = html;
}

Calendar.prototype.getHTML = function() {
  return this.html;
}

// call calendar constructor and instiatiate
var cal = new Calendar();
cal.generateHTML();
document.write(cal.getHTML());





