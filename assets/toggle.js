function toggleMenu() {
    var menu = $('.navigation-menu');
    $(menu).stop();
    if ($(menu).data("visible")) {
        $(menu).animate({
            left: '-100%'
        })
        $(menu).data("visible", false);
        $("body").css("overflow", "auto");
        menuVisible = false;
    } else {
        $(menu).animate({
            left: '50px'
        })
        $(menu).data("visible", true);
        $("body").css("overflow", "hidden");
        menuVisible = true;
    }
}
var menuVisible = false;
$(document).keyup(function(e) {
    if (menuVisible && e.key === 'Escape') {
        toggleMenu();
    }
})
$(document).keypress(function(e) {
    if (e.key == 'm') {
        toggleMenu();
    }
});
$(document).ready(function() {
    $("#toggle-menu").click(function(e) {
        e.preventDefault();
        toggleMenu();
    })
});