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
          toData[x[1].toLowerCase()] = x.splice(2);
        } else if (x[0] === "From") {
          fromData[x[1].toLowerCase()] = x.splice(2);
        }
      });
      isDataDownloaded = true;

      if (isButtonClicked === true) {
        showData();
      }
    })
});

function showData() {
  var from = $("#from-dropdown.dropdown").dropdown("get value");
  var to = $("#to-dropdown.dropdown").dropdown("get value");

  console.log(fromData[from].every( function(e) {
    return e === "";
  }));
  console.log(toData[to].every( function(e) {
    return e === "";
  }));
}
