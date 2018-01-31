// ==UserScript==
// @name         Geocaching - Add nb of found(s) with the same D/TD/T on dashboard
// @namespace    http://www.crevola.org/francois/
// @version      0.1
// @description  Add number of found(s) with the same D/T found for each recently viewed cache on the (new) dashboard
// @license      BSD-2-Clause
// @author       Francois Crevola
// @match        http*://www.geocaching.com/account/dashboard
// @grant        GM_xmlhttpRequest
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==

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
        workWhenActivityMeta();
    }
});

function styleFromNbDt(nbDT) {
    var css = '';
    if (nbDT != null) {
        if (nbDT>0) {
            css = '';
        } else if  (nbDT==0) {
            css = 'background-color: lightgreen';
        }
    }
    return css;
}

var tries = 0;

function workWhenActivityMeta() {
  tries++;
  var items = document.getElementsByClassName("activity-meta");
  if (items.length == 0 && tries < 3) {
    setTimeout(workWhenActivityMeta, 1000);
    return;
  }
  if (items.length == 0) return;
  var data = [];
  for (var i = 0; i < items.length; i++) {
    var childs = items.item(i).childNodes; //children;
    var tab = [];
    for (var j = 0; j < childs.length; j++) {
        if (childs.item(j).localName == 'dd') {
            tab.push(childs.item(j).innerText);
        }
    }
    if (tab.length == 5) { // Recognized as a line with nb of fav / difficulty / terrain / size / gc code
      tab.push(childs[0].parentNode.parentNode);
      data.push(tab);
    }
  }
  for (i = 0; i < data.length; i++) {
    var D = data[i][1];
    var T = data[i][2];
    const newDl = document.createElement('dl');
    newDl.setAttribute('class', 'activity-meta');
    var nbDT = localStorage.getItem(D+' / '+T);
    newDl.setAttribute('style', styleFromNbDt(nbDT));
    if (nbDT !== null) {
      var text = "";
      if (nbDT == 0) {
          text = "Go find it, it's a new D/T for you !!";
      } else if (nbDT > 0) {
         text = "Already "+nbDT+" found(s) with this D/T.";
      }
      const nouveauContenu = document.createTextNode(text);
      newDl.appendChild(nouveauContenu);
      data[i][5].appendChild(newDl);
    }
  }
}
