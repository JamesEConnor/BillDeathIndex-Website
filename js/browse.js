//Download information about this entity.
$.getJSON("https://raw.githubusercontent.com/JamesEConnor/BillDeathIndex-Website/main/data/entities.json", function(json) {
    var data = json[findGetParameter("entity")];
        
    $("#controls > img").attr("src", "images/logos/" + data["logo"]);
    $("#controls h2").text(data["name"]);
        
    var minYear = data["years"]["minYear"];
    var skipYear = data["years"]["skip"];
    
    for(var year = minYear; year <= new Date().getFullYear(); year += skipYear)
        $(`<li data-key="year" data-value="${year}">${year + " - " + (year + skipYear - 1)}</li>`).appendTo($("#year-controls"));
});



//Options selection
$(document).on("click", "#controls div.options ul.options li", function() {
    var isSelected = $(this).hasClass("selected");
    $("#controls div.options ul.options li").removeClass("selected");
    
    if(!isSelected) {
        //Changes the UI
        $(this).addClass("selected");

        //Sets the filter
        setFilter($(this).data("key"), $(this).data("value"));
    } else {
        setFilter("", "");
    }
});


$("#controls .search input[type=text]").change(function() {
    //Remove all filters
    $("#controls div.options ul.options li").removeClass("selected");
    
    if($(this).val() == "" || $(this).val() == undefined)
        makeRequest(10, false);
    else
        search($(this).val());
})
$("#controls .search .search-button").click(function() {
    $(this).siblings("input[type=text]").change();
})