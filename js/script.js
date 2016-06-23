(function (global) {

var dc = {};

var allCountriesUrl = "http://davids-restaurant.herokuapp.com/categories.json";
var countryTitleHTML = "images/country-title-snippet.html";
var countryHTML = "images/country-snippet.html";


// Convinience function for inserting innerHTML for 'select'
var insertHtml = function (selector, html) {
  var targetElem = document.querySelector(selector);
  targetElem.innerHTML = html;
};

// Show loading icon inside element identified by 'selector'.
var showLoading = function (selector) {
  var html = "<div class='text-center'>";
  html += "<img src='images/ajax-loader.gif'></div>";
  insertHtml(selector, html);
};

// Return substitute of '{{propName}}' 
// with propValue in given 'string' 
var insertProperty = function (string, propName, propValue) {
  var propToReplace = "{{" + propName + "}}";
  string = string
    .replace(new RegExp(propToReplace, "g"), propValue);
  return string;
};

//Load the countries list view
dc.loadCountries = function() {
showLoading("#main-content");
$ajaxUtils.sendGetRequest(
    allCountriesUrl,
    buildAndShowCountryListHTML, false);
};


// Builds HTML for the country list view based on the data
// from the server
function buildAndShowCountryListHTML(countries){
	// Load title snippet of categories page
  $ajaxUtils.sendGetRequest(
    countryTitleHTML,
    function (categoriesTitleHtml) {
      // Retrieve single category snippet
      $ajaxUtils.sendGetRequest(
        countryHTML,
        function (categoryHtml) {
          var countriesViewHtml = 
            buildCountriesViewHtml(countries, 
                                    countryTitleHTML,
                                    countryHTML);
          insertHtml("#main-content", countriesViewHtml);
        },
        false);
    },
    false);

};

// Using countries data and snippets html
// build countries view HTML to be inserted into page
function buildCountriesViewHtml(countries, 
                                    countryTitleHTML,
                                    countryHTML) {
  
  var finalHtml = countryTitleHTML;
  finalHtml += "<section class='row'>";

  // Loop over countries
  for (var i = 0; i < countries.length; i++) {
    // Insert category values
    var html = countryHTML;
    var name = "" + countries[i].name;
    var short_name = countries[i].short_name;
    html = 
      insertProperty(html, "name", name);
    html = 
      insertProperty(html, 
                     "short_name",
                     short_name);
    finalHtml += html;
  }

  finalHtml += "</section>";
  alert(" buildCountriesViewHtml Working!");
  alert(countryHTML);
  alert(finalHtml);
  return finalHtml;
}

global.$dc = dc;

})(window);
