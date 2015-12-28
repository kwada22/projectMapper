/*****************************************************************************************

main.js consists of...

1. Accordion Panel in the help tab (line 16 - 83)
2. Toggle 
    Part A Basic Check Box function (Line 89 - 120)
    Part B Correlation with the buttons in the map window (Line 122 - 327)
    Part C Check box to on/off each map layer (Line 329 - 653)
3. Control Layer Buttons and Check Box (Line 656 - 965)
4. D3 Charts (Line 968 - 1147)

*****************************************************************************************/


////////////////////////////// Accordion Panel in the help tab ///////////////////////////

$(function() {
    $(".accordion").each(function() {
        $("> dd", this).removeClass("active").hide();
        $("> dt", this).prepend("<span class='icon'></span>");
        $("> dt", this).hover(function() {
            $(this).css("cursor", "pointer");
            $(this).css("color", "rgb(89, 184, 230)");
            $(this).find(".icon").css("background", function() {
                if ($(this).parent("dt").hasClass("active")) {
                    return "url('images/helpTab/downarrow_hover.svg') no-repeat 50% 50%"
                } else {
                    return "url('images/helpTab/rightarrow_hover.svg') no-repeat 50% 50%"
                }
            });
        }, function() {
            $(this).css("color", function() {
                if ($(this).hasClass("active")) {
                    return "rgb(51, 103, 153)"
                } else {
                    return "#797979"
                }
            });
            $(this).find(".icon").css("background", function() {
                if ($(this).parent("dt").hasClass("active")) {
                    return "url('images/helpTab/downarrow.svg') no-repeat 50% 50%"
                } else {
                    return "url('images/helpTab/rightarrow.svg') no-repeat 50% 50%"
                }
            });
        })
            .click(
                function() {
                    if ($(this).not(".active")) {
                        $("dt").removeClass("active");
                        $(".icon").css("background", "url('images/helpTab/rightarrow.svg') no-repeat 50% 50%");
                        $("dt").css("color", "#797979");
                        $(this).siblings("dd").slideUp("fast");
                        $(this).addClass("active");
                        $(">dt", this).css("color", "rgb(51, 103, 153)");
                        $("> .icon", this).css("background", "url('images/helpTab/downarrow.svg') no-repeat 50% 50%");
                        $("+ dd", this).slideDown("fast");
                    } else if ($(this).hasClass("active")) {
                        $(this).removeClass("active");
                        $("+ dd", this).slideUp("fast");
                        $(this).css("color", "#797979");
                    }
                });
    });
});


$("#tabPanel2 a").click(function() {
    $("#contents2").css("display", "none");
    $("#contents1").css("height", "auto");
    $("#contents1").css("margin-bottom", "5vh");
    $("#contents1").css("max-height", "83vh");
    $("#contents1 .panel #panel2").css("max-height", "80vh");
});

$("#tabPanel1 a").click(function() {
    $("#contents2").css("display", "block");
});

$("#tabPanel3 a").click(function() {
    $("#contents2").css("display", "block");
});


////////////////////////////// Toggle ////////////////////////////////////////////////////


////////////////////////////// Part A:  Basic Check Box function

$(document).ready(function() {
    // Set variables of selectors
    var tgt_parent = $("input.check-parent");
    var tgt_child = $("input.check-child");

    // Parent checkbox
    tgt_parent.click(function() {
        $(this).parents("div.parent").find('ul li input.check-child').prop('checked', this.checked);
    });

    // Children check box
    tgt_child.click(function() {
        var checkNum1 = $(this).parents('ul').find('li input.check-child:checked').length;
        var listNum1 = $(this).parents('ul').find('li').length;
        if (checkNum1 == listNum1) {
            $(this).parents("div.parent").find("input.check-parent").prop('checked', true);
        } else {
            $(this).parents("div.parent").find("input.check-parent").prop('checked', false);
        }
    });
});

//Check parent checkboxes when their children checkboxes are all checked
$(document).ready(function() {
    var checkNum2 = $("input.check-child:checked").parents('ul').find('li input.check-child:checked').length;
    var listNum2 = $("input.check-child:checked").parents('ul').find('li').length;
    if (checkNum2 == listNum2) {
        $("input.check-child:checked").parents("div.parent").find("input.check-parent:checkbox").prop('checked', true);
    }
});

////////////////////////////// Part B: Correlation with the buttons in the map window

// Road Pricing
$(function() {
    var checkRP = $("input.rp_child");
    var self = $("button#tg-roadPricing");

    checkRP.click(function() {
        if ($(this).parents('ul').find('li input.rp_child:checked').length == 0) {
            self.removeClass("active");
            self.css("background-image", "#808080");
            self.css("background-image", "-moz-linear-gradient(bottom, #808080 0%, #999999 100%)");
            self.css("background-image", "-webkit-gradient(linear, left bottom, left top, color-stop(0, #808080), color-stop(1, #999999))");
            self.css("background-image", "-webkit-linear-gradient(bottom, #808080 0%, #999999 100%)");
            self.css("background-image", "-o-linear-gradient(bottom, #808080 0%, #999999 100%)");
            self.css("background-image", "-ms-linear-gradient(bottom, #EEEEEE 0%, #FFFFFF 100%);");
            self.css("background-image", "linear-gradient(to top, #808080 0%, #999999 100%)");

            self.hover(function() {
                self.css("background-image", "rgba(89, 184, 230, 1)");
                self.css("background-image", "-moz-linear-gradient(bottom, rgba(88,185,230,1) 0%, rgba(159,207,229,1) 100%)");
                self.css("background-image", "-webkit-gradient(left bottom, left top, color-stop(0%, rgba(88,185,230,1)), color-stop(100%, rgba(159,207,229,1)))");
                self.css("background-image", "-webkit-linear-gradient(bottom, rgba(88,185,230,1) 0%, rgba(159,207,229,1) 100%)");
                self.css("background-image", "-o-linear-gradient(bottom, rgba(88,185,230,1) 0%, rgba(159,207,229,1) 100%)");
                self.css("background-image", "-ms-linear-gradient(bottom, rgba(88,185,230,1) 0%, rgba(159,207,229,1) 100%)");
                self.css("background-image", "linear-gradient(to top, rgba(88,185,230,1) 0%, rgba(159,207,229,1) 100%)");

            }, function() {
                self.css("background-image", "#808080");
                self.css("background-image", "-moz-linear-gradient(bottom, #808080 0%, #999999 100%)");
                self.css("background-image", "-webkit-gradient(linear, left bottom, left top, color-stop(0, #808080), color-stop(1, #999999))");
                self.css("background-image", "-webkit-linear-gradient(bottom, #808080 0%, #999999 100%)");
                self.css("background-image", "-o-linear-gradient(bottom, #808080 0%, #999999 100%)");
                self.css("background-image", "-ms-linear-gradient(bottom, #EEEEEE 0%, #FFFFFF 100%);");
                self.css("background-image", "linear-gradient(to top, #808080 0%, #999999 100%)");
            });

        } else {
            self.addClass("active");
            self.css("background-image", "rgba(51, 103, 153, 1)");
            self.css("background-image", "-moz-linear-gradient(bottom, rgba(51,104,153,1) 0%, rgba(63,130,178,1) 100%)");
            self.css("background-image", "-webkit-gradient(left bottom, left top, color-stop(0%, rgba(51,104,153,1)), color-stop(100%, rgba(63,130,178,1)))");
            self.css("background-image", "-webkit-linear-gradient(bottom, rgba(51,104,153,1) 0%, rgba(63,130,178,1) 100%)");
            self.css("background-image", "-o-linear-gradient(bottom, rgba(51,104,153,1) 0%, rgba(63,130,178,1) 100%)");
            self.css("background-image", "-ms-linear-gradient(bottom, rgba(51,104,153,1) 0%, rgba(63,130,178,1) 100%)");
            self.css("background-image", "linear-gradient(to top, rgba(51,104,153,1) 0%, rgba(63,130,178,1) 100%)");

            self.hover(function() {
                self.css("background-image", "rgba(89, 184, 230, 1)");
                self.css("background-image", "-moz-linear-gradient(bottom, rgba(88,185,230,1) 0%, rgba(159,207,229,1) 100%)");
                self.css("background-image", "-webkit-gradient(left bottom, left top, color-stop(0%, rgba(88,185,230,1)), color-stop(100%, rgba(159,207,229,1)))");
                self.css("background-image", "-webkit-linear-gradient(bottom, rgba(88,185,230,1) 0%, rgba(159,207,229,1) 100%)");
                self.css("background-image", "-o-linear-gradient(bottom, rgba(88,185,230,1) 0%, rgba(159,207,229,1) 100%)");
                self.css("background-image", "-ms-linear-gradient(bottom, rgba(88,185,230,1) 0%, rgba(159,207,229,1) 100%)");
                self.css("background-image", "linear-gradient(to top, rgba(88,185,230,1) 0%, rgba(159,207,229,1) 100%)");

            }, function() {
                self.css("background-image", "rgba(51, 103, 153, 1)");
                self.css("background-image", "-moz-linear-gradient(bottom, rgba(51,104,153,1) 0%, rgba(63,130,178,1) 100%)");
                self.css("background-image", "-webkit-gradient(left bottom, left top, color-stop(0%, rgba(51,104,153,1)), color-stop(100%, rgba(63,130,178,1)))");
                self.css("background-image", "-webkit-linear-gradient(bottom, rgba(51,104,153,1) 0%, rgba(63,130,178,1) 100%)");
                self.css("background-image", "-o-linear-gradient(bottom, rgba(51,104,153,1) 0%, rgba(63,130,178,1) 100%)");
                self.css("background-image", "-ms-linear-gradient(bottom, rgba(51,104,153,1) 0%, rgba(63,130,178,1) 100%)");
                self.css("background-image", "linear-gradient(to top, rgba(51,104,153,1) 0%, rgba(63,130,178,1) 100%)");
            });
        }
    });
});

// Highway 
$(function() {

    var checkHW = $("input.hw_child");
    var self = $("button#tg-highway");

    checkHW.click(function() {
        if ($(this).parents('ul').find('li input.hw_child:checked').length == 0) {
            self.removeClass("active");
            self.css("background-image", "#808080");
            self.css("background-image", "-moz-linear-gradient(bottom, #808080 0%, #999999 100%)");
            self.css("background-image", "-webkit-gradient(linear, left bottom, left top, color-stop(0, #808080), color-stop(1, #999999))");
            self.css("background-image", "-webkit-linear-gradient(bottom, #808080 0%, #999999 100%)");
            self.css("background-image", "-o-linear-gradient(bottom, #808080 0%, #999999 100%)");
            self.css("background-image", "-ms-linear-gradient(bottom, #EEEEEE 0%, #FFFFFF 100%);");
            self.css("background-image", "linear-gradient(to top, #808080 0%, #999999 100%)");

            self.hover(function() {
                self.css("background-image", "rgba(89, 184, 230, 1)");
                self.css("background-image", "-moz-linear-gradient(bottom, rgba(88,185,230,1) 0%, rgba(159,207,229,1) 100%)");
                self.css("background-image", "-webkit-gradient(left bottom, left top, color-stop(0%, rgba(88,185,230,1)), color-stop(100%, rgba(159,207,229,1)))");
                self.css("background-image", "-webkit-linear-gradient(bottom, rgba(88,185,230,1) 0%, rgba(159,207,229,1) 100%)");
                self.css("background-image", "-o-linear-gradient(bottom, rgba(88,185,230,1) 0%, rgba(159,207,229,1) 100%)");
                self.css("background-image", "-ms-linear-gradient(bottom, rgba(88,185,230,1) 0%, rgba(159,207,229,1) 100%)");
                self.css("background-image", "linear-gradient(to top, rgba(88,185,230,1) 0%, rgba(159,207,229,1) 100%)");

            }, function() {
                self.css("background-image", "#808080");
                self.css("background-image", "-moz-linear-gradient(bottom, #808080 0%, #999999 100%)");
                self.css("background-image", "-webkit-gradient(linear, left bottom, left top, color-stop(0, #808080), color-stop(1, #999999))");
                self.css("background-image", "-webkit-linear-gradient(bottom, #808080 0%, #999999 100%)");
                self.css("background-image", "-o-linear-gradient(bottom, #808080 0%, #999999 100%)");
                self.css("background-image", "-ms-linear-gradient(bottom, #EEEEEE 0%, #FFFFFF 100%);");
                self.css("background-image", "linear-gradient(to top, #808080 0%, #999999 100%)");
            });

        } else {
            self.addClass("active");
            self.css("background-image", "rgba(51, 103, 153, 1)");
            self.css("background-image", "-moz-linear-gradient(bottom, rgba(51,104,153,1) 0%, rgba(63,130,178,1) 100%)");
            self.css("background-image", "-webkit-gradient(left bottom, left top, color-stop(0%, rgba(51,104,153,1)), color-stop(100%, rgba(63,130,178,1)))");
            self.css("background-image", "-webkit-linear-gradient(bottom, rgba(51,104,153,1) 0%, rgba(63,130,178,1) 100%)");
            self.css("background-image", "-o-linear-gradient(bottom, rgba(51,104,153,1) 0%, rgba(63,130,178,1) 100%)");
            self.css("background-image", "-ms-linear-gradient(bottom, rgba(51,104,153,1) 0%, rgba(63,130,178,1) 100%)");
            self.css("background-image", "linear-gradient(to top, rgba(51,104,153,1) 0%, rgba(63,130,178,1) 100%)");

            self.hover(function() {
                self.css("background-image", "rgba(89, 184, 230, 1)");
                self.css("background-image", "-moz-linear-gradient(bottom, rgba(88,185,230,1) 0%, rgba(159,207,229,1) 100%)");
                self.css("background-image", "-webkit-gradient(left bottom, left top, color-stop(0%, rgba(88,185,230,1)), color-stop(100%, rgba(159,207,229,1)))");
                self.css("background-image", "-webkit-linear-gradient(bottom, rgba(88,185,230,1) 0%, rgba(159,207,229,1) 100%)");
                self.css("background-image", "-o-linear-gradient(bottom, rgba(88,185,230,1) 0%, rgba(159,207,229,1) 100%)");
                self.css("background-image", "-ms-linear-gradient(bottom, rgba(88,185,230,1) 0%, rgba(159,207,229,1) 100%)");
                self.css("background-image", "linear-gradient(to top, rgba(88,185,230,1) 0%, rgba(159,207,229,1) 100%)");

            }, function() {
                self.css("background-image", "rgba(51, 103, 153, 1)");
                self.css("background-image", "-moz-linear-gradient(bottom, rgba(51,104,153,1) 0%, rgba(63,130,178,1) 100%)");
                self.css("background-image", "-webkit-gradient(left bottom, left top, color-stop(0%, rgba(51,104,153,1)), color-stop(100%, rgba(63,130,178,1)))");
                self.css("background-image", "-webkit-linear-gradient(bottom, rgba(51,104,153,1) 0%, rgba(63,130,178,1) 100%)");
                self.css("background-image", "-o-linear-gradient(bottom, rgba(51,104,153,1) 0%, rgba(63,130,178,1) 100%)");
                self.css("background-image", "-ms-linear-gradient(bottom, rgba(51,104,153,1) 0%, rgba(63,130,178,1) 100%)");
                self.css("background-image", "linear-gradient(to top, rgba(51,104,153,1) 0%, rgba(63,130,178,1) 100%)");
            });
        }
    });
});

// Transit 

$(function() {

    var checkTS = $("input.ts_child");
    var self = $("button#tg-transit");

    checkTS.click(function() {

        if ($(this).parents('ul').find('li input.ts_child:checked').length == 0) {
            self.removeClass("active");
            self.css("background-image", "#808080");
            self.css("background-image", "-moz-linear-gradient(bottom, #808080 0%, #999999 100%)");
            self.css("background-image", "-webkit-gradient(linear, left bottom, left top, color-stop(0, #808080), color-stop(1, #999999))");
            self.css("background-image", "-webkit-linear-gradient(bottom, #808080 0%, #999999 100%)");
            self.css("background-image", "-o-linear-gradient(bottom, #808080 0%, #999999 100%)");
            self.css("background-image", "-ms-linear-gradient(bottom, #EEEEEE 0%, #FFFFFF 100%);");
            self.css("background-image", "linear-gradient(to top, #808080 0%, #999999 100%)");

            self.hover(function() {
                self.css("background-image", "rgba(89, 184, 230, 1)");
                self.css("background-image", "-moz-linear-gradient(bottom, rgba(88,185,230,1) 0%, rgba(159,207,229,1) 100%)");
                self.css("background-image", "-webkit-gradient(left bottom, left top, color-stop(0%, rgba(88,185,230,1)), color-stop(100%, rgba(159,207,229,1)))");
                self.css("background-image", "-webkit-linear-gradient(bottom, rgba(88,185,230,1) 0%, rgba(159,207,229,1) 100%)");
                self.css("background-image", "-o-linear-gradient(bottom, rgba(88,185,230,1) 0%, rgba(159,207,229,1) 100%)");
                self.css("background-image", "-ms-linear-gradient(bottom, rgba(88,185,230,1) 0%, rgba(159,207,229,1) 100%)");
                self.css("background-image", "linear-gradient(to top, rgba(88,185,230,1) 0%, rgba(159,207,229,1) 100%)");

            }, function() {
                self.css("background-image", "#808080");
                self.css("background-image", "-moz-linear-gradient(bottom, #808080 0%, #999999 100%)");
                self.css("background-image", "-webkit-gradient(linear, left bottom, left top, color-stop(0, #808080), color-stop(1, #999999))");
                self.css("background-image", "-webkit-linear-gradient(bottom, #808080 0%, #999999 100%)");
                self.css("background-image", "-o-linear-gradient(bottom, #808080 0%, #999999 100%)");
                self.css("background-image", "-ms-linear-gradient(bottom, #EEEEEE 0%, #FFFFFF 100%);");
                self.css("background-image", "linear-gradient(to top, #808080 0%, #999999 100%)");
            });

        } else {
            self.addClass("active");
            self.css("background-image", "rgba(51, 103, 153, 1)");
            self.css("background-image", "-moz-linear-gradient(bottom, rgba(51,104,153,1) 0%, rgba(63,130,178,1) 100%)");
            self.css("background-image", "-webkit-gradient(left bottom, left top, color-stop(0%, rgba(51,104,153,1)), color-stop(100%, rgba(63,130,178,1)))");
            self.css("background-image", "-webkit-linear-gradient(bottom, rgba(51,104,153,1) 0%, rgba(63,130,178,1) 100%)");
            self.css("background-image", "-o-linear-gradient(bottom, rgba(51,104,153,1) 0%, rgba(63,130,178,1) 100%)");
            self.css("background-image", "-ms-linear-gradient(bottom, rgba(51,104,153,1) 0%, rgba(63,130,178,1) 100%)");
            self.css("background-image", "linear-gradient(to top, rgba(51,104,153,1) 0%, rgba(63,130,178,1) 100%)");

            self.hover(function() {
                self.css("background-image", "rgba(89, 184, 230, 1)");
                self.css("background-image", "-moz-linear-gradient(bottom, rgba(88,185,230,1) 0%, rgba(159,207,229,1) 100%)");
                self.css("background-image", "-webkit-gradient(left bottom, left top, color-stop(0%, rgba(88,185,230,1)), color-stop(100%, rgba(159,207,229,1)))");
                self.css("background-image", "-webkit-linear-gradient(bottom, rgba(88,185,230,1) 0%, rgba(159,207,229,1) 100%)");
                self.css("background-image", "-o-linear-gradient(bottom, rgba(88,185,230,1) 0%, rgba(159,207,229,1) 100%)");
                self.css("background-image", "-ms-linear-gradient(bottom, rgba(88,185,230,1) 0%, rgba(159,207,229,1) 100%)");
                self.css("background-image", "linear-gradient(to top, rgba(88,185,230,1) 0%, rgba(159,207,229,1) 100%)");

            }, function() {
                self.css("background-image", "rgba(51, 103, 153, 1)");
                self.css("background-image", "-moz-linear-gradient(bottom, rgba(51,104,153,1) 0%, rgba(63,130,178,1) 100%)");
                self.css("background-image", "-webkit-gradient(left bottom, left top, color-stop(0%, rgba(51,104,153,1)), color-stop(100%, rgba(63,130,178,1)))");
                self.css("background-image", "-webkit-linear-gradient(bottom, rgba(51,104,153,1) 0%, rgba(63,130,178,1) 100%)");
                self.css("background-image", "-o-linear-gradient(bottom, rgba(51,104,153,1) 0%, rgba(63,130,178,1) 100%)");
                self.css("background-image", "-ms-linear-gradient(bottom, rgba(51,104,153,1) 0%, rgba(63,130,178,1) 100%)");
                self.css("background-image", "linear-gradient(to top, rgba(51,104,153,1) 0%, rgba(63,130,178,1) 100%)");
            });
        }
    });
});

////////////////////////////// Part C: Check box to on/off each map layer

// All Basemap elements (PDA, Urbanized area and County Label)
$('input#allBasemap').click(function() {

    if (this.checked) {
        $("#mapContainer .BasemapElements").fadeIn(500);
    } else {
        $("#mapContainer .BasemapElements").fadeOut(500);
    };

});

// Urbanized Area
$('input#child-01').click(function() {

    if (this.checked) {
        $("#mapContainer .bme-Urbanized").fadeIn(300);
    } else {
        $("#mapContainer .bme-Urbanized").fadeOut(300);
    };

});

// PDA
$('input#child-02').click(function() {

    if (this.checked) {
        $("#mapContainer .bme-PDA").fadeIn(300);
    } else {
        $("#mapContainer .bme-PDA").fadeOut(300);
    };

});

// Existing Highway and Freeway
$('input#allExistingNetwork').click(function() {

    if (this.checked) {
        $("#mapContainer .en-HwFwy").fadeIn(500);
    } else {
        $("#mapContainer .en-HwFwy").fadeOut(500);
    };

});

// Existing All Commuter Rail
$('input#allExistingNetwork').click(function() {

    if (this.checked) {
        $("#mapContainer .allCR").fadeIn(500);
    } else {
        $("#mapContainer .allCR").fadeOut(500);
    };

});

// BART
$('input#child-03').click(function() {

    if (this.checked) {
        $("#mapContainer .en-BART").fadeIn(300);
    } else {
        $("#mapContainer .en-BART").fadeOut(300);
    };
});

// Caltrain
$('input#child-04').click(function() {

    if (this.checked) {
        $("#mapContainer .en-Caltrain").fadeIn(300);
    } else {
        $("#mapContainer .en-Caltrain").fadeOut(300);
    };

});

// Highway and Freeway
$('input#child-05').click(function() {

    if (this.checked) {
        $("#mapContainer .en-HwFwy").fadeIn(300);
    } else {
        $("#mapContainer .en-HwFwy").fadeOut(300);
    };

});

// county labels
$('input#child-add1').click(function() {

    if (this.checked) {
        $("#mapContainer .countyNames").fadeIn(300);
    } else {
        $("#mapContainer .countyNames").fadeOut(300);
    };

});

// Light Rail
$('input#child-add2').click(function() {

    if (this.checked) {
        $("#mapContainer .allLR").fadeIn(300);
    } else {
        $("#mapContainer .allLR").fadeOut(300);
    };

});

// All Road Pricing
$('input#allRoadPricingProjects').click(function() {

    if (this.checked) {
        $("#mapContainer .toggle_RP").fadeIn(300);
        $('button#tg-roadPricing').addClass("active");
        $('button#tg-roadPricing').css("background-image", "rgba(51, 103, 153, 1)");
        $('button#tg-roadPricing').css("background-image", "-moz-linear-gradient(bottom, rgba(51,104,153,1) 0%, rgba(63,130,178,1) 100%)");
        $('button#tg-roadPricing').css("background-image", "-webkit-gradient(left bottom, left top, color-stop(0%, rgba(51,104,153,1)), color-stop(100%, rgba(63,130,178,1)))");
        $('button#tg-roadPricing').css("background-image", "-webkit-linear-gradient(bottom, rgba(51,104,153,1) 0%, rgba(63,130,178,1) 100%)");
        $('button#tg-roadPricing').css("background-image", "-o-linear-gradient(bottom, rgba(51,104,153,1) 0%, rgba(63,130,178,1) 100%)");
        $('button#tg-roadPricing').css("background-image", "-ms-linear-gradient(bottom, rgba(51,104,153,1) 0%, rgba(63,130,178,1) 100%)");
        $('button#tg-roadPricing').css("background-image", "linear-gradient(to top, rgba(51,104,153,1) 0%, rgba(63,130,178,1) 100%)");
 
    } else {
        $("#mapContainer .toggle_RP").fadeOut(300);
        $('button#tg-roadPricing').removeClass("active");
        $('button#tg-roadPricing').css("background-image", "#808080");
        $('button#tg-roadPricing').css("background-image", "-moz-linear-gradient(bottom, #808080 0%, #999999 100%)");
        $('button#tg-roadPricing').css("background-image", "-webkit-gradient(linear, left bottom, left top, color-stop(0, #808080), color-stop(1, #999999))");
        $('button#tg-roadPricing').css("background-image", "-webkit-linear-gradient(bottom, #808080 0%, #999999 100%)");
        $('button#tg-roadPricing').css("background-image", "-o-linear-gradient(bottom, #808080 0%, #999999 100%)");
        $('button#tg-roadPricing').css("background-image", "-ms-linear-gradient(bottom, #EEEEEE 0%, #FFFFFF 100%);");
        $('button#tg-roadPricing').css("background-image", "linear-gradient(to top, #808080 0%, #999999 100%)");
    };

});


// Congestion Pricing
$('input#child-06').click(function() {

    if (this.checked) {
        $("#mapContainer .RP_CongestionPricing").fadeIn(300);
    } else {
        $("#mapContainer .RP_CongestionPricing").fadeOut(300);
    };

});

// Express Lane
$('input#child-07').click(function() {

    if (this.checked) {
        $("#mapContainer .RP_ExpressLane").fadeIn(300);
    } else {
        $("#mapContainer .RP_ExpressLane").fadeOut(300);
    };

});

// All Highway
$('input#allHighwayProjects').click(function() {

    if (this.checked) {
        $("#mapContainer .toggle_HW").fadeIn(300);
        $('button#tg-highway').addClass("active");
        $('button#tg-highway').css("background-image", "rgba(51, 103, 153, 1)");
        $('button#tg-highway').css("background-image", "-moz-linear-gradient(bottom, rgba(51,104,153,1) 0%, rgba(63,130,178,1) 100%)");
        $('button#tg-highway').css("background-image", "-webkit-gradient(left bottom, left top, color-stop(0%, rgba(51,104,153,1)), color-stop(100%, rgba(63,130,178,1)))");
        $('button#tg-highway').css("background-image", "-webkit-linear-gradient(bottom, rgba(51,104,153,1) 0%, rgba(63,130,178,1) 100%)");
        $('button#tg-highway').css("background-image", "-o-linear-gradient(bottom, rgba(51,104,153,1) 0%, rgba(63,130,178,1) 100%)");
        $('button#tg-highway').css("background-image", "-ms-linear-gradient(bottom, rgba(51,104,153,1) 0%, rgba(63,130,178,1) 100%)");
        $('button#tg-highway').css("background-image", "linear-gradient(to top, rgba(51,104,153,1) 0%, rgba(63,130,178,1) 100%)");
    } else {
        $("#mapContainer .toggle_HW").fadeOut(300);
        $('button#tg-highway').removeClass("active");
        $('button#tg-highway').css("background-image", "#808080");
        $('button#tg-highway').css("background-image", "-moz-linear-gradient(bottom, #808080 0%, #999999 100%)");
        $('button#tg-highway').css("background-image", "-webkit-gradient(linear, left bottom, left top, color-stop(0, #808080), color-stop(1, #999999))");
        $('button#tg-highway').css("background-image", "-webkit-linear-gradient(bottom, #808080 0%, #999999 100%)");
        $('button#tg-highway').css("background-image", "-o-linear-gradient(bottom, #808080 0%, #999999 100%)");
        $('button#tg-highway').css("background-image", "-ms-linear-gradient(bottom, #EEEEEE 0%, #FFFFFF 100%);");
        $('button#tg-highway').css("background-image", "linear-gradient(to top, #808080 0%, #999999 100%)");
    };

});

// Operational Improvement
$('input#child-08').click(function() {

    if (this.checked) {
        $("#mapContainer .HW_OperationalImprovement").fadeIn(300);
    } else {
        $("#mapContainer .HW_OperationalImprovement").fadeOut(300);
    };

});

// Widening
$('input#child-09').click(function() {

    if (this.checked) {
        $("#mapContainer .HW_Widening").fadeIn(300);
    } else {
        $("#mapContainer .HW_Widening").fadeOut(300);
    };

});

// HOV Lane
$('input#child-10').click(function() {

    if (this.checked) {
        $("#mapContainer .HW_HOVLane").fadeIn(300);
    } else {
        $("#mapContainer .HW_HOVLane").fadeOut(300);
    };

});

// HOV Lane
$('input#child-11').click(function() {

    if (this.checked) {
        $("#mapContainer .HW_Interchange").fadeIn(300);
    } else {
        $("#mapContainer .HW_Interchange").fadeOut(300);
    };

});

// All Transit
$('input#allTransitProjects').click(function() {

    if (this.checked) {
        $("#mapContainer .toggle_TR").fadeIn(300);
        $('button#tg-transit').addClass("active");
        $('button#tg-transit').css("background-image", "rgba(51, 103, 153, 1)");
        $('button#tg-transit').css("background-image", "-moz-linear-gradient(bottom, rgba(51,104,153,1) 0%, rgba(63,130,178,1) 100%)");
        $('button#tg-transit').css("background-image", "-webkit-gradient(left bottom, left top, color-stop(0%, rgba(51,104,153,1)), color-stop(100%, rgba(63,130,178,1)))");
        $('button#tg-transit').css("background-image", "-webkit-linear-gradient(bottom, rgba(51,104,153,1) 0%, rgba(63,130,178,1) 100%)");
        $('button#tg-transit').css("background-image", "-o-linear-gradient(bottom, rgba(51,104,153,1) 0%, rgba(63,130,178,1) 100%)");
        $('button#tg-transit').css("background-image", "-ms-linear-gradient(bottom, rgba(51,104,153,1) 0%, rgba(63,130,178,1) 100%)");
        $('button#tg-transit').css("background-image", "linear-gradient(to top, rgba(51,104,153,1) 0%, rgba(63,130,178,1) 100%)");
    } else {
        $("#mapContainer .toggle_TR").fadeOut(300);
        $('button#tg-transit').removeClass("active");
        $('button#tg-transit').css("background-image", "#808080");
        $('button#tg-transit').css("background-image", "-moz-linear-gradient(bottom, #808080 0%, #999999 100%)");
        $('button#tg-transit').css("background-image", "-webkit-gradient(linear, left bottom, left top, color-stop(0, #808080), color-stop(1, #999999))");
        $('button#tg-transit').css("background-image", "-webkit-linear-gradient(bottom, #808080 0%, #999999 100%)");
        $('button#tg-transit').css("background-image", "-o-linear-gradient(bottom, #808080 0%, #999999 100%)");
        $('button#tg-transit').css("background-image", "-ms-linear-gradient(bottom, #EEEEEE 0%, #FFFFFF 100%);");
        $('button#tg-transit').css("background-image", "linear-gradient(to top, #808080 0%, #999999 100%)");
    };

});

// Ferry
$('input#child-12').click(function() {

    if (this.checked) {
        $("#mapContainer .TR_Ferry").fadeIn(300);
    } else {
        $("#mapContainer .TR_Ferry").fadeOut(300);
    };

});

// BART
$('input#child-13').click(function() {

    if (this.checked) {
        $("#mapContainer .TR_BART").fadeIn(300);
    } else {
        $("#mapContainer .TR_BART").fadeOut(300);
    };

});

// Bus
$('input#child-14').click(function() {

    if (this.checked) {
        $("#mapContainer .TR_Bus").fadeIn(300);
    } else {
        $("#mapContainer .TR_Bus").fadeOut(300);
    };

});

// Light Rail
$('input#child-15').click(function() {

    if (this.checked) {
        $("#mapContainer .TR_LightRail").fadeIn(300);
    } else {
        $("#mapContainer .TR_LightRail").fadeOut(300);
    };

});

// Commuter Rail
$('input#child-16').click(function() {

    if (this.checked) {
        $("#mapContainer .TR_CommuterRail").fadeIn(300);
    } else {
        $("#mapContainer .TR_CommuterRail").fadeOut(300);
    };

});

// Other
$('input#child-17').click(function() {

    if (this.checked) {
        $("#mapContainer .TR_Other").fadeIn(300);
    } else {
        $("#mapContainer .TR_Other").fadeOut(300);
    };

});


////////////////////////////// Control Layer Buttons and Check Box //////////////////////////////


// Road Pricing
$("#mapContents button#tg-roadPricing").on("click", function() { //Road Pricing Project Button click function

    var self = $(this);

    if (self.hasClass("active")) { // hasClass "active" on load
        $("#mapContainer .toggle_RP").fadeOut(500); // Fade out all Road Pricing project layer
        $("input#allRoadPricingProjects").prop('checked', false); //Road Pricing Projects check off
        $("input#child-06").prop('checked', false); // Off Congestion Pricing
        $("input#child-07").prop('checked', false); // Off Express Lane
        self.removeClass("active");
        $(this).css("background-image", "#808080");
        $(this).css("background-image", "-moz-linear-gradient(bottom, #808080 0%, #999999 100%)");
        $(this).css("background-image", "-webkit-gradient(linear, left bottom, left top, color-stop(0, #808080), color-stop(1, #999999))");
        $(this).css("background-image", "-webkit-linear-gradient(bottom, #808080 0%, #999999 100%)");
        $(this).css("background-image", "-o-linear-gradient(bottom, #808080 0%, #999999 100%)");
        $(this).css("background-image", "-ms-linear-gradient(bottom, #EEEEEE 0%, #FFFFFF 100%);");
        $(this).css("background-image", "linear-gradient(to top, #808080 0%, #999999 100%)");

        $(this).hover(function() {
            $(this).css("background-image", "rgba(89, 184, 230, 1)");
            $(this).css("background-image", "-moz-linear-gradient(bottom, rgba(88,185,230,1) 0%, rgba(159,207,229,1) 100%)");
            $(this).css("background-image", "-webkit-gradient(left bottom, left top, color-stop(0%, rgba(88,185,230,1)), color-stop(100%, rgba(159,207,229,1)))");
            $(this).css("background-image", "-webkit-linear-gradient(bottom, rgba(88,185,230,1) 0%, rgba(159,207,229,1) 100%)");
            $(this).css("background-image", "-o-linear-gradient(bottom, rgba(88,185,230,1) 0%, rgba(159,207,229,1) 100%)");
            $(this).css("background-image", "-ms-linear-gradient(bottom, rgba(88,185,230,1) 0%, rgba(159,207,229,1) 100%)");
            $(this).css("background-image", "linear-gradient(to top, rgba(88,185,230,1) 0%, rgba(159,207,229,1) 100%)");

        }, function() {
            $(this).css("background-image", "#808080");
            $(this).css("background-image", "-moz-linear-gradient(bottom, #808080 0%, #999999 100%)");
            $(this).css("background-image", "-webkit-gradient(linear, left bottom, left top, color-stop(0, #808080), color-stop(1, #999999))");
            $(this).css("background-image", "-webkit-linear-gradient(bottom, #808080 0%, #999999 100%)");
            $(this).css("background-image", "-o-linear-gradient(bottom, #808080 0%, #999999 100%)");
            $(this).css("background-image", "-ms-linear-gradient(bottom, #EEEEEE 0%, #FFFFFF 100%);");
            $(this).css("background-image", "linear-gradient(to top, #808080 0%, #999999 100%)");
        });

    } else {
        $("#mapContainer .toggle_RP").fadeIn(500);
        $("input#allRoadPricingProjects").prop('checked', true); // Road Pricing Projects check on
        $("input#child-06").prop('checked', true); // On Congestion Pricing
        $("input#child-07").prop('checked', true); // On Express Lane
        self.addClass("active");
        $(this).css("background-image", "rgba(51, 103, 153, 1)");
        $(this).css("background-image", "-moz-linear-gradient(bottom, rgba(51,104,153,1) 0%, rgba(63,130,178,1) 100%)");
        $(this).css("background-image", "-webkit-gradient(left bottom, left top, color-stop(0%, rgba(51,104,153,1)), color-stop(100%, rgba(63,130,178,1)))");
        $(this).css("background-image", "-webkit-linear-gradient(bottom, rgba(51,104,153,1) 0%, rgba(63,130,178,1) 100%)");
        $(this).css("background-image", "-o-linear-gradient(bottom, rgba(51,104,153,1) 0%, rgba(63,130,178,1) 100%)");
        $(this).css("background-image", "-ms-linear-gradient(bottom, rgba(51,104,153,1) 0%, rgba(63,130,178,1) 100%)");
        $(this).css("background-image", "linear-gradient(to top, rgba(51,104,153,1) 0%, rgba(63,130,178,1) 100%)");

        $(this).hover(function() {
            $(this).css("background-image", "rgba(89, 184, 230, 1)");
            $(this).css("background-image", "-moz-linear-gradient(bottom, rgba(88,185,230,1) 0%, rgba(159,207,229,1) 100%)");
            $(this).css("background-image", "-webkit-gradient(left bottom, left top, color-stop(0%, rgba(88,185,230,1)), color-stop(100%, rgba(159,207,229,1)))");
            $(this).css("background-image", "-webkit-linear-gradient(bottom, rgba(88,185,230,1) 0%, rgba(159,207,229,1) 100%)");
            $(this).css("background-image", "-o-linear-gradient(bottom, rgba(88,185,230,1) 0%, rgba(159,207,229,1) 100%)");
            $(this).css("background-image", "-ms-linear-gradient(bottom, rgba(88,185,230,1) 0%, rgba(159,207,229,1) 100%)");
            $(this).css("background-image", "linear-gradient(to top, rgba(88,185,230,1) 0%, rgba(159,207,229,1) 100%)");

        }, function() {
            $(this).css("background-image", "rgba(51, 103, 153, 1)");
            $(this).css("background-image", "-moz-linear-gradient(bottom, rgba(51,104,153,1) 0%, rgba(63,130,178,1) 100%)");
            $(this).css("background-image", "-webkit-gradient(left bottom, left top, color-stop(0%, rgba(51,104,153,1)), color-stop(100%, rgba(63,130,178,1)))");
            $(this).css("background-image", "-webkit-linear-gradient(bottom, rgba(51,104,153,1) 0%, rgba(63,130,178,1) 100%)");
            $(this).css("background-image", "-o-linear-gradient(bottom, rgba(51,104,153,1) 0%, rgba(63,130,178,1) 100%)");
            $(this).css("background-image", "-ms-linear-gradient(bottom, rgba(51,104,153,1) 0%, rgba(63,130,178,1) 100%)");
            $(this).css("background-image", "linear-gradient(to top, rgba(51,104,153,1) 0%, rgba(63,130,178,1) 100%)");
        });
    }

    return false;

});

// Highway
$("#mapContents button#tg-highway").on("click", function() {

    var self = $(this);

    if (self.hasClass("active")) {
        $("#mapContainer .toggle_HW").fadeOut(500);
        $("input#allHighwayProjects").prop('checked', false);
        $("input#child-08").prop('checked', false);
        $("input#child-09").prop('checked', false);
        $("input#child-10").prop('checked', false);
        $("input#child-11").prop('checked', false);
        self.removeClass("active");
        $(this).css("background-image", "#808080");
        $(this).css("background-image", "-moz-linear-gradient(bottom, #808080 0%, #999999 100%)");
        $(this).css("background-image", "-webkit-gradient(linear, left bottom, left top, color-stop(0, #808080), color-stop(1, #999999))");
        $(this).css("background-image", "-webkit-linear-gradient(bottom, #808080 0%, #999999 100%)");
        $(this).css("background-image", "-o-linear-gradient(bottom, #808080 0%, #999999 100%)");
        $(this).css("background-image", "-ms-linear-gradient(bottom, #EEEEEE 0%, #FFFFFF 100%);");
        $(this).css("background-image", "linear-gradient(to top, #808080 0%, #999999 100%)");

        $(this).hover(function() {
            $(this).css("background-image", "rgba(89, 184, 230, 1)");
            $(this).css("background-image", "-moz-linear-gradient(bottom, rgba(88,185,230,1) 0%, rgba(159,207,229,1) 100%)");
            $(this).css("background-image", "-webkit-gradient(left bottom, left top, color-stop(0%, rgba(88,185,230,1)), color-stop(100%, rgba(159,207,229,1)))");
            $(this).css("background-image", "-webkit-linear-gradient(bottom, rgba(88,185,230,1) 0%, rgba(159,207,229,1) 100%)");
            $(this).css("background-image", "-o-linear-gradient(bottom, rgba(88,185,230,1) 0%, rgba(159,207,229,1) 100%)");
            $(this).css("background-image", "-ms-linear-gradient(bottom, rgba(88,185,230,1) 0%, rgba(159,207,229,1) 100%)");
            $(this).css("background-image", "linear-gradient(to top, rgba(88,185,230,1) 0%, rgba(159,207,229,1) 100%)");

        }, function() {
            $(this).css("background-image", "#808080");
            $(this).css("background-image", "-moz-linear-gradient(bottom, #808080 0%, #999999 100%)");
            $(this).css("background-image", "-webkit-gradient(linear, left bottom, left top, color-stop(0, #808080), color-stop(1, #999999))");
            $(this).css("background-image", "-webkit-linear-gradient(bottom, #808080 0%, #999999 100%)");
            $(this).css("background-image", "-o-linear-gradient(bottom, #808080 0%, #999999 100%)");
            $(this).css("background-image", "-ms-linear-gradient(bottom, #EEEEEE 0%, #FFFFFF 100%);");
            $(this).css("background-image", "linear-gradient(to top, #808080 0%, #999999 100%)");
        });

    } else {
        $("#mapContainer .toggle_HW").fadeIn(500);
        $("input#allHighwayProjects").prop('checked', true);
        $("input#child-08").prop('checked', true);
        $("input#child-09").prop('checked', true);
        $("input#child-10").prop('checked', true);
        $("input#child-11").prop('checked', true);
        self.addClass("active");
        $(this).css("background-image", "rgba(51,104,153,1)");
        $(this).css("background-image", "-moz-linear-gradient(bottom, rgba(51,104,153,1) 0%, rgba(63,130,178,1) 100%)");
        $(this).css("background-image", "-webkit-gradient(left bottom, left top, color-stop(0%, rgba(51,104,153,1)), color-stop(100%, rgba(63,130,178,1)))");
        $(this).css("background-image", "-webkit-linear-gradient(bottom, rgba(51,104,153,1) 0%, rgba(63,130,178,1) 100%)");
        $(this).css("background-image", "-o-linear-gradient(bottom, rgba(51,104,153,1) 0%, rgba(63,130,178,1) 100%)");
        $(this).css("background-image", "-ms-linear-gradient(bottom, rgba(51,104,153,1) 0%, rgba(63,130,178,1) 100%)");
        $(this).css("background-image", "linear-gradient(to top, rgba(51,104,153,1) 0%, rgba(63,130,178,1) 100%)");

        $(this).hover(function() {
            $(this).css("background-image", "rgba(89, 184, 230, 1)");
            $(this).css("background-image", "-moz-linear-gradient(bottom, rgba(88,185,230,1) 0%, rgba(159,207,229,1) 100%)");
            $(this).css("background-image", "-webkit-gradient(left bottom, left top, color-stop(0%, rgba(88,185,230,1)), color-stop(100%, rgba(159,207,229,1)))");
            $(this).css("background-image", "-webkit-linear-gradient(bottom, rgba(88,185,230,1) 0%, rgba(159,207,229,1) 100%)");
            $(this).css("background-image", "-o-linear-gradient(bottom, rgba(88,185,230,1) 0%, rgba(159,207,229,1) 100%)");
            $(this).css("background-image", "-ms-linear-gradient(bottom, rgba(88,185,230,1) 0%, rgba(159,207,229,1) 100%)");
            $(this).css("background-image", "linear-gradient(to top, rgba(88,185,230,1) 0%, rgba(159,207,229,1) 100%)");

        }, function() {
            $(this).css("background-image", "rgba(51, 103, 153, 1)");
            $(this).css("background-image", "-moz-linear-gradient(bottom, rgba(51,104,153,1) 0%, rgba(63,130,178,1) 100%)");
            $(this).css("background-image", "-webkit-gradient(left bottom, left top, color-stop(0%, rgba(51,104,153,1)), color-stop(100%, rgba(63,130,178,1)))");
            $(this).css("background-image", "-webkit-linear-gradient(bottom, rgba(51,104,153,1) 0%, rgba(63,130,178,1) 100%)");
            $(this).css("background-image", "-o-linear-gradient(bottom, rgba(51,104,153,1) 0%, rgba(63,130,178,1) 100%)");
            $(this).css("background-image", "-ms-linear-gradient(bottom, rgba(51,104,153,1) 0%, rgba(63,130,178,1) 100%)");
            $(this).css("background-image", "linear-gradient(to top, rgba(51,104,153,1) 0%, rgba(63,130,178,1) 100%)");
        });
    }

    return false;

});

// Transit
$("#mapContents button#tg-transit").on("click", function() {

    var self = $(this);

    if (self.hasClass("active")) {

        $("#mapContainer .toggle_TR").fadeOut(500);
        $("input#allTransitProjects").prop('checked', false);
        $("input#child-12").prop('checked', false);
        $("input#child-13").prop('checked', false);
        $("input#child-14").prop('checked', false);
        $("input#child-15").prop('checked', false);
        $("input#child-16").prop('checked', false);
        $("input#child-17").prop('checked', false);
        self.removeClass("active");
        $(this).css("background-image", "#808080");
        $(this).css("background-image", "-moz-linear-gradient(bottom, #808080 0%, #999999 100%)");
        $(this).css("background-image", "-webkit-gradient(linear, left bottom, left top, color-stop(0, #808080), color-stop(1, #999999))");
        $(this).css("background-image", "-webkit-linear-gradient(bottom, #808080 0%, #999999 100%)");
        $(this).css("background-image", "-o-linear-gradient(bottom, #808080 0%, #999999 100%)");
        $(this).css("background-image", "linear-gradient(to top, #808080 0%, #999999 100%)");

        $(this).hover(function() {
            $(this).css("background-image", "rgba(89, 184, 230, 1)");
            $(this).css("background-image", "-moz-linear-gradient(bottom, rgba(88,185,230,1) 0%, rgba(159,207,229,1) 100%)");
            $(this).css("background-image", "-webkit-gradient(left bottom, left top, color-stop(0%, rgba(88,185,230,1)), color-stop(100%, rgba(159,207,229,1)))");
            $(this).css("background-image", "-webkit-linear-gradient(bottom, rgba(88,185,230,1) 0%, rgba(159,207,229,1) 100%)");
            $(this).css("background-image", "-o-linear-gradient(bottom, rgba(88,185,230,1) 0%, rgba(159,207,229,1) 100%)");
            $(this).css("background-image", "-ms-linear-gradient(bottom, rgba(88,185,230,1) 0%, rgba(159,207,229,1) 100%)");
            $(this).css("background-image", "linear-gradient(to top, rgba(88,185,230,1) 0%, rgba(159,207,229,1) 100%)");

        }, function() {
            $(this).css("background-image", "#808080");
            $(this).css("background-image", "-moz-linear-gradient(bottom, #808080 0%, #999999 100%)");
            $(this).css("background-image", "-webkit-gradient(linear, left bottom, left top, color-stop(0, #808080), color-stop(1, #999999))");
            $(this).css("background-image", "-webkit-linear-gradient(bottom, #808080 0%, #999999 100%)");
            $(this).css("background-image", "-o-linear-gradient(bottom, #808080 0%, #999999 100%)");
            $(this).css("background-image", "linear-gradient(to top, #808080 0%, #999999 100%)");
        });

    } else {
        $("#mapContainer .toggle_TR").fadeIn(500);
        $("input#allTransitProjects").prop('checked', true); 
        $("input#child-12").prop('checked', true);
        $("input#child-13").prop('checked', true);
        $("input#child-14").prop('checked', true);
        $("input#child-15").prop('checked', true);
        $("input#child-16").prop('checked', true);
        $("input#child-17").prop('checked', true);
        self.addClass("active");
        $(this).css("background-image", "rgba(51,104,153,1)");
        $(this).css("background-image", "-moz-linear-gradient(bottom, rgba(51,104,153,1) 0%, rgba(63,130,178,1) 100%)");
        $(this).css("background-image", "-webkit-gradient(left bottom, left top, color-stop(0%, rgba(51,104,153,1)), color-stop(100%, rgba(63,130,178,1)))");
        $(this).css("background-image", "-webkit-linear-gradient(bottom, rgba(51,104,153,1) 0%, rgba(63,130,178,1) 100%)");
        $(this).css("background-image", "-o-linear-gradient(bottom, rgba(51,104,153,1) 0%, rgba(63,130,178,1) 100%)");
        $(this).css("background-image", "-ms-linear-gradient(bottom, rgba(51,104,153,1) 0%, rgba(63,130,178,1) 100%)");
        $(this).css("background-image", "linear-gradient(to top, rgba(51,104,153,1) 0%, rgba(63,130,178,1) 100%)");

        $(this).hover(function() {
            $(this).css("background-image", "rgba(89, 184, 230, 1)");
            $(this).css("background-image", "-moz-linear-gradient(bottom, rgba(88,185,230,1) 0%, rgba(159,207,229,1) 100%)");
            $(this).css("background-image", "-webkit-gradient(left bottom, left top, color-stop(0%, rgba(88,185,230,1)), color-stop(100%, rgba(159,207,229,1)))");
            $(this).css("background-image", "-webkit-linear-gradient(bottom, rgba(88,185,230,1) 0%, rgba(159,207,229,1) 100%)");
            $(this).css("background-image", "-o-linear-gradient(bottom, rgba(88,185,230,1) 0%, rgba(159,207,229,1) 100%)");
            $(this).css("background-image", "-ms-linear-gradient(bottom, rgba(88,185,230,1) 0%, rgba(159,207,229,1) 100%)");
            $(this).css("background-image", "linear-gradient(to top, rgba(88,185,230,1) 0%, rgba(159,207,229,1) 100%)");

        }, function() {
            $(this).css("background-image", "rgba(51,104,153,1)");
            $(this).css("background-image", "-moz-linear-gradient(bottom, rgba(51,104,153,1) 0%, rgba(63,130,178,1) 100%)");
            $(this).css("background-image", "-webkit-gradient(left bottom, left top, color-stop(0%, rgba(51,104,153,1)), color-stop(100%, rgba(63,130,178,1)))");
            $(this).css("background-image", "-webkit-linear-gradient(bottom, rgba(51,104,153,1) 0%, rgba(63,130,178,1) 100%)");
            $(this).css("background-image", "-o-linear-gradient(bottom, rgba(51,104,153,1) 0%, rgba(63,130,178,1) 100%)");
            $(this).css("background-image", "-ms-linear-gradient(bottom, rgba(51,104,153,1) 0%, rgba(63,130,178,1) 100%)");
            $(this).css("background-image", "linear-gradient(to top, rgba(51,104,153,1) 0%, rgba(63,130,178,1) 100%)");
        });

    }

    return false;

});

// Open/Close button
$("#openClose").hover(function(){

        if ($(this).hasClass("closeSwitch")) {
            $(this).css("cursor", "pointer");
            $(this).css("background", "url('images/close_hover.svg') no-repeat");
            $(this).css("background-size", "12px 12px");

        } else if ($(this).hasClass("openSwitch")) {
            $(this).css("cursor", "pointer");
            $(this).css("background", "url('images/open_hover.svg') no-repeat");
            $(this).css("background-size", "15px 15px");
        }
    },

    function() {

        if ($(this).hasClass("closeSwitch")) {
            $(this).css("background", "url('images/close.svg') no-repeat");
            $(this).css("background-size", "12px 12px");

        } else if ($("#filteringPanel").hasClass("openSwitch")) {
            $(this).css("background", "url('images/open.svg') no-repeat");
            $(this).css("background-size", "15px 15px");
        }
    }
);

$("#openClose").click(function() {

    if ($("#LC_outerWrapper").hasClass("active")) {
        $("#LC_outerWrapper").removeClass("active");
        $(this).addClass("openSwitch");
        $(this).removeClass("closeSwitch");
        $("#LC_outerWrapper").animate({
            width: "0px"
        }, 500);

        $(function() {
            setTimeout(function() {
                $("#LC_outerWrapper").css("display", "none");
            }, 300);
        });

        $("#openClose").css("background", "url('images/open.svg') no-repeat");
        $("#openClose").css("background-size", "15px 15px");
        //console.log("not active");

    } else {
        $("#LC_outerWrapper").addClass("active");
        $(this).removeClass("openSwitch");
        $(this).addClass("closeSwitch");
        $("#LC_outerWrapper").animate({
            width: "160px"
        }, 500);
        $("#LC_outerWrapper").css("display", "block");

        $(function() {
            setTimeout(function() {
                $("#openClose").css("background", "url('images/close.svg') no-repeat");
                $("#openClose").css("background-size", "12px 12px");
            }, 250);
        });
        //console.log("active");
    }

});


////////////////////////////// D3 charts in the second tab //////////////////////////////

////////////////////////////// Part A: Cost chart

// Dimension of the whole canvas
var margin1 = 25,
    w1 = parseInt(d3.select("#costChart").style("width")) - margin1 * 2,
    h1 = 100 - margin1 * 2;

// Chart (the area to show the graph *exclude the area of x / y axis)
var graph1 = d3.select("#costChart")
    			.append("g")
    			.attr("width", w1)
    			.attr("height", h1)
    			.attr("transform", "translate(" + margin1 + "," + margin1 + ")");

// X Scales 
var xScale1 = d3.scale.linear()
    					.domain([0, 4000]) // Set data range: Project Cost 0M to 4000M
    					.range([0, w1]) // Adjust actual data range to the width of the chart canvas 
    					.nice(); // Round numbers

// Y Scales 
var yScale1 = d3.scale.linear()
    					.domain([0, 1]) // Set data range
    					.range([h1, 0]); // Adjust actual data range to the height of the chart canvas *Height should be assigned first in order to present number low to high from bottom to top

// X Axis
var xAxis1 = d3.svg.axis()
    				.scale(xScale1)
    				.orient("bottom");

// Y Axis
var yAxis1 = d3.svg.axis()
    				.scale(yScale1)
    				.orient("left")
    				.ticks(1)
    				.tickFormat(function(d, i) {
				        return [''][d];
				    });

// Add X Axis
graph1.append("g")
    	.attr("class", "ccP_x_axis")
    	.attr("transform", "translate(0," + margin1 + ")")
    	.call(xAxis1)
    	.append("text")
    	.attr("class", "unit")
    	.attr("x", w1 + 15)
    	.attr("y", 40)
    	.style("text-anchor", "end")
    	.text("Cost ($M)")
    	.style("font-weight", "bold");

// Add Y Axis
graph1.append("g")
    	.attr("class", "ccP_y_axis")
    	.call(yAxis1);

// Read data from RTPdata.csv
d3.csv("data/RTPdata.csv", function(error, data) {

    graph1.append("g")
        	.selectAll("circle")
        	.data(data)
        	.enter()
        	.append("circle")
        	.attr("class", "costCircle")
        	.attr("r", 3)
        	.attr("cy", 1)
    		.attr("cx", function(d, i) { //Assign x position *Takes each project cost
        		return xScale1(d.ProjectCost)
    		})
            // Mouseover to show info
    		.on("mouseover", function(d, i) {
        		d3.select(this)
        			.style("opacity", 0.7)
            		.style("cursor", "pointer");
        		var text = "<p><strong>" + d.ProjectName + "</strong><br/><span>" + d.ProjectCost + "M</span><p>";
        		$("#info").show().html(text);
    		})
        	.on("mouseout", function(d, i) {
            	d3.select(this)
                	.style("opacity", 0.2);
            	$("#info").hide().html("");
        	});
});

////////////////////////////// Part B: Timeline chart

// Dimension of the canvas
$("#timelineChart").css("height", "460px");

var margin2 = 30,
    w2 = parseInt(d3.select("#timelineChart").style("width")) - margin2 * 2,
    h2 = 380 - margin2 * 2;

// Chart Canvas *exclude the space for x/y axis
var graph2 = d3.select("#timelineChart")
    			.append("g")
    			.attr("width", w2)
    			.attr("height", h2)
    			.attr("transform", "translate(" + margin2 + "," + margin2 + ")");

// X Scales 
var xScale2 = d3.scale.linear()
    					.domain([2000, 2040]) // Set data range: Year 2000 to 2040 
    					.range([0, w2]);

var xScaleTimeline = d3.scale.linear()
    							.domain([0, 40]) // Range between 0 to 40 *Need this because Project Completion minus Project Start will be something like 2, 5 and 10, which are not falls into the range of xScale2 of between 2008 - 2020. As a result of this D3 returns negative value on all elements that are not presented on the chart canvas.
    							.range([0, w2]); // Adjust actual data range to the width of the chart canvas

var yScale3 = d3.scale.linear()
    					.domain([0, 120]) // Set data range: Number of project up to 120
    					.range([h2, 0]);

// X Axis
var xAxis2 = d3.svg.axis()
    				.scale(xScale2)
    				.orient("bottom")
    				.ticks(9)
    				.tickFormat(d3.format("d")); //Change number to string

// Add X Axis
graph2.append("g")
    	.attr("class", "tcP_x_axis")
    	.attr("transform", "translate(0," + (h2 + margin2 * 1.5) + ")")
    	.call(xAxis2)
    	.append("text")
    	.attr("class", "year")
    	.attr("x", w2 + margin2 / 2)
    	.attr("y", 40)
    	.style("text-anchor", "end")
    	.text("Year")
    	.style("font-weight", "bold");

// Read data from RTPdata.csv
d3.csv("data/RTPdata.csv", function(error, data) {

    graph2.append("g")
        	.selectAll("rect")
        	.data(data)
        	.enter()
        	.append("rect")
        	.attr("class", "timelineRect")
        	.attr("height", 1.5) // height of the each "rect" element
    		.attr("y", function(d) { //Assign y position: ordered by timelineNbr, which is defined by timing to start projects
        		return d.timelineNbr * 3
    		})
        	.attr("x", function(d, i) { //Assign x position *Takes each project start for here
            return xScale2(d.ProjectStart)
        	})

        	.attr("width", function(d, i) { //Assign width position *project end year minus project start year

	            var timelineStart = d.ProjectStart;
	            // console.log(timelineStart);
	            var timelineEnd = d.ProjectCompletion;
	            // console.log(timelineEnd);
	            var timelineRange = timelineEnd - timelineStart;
	            // console.log(timelineRange);
	            return xScaleTimeline(timelineRange)

             })
            // Mouseover to show info
	        .on("mouseover", function(d, i) {
	            d3.select(this)
	                .style("cursor", "pointer")
	                .style("opacity", 0.8);
	            var text = "<p><strong>" + d.ProjectName + "</strong><br/><span>Project Start: " + d.ProjectStart + "</span><br/>" + "<span>Project Completion: " + d.ProjectCompletion + "</span><p>";
	            $("#info").show().html(text);
	        })
	        .on("mouseout", function(d, i) {
	            d3.select(this)
	                .style("opacity", 0.4);
	            $("#info").hide().html("");
	        });

});

// End of main.js

