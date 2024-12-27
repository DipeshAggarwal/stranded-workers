const urlParams = new URLSearchParams(window.location.search);
var sub = "migrants";
var host = "covidorders";
var isDataDownloaded = false;
var isButtonClicked = false;
var autoShowCounter = 0;
var columnNames = [];
var fromData = {};
var toData = {};
var from = "";
var to = "";

$('.ui.sidebar').sidebar({
  context: $('.ui.pushable.segment'),
  transition: 'push'
}).sidebar('attach events', '#mobile-item');

$('.language.dropdown')
  .dropdown({
    values: [
      {
        name: 'English',
        value: 'english',
        selected: (window.location.href.includes("translate") === false) ? true : false
      },
      {
        name: 'हिंदी',
        value: 'hindi',
        selected: (window.location.href.includes("hindi") === true) ? true : false
      },
      {
        name: 'বাংলা',
        value: 'bengali',
        selected: (window.location.href.includes("bengali") === true) ? true : false
      },
      {
        name: 'ಕನ್ನಡ',
        value: 'kannada',
        selected: (window.location.href.includes("kannada") === true) ? true : false
      },
      {
        name: 'മലയാളം',
        value: 'malayalam',
        selected: (window.location.href.includes("malayalam") === true) ? true : false
      },
      {
        name: 'मराठी',
        value: 'marathi',
        selected: (window.location.href.includes("marathi") === true) ? true : false
      },
      {
        name: 'தமிழ்',
        value: 'tamil',
        selected: (window.location.href.includes("tamil") === true) ? true : false
      },
      {
        name: 'తెలుగు',
        value: 'telugu',
        selected: (window.location.href.includes("telugu") === true) ? true : false
      }
    ],
    action: function(text, value, element) {
      /*if (value === "english") {
        window.location.href = "https://" + sub + "." + host + "." + "in/";
      }
      window.location.href = "https://" + sub + "." + host + "." + "in/translate#" + value;*/

      if (value === "english") {
        top.window.location = "https://" + sub + "." + host + "." + "in/";
      } else {
        top.window.location.href = "https://" + sub + "." + host + "." + "in/translate#" + value;
      }
    },
    ignoreCase: true
  });

/*$('body')
  .toast({
    class: 'success',
    showIcon: 'copy',
    message: 'Copied to Clipboard',
    showProgress: 'bottom',
    classProgress: 'white'
  });*/

$('.state.dropdown')
  .dropdown({
    placeholder:'State',
    values: function () {
      var stateList = ['Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chandigarh','Chhattisgarh','Delhi','Goa','Gujarat','Haryana','Himachal Pradesh','Jammu and Kashmir','Jharkhand','Karnataka','Kerala','Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Pudicherry','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttarakhand','Uttar Pradesh','West Bengal','Andaman and Nicobar Islands','Dadra and Nagar Haveli','Daman and Diu','Lakshadweep'];
      var _returnObj = [];

      stateList.forEach(function(ele) {
        _returnObj.push({name: ele, value: ele})
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
$('.state.dropdown').dropdown('refresh');

$('.coupled.modal')
  .modal({
    allowMultiple: false,
    centered: false
  });

$('.second.modal')
  .modal('attach events', '.first.modal .button.next', 'show refresh')
  .modal({centered: false});

$('.first.modal')
  .modal('attach events', '.second.modal .button.prev', 'show refresh')
  .modal({centered: false});

$('#disclaimer')
  .modal('attach events', '.disclaimer-btn', 'show');

$('#contact-us')
  .modal('attach events', '.contact-btn', 'show');

$('#swan-us')
  .modal('attach events', '.swan-btn', 'show');

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
  for (var key of urlParams.keys()) {
    if (key === "from") {
      $("#from-detail.dropdown").dropdown('set selected', urlParams.get(key));
      autoShowCounter++;
    } else if (key === "to") {
      $("#to-detail").dropdown('set selected', urlParams.get(key));
      autoShowCounter++;
    }
  };

  if (autoShowCounter === 2) {
      isButtonClicked = true;
      $(".ui.dimmer.loading").addClass("active");
  };

  $.ajax({
    url: "https://script.google.com/macros/s/AKfycbyYzQboz1iAe326HtyxJWgcPlwyPe7wLpCrLIRuf-kJBur4rqw/exec?sheet=swan",
    headers: {
        'Accept': '*/*'
    }
  })
    .done(function(data) {
      var _fromString = $("#from-string")[0].innerText;
      var _toString = $("#to-string")[0].innerText;
      columnNames = data.websiteData[0].splice(3);
      data.websiteData.reduce(function(s, x) {
        if (x[0] === _toString || x[0] === "To") {
          toData[x[1]] = x.splice(3);
        } else if (x[0] === _fromString || x[0] === "From") {
          fromData[x[1]] = x.splice(3);
        }
      });
      isDataDownloaded = true;

      if (isButtonClicked === true) {
        isButtonClicked = false;
        $(".ui.dimmer.loading").removeClass("active");
        showData();
      }
    })
});

convertLinks = input => {
  let text = input;
  const aLink = [];
  const linksFound = text.match(/(?:www|https?)[^\s]+/g);

  if (linksFound != null) {
    for (let i = 0; i < linksFound.length; i++) {
      let replace = linksFound[i];

      if (!(linksFound[i].match(/(http(s?)):\/\//))) {
        replace = 'http://' + linksFound[i];
      }

      let linkText = replace.split('/')[2];

      if (linkText.substring(0, 3) == 'www') {
          linkText = linkText.replace('www.', '');
      }

      aLink.push('<a href="' + replace + '" target="_blank">' + linkText + '</a>');
      text = text.split(linksFound[i]).map(item => {
          return aLink[i].includes('iframe') ? item.trim() : item;
      }).join(aLink[i]);
    }
    return text;
  } else {
    return input;
  }
};

function getDataUrl() {
  if (window.location.protocol === "file:") {
    return "https://script.google.com/macros/s/AKfycbyYzQboz1iAe326HtyxJWgcPlwyPe7wLpCrLIRuf-kJBur4rqw/exec?sheet=swan";
  }

  if (window.location.pathname === "/") {
    return "https://script.google.com/macros/s/AKfycbyYzQboz1iAe326HtyxJWgcPlwyPe7wLpCrLIRuf-kJBur4rqw/exec?sheet=swan";
  } else {
    return "https://" + window.location.pathname.slice(1) + "-sg.mox.net.in/macros/s/AKfycbyYzQboz1iAe326HtyxJWgcPlwyPe7wLpCrLIRuf-kJBur4rqw/exec?sheet=swan";
  }
}

function showData() {
  if (autoShowCounter === 2) {
    from = urlParams.get("from");
    to = urlParams.get("to");
    autoShowCounter = 0;
  } else {
    from = $("#from-dropdown.dropdown").dropdown("get text");
    to = $("#to-dropdown.dropdown").dropdown("get text");
  }

  if (fromData[from].every(function(e) {return e === ""}) || toData[to].every(function(e) {return e === ""})) {
    $(".ui.basic>.content")[0].innerText = $(".ui.basic>.content")[0].innerText.replace("##FROM", from).replace("##TO", to);
    $(".ui.basic.modal")
      .modal("show");
    return;
  }

  $("#from-detail>.header>span")[0].innerText = "From: " + from;
  $("#to-detail>.header")[0].innerText = "To: " + to;

  var fromFillText = "";
  var toFillText = "";
  for (var i=0; i < columnNames.length; i++) {
    var _fromText = fromData[from][i].toString().trim();
    var _toText = toData[to][i].toString().trim();

    if (_fromText.startsWith("http") === true) {
      var multiUrls = _fromText.split("|");
      _fromText = "";
      for(var j=0; j < multiUrls.length; j++) {
        _fromText = _fromText + '<a href="' + multiUrls[j].trim() + '" style="white-space:pre;" target="_blank">Click to open in new tab</a><br />';
      }
    } else if (columnNames[i].includes("Helpline No.") === true) {
      _fromText = _fromText.replace(new RegExp(" \\| ", 'g'), "<br />");
    } else {
      _fromText = convertLinks(_fromText.replace(new RegExp("\n", 'g'), "<br />"));
    }

    if (_toText.startsWith("http") === true) {
      var multiUrls = _toText.split("|");
      _toText = "";
      for(var j=0; j < multiUrls.length; j++) {
        _toText = _toText + '<div><a href="' + multiUrls[j].trim() + '" style="white-space:pre;" target="_blank">Click to open in new tab</a></div>';
      }
    } else if (columnNames[i].includes("Helpline No.") === true) {
      _toText = _toText.replace(new RegExp(" \\| ", 'g'), "<br />");
    } else {
      _toText = convertLinks(_toText.replace(new RegExp("\n", 'g'), "<br />"));
    }

    fromFillText = fromFillText + "<tr><td>" + columnNames[i] + "</td><td>" + _fromText + "</td></tr>";
    toFillText = toFillText + "<tr><td>" + columnNames[i] + "</td><td>" + _toText + "</td></tr>";
  }
  $("#from-detail>.content>.description>table>tbody")[0].innerHTML = fromFillText;
  $("#to-detail>.content>.description>table>tbody")[0].innerHTML = toFillText;

  $("#from-detail>.scrolling.content").css("overflow", "auto");

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

function copyLinkToClipboard(obj) {
  const el = document.createElement('textarea');
  el.value = top.window.location.host + "?from=" + from.replace(/ /g, "%20") + "&to=" + to.replace(/ /g, "%20");
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
  
  $('body')
  .toast({
    class: 'success',
    showIcon: 'copy',
    message: 'Copied to Clipboard',
    showProgress: 'bottom',
    classProgress: 'white'
  });
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
