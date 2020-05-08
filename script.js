var isDataDownloaded = false;
var isButtonClicked = false;
var columnNames = [];
var fromData = {};
var toData = {};

$('.ui.sidebar').sidebar({
  context: $('.ui.pushable.segment'),
  transition: 'push'
}).sidebar('attach events', '#mobile-item');

$('.icon.item.dropdown')
  .dropdown({
    values: [
      {
        name: 'English',
        value: 'english',
        selected : true
      }/*,
      {
        name: 'Hindi',
        value: 'hindi'
      }*/
    ],
    onChange: function(value, text, $choice) {
      var v = $('.pointing.dropdown').dropdown('get value');

      console.log(v);
    }
  });

$('.state.dropdown')
  .dropdown({
    placeholder:'State',
    values: function () {
      var stateList = ['Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chandigarh','Chhattisgarh','Delhi','Goa','Gujarat','Haryana','Himachal Pradesh','Jammu and Kashmir','Jharkhand','Karnataka','Kerala','Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Pudicherry','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttarakhand','Uttar Pradesh','West Bengal','Andaman and Nicobar Islands','Dadra and Nagar Haveli','Daman and Diu','Lakshadweep'];
      var _returnObj = [];

      stateList.forEach(function(ele) {
        _returnObj.push({name: ele, value: ele.toLowerCase()})
      });

      return _returnObj;
    }(),
    onChange: function(value, text, $choice) {
      var v = $(".state.dropdown").dropdown("get value");

      if (v.includes("")) {
        $('#find-btn').addClass("disabled");
      } else {
        $('#find-btn').removeClass("disabled");
      }
    }
  });

$('.coupled.modal')
  .modal({
    allowMultiple: false
  });

// attach events to buttons
$('.second.modal')
  .modal('attach events', '.first.modal .button.next', 'show refresh');

// show first now
$('.first.modal')
  .modal('attach events', '.second.modal .button.prev', 'show refresh');

$('#disclaimer')
  .modal('attach events', '.disclaimer-btn', 'show')
;

$('.ui.basic.modal')
  .modal({
    blurring: true
  });

  $('#find-btn').click(function() {
    if (isDataDownloaded === true) {
      $('#find-btn').removeClass('loading');
      showData();
    } else {
      $('#find-btn').addClass('disabled loading');
      isButtonClicked = true;
    }
  });

$(document).ready(function () {
  console.log("g");
  $.ajax({
    url: 'https://script.google.com/macros/s/AKfycby7AOxVGZUKTBUgTtPO5TGnudMAEUx9IdXeWE1rjgwjeIDGhcc/exec?sheet=swan',
  })
    .done(function(data) {
      console.log("hey");
      columnNames = data.websiteData[0].splice(3);
      data.websiteData.reduce(function(s, x) {
        if (x[0] === "To") {
          toData[x[1]] = x.splice(3);
        } else if (x[0] === "From") {
          fromData[x[1]] = x.splice(3);
        }
      });
      isDataDownloaded = true;

      if (isButtonClicked === true) {
        showData();
      }
    })
});

function showData() {
  var from = $("#from-dropdown.dropdown").dropdown("get text");
  var to = $("#to-dropdown.dropdown").dropdown("get text");

  if (fromData[from].every(function(e) {return e === ""}) || toData[to].every(function(e) {return e === ""})) {
    $(".ui.basic>.content")[0].innerText = $(".ui.basic>.content")[0].innerText.replace("##FROM", from).replace("##TO", to);
    $(".ui.basic.modal")
      .modal("show");
    return;
  }

  $("#from-detail>.header")[0].innerText = "From: " + from;
  $("#to-detail>.header")[0].innerText = "To: " + to;

  var fromFillText = "";
  var toFillText = "";
  for (var i=0; i < columnNames.length; i++){
    var _fromText = fromData[from][i].toString();
    var _toText = toData[to][i].toString();

    if (_fromText.startsWith("http") === true) {
      _fromText = '<span><a href=' + _fromText + ' style="display:block ruby;white-space:pre;" target="_blank"><i class="linkify icon"</i> Click to open in new tab</a></span>';
    } else if (columnNames[i].includes("Helpline No.") === true) {
      _fromText = _fromText.replace(" ", "<br />").replace(",", "<br />").replace("/", "<br />");
    }
    if (_toText.startsWith("http") === true) {
      _toText = '<span><a href=' + _toText + ' style="display:block ruby;white-space:pre;" target="_blank"><i class="linkify icon"</i> Click to open in new tab</a></span>';
    } else if (columnNames[i].includes("Helpline No.") === true) {
      var _toText = _toText.replace(" ", "<br />").replace(",", "<br />").replace("/", "<br />");
    }
    fromFillText = fromFillText + "<tr><td>" + columnNames[i] + "</td><td>" + _fromText + "</td></tr>";
    toFillText = toFillText + "<tr><td>" + columnNames[i] + "</td><td>" + _toText + "</td></tr>";
  }
  $("#from-detail>.content>.description>table>tbody")[0].innerHTML = fromFillText;
  $("#to-detail>.content>.description>table>tbody")[0].innerHTML = toFillText;

  $("#from-detail>.actions>.ui.black").click(function(e, t) {
    $("#from-detail.modal")
      .modal("hide");
  })
  $("#to-detail>.actions>.ui.positive").click(function(e, t) {
    $("#to-detail.modal")
      .modal("hide");
  })
  $("#from-detail.modal")
    .modal("show");
}

$(window).resize(function() {
  var footerTop = $(".footer-line").offset().top;
  var footerHeight = $(".footer-line").height();
  var findBtnTop = $("#find-btn").offset().top;
  
  if (footerTop < findBtnTop + footerHeight + 40) {
    var diff = findBtnTop + footerHeight + 40 - footerTop;
    $(".footer-line").css("bottom", -diff);
  } else {
    $(".footer-line").css("bottom", 2);
  }
});
