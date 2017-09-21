function getIdsOfHistoricalAchievements() {
  return new Promise(function(resolve){
    //Collect all category IDS
    var categoryIdPromise = collectAllHistoricalCategoryIds();
    categoryIdPromise.then(function(categoryIDs) {
      //Collect all historical Category IDS
      var categoryDetailsPromise = collectAllCategoryDetails(categoryIDs)
      categoryDetailsPromise.then(function(historicalCatagoryIds) {
        var historicalAchievementIds = createArrayHistoricalAchievements(historicalCatagoryIds);
        resolve(historicalAchievementIds);
      });
    });
  });
}

function collectAllCategoryDetails(categoryIDs) {

  return new Promise(function(resolve, reject) {

    //build Category Details url
    var urlAddon = "";
    console.log(categoryIDs);
    $.each(categoryIDs[0], function(index, value){
      urlAddon = urlAddon + value + ","
    });

    //get full Category API
    var fullUrl = "https://api.guildwars2.com/v2/achievements/categories?ids=" + urlAddon.slice(0, -1);

    $.ajax({
      headers: {
        'Accept': 'application/json'
      },
      type: "GET",
      url: fullUrl ,
      success: function(fullCategoryAPIResponse) {
        resolve(fullCategoryAPIResponse);
      },
      error: function(err){
        console.log('error:' + err)
        reject(err);
      },
      dataType: "json",

    });
  });
}
function createArrayHistoricalAchievements(fullCategoryAPIResponse){
  var data = fullCategoryAPIResponse;
  var historicalAchievementIds = [];

  for (var i = 0; i < data.length; i++) {

      for (var j = 0; j < data[i].achievements.length; j++) {
        if (data[i].achievements[j] != undefined) {
          historicalAchievementIds.push(data[i].achievements[j])

      }
    }

  }
  console.log(historicalAchievementIds);
  return historicalAchievementIds;
}


function collectAllHistoricalCategoryIds(){
  return new Promise(function(resolve, reject){
  $.ajax({
    headers: {
      'Accept': 'application/json'
    },
    type: "GET",
    url: "https://api.guildwars2.com/v2/achievements/groups/A9F7378E-9C8A-48CC-9505-3094E661D5F6",
    success: function(data) {
      var historicalCategoryIDsNEW = [];
      historicalCategoryIDsNEW.push(data.categories);
      resolve(historicalCategoryIDsNEW)
    },
    error: function(err){
      console.log('error:' + err)
      reject(err)
    },
    dataType: "json"
  });
});
}
