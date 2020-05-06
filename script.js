var isDataDownloaded = false;
var isButtonClicked = false;
var fromData = {};
var toData = {};

$('.ui.dropdown')
  .dropdown({
    placeholder:'Choose State',
    values: function () {
      var stateList = ['Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chandigarh','Chhattisgarh','Delhi','Goa','Gujarat','Haryana','Himachal Pradesh','Jammu and Kashmir','Jharkhand','Karnataka','Kerala','Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Pudicherry','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttarakhand','Uttar Pradesh','West Bengal','Andaman and Nicobar Islands','Dadra and Nagar Haveli','Daman and Diu','Lakshadweep'];
      var _returnObj = [];

      stateList.forEach(function(ele) {
        _returnObj.push({name: ele, value: ele.toLowerCase()})
      });

      return _returnObj;
    }(),
    onChange: function(value, text, $choice) {
      var v = $(".ui.dropdown").dropdown("get value");

      if (v.includes("")) {
        $('#find-btn').addClass("disabled");
      } else {
        $('#find-btn').removeClass("disabled");
      }
    }
  });

$('.coupled.modal')
  .modal({
    allowMultiple: false,
    blurring: true
  })
;
// attach events to buttons
$('.second.modal')
  .modal('attach events', '.first.modal .button.next', 'show refresh')
;
// show first now
$('.first.modal')
  .modal('attach events', '.second.modal .button.prev', 'show refresh')
;

$('.ui.basic.modal')
  .modal({
    blurring: true
  });

  $("#find-btn").click(function() {
    if (isDataDownloaded === true) {
      $('#find-btn').removeClass("loading");
      showData();
    } else {
      $('#find-btn').addClass("disabled loading");
      isButtonClicked = true;
    }
  });

$(document).ready(function () {
  $.ajax({
    url: "https://script.google.com/macros/s/AKfycby7AOxVGZUKTBUgTtPO5TGnudMAEUx9IdXeWE1rjgwjeIDGhcc/exec?sheet=swan",
  })
    .done(function(data) {
      data.websiteData.reduce(function(s, x) {
        if (x[0] === "To") {
          toData[x[1]] = x.splice(2);
        } else if (x[0] === "From") {
          fromData[x[1]] = x.splice(2);
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

  $("#from-detail>.header")[0].innerText = "Things to do before leaving " + from;
  $("#to-detail>.header")[0].innerText = "Things to do before arriving in " + to;
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
