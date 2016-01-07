// ==UserScript==
// @name         Geocaching - Add nearest cache link
// @namespace    http://www.crevola.org/francois/
// @version      0.5
// @description  Add a nearest cache link on cache page description
// @author       Francois Crevola
// @match        http*://www.geocaching.com/geocache/GC*
// @grant        none
// ==/UserScript==

var lang = window.navigator.language;
var label1 = 'Nearest cache';
var label2 = 'Not already found by you';
if (lang.substr(0,2)=="fr") {
  label1 = 'Autres caches à proximité';
  label2 = 'Non-trouvées par vous-même';
}
    
// Add information about nb of D/T found
var elts = $('#ctl00_ContentBody_uxViewLargerMap');
var url = elts[0].href;

url = url.replace("map/default.aspx?","seek/nearest.aspx?");
url2 = url + "&f=1";

$('.LocationData').append('<div class="AlignRight"><a href="'+url+'">'+label1+'</a><br>(<a href="'+url2+'">'+label2+'</a>)</div>');
