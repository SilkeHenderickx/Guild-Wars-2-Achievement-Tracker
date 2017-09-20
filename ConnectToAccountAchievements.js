
function connect(){
  var historicalIdPromise = getIdsOfHistoricalAchievements();
  //wait until done...
  historicalIdPromise.then(function(historicalAchievementIds) {
    console.log(historicalAchievementIds); // "Stuff worked!"
    connectAPI(historicalAchievementIds);
  }, function(err) {
    console.log(err); // Error: "It broke"
  })


}
// connects to the gw2 api for acount achievements with api key
// on success calls function sortByKey
function connectAPI(historicalAchievementIds) {

  console.log("made it");
  var sUrl = "https://api.guildwars2.com/v2/account/achievements?access_token=";
  var api =$("#api").val();

  var url = "";


  sUrl = sUrl + api;
  $.ajax({
    headers: {
      'Accept': 'application/json'
    },
    type: "GET",
    url: sUrl,
    success: function(oData) {
      data = oData;
      sortByKey(oData,historicalAchievementIds);
    },
    error: function(err){
      console.log('error:' + err)
    },
    dataType: "json"
  });

  //filter out historical achievements



  //filters out the finished achievements
  function sortByKey(data,historicalAchievementIds){
    var sort_array = [];

    $.each(data, function(i, item) {
      if (!data[i].done && $.inArray(data[i].id, historicalAchievementIds) == -1) {
        var difference = data[i].max - data[i].current
        var temp_array = [difference, data[i].id];
        sort_array.push(temp_array);
      };
    })

    // sorts the achievements by pips to finished
    sort_array.sort(function(a,b) {
      return a[0] - b[0];
    });

    // gets first 10 achievement id numbers
    // calls function getNames
    for (i = 0; i < 10; i++) {

      url = "https://api.guildwars2.com/v2/achievements?ids=" + sort_array[i][1];

      var input ="top" + (i+1);

      getNames(url, input);
    }
  };
};

// connects to the gw2 api for achievements
// on success calls appendName
function getNames(url, input){
  $.ajax({
    headers: {
      'Accept': 'application/json'
    },
    type: "GET",
    url: url,
    success: function(data) {
      appendName(input, data);
    },
    error: function(err){
      console.log('error:' + err)
    },
    dataType: "json"
  });
}

// replaces the h4 placeholder text with the next achievement
function appendName(input, data){
  var achievementName = JSON.stringify(data[0].name + " " + data[0].id);

  $("#"+ input).text(achievementName);
};
