//Labels for death levels.
const deathLevelLabels = ["Alive (None)", "Mostly Dead (Low)", "Flatlining (Moderate)", "Clinical (High)", "Six Feet Under (Severe)"]
const deathLevels = ["none", "low", "moderate", "high", "severe"];

//The print number of the last downloaded bill to support pagination.
var lastBill = "";

//Downloads the first ten bills.
makeRequest(10, false)

//Creates a bill element based on download Firebase data, optionally skipping the first line to enable proper pagination.
function addBill(data, skipFirst, count, hideLoadButton=false) {    
    var first = true;
    var counter = 0;
    for(var bill in data) {   
        counter++;
        
        if(first) {
            first = false;
            
            if(skipFirst)
                continue;
        }        
        
        var printNo = data[bill]["printNo"];
        var year = data[bill]["year"]
        var deathLevel = deathLevels[data[bill]["deathLevel"]];
        var deathLevelLabel = deathLevelLabels[data[bill]["deathLevel"]];
        var title = data[bill]["title"];
        var summary = data[bill]["summary"];
        
        var entity = findGetParameter("entity");
        
        var newBill = `<li class="bill ${deathLevel}"><div class="bill-content-left"><a href="bill.html?bill=${printNo.toString() + year.toString()}&entity=${entity}"><h2 class="bill-printno">Bill ${printNo}</h2><h2 class="bill-year">${year}</h2></a><h3 class="bill-rating-prefix">Death Rating</h3><h3 class="bill-rating clinical">${deathLevelLabel}</h3></div><div class="bill-content-right"><a href="bill.html?bill=${printNo.toString() + year.toString()}&entity=${entity}"><h3 class="bill-title">${title}</h3><p class="bill-summary">${summary}</p></a></div></li>`;
                
        $(newBill).insertBefore($("ul > .preloader"));
        
        lastBill = bill;
    }
    
    //No results
    if(counter == 0)
        $("#main-content > ul .no-results").addClass("show");
    else        
        $("#main-content > ul .no-results").removeClass("show");
    
    //Render or remove the button based on if enough records are present.
    if(counter < count || hideLoadButton)
        $("#main-content > ul > button").addClass("invisible");
    else
        $("#main-content > ul > button").removeClass("invisible");
    
    $("#main-content > ul").removeClass("loading");
}


//The filter key
var filterKey = "";

//The value to filter for
var filterValue = "";

//Adds a filter
function setFilter(key, value) {
    filterKey = key;
    filterValue = value;
    
    if(filterKey == "")
        $("#main-content > ul .preloader p").removeClass("show");
    else
        $("#main-content > ul .preloader p").addClass("show");
        
    //Reset the count and last downloaded bill
    currentCount = 0;
    lastBill = "";
    
    //Delete current bills and replace with new ones.
    $("#main-content > ul li").remove();
    makeRequest(10, false);
}




//The current number of bills
var currentCount = 0;

//Requests count records, while keeping track of whether this is a pagination request.
function makeRequest(count, paginate) {
    //Adds the loading icon.
    $("#main-content > ul").addClass("loading");
    
    //The bill reference object
    var billRef;
    
    if(filterKey == "" || filterKey == undefined) {
        billRef = database.ref(findGetParameter("entity")).orderByKey().startAt(lastBill).limitToFirst(count + (paginate ? 1 : 0));
    } else {
        billRef = database.ref(findGetParameter("entity")).orderByChild(filterKey).equalTo(filterValue).limitToFirst(count + currentCount);
    }
    
    billRef.on('value', (snapshot) => {
        const data = snapshot.val();
        addBill(data, paginate, count);
    });
    
    currentCount += count;
}

//Searches for a specific bill
function search(billToFind) {
    $("#main-content > ul li").remove();
    
    //Remove filters
    filterKey = "";
    filterValue = "";
    currentCount = 0;
    
    var billRef = database.ref(findGetParameter("entity"))
                .orderByKey()
                .startAt(billToFind)
                .endAt(billToFind+"\uf8ff");
    
    billRef.on('value', (snapshot) => {
        const data = snapshot.val();
        addBill(data, false, 1, true);
    });
}

//When the button is clicked, enable
$("#main-content > ul > button").click(function() {
    $("#main-content > ul").addClass("loading");
    
    makeRequest(10, true);
})