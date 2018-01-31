// ==UserScript==
// @name         Geocaching - Add D/T Column
// @namespace    http://www.crevola.org/francois/
// @version      0.4
// @description  Add D/T column to recently viewed cache in profile default view
// @author       Francois Crevola
// @match        http*://www.geocaching.com/my/default.aspx
// @grant        GM_xmlhttpRequest
// ==/UserScript==

var resultDifficultyTerrainCaches = "";

GM_xmlhttpRequest({
    method: "GET",
    url: "http://www.geocaching.com/my/statistics.aspx",
    onload: function(response) {
        obj = $.parseHTML(response.responseText);
        resultDifficultyTerrainCaches = $(obj).find("#DifficultyTerrainCaches");
        for (var D = 1; D<=5; D+=0.5) {
            for (var T = 1; T<=5; T+=0.5) {
                var nbDT = resultDifficultyTerrainCaches.find("#"+(((D-1)*2)+1)+"_"+(((T-1)*2)+1)).text();
                localStorage.setItem(D+' / '+T, nbDT); // Refresh known nb of found for this D/T
            }
        }
        console.log("Stats parsed !");
    }
});

function cssFromNbDt(nbDT) {
    var css = '';
    if (nbDT != null) {
        if (nbDT>0) {
            css = 'style="text-decoration: line-through"';
        } else if  (nbDT==0) {
            css = 'style="background-color: lightgreen"';
        }
    }
    return css;
}

var elts = $(".SearchResultsTable td");

$.each(elts, function( index, value ) {
    strValue = $(this).text();
    if (strValue.substr(0,2)=="GC") {
        var gccode = strValue;
        var knownDT = localStorage.getItem(gccode);
        var data = ".. / ..";
        var css = '';
        if (knownDT != null) {
            data = knownDT;
            var nbDT = localStorage.getItem(knownDT);
            css = cssFromNbDt(nbDT);
        }
        $(value).after('<td id="dt'+gccode+'" '+css+'>'+data+'</td>');
        url = "http://coord.info/"+gccode;
        GM_xmlhttpRequest({
            method: "GET",
            url: url,
            onload: function(response) {
                console.log("Info for GC"+gccode+" loaded !");
                obj = $.parseHTML(response.responseText);
                D = $(obj).find("#ctl00_ContentBody_uxLegendScale").html();
                D = D.substring(D.indexOf("stars/stars")+11,D.indexOf(".gif"));
                D = D.replace("_",".");

                T = $(obj).find("#ctl00_ContentBody_Localize12").html();
                T = T.substring(T.indexOf("stars/stars")+11,T.indexOf(".gif"));
                T = T.replace("_",".");

                localStorage.setItem(gccode,D+' / '+T); // Refresh the known D/T for this cache

                var nbDT = localStorage.getItem(D+' / '+T);
                css = cssFromNbDt(nbDT);
                $("#dt"+gccode).replaceWith('<td id="dt'+gccode+'" '+css+'>'+D+' / '+T+'</td>');
            }
        });
    }
});
