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
    }()
  });
