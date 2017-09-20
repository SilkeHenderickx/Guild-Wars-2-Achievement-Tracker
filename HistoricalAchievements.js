function getIdsOfHistoricalAchievements() {
  return new Promise(function(resolve){
    //Collect all category IDS
    var categoryIdPromise = collectAllCategoryIds();
    categoryIdPromise.then(function(categoryIDs) {
      //Collect all historical Category IDS
      var historicalCategoryIdPromise = collectAllHistoricalCategoryIDS(categoryIDs)
      historicalCategoryIdPromise.then(function(historicalCatagoryIds) {
        var historicalAchievementIds = createArrayHistoricalAchievements(historicalCatagoryIds);
        resolve(historicalAchievementIds);
      });
    });
  });
}

function collectAllHistoricalCategoryIDS(categoryIDs) {

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
    if(data[i].order == 0){
      for (var j = 0; j < data[i].achievements.length; j++) {
        if (data[i].achievements[j] != undefined) {
          historicalAchievementIds.push(data[i].achievements[j])
        }
      }
    }

  }
  console.log(historicalAchievementIds);
  return historicalAchievementIds;
}

function collectAllCategoryIds() {
  return new Promise(function(resolve, reject) {
    // do a thing, possibly async, then…
    $.ajax({
      headers: {
        'Accept': 'application/json'
      },
      type: "GET",
      url: "https://api.guildwars2.com/v2/achievements/categories",
      success: function(data) {
        var categoryIDs = [];
        categoryIDs.push(data);
        resolve(categoryIDs)
        // REPLACED BY PROMISE ABOVE getAchievementIDHistorical(responseArray)
      },
      error: function(err){
        console.log('error:' + err)
        reject(err)
      },
      dataType: "json"
    });
  });
}
