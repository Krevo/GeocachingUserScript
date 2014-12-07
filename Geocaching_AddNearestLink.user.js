// ==UserScript==
// @name         Geocaching - Add nearest cache link
// @namespace    http://www.crevola.org/francois/
// @version      0.1
// @description  Add a nearest cache link on cache page description
// @author       Francois Crevola
// @match        http://www.geocaching.com/geocache/GC*
// @match        http://www.geocaching.com/seek/cache_details.aspx*
// @grant        none
// ==/UserScript==

// Add information about nb of D/T found
var elts = $('#ctl00_ContentBody_lnkConversions');
var url = elts[0].href;

console.log(url);

url = url.replace("wpt/?","seek/nearest.aspx?");
url = url.replace("detail","f");

console.log(url);

url2 = url.replace("&f=1","");

$('.LocationData').append('<div class="AlignRight"><a href="'+url2+'">Autres caches à proximité</a><br>(<a href="'+url+'">Non-trouvées par vous-même</a>)</div>');


