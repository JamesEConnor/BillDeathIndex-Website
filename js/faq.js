$("ul li h3").click(function() {
    $(this).find(".arrow").toggleClass("opened");
    
    var parent = $(this).parent();
    if(parent.hasClass("opened")) {
        setTimeout(function() {
            parent.removeClass("opened");
        },500) 
    } else {
        parent.addClass("opened");
    }
    
    parent.find("p").slideToggle(500);
})