const deathLevelLabels = ["Alive (None)", "Mostly Dead (Low)", "Flatlining (Moderate)", "Clinical (High)", "Six Feet Under (Severe)"]

var billRef = database.ref(findGetParameter("entity") + "/" + findGetParameter("bill"));

billRef.on('value', (snapshot) => {
    const data = snapshot.val();
    loadBill(data);
});

//Loads a bill and presents the correct information.
function loadBill(data) {
    $(".bill-result-title").text(data["title"]);
    
    //$("title").text("Bill" + data["printNo"]);
    
    $(".bill-result-printno p").text(data["printNo"]);
    $(".bill-result-deathlevel p").text(deathLevelLabels[data["deathLevel"]]);
    $(".bill-result-year p").text(data["year"]);
    
    if(data["adopted"] == true)
        $(".bill-result-descriptors").append($("<li class='bill-result-adopted'><p>Adopted</p></li>"));
    if(data["signed"] == true)
        $(".bill-result-descriptors").append($("<li class='bill-result-signed'><p>Signed</p></li>"));
    if(data["vetoed"] == true)
        $(".bill-result-descriptors").append($("<li class='bill-result-vetoed'><p>Vetoed</p></li>"));
    
    $(".bill-result-text").text(data["fullText"]);
}

//Return button
$("#controls button.return").click(function() {
    window.history.back();
})