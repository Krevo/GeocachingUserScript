// ==UserScript==
// @name         Geocaching - Add D/T info on a cache page.
// @namespace    http://www.crevola.org/francois/
// @version      0.1
// @description  Tell you if the cache you are currently watching is a new D/T for your, if not tell you how many D/T like this one you have already found.
// @author       Francois Crevola
// @match        http://www.geocaching.com/geocache/GC*
// @match        http://www.geocaching.com/seek/cache_details.aspx*
// @grant        GM_xmlhttpRequest
// ==/UserScript==

var resultDifficultyTerrainCaches = "";

GM_xmlhttpRequest({
    method: "GET",
    url: "http://www.geocaching.com/my/statistics.aspx",
    onload: function(response) {
	obj = $.parseHTML(response.responseText);
        resultDifficultyTerrainCaches = $(obj).find("#DifficultyTerrainCaches");

        D = $("#ctl00_ContentBody_uxLegendScale").html();
        D = D.substring(D.indexOf("stars/stars")+11,D.indexOf(".gif"));
        D = D.replace("_",".");
      
        T = $("#ctl00_ContentBody_Localize12").html();
        T = T.substring(T.indexOf("stars/stars")+11,T.indexOf(".gif"));
        T = T.replace("_",".");
      
        var nbDT = "0";
        if (resultDifficultyTerrainCaches!=="") {
            nbDT = resultDifficultyTerrainCaches.find("#"+(((D-1)*2)+1)+"_"+(((T-1)*2)+1)).text();
        }

        if (nbDT != "0") {
            $("#ctl00_ContentBody_diffTerr").append("<div>Already "+nbDT+" found with this D/T</div>");
        } else {
            $("#ctl00_ContentBody_diffTerr").append("<div>Go find it, it's a new D/T for you !!</div>");
            $("#ctl00_ContentBody_uxLegendScale").attr("style","background-color: lightgreen");
            $("#ctl00_ContentBody_Localize12").attr("style","background-color: lightgreen");
        }
    }
});
