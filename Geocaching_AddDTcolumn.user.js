// ==UserScript==
// @name         Geocaching - Add D/T Column
// @namespace    http://www.crevola.org/francois/
// @version      0.1
// @description  Add D/T column to recently viewed cache in profile default view
// @author       Francois Crevola
// @match        http://www.geocaching.com/my/default.aspx
// @grant        GM_xmlhttpRequest
// ==/UserScript==

var resultDifficultyTerrainCaches = "";

GM_xmlhttpRequest({
  method: "GET",
  url: "http://www.geocaching.com/my/statistics.aspx",
  onload: function(response) {
	obj = $.parseHTML(response.responseText);
      resultDifficultyTerrainCaches = $(obj).find("#DifficultyTerrainCaches");
  }
});

var elts = $(".SearchResultsTable td");

$.each(elts, function( index, value ){
	strValue = $(this).text();
    if (strValue.substr(0,2)=="GC") {
        var gccode = strValue;
        url = "http://coord.info/"+gccode;
        GM_xmlhttpRequest({
          method: "GET",
          url: url,
          onload: function(response) {
            obj = $.parseHTML(response.responseText);
              D = $(obj).find("#ctl00_ContentBody_uxLegendScale").html();
              D = D.substring(D.indexOf("stars/stars")+11,D.indexOf(".gif"));
              D = D.replace("_",".");

              T = $(obj).find("#ctl00_ContentBody_Localize12").html();
              T = T.substring(T.indexOf("stars/stars")+11,T.indexOf(".gif"));
              T = T.replace("_",".");

              var nbDT = "0";
              if (resultDifficultyTerrainCaches!=="") {
                  nbDT = resultDifficultyTerrainCaches.find("#"+(((D-1)*2)+1)+"_"+(((T-1)*2)+1)).text();
              }
              var css = 'style="background-color: lightgreen"';
              if (nbDT!="0") {
                  css = 'style="text-decoration: line-through"';
              }
              $(value).after("<td "+css+">"+D+" / "+T+"</td>");
          }
        });
    }
});
