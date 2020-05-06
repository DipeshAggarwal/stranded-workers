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
      var v = $('.ui.dropdown').dropdown('get value');

      if (v.includes("")) {
        $('#find-btn').addClass("disabled");
      } else {
        $('#find-btn').removeClass("disabled");
      }
    }
  });

  $("#find-btn").click(function() {
    alert("button");
  }); 

$(document).ready(function () {
  $.ajax({
    url: "https://script.google.com/macros/s/AKfycby7AOxVGZUKTBUgTtPO5TGnudMAEUx9IdXeWE1rjgwjeIDGhcc/exec?sheet=swan",
  })
    .done(function(data) {
      var data = data.websiteData;
      console.log(data);
    })
});
