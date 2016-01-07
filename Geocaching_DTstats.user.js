// ==UserScript==
// @name         Geocaching Stats D/T
// @namespace    http://www.crevola.org/francois/
// @version      0.2
// @description  Add info in D/T stats block
// @author       Francois Crevola
// @match        http*://www.geocaching.com/my/statistics.aspx
// @grant        none
// ==/UserScript==

// Add information about nb of D/T found
var count = 0;
var elements = $('#DifficultyTerrainCaches .stats_cell_many'); count += elements.length;
elements = $('#DifficultyTerrainCaches .stats_cell_lots');     count += elements.length;
elements = $('#DifficultyTerrainCaches .stats_cell_few');      count += elements.length;
elements = $('#DifficultyTerrainCaches .stats_cell_some');     count += elements.length;
elements = $('#DifficultyTerrainCaches .stats_cell_couple');   count += elements.length;
var percent = (count*100)/81;
$('#DifficultyTerrainCaches').append('<div class="totalDT" style="text-align:right">'+count+' / 81 ('+(percent.toPrecision(2))+ '%)</div>');

// Add link to ProjectGC matrixDT tool
$('#DifficultyTerrainCaches').append('<div class="matrixToolLink" style="text-align:right"><a href="http://project-gc.com/Maps/MapMatrix">Matrix DT Tool</a></div>');

// Remove Lab Cache Disclaimer
$(".labcache-disclaimer").remove();

