function getIDHistorical(){
  $.ajax({
    headers: {
      'Accept': 'application/json'
    },
    type: "GET",
    url: "https://api.guildwars2.com/v2/achievements/categories",
    success: function(data) {
      var responseArray = [];
      responseArray.push(data);
      getAchievementIDHistorical(responseArray)
    },
    error: function(err){
      console.log('error:' + err)
    },
    dataType: "json"
  });


}

function getAchievementIDHistorical(categoryIDs){
  var urlAddon = "";
  console.log(categoryIDs);
  $.each(categoryIDs[0], function(index, value){
    urlAddon = urlAddon + value + ","

  });
  gethistorical(urlAddon);
}


function gethistorical(urlAddon){

var fullUrl = "https://api.guildwars2.com/v2/achievements/categories?ids=" + urlAddon.slice(0, -1);

$.ajax({
  headers: {
    'Accept': 'application/json'
  },
  type: "GET",
  url: fullUrl ,
  success: function(data) {
//      historicalAchievements.push(data[0].achievements);
    console.log(data);
  },
  error: function(err){
    console.log('error:' + err)
  },
  dataType: "json"
});
}
