/*****************************************************************************************

Map.js consists of...

1. Leaflet map initializer (line 20 - 40)
2. Dropdown List on the Leaflet map (Line 43 - 69)
3. Basemap switcher (Line 72 - 333)
4. Loader function (Line 336 - 350)
5. D3 Map Layers on the Leaflet excluding RTP layers (Line 353 - 759)
6. D3 Map Layers (RTP layers) on the Leaflet 
        part A Initialize RTP layers (Line 768 - 778)
        part B Click function to replace project information (Line 781 - 879)
        part C D3 chart (Line 882 - 992)
        part D D3 chart resize function (Line 995 - 1153)
        part E Update photo gallery based on the click function (Line 1156 - 1774)
        part F Show each RTP project on the map (Line 1783 - 2009)
7. Pop Up (Line 2038 - 2092)

*****************************************************************************************/


////////////////////////////// Leaflet Map //////////////////////////////////////////////

// Initialize map (map center, max and min zoom)
var map = new L.Map("mapContainer", {
    maxZoom: 16,
    minZoom: 8,
    zoomControl: false
});

// Set default map center and zoom level
map.setView([37.9500, -122.8000], 8);

// Add Zoom-in/out button
map.addControl(L.control.zoom({
    position: 'topright'
}));

// Add Esri Basemaps
var grayBaseMap = L.esri.basemapLayer('Gray');
var streetsBaseMap = L.esri.basemapLayer('Streets');
var imageryBaseMap = L.esri.basemapLayer('Imagery');


////////////////////////////// Dropdown List ////////////////////////////////////////////

// Select map center and zoom by selected county from the drop down
function zoomtocounty(countyname) {
    if (countyname == "Alameda") {
        map.setView([37.6800, -121.9000], 10);
    } else if (countyname == "Contra Costa") {
        map.setView([37.9100, -121.9700], 10);
    } else if (countyname == "Marin") {
        map.setView([38.0800, -122.7200], 10);
    } else if (countyname == "Napa") {
        map.setView([38.4500, -122.3600], 10);
    } else if (countyname == "San Francisco") {
        map.setView([37.7600, -122.4500], 12);
    }　
    else if (countyname == "San Mateo") {
        map.setView([37.5000, -122.4000], 10);
    } else if (countyname == "Santa Clara") {
        map.setView([37.2500, -121.8000], 9);
    } else if (countyname == "Solano") {
        map.setView([38.3000, -122.0000], 10);
    } else if (countyname == "Sonoma") {
        map.setView([38.5000, -122.8500], 9);
    } else {
        map.setView([37.9500, -122.8000], 8);
    }
};


////////////////////////////// Basemap Switcher /////////////////////////////////////////

// Custom Basemap (Bay Area Focus) Click function
$("#mapContents button#tg-bayAreaFocus").on("click", function() {

    var self = $(this);

    if (self.hasClass("active")) { // If the layer is on...
        $("#mapContainer .MainBasemap").fadeOut(500); // Fade out the layer
        self.removeClass("active"); // Remove class "active"
        // Change background to gray when the layer is inactive
        self.css("background-image", "#808080");
        self.css("background-image", "-moz-linear-gradient(bottom, #808080 0%, #999999 100%)");
        self.css("background-image", "-webkit-gradient(linear, left bottom, left top, color-stop(0, #808080), color-stop(1, #999999))");
        self.css("background-image", "-webkit-linear-gradient(bottom, #808080 0%, #999999 100%)");
        self.css("background-image", "-o-linear-gradient(bottom, #808080 0%, #999999 100%)");
        self.css("background-image", "-ms-linear-gradient(bottom, #EEEEEE 0%, #FFFFFF 100%);");
        self.css("background-image", "linear-gradient(to top, #808080 0%, #999999 100%)");

        //Preventing the situation without any base maps, gray ase Map as a second default base map.    
        map.addLayer(grayBaseMap);
        $("button#tg-plain").addClass("active");
        $("button#tg-plain").css("background-image", "rgba(51,104,153,1)");
        $("button#tg-plain").css("background-image", "-moz-linear-gradient(bottom, rgba(51,104,153,1) 0%, rgba(63,130,178,1) 100%)");
        $("button#tg-plain").css("background-image", "-webkit-gradient(left bottom, left top, color-stop(0%, rgba(51,104,153,1)), color-stop(100%, rgba(63,130,178,1)))");
        $("button#tg-plain").css("background-image", "-webkit-linear-gradient(bottom, rgba(51,104,153,1) 0%, rgba(63,130,178,1) 100%)");
        $("button#tg-plain").css("background-image", "-o-linear-gradient(bottom, rgba(51,104,153,1) 0%, rgba(63,130,178,1) 100%)");
        $("button#tg-plain").css("background-image", "-ms-linear-gradient(bottom, rgba(51,104,153,1) 0%, rgba(63,130,178,1) 100%)");
        $("button#tg-plain").css("background-image", "linear-gradient(to top, rgba(51,104,153,1) 0%, rgba(63,130,178,1) 100%)");

    } else { //if the layer is NOT on...

        $("#mapContainer .MainBasemap").fadeIn(500); //Remove the layer
        self.addClass("active"); //Add class active
        map.removeLayer(grayBaseMap); //Remove other layers
        map.removeLayer(streetsBaseMap); //Remove other layers
        map.removeLayer(imageryBaseMap); //Remove other layers

        // Change background to blue
        self.css("background-image", "rgba(51,104,153,1)");
        self.css("background-image", "-moz-linear-gradient(bottom, rgba(51,104,153,1) 0%, rgba(63,130,178,1) 100%)");
        self.css("background-image", "-webkit-gradient(left bottom, left top, color-stop(0%, rgba(51,104,153,1)), color-stop(100%, rgba(63,130,178,1)))");
        self.css("background-image", "-webkit-linear-gradient(bottom, rgba(51,104,153,1) 0%, rgba(63,130,178,1) 100%)");
        self.css("background-image", "-o-linear-gradient(bottom, rgba(51,104,153,1) 0%, rgba(63,130,178,1) 100%)");
        self.css("background-image", "-ms-linear-gradient(bottom, rgba(51,104,153,1) 0%, rgba(63,130,178,1) 100%)");
        self.css("background-image", "linear-gradient(to top, rgba(51,104,153,1) 0%, rgba(63,130,178,1) 100%)");

        // Change other layers button's backgrounds gray and inactivate them
        $("button#tg-plain, button#tg-street, button#tg-satellite").css("background-image", "#808080");
        $("button#tg-plain, button#tg-street, button#tg-satellite").css("background-image", "-moz-linear-gradient(bottom, #808080 0%, #999999 100%)");
        $("button#tg-plain, button#tg-street, button#tg-satellite").css("background-image", "-webkit-gradient(linear, left bottom, left top, color-stop(0, #808080), color-stop(1, #999999))");
        $("button#tg-plain, button#tg-street, button#tg-satellite").css("background-image", "-webkit-linear-gradient(bottom, #808080 0%, #999999 100%)");
        $("button#tg-plain, button#tg-street, button#tg-satellite").css("background-image", "-o-linear-gradient(bottom, #808080 0%, #999999 100%)");
        $("button#tg-plain, button#tg-street, button#tg-satellite").css("background-image", "linear-gradient(to top, #808080 0%, #999999 100%)");
        $("button#tg-plain, button#tg-street, button#tg-satellite").removeClass("active");

    }

    return false;

});


// Esri Gray Plain Basemap

$("#mapContents button#tg-plain").on("click", function() {

    var self = $(this);

    if (!self.hasClass("active")) { //If the layer is NOT on...

        map.addLayer(grayBaseMap);
        map.removeLayer(streetsBaseMap);
        map.removeLayer(imageryBaseMap);
        $("#mapContainer .MainBasemap").fadeOut(500);
        self.addClass("active");

        // Change background to blue
        self.css("background-image", "rgba(51,104,153,1)");
        self.css("background-image", "-moz-linear-gradient(bottom, rgba(51,104,153,1) 0%, rgba(63,130,178,1) 100%)");
        self.css("background-image", "-webkit-gradient(left bottom, left top, color-stop(0%, rgba(51,104,153,1)), color-stop(100%, rgba(63,130,178,1)))");
        self.css("background-image", "-webkit-linear-gradient(bottom, rgba(51,104,153,1) 0%, rgba(63,130,178,1) 100%)");
        self.css("background-image", "-o-linear-gradient(bottom, rgba(51,104,153,1) 0%, rgba(63,130,178,1) 100%)");
        self.css("background-image", "-ms-linear-gradient(bottom, rgba(51,104,153,1) 0%, rgba(63,130,178,1) 100%)");
        self.css("background-image", "linear-gradient(to top, rgba(51,104,153,1) 0%, rgba(63,130,178,1) 100%)");

        // Change other layers button's backgrounds gray and inactivate them
        $("button#tg-bayAreaFocus, button#tg-street, button#tg-satellite").css("background-image", "#808080");
        $("button#tg-bayAreaFocus, button#tg-street, button#tg-satellite").css("background-image", "-moz-linear-gradient(bottom, #808080 0%, #999999 100%)");
        $("button#tg-bayAreaFocus, button#tg-street, button#tg-satellite").css("background-image", "-webkit-gradient(linear, left bottom, left top, color-stop(0, #808080), color-stop(1, #999999))");
        $("button#tg-bayAreaFocus, button#tg-street, button#tg-satellite").css("background-image", "-webkit-linear-gradient(bottom, #808080 0%, #999999 100%)");
        $("button#tg-bayAreaFocus, button#tg-street, button#tg-satellite").css("background-image", "-o-linear-gradient(bottom, #808080 0%, #999999 100%)");
        $("button#tg-bayAreaFocus, button#tg-street, button#tg-satellite").css("background-image", "linear-gradient(to top, #808080 0%, #999999 100%)");
        $("button#tg-bayAreaFocus, button#tg-street, button#tg-satellite").removeClass("active");

    } else { //if the layer is on...
       　　
        map.removeLayer(grayBaseMap);
        self.removeClass("active");

        // Change background to blue
        self.css("background-image", "#808080");
        self.css("background-image", "-moz-linear-gradient(bottom, #808080 0%, #999999 100%)");
        self.css("background-image", "-webkit-gradient(linear, left bottom, left top, color-stop(0, #808080), color-stop(1, #999999))");
        self.css("background-image", "-webkit-linear-gradient(bottom, #808080 0%, #999999 100%)");
        self.css("background-image", "-o-linear-gradient(bottom, #808080 0%, #999999 100%)");
        self.css("background-image", "-ms-linear-gradient(bottom, #EEEEEE 0%, #FFFFFF 100%);");
        self.css("background-image", "linear-gradient(to top, #808080 0%, #999999 100%)");

    }

    return false;

});



// Esri Street Basemap

$("#mapContents button#tg-street").on("click", function() {

    var self = $(this);

    if (!self.hasClass("active")) { //If the layer is NOT on...

        map.addLayer(streetsBaseMap);
        map.removeLayer(grayBaseMap);
        map.removeLayer(imageryBaseMap);
        $("#mapContainer .MainBasemap").fadeOut(500);
        self.addClass("active");

        // Change background to blue
        self.css("background-image", "rgba(51,104,153,1)");
        self.css("background-image", "-moz-linear-gradient(bottom, rgba(51,104,153,1) 0%, rgba(63,130,178,1) 100%)");
        self.css("background-image", "-webkit-gradient(left bottom, left top, color-stop(0%, rgba(51,104,153,1)), color-stop(100%, rgba(63,130,178,1)))");
        self.css("background-image", "-webkit-linear-gradient(bottom, rgba(51,104,153,1) 0%, rgba(63,130,178,1) 100%)");
        self.css("background-image", "-o-linear-gradient(bottom, rgba(51,104,153,1) 0%, rgba(63,130,178,1) 100%)");
        self.css("background-image", "-ms-linear-gradient(bottom, rgba(51,104,153,1) 0%, rgba(63,130,178,1) 100%)");
        self.css("background-image", "linear-gradient(to top, rgba(51,104,153,1) 0%, rgba(63,130,178,1) 100%)");

        // Change other layers button's backgrounds gray and inactivate them
        $("button#tg-bayAreaFocus, button#tg-plain, button#tg-satellite").css("background-image", "#808080");
        $("button#tg-bayAreaFocus, button#tg-plain, button#tg-satellite").css("background-image", "-moz-linear-gradient(bottom, #808080 0%, #999999 100%)");
        $("button#tg-bayAreaFocus, button#tg-plain, button#tg-satellite").css("background-image", "-webkit-gradient(linear, left bottom, left top, color-stop(0, #808080), color-stop(1, #999999))");
        $("button#tg-bayAreaFocus, button#tg-plain, button#tg-satellite").css("background-image", "-webkit-linear-gradient(bottom, #808080 0%, #999999 100%)");
        $("button#tg-bayAreaFocus, button#tg-plain, button#tg-satellite").css("background-image", "-o-linear-gradient(bottom, #808080 0%, #999999 100%)");
        $("button#tg-bayAreaFocus, button#tg-plain, button#tg-satellite").css("background-image", "linear-gradient(to top, #808080 0%, #999999 100%)");
        $("button#tg-bayAreaFocus, button#tg-plain, button#tg-satellite").removeClass("active");

    } else { //If the layer is on...
     　　
        map.removeLayer(streetsBaseMap);
        self.removeClass("active");
        self.css("background-image", "#808080");
        self.css("background-image", "-moz-linear-gradient(bottom, #808080 0%, #999999 100%)");
        self.css("background-image", "-webkit-gradient(linear, left bottom, left top, color-stop(0, #808080), color-stop(1, #999999))");
        self.css("background-image", "-webkit-linear-gradient(bottom, #808080 0%, #999999 100%)");
        self.css("background-image", "-o-linear-gradient(bottom, #808080 0%, #999999 100%)");
        self.css("background-image", "-ms-linear-gradient(bottom, #EEEEEE 0%, #FFFFFF 100%);");
        self.css("background-image", "linear-gradient(to top, #808080 0%, #999999 100%)");

    }

    return false;

});


// Esri Imagery Basemap

$("#mapContents button#tg-satellite").on("click", function() {

    var self = $(this);

    if (!self.hasClass("active")) { //If the layer is NOT on...

        map.addLayer(imageryBaseMap);
        map.removeLayer(grayBaseMap);
        map.removeLayer(streetsBaseMap);
        $("#mapContainer .MainBasemap").fadeOut(500);
        self.addClass("active");

        // Change background to blue    
        self.css("background-image", "rgba(51,104,153,1)");
        self.css("background-image", "-moz-linear-gradient(bottom, rgba(51,104,153,1) 0%, rgba(63,130,178,1) 100%)");
        self.css("background-image", "-webkit-gradient(left bottom, left top, color-stop(0%, rgba(51,104,153,1)), color-stop(100%, rgba(63,130,178,1)))");
        self.css("background-image", "-webkit-linear-gradient(bottom, rgba(51,104,153,1) 0%, rgba(63,130,178,1) 100%)");
        self.css("background-image", "-o-linear-gradient(bottom, rgba(51,104,153,1) 0%, rgba(63,130,178,1) 100%)");
        self.css("background-image", "-ms-linear-gradient(bottom, rgba(51,104,153,1) 0%, rgba(63,130,178,1) 100%)");
        self.css("background-image", "linear-gradient(to top, rgba(51,104,153,1) 0%, rgba(63,130,178,1) 100%)");

        // Change other layers button's backgrounds gray and inactivate them
        $("button#tg-bayAreaFocus, button#tg-street, button#tg-plain").css("background-image", "#808080");
        $("button#tg-bayAreaFocus, button#tg-street, button#tg-plain").css("background-image", "-moz-linear-gradient(bottom, #808080 0%, #999999 100%)");
        $("button#tg-bayAreaFocus, button#tg-street, button#tg-plain").css("background-image", "-webkit-gradient(linear, left bottom, left top, color-stop(0, #808080), color-stop(1, #999999))");
        $("button#tg-bayAreaFocus, button#tg-street, button#tg-plain").css("background-image", "-webkit-linear-gradient(bottom, #808080 0%, #999999 100%)");
        $("button#tg-bayAreaFocus, button#tg-street, button#tg-plain").css("background-image", "-o-linear-gradient(bottom, #808080 0%, #999999 100%)");
        $("button#tg-bayAreaFocus, button#tg-street, button#tg-plain").css("background-image", "linear-gradient(to top, #808080 0%, #999999 100%)");
        $("button#tg-bayAreaFocus, button#tg-street, button#tg-plain").removeClass("active");

    } else { //If the layer is on...

        　　
        map.removeLayer(imageryBaseMap);
        self.removeClass("active");

        // Change other layers button's backgrounds gray and inactivate them
        self.css("background-image", "#808080");
        self.css("background-image", "-moz-linear-gradient(bottom, #808080 0%, #999999 100%)");
        self.css("background-image", "-webkit-gradient(linear, left bottom, left top, color-stop(0, #808080), color-stop(1, #999999))");
        self.css("background-image", "-webkit-linear-gradient(bottom, #808080 0%, #999999 100%)");
        self.css("background-image", "-o-linear-gradient(bottom, #808080 0%, #999999 100%)");
        self.css("background-image", "-ms-linear-gradient(bottom, #EEEEEE 0%, #FFFFFF 100%);");
        self.css("background-image", "linear-gradient(to top, #808080 0%, #999999 100%)");

    }

    return false;

});


// Hover function on basemap switcher buttons (hover to light blue)
$("#mapContents button.baseMapSwitcherGroup").hover(function() {

        // Mouseover
        var self = $(this);
        self.css("background-image", "rgb(89, 184, 230)");
        self.css("background-image", "-moz-linear-gradient(bottom, rgba(88,185,230,1) 0%, rgba(159,207,229,1) 100%)");
        self.css("background-image", "-webkit-gradient(left bottom, left top, color-stop(0%, rgba(88,185,230,1)), color-stop(100%, rgba(159,207,229,1)))");
        self.css("background-image", "-webkit-linear-gradient(bottom, rgba(88,185,230,1) 0%, rgba(159,207,229,1) 100%)");
        self.css("background-image", "-o-linear-gradient(bottom, rgba(88,185,230,1) 0%, rgba(159,207,229,1) 100%)");
        self.css("background-image", "-ms-linear-gradient(bottom, rgba(88,185,230,1) 0%, rgba(159,207,229,1) 100%)");
        self.css("background-image", "linear-gradient(to top, rgba(88,185,230,1) 0%, rgba(159,207,229,1) 100%)");

        //Mouseout
    }, function() {
        var self = $(this);

        if (self.hasClass("active")) { //If the layer is active...
            self.css("background-image", "rgb(51, 103, 153");
            self.css("background-image", "-moz-linear-gradient(bottom, rgba(51,104,153,1) 0%, rgba(63,130,178,1) 100%)");
            self.css("background-image", "-webkit-gradient(left bottom, left top, color-stop(0%, rgba(51,104,153,1)), color-stop(100%, rgba(63,130,178,1)))");
            self.css("background-image", "-webkit-linear-gradient(bottom, rgba(51,104,153,1) 0%, rgba(63,130,178,1) 100%)");
            self.css("background-image", "-o-linear-gradient(bottom, rgba(51,104,153,1) 0%, rgba(63,130,178,1) 100%)");
            self.css("background-image", "-ms-linear-gradient(bottom, rgba(51,104,153,1) 0%, rgba(63,130,178,1) 100%)");
            self.css("background-image", "linear-gradient(to top, rgba(51,104,153,1) 0%, rgba(63,130,178,1) 100%)");

        } else { //If the layer is inactive...
            self.css("background-image", "#808080");
            self.css("background-image", "-moz-linear-gradient(bottom, #808080 0%, #999999 100%)");
            self.css("background-image", "-webkit-gradient(linear, left bottom, left top, color-stop(0, #808080), color-stop(1, #999999))");
            self.css("background-image", "-webkit-linear-gradient(bottom, #808080 0%, #999999 100%)");
            self.css("background-image", "-o-linear-gradient(bottom, #808080 0%, #999999 100%)");
            self.css("background-image", "-ms-linear-gradient(bottom, #EEEEEE 0%, #FFFFFF 100%);");
            self.css("background-image", "linear-gradient(to top, #808080 0%, #999999 100%)");
        }

        return false;
    }

);


////////////////////////////// loader ////////////////////////////////////////////////////

// Setup loader to make D3 SVG layer being rendered by designed order through cross browsers

var loader = {
    queue: [],
    push: function(fn, scope, params) {
        this.queue.push(function() {
            fn.apply(scope || window, params || []);
        });
    },
    run: function() {
        if (this.queue.length) this.queue.shift().call();
    }
};


////////////////////////////// D3 Map layers  ////////////////////////////////////////////

var mpMapper = {

    sfBayArea: function() { //Wrap all map layers

        // Global variables for all map layers
        // Use Leaflet to implement a D3 geometric transformation.
        function projectPoint(x, y) {
            var point = map.latLngToLayerPoint(new L.LatLng(y, x));
            this.stream.point(point.x, point.y);
        };

        var transform = d3.geo.transform({
                point: projectPoint
            }),
            path = d3.geo.path().projection(transform);


        var baseMap = function() {

            // Add Custom Basemap
            d3.json("mapData/MainBackground.json", function(geojson) {

                var svg_bg = d3.select(map.getPanes().overlayPane).append("svg");
                var g_bg = svg_bg.append("g").attr("class", "leaflet-zoom-hide");
                var feature_bg = g_bg.selectAll("path")
                    .data(geojson.features)
                    .enter()
                    .append("path");

                map.on("viewreset", reset);
                reset();

                // Reposition the SVG to cover the features.
                function reset() {

                    var bounds = path.bounds(geojson),
                        topLeft = bounds[0],
                        bottomRight = bounds[1];

                    svg_bg.attr("width", bottomRight[0] - topLeft[0])
                        .attr("height", bottomRight[1] - topLeft[1])
                        .style("left", topLeft[0] + "px")
                        .style("top", topLeft[1] + "px");

                    g_bg.attr("transform", "translate(" + -topLeft[0] + "," + -topLeft[1] + ")");

                    g_bg.classed("MainBasemap", true);

                    feature_bg.attr("d", path)
                        .style("stroke", "rgb(178, 178, 178)")
                        .style("stroke-width", "1px")
                        .style("fill", function(d, i) {
                            if (d.properties.LandType == "Land") { // Outside of the Bay Area
                                return "rgb(153, 153, 153)"
                            } else { // Land of BayArea
                                return "rgb(216, 216, 216)"
                            };
                        });

                };

                loader.run();

            });

        }; // var baseMap close



        var baseMapBorder = function() {

            d3.json("mapData/SFBayBorder.json", function(geojson) {

                var svg_bd = d3.select(map.getPanes().overlayPane).append("svg");
                var g_bd = svg_bd.append("g").attr("class", "leaflet-zoom-hide");
                var feature_bd = g_bd.selectAll("path")
                    .data(geojson.features)
                    .enter()
                    .append("path");

                map.on("viewreset", reset);
                reset();

                // Reposition the SVG to cover the features.
                function reset() {

                    var bounds = path.bounds(geojson),
                        topLeft = bounds[0],
                        bottomRight = bounds[1];

                    svg_bd.attr("width", bottomRight[0] - topLeft[0])
                        .attr("height", bottomRight[1] - topLeft[1])
                        .style("left", topLeft[0] + "px")
                        .style("top", topLeft[1] + "px");

                    g_bd.attr("transform", "translate(" + -topLeft[0] + "," + -topLeft[1] + ")");

                    g_bd.classed("MainBasemap", true);

                    feature_bd.attr("d", path)
                        .style("fill", "none")
                        .style("stroke", "#ffffff")
                        .style("stroke-width", 1);
                };

                loader.run();

            });

        }; //var baseMapBorder close


        var basemapElurbanized = function() {

            d3.json("mapData/Urbanized.json", function(geojson) {

                var svg_ua = d3.select(map.getPanes().overlayPane).append("svg");
                var g_ua = svg_ua.append("g").attr("class", "leaflet-zoom-hide");

                var feature_ua = g_ua.selectAll("path")
                    .data(geojson.features)
                    .enter()
                    .append("path");

                // SVG Filter: dot pattern         
                var pattern = svg_ua.append("defs")
                    .append("pattern")
                    .attr("id", "dot-pattern")
                    .attr("x", 10)
                    .attr("y", 10)
                    .attr("width", 2)
                    .attr("height", 2)
                    .attr("patternUnits", "userSpaceOnUse");

                pattern.append("circle")
                    .attr("cx", 2)
                    .attr("cy", 2)
                    .attr("r", 1)
                    .style("stroke", "none")
                    .style("fill", "rgb(102, 102, 102)");
                // SVG Filter ends

                map.on("viewreset", reset);
                reset();

                // Reposition the SVG to cover the features.
                function reset() {

                    var bounds = path.bounds(geojson),
                        topLeft = bounds[0],
                        bottomRight = bounds[1];

                    svg_ua.attr("width", bottomRight[0] - topLeft[0])
                        .attr("height", bottomRight[1] - topLeft[1])
                        .style("left", topLeft[0] + "px")
                        .style("top", topLeft[1] + "px");

                    g_ua.attr("transform", "translate(" + -topLeft[0] + "," + -topLeft[1] + ")");

                    g_ua.classed("BasemapElements bme-Urbanized", true);

                    feature_ua.attr("d", path)
                        .style("fill", "url(#dot-pattern)");

                };

                loader.run();

            });

        }; // var BasemapElurbanized close


        var baseMapElPDA = function() {

            d3.json("mapData/PDAnew.json", function(geojson) {

                var svg_pa = d3.select(map.getPanes().overlayPane).append("svg");
                var g_pa = svg_pa.append("g").attr("class", "leaflet-zoom-hide");

                var feature_pa = g_pa.selectAll("path")
                    .data(geojson.features)
                    .enter()
                    .append("path");

                map.on("viewreset", reset);
                reset();

                // Reposition the SVG to cover the features.
                function reset() {

                    var bounds = path.bounds(geojson),
                        topLeft = bounds[0],
                        bottomRight = bounds[1];

                    svg_pa.attr("width", bottomRight[0] - topLeft[0])
                        .attr("height", bottomRight[1] - topLeft[1])
                        .style("left", topLeft[0] + "px")
                        .style("top", topLeft[1] + "px");

                    g_pa.attr("transform", "translate(" + -topLeft[0] + "," + -topLeft[1] + ")");

                    g_pa.classed("BasemapElements bme-PDA", true);

                    feature_pa.attr("d", path)
                        .style("fill", "rgb(238, 28, 46)")
                        .style("opacity", 0.2);

                };

                loader.run();

            });

        }; //var BasemapElurbanized close


        var baseMapElhwFwy = function() {

            d3.json("mapData/hwFwy_SFBay.json", function(geojson) {

                var svg_hf = d3.select(map.getPanes().overlayPane).append("svg");
                var g_hf = svg_hf.append("g").attr("class", "leaflet-zoom-hide");

                var feature_hf = g_hf.selectAll("path")
                    .data(geojson.features)
                    .enter()
                    .append("path");

                map.on("viewreset", reset);
                reset();

                // Reposition the SVG to cover the features.
                function reset() {

                    var bounds = path.bounds(geojson),
                        topLeft = bounds[0],
                        bottomRight = bounds[1];

                    svg_hf.attr("width", bottomRight[0] - topLeft[0])
                        .attr("height", bottomRight[1] - topLeft[1])
                        .style("left", topLeft[0] + "px")
                        .style("top", topLeft[1] + "px");


                    g_hf.attr("transform", "translate(" + -topLeft[0] + "," + -topLeft[1] + ")");
                    g_hf.classed("en-HwFwy", true);

                    feature_hf.attr("d", path)
                        .style("fill", "none")
                        .style("stroke-width", 2)
                        .style("stroke", "rgb(180, 180, 180)");

                };

                loader.run();

            });

        }; //var baseMapElhwFwy close


        var baseMapElcommuterRail = function() {

            d3.json("mapData/CommuterRail_SFBayNew.json", function(geojson) {

                var svg_cr = d3.select(map.getPanes().overlayPane).append("svg");
                var g_cr = svg_cr.append("g").attr("class", "leaflet-zoom-hide");

                var feature_cr = g_cr.selectAll("path")
                    .data(geojson.features)
                    .enter()
                    .append("path");

                map.on("viewreset", reset);
                reset();

                // Reposition the SVG to cover the features.
                function reset() {

                    var bounds = path.bounds(geojson),
                        topLeft = bounds[0],
                        bottomRight = bounds[1];

                    svg_cr.attr("width", bottomRight[0] - topLeft[0])
                        .attr("height", bottomRight[1] - topLeft[1])
                        .style("left", topLeft[0] + "px")
                        .style("top", topLeft[1] + "px");

                    g_cr.attr("transform", "translate(" + -topLeft[0] + "," + -topLeft[1] + ")");

                    feature_cr.attr("d", path)
                        .style("fill", "none")
                        .style("stroke-width", 3)
                        .style("stroke-linecap", "square")
                        .style("stroke-dasharray", "10, 8")
                        .style("stroke", function(d, i) {
                            if (d.properties.OPERATOR == "BART") {
                                return "rgb(29, 82, 126)"
                            } else if (d.properties.OPERATOR == "Caltrain") {
                                return "rgb(115, 0, 0)"
                            };
                        })
                        .attr("class", function(d, i) {
                            if (d.properties.OPERATOR == "BART") {
                                return "en-BART"
                            } else if (d.properties.OPERATOR == "Caltrain") {
                                return "en-Caltrain"
                            };
                        })
                        .classed("allCR", true);

                };

                loader.run();
            });

        }; // var baseMapElcommuterRail close

        var baseMapLightRail = function() {

            d3.json("mapData/lightRail.json", function(geojson) {

                var svg_cr = d3.select(map.getPanes().overlayPane).append("svg");
                var g_cr = svg_cr.append("g").attr("class", "leaflet-zoom-hide");

                var feature_cr = g_cr.selectAll("path")
                    .data(geojson.features)
                    .enter()
                    .append("path");

                map.on("viewreset", reset);
                reset();

                // Reposition the SVG to cover the features.
                function reset() {

                    var bounds = path.bounds(geojson),
                        topLeft = bounds[0],
                        bottomRight = bounds[1];

                    svg_cr.attr("width", bottomRight[0] - topLeft[0])
                        .attr("height", bottomRight[1] - topLeft[1])
                        .style("left", topLeft[0] + "px")
                        .style("top", topLeft[1] + "px");

                    g_cr.attr("transform", "translate(" + -topLeft[0] + "," + -topLeft[1] + ")");

                    feature_cr.attr("d", path)
                        .style("fill", "none")
                        .style("stroke-width", 3)
                        .style("stroke-linecap", "square")
                        .style("stroke-dasharray", "10, 8")
                        .style("stroke", "rgb(39, 108, 88)")

                    .classed("allLR", true);

                };

                loader.run();
            });

        }; // var baseMapElcommuterRail close

        var baseMapCountyNames = function() {

            d3.json("mapData/countyName.json", function(geojson) {

                var svg_cn = d3.select(map.getPanes().overlayPane).append("svg");
                var g_cn = svg_cn.append("g").attr("class", "leaflet-zoom-hide");

                var feature_cn = g_cn.selectAll("path")
                    .data(geojson.features)
                    .enter()
                    .append("path");

                map.on("viewreset", reset);
                reset();

                // Reposition the SVG to cover the features.
                function reset() {

                    var bounds = path.bounds(geojson),
                        topLeft = bounds[0],
                        bottomRight = bounds[1];

                    svg_cn.attr("width", bottomRight[0] - topLeft[0])
                        .attr("height", bottomRight[1] - topLeft[1])
                        .style("left", topLeft[0] + "px")
                        .style("top", topLeft[1] + "px");

                    g_cn.attr("transform", "translate(" + -topLeft[0] + "," + -topLeft[1] + ")");

                    feature_cn.attr("d", path)
                        .style("fill", "#fff")
                        .style("stroke-width", 0)
                        .classed("countyNames", true)
                        .classed("BasemapElements", true);
                };

                loader.run();

            });

        }; // var baseMapCountyNames close


        var RTPmapData = function() {

            loader.run();

            ////////////////////////////// Part A: initialize RTP layers

            d3.json("mapData/RTP_allData.json", function(geojson) {

                var svg_rt = d3.select(map.getPanes().overlayPane).append("svg");
                var g_rt = svg_rt.append("g").attr("class", "leaflet-zoom-hide");

                var feature_rt = g_rt.selectAll("path")
                    .data(geojson.features)
                    .enter()
                    .append("path");


            ////////////////////////////// Part B: Click function to replace project information

                feature_rt.on("click", function(clickedFeature) {

                    $("#wrapper").removeClass("toggled"); //Prevent bugs displaying time chart while the sidebar is opening (add on Dec 25, 2015)
                    var rtpid = clickedFeature.properties.VizID; //Get VizID
                    console.log(rtpid);

                    for (id in rtpdata) {

                        if (rtpid == rtpdata[id].VizID) {

                            // Varialize each item 
                            var county = rtpdata[id].County;
                            var responsibleCMA = rtpdata[id].ResponsibleCMA;
                            var projectName = rtpdata[id].ProjectName;
                            var description = rtpdata[id].Description;
                            var projectCost = rtpdata[id].ProjectCost;
                            var projectStart = rtpdata[id].ProjectStart;
                            var projectCompletion = rtpdata[id].ProjectCompletion;
                            var timelineOrder = rtpdata[id].timelineNbr;

                            ////////////////////////////// Part B-1: Information in the tab panel 1

                            // Replace project name
                            $("#panel1 #pNameContainer #pName").html(projectName);
                            // Replace project description
                            $("#panel1 #pDescription #pDescText").html(description);

                            var projectNameShuffle = $("#pName");
                            projectNameShuffle.css("display", "none");
                            projectNameShuffle.fadeIn(1600).shuffleLetters();

                            var projectDescshow = $("#pDescText");
                            projectDescshow.css("display", "none");
                            projectDescshow.fadeIn(1600);

                            ////////////////////////////// Part B-2: Information in the tab panel 2

                            // Replace project name
                            $("#panel2 .infoContent #projectNameInfo").html(projectName).css("display", "none");
                            // Replace county info
                            $("#panel2 .infoContent #countyInfo").html(county).css("display", "none");
                            // Replace CMA info
                            $("#panel2 .infoContent #CMAInfo").html(responsibleCMA).css("display", "none");
                            
                            if (projectCost != null) {
                                $("#panel2 #costInfoContainer #costInfo").html(projectCost + " M").css("display", "none");
                            } else {
                                $("#panel2 #costInfoContainer #costInfo").html("Data is not available").css("display", "none");
                            };

                             if (projectStart != null) {
                                $("#panel2 #timelineInfoContainer #phaseInfo").html("Project started in " + projectStart).css("display", "none");
                            } else {
                                $("#panel2 #timelineInfoContainer #phaseInfo").html("Project start is undefined").css("display", "none");
                            };
                        
                            if (projectCompletion != null) {
                                $("#panel2 #timelineInfoContainer #phaseInfo2").html("/ completed in " + projectCompletion).css("display", "none");
                            } else {
                                $("#panel2 #timelineInfoContainer #phaseInfo2").html("/ completion is undefined").css("display", "none");
                            };
                       
                            // Remove circle / rectangle selected previously
                            $(".selectedCircle").css("display", "none");
                            $(".selectedRect").css("display", "none");


                            // Add delays to show on each item 

                            setTimeout(function(clickedFeature) {
                                var projectNameShuffle2 = $("#panel2 .infoContent #projectNameInfo");
                                projectNameShuffle2.fadeIn(500).shuffleLetters();
                            }, 0);

                            setTimeout(function(clickedFeature) {
                                var countyInfoShuffle = $("#panel2 .infoContent #countyInfo");
                                countyInfoShuffle.fadeIn(500).shuffleLetters();
                            }, 500);

                            setTimeout(function(clickedFeature) {
                                var CMAInfoShuffle = $("#panel2 .infoContent #CMAInfo");
                                CMAInfoShuffle.fadeIn(500).shuffleLetters();
                            }, 800);

                            setTimeout(function(clickedFeature) {
                                var costInfoShuffle = $("#panel2 #costInfoContainer #costInfo");
                                costInfoShuffle.fadeIn(500).shuffleLetters();
                            }, 1100);

                             setTimeout(function(clickedFeature) {
                                var phaseInfoShuffle1 = $("#panel2 #timelineInfoContainer #phaseInfo");
                                phaseInfoShuffle1.fadeIn(500).shuffleLetters();
                            }, 1500);

                            setTimeout(function(clickedFeature) {
                                var phaseInfoShuffle2 = $("#panel2 #timelineInfoContainer #phaseInfo2");
                                phaseInfoShuffle2.fadeIn(500).shuffleLetters();
                            }, 1600);


            ////////////////////////////// Part C: D3 chart 

                            setTimeout(function(clickedFeature) { // D3 charts (both cost and timeline)

                                ////////////////////////////// Part C-1: Cost chart

                                // The case there is cost data with selected project
                                if (projectCost != null) {

                                    // Define canvas
                                    var margin3 = 25,
                                        w3 = parseInt(d3.select("#costChart").style("width")) - margin3 * 2,
                                        h3 = 100 - margin3 * 2;

                                    // Chart area exclude x/y axis area
                                    var graph3 = d3.select("#costChart")
                                        .append("g")
                                        .attr("width", w3)
                                        .attr("height", h3)
                                        .attr("transform", "translate(" + margin3 + "," + margin3 + ")");

                                    // X Scales 
                                    var xScale3 = d3.scale.linear()
                                        .domain([0, 4000]) // Set data range: Project Cost 0M to 4000M 
                                        .range([0, w3]) // Adjust actual data range to the width of the chart canvas
                                        .nice(); // Round numbers

                                    // Y Scales 
                                    var yScale3 = d3.scale.linear()
                                        .domain([0, 1]) // Set data range
                                        .range([h3, 0]); // Adjust actual data range to the height of the chart canvas *Height should be assigned first in order to present number low to high from bottom to top

                                    // X Axis
                                    var xAxis3 = d3.svg.axis()
                                        .scale(xScale3)
                                        .orient("bottom");

                                    // Y Axis
                                    var yAxis3 = d3.svg.axis()
                                        .scale(yScale3)
                                        .orient("left")
                                        .ticks(3)
                                        .tickFormat(function(d, i) {
                                            return [''][d];
                                        });

                                    //Add the circle, which was selected by the click function, on the chart
                                    graph3.append("g")
                                        .append("circle")
                                        .attr("class", "selectedCircle")
                                        .attr("cx", xScale3(projectCost)) // Start action: the position of the bubble is set 0 M dollar in the beginning
                                    .attr("cy", 1)
                                        .attr("r", 3)
                                        .style("fill", "#8c8c8c")
                                        .transition()
                                        .duration(800)
                                    // The bubble moves to the assigned position, which is defined by the click function
                                    .style("fill", "rgb(51, 103, 153)")
                                        .style("opacity", 0.8)
                                        .attr("r", 8);

                                };


                                ////////////////////////////// Part C-2: Timeline chart

                                // The case there is timeline data with selected project
                                if (projectStart != null && projectCompletion != null) {

                                    // Define canvas
                                    var margin4 = 30,
                                        w4 = parseInt(d3.select("#timelineChart").style("width")) - margin4 * 2,
                                        h4 = 380 - margin4 * 2;

                                    // Set space for chart exclude x/y axis space
                                    var graph4 = d3.select("#timelineChart")
                                        .append("g")
                                        .attr("width", w4)
                                        .attr("height", h4)
                                        .attr("transform", "translate(" + margin4 + "," + margin4 + ")");

                                    var xScale4 = d3.scale.linear()
                                        .domain([2000, 2040]) // Set data range: Year 2000 to 2020  
                                        .range([0, w4]);

                                    var yScale4 = d3.scale.linear()
                                        .domain([0, 120]) // Set data range: number of projects 120 maximum
                                        .range([h4, 0]);

                                    var xScaleTimeline2 = d3.scale.linear()
                                        .domain([0, 40]) // Range between 2000 to 2040 Need this because Project Completion minus Project Start will be something like 2, 5 and 10, which are not falls into the range of xScale2 of between 2000 - 2040. As a result of this D3 returns negative value on all elements that are not presented on the chart canvas.
                                        .range([0, w4]); // Adjust actual data range to the width of the chart canvas         
                
                                    graph4.append("g")
                                        .append("rect")
                                        .attr("class", "selectedRect")
                                        .attr("height", "2px")
                                        .attr("x", xScale4(projectStart))
                                        .attr("y", (timelineOrder * 3) - 2)
                                        .attr("width", function(d, i) {
                                        var timelineStart = projectStart;
                                        var timelineEnd = projectCompletion;
                                        var timelineRange = timelineEnd - timelineStart;
                                        return xScaleTimeline(timelineRange) // Get width from Project Completion year minus Project Start year, and adjust the width using "xScaleTimeline(range/domain)" 
                                        })
                                        .transition()
                                        .duration(800)
                                        .attr("height", 8)
                                        .attr("y", (timelineOrder * 3) - 6);
                                        console.log(xScale4(projectStart));
    
                                }


            ////////////////////////////// Part D: D3 chart resize function

                                function resize() {

                                    //// Cost Chart to show all distribution

                                    var w1 = parseInt(d3.select("#costChart").style("width")) - margin1 * 2,
                                        h1 = 100 - margin1 * 2;
             
                                    xScale1.domain([0, 4000]) 
                                        .range([0, w1]) 
                                        .nice(); 

                                    yScale1.domain([0, 1]) 
                                        .range([h1, 0]); 

                                    xAxis1.ticks(Math.max(w1 / 50, 2)); 

                                    graph1.attr("width", w1)
                                          .attr("height", h1);

                                    graph1.select('.ccP_x_axis')
                                        .attr("transform", "translate(0," + margin1 + ")")
                                        .call(xAxis1);

                                    graph1.select('.unit')
                                        .attr("x", w1 + margin1)
                                        .attr("y", 40)
                                        .style("text-anchor", "end");

                                    graph1.select(".ccP_y_axis") 
                                        .call(yAxis1);

                                    graph1.selectAll(".costCircle")
                                        .attr("r", 3)
                                        .attr("cy", 1)
                                        .attr("cx", function(d, i) { 
                                        return xScale1(d.ProjectCost)
                                    });


                                    //// Timeline Chart to show all distribution

                                    var w2 = parseInt(d3.select("#timelineChart").style("width")) - margin2 * 2,
                                        h2 = 380 - margin2 * 2;
 
                                    var xScale2 = d3.scale.linear()
                                        .domain([2000, 2040]) 
                                        .range([0, w2]);

                                    var xScaleTimeline = d3.scale.linear()
                                        .domain([0, 40]) 
                                        .range([0, w2]); 

                                    var xAxis2 = d3.svg.axis()
                                        .scale(xScale2)
                                        .orient("bottom")
                                        .ticks(9)
                                        .tickFormat(d3.format("d"));

                                    xAxis2.ticks(Math.max(w2 / 50, 2));

                                    graph2.attr("width", w2)
                                        .attr("height", h2);

                                    graph2.select('.tcP_x_axis')
                                        .attr("transform", "translate(0," + (h2 + margin2 * 1.5) + ")")
                                        .call(xAxis2);

                                    graph2.select('.year')
                                        .attr("x", w2 + margin2 / 2)
                                        .attr("y", 40)
                                        .style("text-anchor", "end");

                                    graph2.selectAll(".timelineRect")
                                        .attr("y", function(d, i) { 
                                            return d.timelineNbr * 3
                                        })
                                        .attr("x", function(d, i) { 
                                            return xScale2(d.ProjectStart)
                                        })
                                        .attr("width", function(d, i) { 

                                            var timelineStart = d.ProjectStart;
                                            // console.log(timelineStart);
                                            var timelineEnd = d.ProjectCompletion;
                                            // console.log(timelineEnd);
                                            var timelineRange = timelineEnd - timelineStart;
                                            // console.log(timelineRange);
                                            return xScaleTimeline(timelineRange)

                                        });


                                    //// Cost chart show SELECTED project

                                    if (projectCost != null) {

                                        var w3 = parseInt(d3.select("#costChart").style("width")) - margin3 * 2,
                                            h3 = 100 - margin3 * 2;

                                        var xScale3 = d3.scale.linear()
                                            .domain([0, 4000]) 
                                            .range([0, w3]); 

                                        var yScale3 = d3.scale.linear()
                                            .domain([0, 3]) 
                                            .range([h3, 0]); 

                                        graph3.attr("width", w3)
                                            .attr("height", h3);

                                        graph3.select(".selectedCircle")
                                        .attr("r", 8)
                                            .attr("cx", xScale3(projectCost)) 
                                        .attr("cy", 1);

                                    };


                                    //// Timeline Chart to show all distribution

                                    if (projectStart != null && projectCompletion != null) {

                                        var w4 = parseInt(d3.select("#timelineChart").style("width")) - margin4 * 2,
                                            h4 = 380 - margin4 * 2;

                                        var xScale4 = d3.scale.linear()
                                            .domain([2000, 2040]) 
                                            .range([0, w4]);

                                        var yScale4 = d3.scale.linear()
                                            .domain([0, 120])
                                            .range([h4, 0]);

                                        var xScaleTimeline2 = d3.scale.linear()
                                            .domain([0, 40]) 
                                            .range([0, w4]); 

                                        graph4.attr("width", w4)
                                            .attr("height", h4);

                                        graph4.select(".selectedRect")
                                            .attr("x", xScale4(projectStart))
                                            .attr("y", (timelineOrder * 3) - 6)
                                            .attr("width", function(d, i) {
                                                var timelineStart = projectStart;
                                                var timelineEnd = projectCompletion;
                                                var timelineRange = timelineEnd - timelineStart;
                                                return xScaleTimeline(timelineRange) 
                                            })
                                            .attr("height", 8);
                                    };

                                };

                                d3.select(window).on('resize', resize);

                            }, 2000);


            ////////////////////////////// Part E: Update photo gallery based on the click function

                            // Photos are stored in different folders, named "1(Photos for VisID1)", "2" , "3" ...
                            // Maximum number of photo is 10. Some project may not contain any photos
                            var pictureURL1 = "projectImages/" + rtpid + "/" + "1.jpg";
                            var pictureURL2 = "projectImages/" + rtpid + "/" + "2.jpg";
                            var pictureURL3 = "projectImages/" + rtpid + "/" + "3.jpg";
                            var pictureURL4 = "projectImages/" + rtpid + "/" + "4.jpg";
                            var pictureURL5 = "projectImages/" + rtpid + "/" + "5.jpg";
                            var pictureURL6 = "projectImages/" + rtpid + "/" + "6.jpg";
                            var pictureURL7 = "projectImages/" + rtpid + "/" + "7.jpg";
                            var pictureURL8 = "projectImages/" + rtpid + "/" + "8.jpg";
                            var pictureURL9 = "projectImages/" + rtpid + "/" + "9.jpg";
                            var pictureURL10 = "projectImages/" + rtpid + "/" + "10.jpg";

                            // Clear all pics container first
                            $('#pics1Container').html("");
                            $('#pics2Container').html("");
                            $('#pics3Container').html("");
                            $('#pics4Container').html("");
                            $('#pics5Container').html("");
                            $('#pics6Container').html("");
                            $('#pics7Container').html("");
                            $('#pics8Container').html("");
                            $('#pics9Container').html("");
                            $('#pics10Container').html("");


                            // Hard code all photos (there are better ways to do this instead of hard code, such as using Ajax and PHP)
                            if (rtpid == 1) {

                                $("#PhotoWindowContent").css("height", "0px");
                                $("#PhotoWindowContent").html("");
                                // Update 1st photo
                                $('#pics1Container').html('<a href="' + pictureURL1 + '" data-lightbox="projectPics"></a>').fadeIn(1000)
                                $('#pics1Container a').html('<img src="' + pictureURL1 + '" class="img-thumbnail" id="projectPics1" />');
                                // Update 2nd photo
                                $('#pics2Container').html('<a href="' + pictureURL2 + '" data-lightbox="projectPics"></a>').fadeIn(1000);
                                $('#pics2Container a').html('<img src="' + pictureURL2 + '" class="img-thumbnail" id="projectPics2" />');
                                // Update 3rd photo
                                $('#pics3Container').html('<a href="' + pictureURL3 + '" data-lightbox="projectPics"></a>').fadeIn(1000);
                                $('#pics3Container a').html('<img src="' + pictureURL3 + '" class="img-thumbnail" id="projectPics3" />');

                            } else if (rtpid == 2) {

                                $("#PhotoWindowContent").css("height", "0px");
                                $("#PhotoWindowContent").html("");
                                // Update 1st Photo
                                $('#pics1Container').html('<a href="' + pictureURL1 + '" data-lightbox="projectPics"></a>').fadeIn(1000)
                                $('#pics1Container a').html('<img src="' + pictureURL1 + '" class="img-thumbnail" id="projectPics1" />');
                                // Update 2nd photo
                                $('#pics2Container').html('<a href="' + pictureURL2 + '" data-lightbox="projectPics"></a>').fadeIn(1000);
                                $('#pics2Container a').html('<img src="' + pictureURL2 + '" class="img-thumbnail" id="projectPics2" />');

                            } else if (rtpid == 3) {
                                // Display None "No Project Selected/No Photo Available" 
                                $("#PhotoWindowContent").css("height", "0px");
                                $("#PhotoWindowContent").html("");
                                // Update 1st Photo
                                $('#pics1Container').html('<a href="' + pictureURL1 + '" data-lightbox="projectPics"></a>').fadeIn(1000)
                                $('#pics1Container a').html('<img src="' + pictureURL1 + '" class="img-thumbnail" id="projectPics1" />');
                                // Update 2nd photo
                                $('#pics2Container').html('<a href="' + pictureURL2 + '" data-lightbox="projectPics"></a>').fadeIn(1000);
                                $('#pics2Container a').html('<img src="' + pictureURL2 + '" class="img-thumbnail" id="projectPics2" />');
                                // Update 3rd photo
                                $('#pics3Container').html('<a href="' + pictureURL3 + '" data-lightbox="projectPics"></a>').fadeIn(1000);
                                $('#pics3Container a').html('<img src="' + pictureURL3 + '" class="img-thumbnail" id="projectPics3" />');
                                // Update 4th photo
                                $('#pics4Container').html('<a href="' + pictureURL4 + '" data-lightbox="projectPics"></a>').fadeIn(1000);
                                $('#pics4Container a').html('<img src="' + pictureURL4 + '" class="img-thumbnail" id="projectPics4" />');
                                // Update 5th photo
                                $('#pics5Container').html('<a href="' + pictureURL5 + '" data-lightbox="projectPics"></a>').fadeIn(1000);
                                $('#pics5Container a').html('<img src="' + pictureURL5 + '" class="img-thumbnail" id="projectPics5" />');
                                // Update 6th photo
                                $('#pics6Container').html('<a href="' + pictureURL6 + '" data-lightbox="projectPics"></a>').fadeIn(1000);
                                $('#pics6Container a').html('<img src="' + pictureURL6 + '" class="img-thumbnail" id="projectPics6" />');
                                // Update 7th photo
                                $('#pics7Container').html('<a href="' + pictureURL7 + '" data-lightbox="projectPics"></a>').fadeIn(1000);
                                $('#pics7Container a').html('<img src="' + pictureURL7 + '" class="img-thumbnail" id="projectPics7" />');
                                // Update 8th photo
                                $('#pics8Container').html('<a href="' + pictureURL8 + '" data-lightbox="projectPics"></a>').fadeIn(1000);
                                $('#pics8Container a').html('<img src="' + pictureURL8 + '" class="img-thumbnail" id="projectPics8" />');

                            } else if (rtpid == 5) {

                                // Display None "No Project Selected/No Photo Available" 
                                $("#initialPhotoWindow").css("height", "0px");
                                $("#PhotoWindowContent").html("");
                                // Update 1st Photo
                                $('#pics1Container').html('<a href="' + pictureURL1 + '" data-lightbox="projectPics"></a>').fadeIn(1000)
                                $('#pics1Container a').html('<img src="' + pictureURL1 + '" class="img-thumbnail" id="projectPics1" />');
                                // Update 2nd photo
                                $('#pics2Container').html('<a href="' + pictureURL2 + '" data-lightbox="projectPics"></a>').fadeIn(1000);
                                $('#pics2Container a').html('<img src="' + pictureURL2 + '" class="img-thumbnail" id="projectPics2" />');

                            } else if (rtpid == 6) {

                                // Display None "No Project Selected/No Photo Available" 
                                $("#initialPhotoWindow").css("height", "0px");
                                $("#PhotoWindowContent").html("");
                                // Update 1st Photo
                                $('#pics1Container').html('<a href="' + pictureURL1 + '" data-lightbox="projectPics"></a>').fadeIn(1000)
                                $('#pics1Container a').html('<img src="' + pictureURL1 + '" class="img-thumbnail" id="projectPics1" />');
                                // Update 2nd photo
                                $('#pics2Container').html('<a href="' + pictureURL2 + '" data-lightbox="projectPics"></a>').fadeIn(1000);
                                $('#pics2Container a').html('<img src="' + pictureURL2 + '" class="img-thumbnail" id="projectPics2" />');

                            } else if (rtpid == 7) {

                                // Display None "No Project Selected/No Photo Available" 
                                $("#initialPhotoWindow").css("height", "0px");
                                $("#PhotoWindowContent").html("");
                                // Update 1st Photo
                                $('#pics1Container').html('<a href="' + pictureURL1 + '" data-lightbox="projectPics"></a>').fadeIn(1000)
                                $('#pics1Container a').html('<img src="' + pictureURL1 + '" class="img-thumbnail" id="projectPics1" />');
                                // Update 2nd photo
                                $('#pics2Container').html('<a href="' + pictureURL2 + '" data-lightbox="projectPics"></a>').fadeIn(1000);
                                $('#pics2Container a').html('<img src="' + pictureURL2 + '" class="img-thumbnail" id="projectPics2" />');
                                // Update 3rd photo
                                $('#pics3Container').html('<a href="' + pictureURL3 + '" data-lightbox="projectPics"></a>').fadeIn(1000);
                                $('#pics3Container a').html('<img src="' + pictureURL3 + '" class="img-thumbnail" id="projectPics3" />');
                                // Update 4th photo
                                $('#pics4Container').html('<a href="' + pictureURL4 + '" data-lightbox="projectPics"></a>').fadeIn(1000);
                                $('#pics4Container a').html('<img src="' + pictureURL4 + '" class="img-thumbnail" id="projectPics4" />');

                            } else if (rtpid == 9) {

                                // Display None "No Project Selected/No Photo Available" 
                                $("#initialPhotoWindow").css("height", "0px");
                                $("#PhotoWindowContent").html("");
                                // Update 1st Photo
                                $('#pics1Container').html('<a href="' + pictureURL1 + '" data-lightbox="projectPics"></a>').fadeIn(1000)
                                $('#pics1Container a').html('<img src="' + pictureURL1 + '" class="img-thumbnail" id="projectPics1" />');
                                // Update 2nd photo
                                $('#pics2Container').html('<a href="' + pictureURL2 + '" data-lightbox="projectPics"></a>').fadeIn(1000);
                                $('#pics2Container a').html('<img src="' + pictureURL2 + '" class="img-thumbnail" id="projectPics2" />');
                                // Update 3rd photo
                                $('#pics3Container').html('<a href="' + pictureURL3 + '" data-lightbox="projectPics"></a>').fadeIn(1000);
                                $('#pics3Container a').html('<img src="' + pictureURL3 + '" class="img-thumbnail" id="projectPics3" />');
                                // Update 4th photo
                                $('#pics4Container').html('<a href="' + pictureURL4 + '" data-lightbox="projectPics"></a>').fadeIn(1000);
                                $('#pics4Container a').html('<img src="' + pictureURL4 + '" class="img-thumbnail" id="projectPics4" />');
                                // Update 5th photo
                                $('#pics5Container').html('<a href="' + pictureURL5 + '" data-lightbox="projectPics"></a>').fadeIn(1000);
                                $('#pics5Container a').html('<img src="' + pictureURL5 + '" class="img-thumbnail" id="projectPics5" />');
                                // Update 6th photo
                                $('#pics6Container').html('<a href="' + pictureURL6 + '" data-lightbox="projectPics"></a>').fadeIn(1000);
                                $('#pics6Container a').html('<img src="' + pictureURL6 + '" class="img-thumbnail" id="projectPics6" />');
                                // Update 7th photo
                                $('#pics7Container').html('<a href="' + pictureURL7 + '" data-lightbox="projectPics"></a>').fadeIn(1000);
                                $('#pics7Container a').html('<img src="' + pictureURL7 + '" class="img-thumbnail" id="projectPics7" />');
                                // Update 8th photo


                            } else if (rtpid == 10) {

                                // Display None "No Project Selected/No Photo Available" 
                                $("#initialPhotoWindow").css("height", "0px");
                                $("#PhotoWindowContent").html("");
                                // Update 1st Photo
                                $('#pics1Container').html('<a href="' + pictureURL1 + '" data-lightbox="projectPics"></a>').fadeIn(1000)
                                $('#pics1Container a').html('<img src="' + pictureURL1 + '" class="img-thumbnail" id="projectPics1" />');
                                // Update 2nd photo
                                $('#pics2Container').html('<a href="' + pictureURL2 + '" data-lightbox="projectPics"></a>').fadeIn(1000);
                                $('#pics2Container a').html('<img src="' + pictureURL2 + '" class="img-thumbnail" id="projectPics2" />');
                                // Update 3rd photo
                                $('#pics3Container').html('<a href="' + pictureURL3 + '" data-lightbox="projectPics"></a>').fadeIn(1000);
                                $('#pics3Container a').html('<img src="' + pictureURL3 + '" class="img-thumbnail" id="projectPics3" />');
                                // Update 4th photo
                                $('#pics4Container').html('<a href="' + pictureURL4 + '" data-lightbox="projectPics"></a>').fadeIn(1000);
                                $('#pics4Container a').html('<img src="' + pictureURL4 + '" class="img-thumbnail" id="projectPics4" />');

                            } else if (rtpid == 11) {

                                // Display None "No Project Selected/No Photo Available" 
                                $("#initialPhotoWindow").css("height", "0px");
                                $("#PhotoWindowContent").html("");
                                // Update 1st Photo
                                $('#pics1Container').html('<a href="' + pictureURL1 + '" data-lightbox="projectPics"></a>').fadeIn(1000)
                                $('#pics1Container a').html('<img src="' + pictureURL1 + '" class="img-thumbnail" id="projectPics1" />');
                                // Update 2nd photo
                                $('#pics2Container').html('<a href="' + pictureURL2 + '" data-lightbox="projectPics"></a>').fadeIn(1000);
                                $('#pics2Container a').html('<img src="' + pictureURL2 + '" class="img-thumbnail" id="projectPics2" />');
                                // Update 3rd photo
                                $('#pics3Container').html('<a href="' + pictureURL3 + '" data-lightbox="projectPics"></a>').fadeIn(1000);
                                $('#pics3Container a').html('<img src="' + pictureURL3 + '" class="img-thumbnail" id="projectPics3" />');
                                // Update 4th photo
                                $('#pics4Container').html('<a href="' + pictureURL4 + '" data-lightbox="projectPics"></a>').fadeIn(1000);
                                $('#pics4Container a').html('<img src="' + pictureURL4 + '" class="img-thumbnail" id="projectPics4" />');

                            } else if (rtpid == 13) {

                                // Display None "No Project Selected/No Photo Available" 
                                $("#initialPhotoWindow").css("height", "0px");
                                $("#PhotoWindowContent").html("");
                                // Update 1st Photo
                                $('#pics1Container').html('<a href="' + pictureURL1 + '" data-lightbox="projectPics"></a>').fadeIn(1000)
                                $('#pics1Container a').html('<img src="' + pictureURL1 + '" class="img-thumbnail" id="projectPics1" />');
                                // Update 2nd photo
                                $('#pics2Container').html('<a href="' + pictureURL2 + '" data-lightbox="projectPics"></a>').fadeIn(1000);
                                $('#pics2Container a').html('<img src="' + pictureURL2 + '" class="img-thumbnail" id="projectPics2" />');
                                // Update 3rd photo
                                $('#pics3Container').html('<a href="' + pictureURL3 + '" data-lightbox="projectPics"></a>').fadeIn(1000);
                                $('#pics3Container a').html('<img src="' + pictureURL3 + '" class="img-thumbnail" id="projectPics3" />');

                            } else if (rtpid == 14) {

                                // Display None "No Project Selected/No Photo Available" 
                                $("#initialPhotoWindow").css("height", "0px");
                                $("#PhotoWindowContent").html("");
                                // Update 1st Photo
                                $('#pics1Container').html('<a href="' + pictureURL1 + '" data-lightbox="projectPics"></a>').fadeIn(1000)
                                $('#pics1Container a').html('<img src="' + pictureURL1 + '" class="img-thumbnail" id="projectPics1" />');
                                // Update 2nd photo
                                $('#pics2Container').html('<a href="' + pictureURL2 + '" data-lightbox="projectPics"></a>').fadeIn(1000);
                                $('#pics2Container a').html('<img src="' + pictureURL2 + '" class="img-thumbnail" id="projectPics2" />');
                                // Update 3rd photo
                                $('#pics3Container').html('<a href="' + pictureURL3 + '" data-lightbox="projectPics"></a>').fadeIn(1000);
                                $('#pics3Container a').html('<img src="' + pictureURL3 + '" class="img-thumbnail" id="projectPics3" />');

                            } else if (rtpid == 15) {

                                // Display None "No Project Selected/No Photo Available" 
                                $("#initialPhotoWindow").css("height", "0px");
                                $("#PhotoWindowContent").html("");
                                // Update 1st Photo
                                $('#pics1Container').html('<a href="' + pictureURL1 + '" data-lightbox="projectPics"></a>').fadeIn(1000)
                                $('#pics1Container a').html('<img src="' + pictureURL1 + '" class="img-thumbnail" id="projectPics1" />');
                                // Update 2nd photo
                                $('#pics2Container').html('<a href="' + pictureURL2 + '" data-lightbox="projectPics"></a>').fadeIn(1000);
                                $('#pics2Container a').html('<img src="' + pictureURL2 + '" class="img-thumbnail" id="projectPics2" />');
                                // Update 3rd photo
                                $('#pics3Container').html('<a href="' + pictureURL3 + '" data-lightbox="projectPics"></a>').fadeIn(1000);
                                $('#pics3Container a').html('<img src="' + pictureURL3 + '" class="img-thumbnail" id="projectPics3" />');

                            } else if (rtpid == 18) {

                                // Display None "No Project Selected/No Photo Available" 
                                $("#initialPhotoWindow").css("height", "0px");
                                $("#PhotoWindowContent").html("");
                                // Update 1st Photo
                                $('#pics1Container').html('<a href="' + pictureURL1 + '" data-lightbox="projectPics"></a>').fadeIn(1000)
                                $('#pics1Container a').html('<img src="' + pictureURL1 + '" class="img-thumbnail" id="projectPics1" />');

                            } else if (rtpid == 19) {

                                // Display None "No Project Selected/No Photo Available" 
                                $("#initialPhotoWindow").css("height", "0px");
                                $("#PhotoWindowContent").html("");
                                // Update 1st Photo
                                $('#pics1Container').html('<a href="' + pictureURL1 + '" data-lightbox="projectPics"></a>').fadeIn(1000)
                                $('#pics1Container a').html('<img src="' + pictureURL1 + '" class="img-thumbnail" id="projectPics1" />');
                                // Update 2nd photo
                                $('#pics2Container').html('<a href="' + pictureURL2 + '" data-lightbox="projectPics"></a>').fadeIn(1000);
                                $('#pics2Container a').html('<img src="' + pictureURL2 + '" class="img-thumbnail" id="projectPics2" />');
                                // Update 3rd photo
                                $('#pics3Container').html('<a href="' + pictureURL3 + '" data-lightbox="projectPics"></a>').fadeIn(1000);
                                $('#pics3Container a').html('<img src="' + pictureURL3 + '" class="img-thumbnail" id="projectPics3" />');

                            } else if (rtpid == 20) {

                                // Display None "No Project Selected/No Photo Available" 
                                $("#initialPhotoWindow").css("height", "0px");
                                $("#PhotoWindowContent").html("");
                                // Update 1st Photo
                                $('#pics1Container').html('<a href="' + pictureURL1 + '" data-lightbox="projectPics"></a>').fadeIn(1000)
                                $('#pics1Container a').html('<img src="' + pictureURL1 + '" class="img-thumbnail" id="projectPics1" />');

                            } else if (rtpid == 21) {

                                // Display None "No Project Selected/No Photo Available" 
                                $("#initialPhotoWindow").css("height", "0px");
                                $("#PhotoWindowContent").html("");
                                // Update 1st Photo
                                $('#pics1Container').html('<a href="' + pictureURL1 + '" data-lightbox="projectPics"></a>').fadeIn(1000)
                                $('#pics1Container a').html('<img src="' + pictureURL1 + '" class="img-thumbnail" id="projectPics1" />');
                                // Update 2nd photo
                                $('#pics2Container').html('<a href="' + pictureURL2 + '" data-lightbox="projectPics"></a>').fadeIn(1000);
                                $('#pics2Container a').html('<img src="' + pictureURL2 + '" class="img-thumbnail" id="projectPics2" />');
                                // Update 3rd photo
                                $('#pics3Container').html('<a href="' + pictureURL3 + '" data-lightbox="projectPics"></a>').fadeIn(1000);
                                $('#pics3Container a').html('<img src="' + pictureURL3 + '" class="img-thumbnail" id="projectPics3" />');
                                // Update 4th photo
                                $('#pics4Container').html('<a href="' + pictureURL4 + '" data-lightbox="projectPics"></a>').fadeIn(1000);
                                $('#pics4Container a').html('<img src="' + pictureURL4 + '" class="img-thumbnail" id="projectPics4" />');

                            } else if (rtpid == 22) {

                                // Display None "No Project Selected/No Photo Available" 
                                $("#initialPhotoWindow").css("height", "0px");
                                $("#PhotoWindowContent").html("");
                                // Update 1st Photo
                                $('#pics1Container').html('<a href="' + pictureURL1 + '" data-lightbox="projectPics"></a>').fadeIn(1000)
                                $('#pics1Container a').html('<img src="' + pictureURL1 + '" class="img-thumbnail" id="projectPics1" />');
                                // Update 2nd photo
                                $('#pics2Container').html('<a href="' + pictureURL2 + '" data-lightbox="projectPics"></a>').fadeIn(1000);
                                $('#pics2Container a').html('<img src="' + pictureURL2 + '" class="img-thumbnail" id="projectPics2" />');
                                // Update 3rd photo
                                $('#pics3Container').html('<a href="' + pictureURL3 + '" data-lightbox="projectPics"></a>').fadeIn(1000);
                                $('#pics3Container a').html('<img src="' + pictureURL3 + '" class="img-thumbnail" id="projectPics3" />');
                                // Update 4th photo
                                $('#pics4Container').html('<a href="' + pictureURL4 + '" data-lightbox="projectPics"></a>').fadeIn(1000);
                                $('#pics4Container a').html('<img src="' + pictureURL4 + '" class="img-thumbnail" id="projectPics4" />');
                                // Update 5th photo
                                $('#pics5Container').html('<a href="' + pictureURL5 + '" data-lightbox="projectPics"></a>').fadeIn(1000);
                                $('#pics5Container a').html('<img src="' + pictureURL5 + '" class="img-thumbnail" id="projectPics5" />');
                                // Update 6th photo
                                $('#pics6Container').html('<a href="' + pictureURL6 + '" data-lightbox="projectPics"></a>').fadeIn(1000);
                                $('#pics6Container a').html('<img src="' + pictureURL6 + '" class="img-thumbnail" id="projectPics6" />');
                                // Update 7th photo
                                $('#pics7Container').html('<a href="' + pictureURL7 + '" data-lightbox="projectPics"></a>').fadeIn(1000);
                                $('#pics7Container a').html('<img src="' + pictureURL7 + '" class="img-thumbnail" id="projectPics7" />');

                            } else if (rtpid == 23) {

                                // Display None "No Project Selected/No Photo Available" 
                                $("#initialPhotoWindow").css("height", "0px");
                                $("#PhotoWindowContent").html("");
                                // Update 1st Photo
                                $('#pics1Container').html('<a href="' + pictureURL1 + '" data-lightbox="projectPics"></a>').fadeIn(1000)
                                $('#pics1Container a').html('<img src="' + pictureURL1 + '" class="img-thumbnail" id="projectPics1" />');
                                // Update 2nd photo
                                $('#pics2Container').html('<a href="' + pictureURL2 + '" data-lightbox="projectPics"></a>').fadeIn(1000);
                                $('#pics2Container a').html('<img src="' + pictureURL2 + '" class="img-thumbnail" id="projectPics2" />');
                                // Update 3rd photo
                                $('#pics3Container').html('<a href="' + pictureURL3 + '" data-lightbox="projectPics"></a>').fadeIn(1000);
                                $('#pics3Container a').html('<img src="' + pictureURL3 + '" class="img-thumbnail" id="projectPics3" />');

                            } else if (rtpid == 25) {

                                // Display None "No Project Selected/No Photo Available" 
                                $("#initialPhotoWindow").css("height", "0px");
                                $("#PhotoWindowContent").html("");
                                // Update 1st Photo
                                $('#pics1Container').html('<a href="' + pictureURL1 + '" data-lightbox="projectPics"></a>').fadeIn(1000)
                                $('#pics1Container a').html('<img src="' + pictureURL1 + '" class="img-thumbnail" id="projectPics1" />');
                                // Update 2nd photo
                                $('#pics2Container').html('<a href="' + pictureURL2 + '" data-lightbox="projectPics"></a>').fadeIn(1000);
                                $('#pics2Container a').html('<img src="' + pictureURL2 + '" class="img-thumbnail" id="projectPics2" />');
                                // Update 3rd photo
                                $('#pics3Container').html('<a href="' + pictureURL3 + '" data-lightbox="projectPics"></a>').fadeIn(1000);
                                $('#pics3Container a').html('<img src="' + pictureURL3 + '" class="img-thumbnail" id="projectPics3" />');
                                // Update 4th photo
                                $('#pics4Container').html('<a href="' + pictureURL4 + '" data-lightbox="projectPics"></a>').fadeIn(1000);
                                $('#pics4Container a').html('<img src="' + pictureURL4 + '" class="img-thumbnail" id="projectPics4" />');

                            } else if (rtpid == 26) {

                                // Display None "No Project Selected/No Photo Available" 
                                $("#initialPhotoWindow").css("height", "0px");
                                $("#PhotoWindowContent").html("");
                                // Update 1st Photo
                                $('#pics1Container').html('<a href="' + pictureURL1 + '" data-lightbox="projectPics"></a>').fadeIn(1000)
                                $('#pics1Container a').html('<img src="' + pictureURL1 + '" class="img-thumbnail" id="projectPics1" />');
                                // Update 2nd photo
                                $('#pics2Container').html('<a href="' + pictureURL2 + '" data-lightbox="projectPics"></a>').fadeIn(1000);
                                $('#pics2Container a').html('<img src="' + pictureURL2 + '" class="img-thumbnail" id="projectPics2" />');

                            } else if (rtpid == 27) {

                                // Display None "No Project Selected/No Photo Available" 
                                $("#initialPhotoWindow").css("height", "0px");
                                $("#PhotoWindowContent").html("");
                                // Update 1st Photo
                                $('#pics1Container').html('<a href="' + pictureURL1 + '" data-lightbox="projectPics"></a>').fadeIn(1000)
                                $('#pics1Container a').html('<img src="' + pictureURL1 + '" class="img-thumbnail" id="projectPics1" />');
                                // Update 2nd photo
                                $('#pics2Container').html('<a href="' + pictureURL2 + '" data-lightbox="projectPics"></a>').fadeIn(1000);
                                $('#pics2Container a').html('<img src="' + pictureURL2 + '" class="img-thumbnail" id="projectPics2" />');
                                // Update 3rd photo
                                $('#pics3Container').html('<a href="' + pictureURL3 + '" data-lightbox="projectPics"></a>').fadeIn(1000);
                                $('#pics3Container a').html('<img src="' + pictureURL3 + '" class="img-thumbnail" id="projectPics3" />');

                            } else if (rtpid == 28) {

                                // Display None "No Project Selected/No Photo Available" 
                                $("#initialPhotoWindow").css("height", "0px");
                                $("#PhotoWindowContent").html("");
                                // Update 1st Photo
                                $('#pics1Container').html('<a href="' + pictureURL1 + '" data-lightbox="projectPics"></a>').fadeIn(1000)
                                $('#pics1Container a').html('<img src="' + pictureURL1 + '" class="img-thumbnail" id="projectPics1" />');

                            } else if (rtpid == 29) {

                                // Display None "No Project Selected/No Photo Available" 
                                $("#initialPhotoWindow").css("height", "0px");
                                $("#PhotoWindowContent").html("");
                                // Update 1st Photo
                                $('#pics1Container').html('<a href="' + pictureURL1 + '" data-lightbox="projectPics"></a>').fadeIn(1000)
                                $('#pics1Container a').html('<img src="' + pictureURL1 + '" class="img-thumbnail" id="projectPics1" />');
                                // Update 2nd photo
                                $('#pics2Container').html('<a href="' + pictureURL2 + '" data-lightbox="projectPics"></a>').fadeIn(1000);
                                $('#pics2Container a').html('<img src="' + pictureURL2 + '" class="img-thumbnail" id="projectPics2" />');

                            } else if (rtpid == 30) {

                                // Display None "No Project Selected/No Photo Available" 
                                $("#initialPhotoWindow").css("height", "0px");
                                $("#PhotoWindowContent").html("");
                                // Update 1st Photo
                                $('#pics1Container').html('<a href="' + pictureURL1 + '" data-lightbox="projectPics"></a>').fadeIn(1000)
                                $('#pics1Container a').html('<img src="' + pictureURL1 + '" class="img-thumbnail" id="projectPics1" />');
                                // Update 2nd photo
                                $('#pics2Container').html('<a href="' + pictureURL2 + '" data-lightbox="projectPics"></a>').fadeIn(1000);
                                $('#pics2Container a').html('<img src="' + pictureURL2 + '" class="img-thumbnail" id="projectPics2" />');
                                // Update 3rd photo
                                $('#pics3Container').html('<a href="' + pictureURL3 + '" data-lightbox="projectPics"></a>').fadeIn(1000);
                                $('#pics3Container a').html('<img src="' + pictureURL3 + '" class="img-thumbnail" id="projectPics3" />');

                            } else if (rtpid == 31) {

                                // Display None "No Project Selected/No Photo Available" 
                                $("#initialPhotoWindow").css("height", "0px");
                                $("#PhotoWindowContent").html("");
                                // Update 1st Photo
                                $('#pics1Container').html('<a href="' + pictureURL1 + '" data-lightbox="projectPics"></a>').fadeIn(1000)
                                $('#pics1Container a').html('<img src="' + pictureURL1 + '" class="img-thumbnail" id="projectPics1" />');

                            } else if (rtpid == 32) {

                                // Display None "No Project Selected/No Photo Available" 
                                $("#initialPhotoWindow").css("height", "0px");
                                $("#PhotoWindowContent").html("");
                                // Update 1st Photo
                                $('#pics1Container').html('<a href="' + pictureURL1 + '" data-lightbox="projectPics"></a>').fadeIn(1000)
                                $('#pics1Container a').html('<img src="' + pictureURL1 + '" class="img-thumbnail" id="projectPics1" />');

                            } else if (rtpid == 35) {

                                // Display None "No Project Selected/No Photo Available" 
                                $("#initialPhotoWindow").css("height", "0px");
                                $("#PhotoWindowContent").html("");
                                // Update 1st Photo
                                $('#pics1Container').html('<a href="' + pictureURL1 + '" data-lightbox="projectPics"></a>').fadeIn(1000)
                                $('#pics1Container a').html('<img src="' + pictureURL1 + '" class="img-thumbnail" id="projectPics1" />');
                                // Update 2nd photo
                                $('#pics2Container').html('<a href="' + pictureURL2 + '" data-lightbox="projectPics"></a>').fadeIn(1000);
                                $('#pics2Container a').html('<img src="' + pictureURL2 + '" class="img-thumbnail" id="projectPics2" />');

                            } else if (rtpid == 36) {

                                // Display None "No Project Selected/No Photo Available" 
                                $("#initialPhotoWindow").css("height", "0px");
                                $("#PhotoWindowContent").html("");

                                // Update 1st Photo
                                $('#pics1Container').html('<a href="' + pictureURL1 + '" data-lightbox="projectPics"></a>').fadeIn(1000)
                                $('#pics1Container a').html('<img src="' + pictureURL1 + '" class="img-thumbnail" id="projectPics1" />');

                            } else if (rtpid == 42) {

                                // Display None "No Project Selected/No Photo Available" 
                                $("#initialPhotoWindow").css("height", "0px");
                                $("#PhotoWindowContent").html("");
                                // Update 1st Photo
                                $('#pics1Container').html('<a href="' + pictureURL1 + '" data-lightbox="projectPics"></a>').fadeIn(1000)
                                $('#pics1Container a').html('<img src="' + pictureURL1 + '" class="img-thumbnail" id="projectPics1" />');
                                // Update 2nd photo
                                $('#pics2Container').html('<a href="' + pictureURL2 + '" data-lightbox="projectPics"></a>').fadeIn(1000);
                                $('#pics2Container a').html('<img src="' + pictureURL2 + '" class="img-thumbnail" id="projectPics2" />');
                                // Update 3rd photo
                                $('#pics3Container').html('<a href="' + pictureURL3 + '" data-lightbox="projectPics"></a>').fadeIn(1000);
                                $('#pics3Container a').html('<img src="' + pictureURL3 + '" class="img-thumbnail" id="projectPics3" />');

                            } else if (rtpid == 43) {

                                // Display None "No Project Selected/No Photo Available" 
                                $("#initialPhotoWindow").css("height", "0px");
                                $("#PhotoWindowContent").html("");
                                // Update 1st Photo
                                $('#pics1Container').html('<a href="' + pictureURL1 + '" data-lightbox="projectPics"></a>').fadeIn(1000)
                                $('#pics1Container a').html('<img src="' + pictureURL1 + '" class="img-thumbnail" id="projectPics1" />');

                            } else if (rtpid == 44) {

                                // Display None "No Project Selected/No Photo Available" 
                                $("#initialPhotoWindow").css("height", "0px");
                                $("#PhotoWindowContent").html("");

                                // Update 1st Photo
                                $('#pics1Container').html('<a href="' + pictureURL1 + '" data-lightbox="projectPics"></a>').fadeIn(1000)
                                $('#pics1Container a').html('<img src="' + pictureURL1 + '" class="img-thumbnail" id="projectPics1" />');
                                // Update 2nd photo
                                $('#pics2Container').html('<a href="' + pictureURL2 + '" data-lightbox="projectPics"></a>').fadeIn(1000);
                                $('#pics2Container a').html('<img src="' + pictureURL2 + '" class="img-thumbnail" id="projectPics2" />');
                                // Update 3rd photo
                                $('#pics3Container').html('<a href="' + pictureURL3 + '" data-lightbox="projectPics"></a>').fadeIn(1000);
                                $('#pics3Container a').html('<img src="' + pictureURL3 + '" class="img-thumbnail" id="projectPics3" />');

                            } else if (rtpid == 46) {

                                // Display None "No Project Selected/No Photo Available" 
                                $("#initialPhotoWindow").css("height", "0px");
                                $("#PhotoWindowContent").html("");
                                // Update 1st Photo
                                $('#pics1Container').html('<a href="' + pictureURL1 + '" data-lightbox="projectPics"></a>').fadeIn(1000)
                                $('#pics1Container a').html('<img src="' + pictureURL1 + '" class="img-thumbnail" id="projectPics1" />');
                                // Update 2nd photo
                                $('#pics2Container').html('<a href="' + pictureURL2 + '" data-lightbox="projectPics"></a>').fadeIn(1000);
                                $('#pics2Container a').html('<img src="' + pictureURL2 + '" class="img-thumbnail" id="projectPics2" />');
                                // Update 3rd photo
                                $('#pics3Container').html('<a href="' + pictureURL3 + '" data-lightbox="projectPics"></a>').fadeIn(1000);
                                $('#pics3Container a').html('<img src="' + pictureURL3 + '" class="img-thumbnail" id="projectPics3" />');
                                // Update 4th photo
                                $('#pics4Container').html('<a href="' + pictureURL4 + '" data-lightbox="projectPics"></a>').fadeIn(1000);
                                $('#pics4Container a').html('<img src="' + pictureURL4 + '" class="img-thumbnail" id="projectPics4" />');
                                // Update 5th photo
                                $('#pics5Container').html('<a href="' + pictureURL5 + '" data-lightbox="projectPics"></a>').fadeIn(1000);
                                $('#pics5Container a').html('<img src="' + pictureURL5 + '" class="img-thumbnail" id="projectPics5" />');
                                // Update 6th photo
                                $('#pics6Container').html('<a href="' + pictureURL6 + '" data-lightbox="projectPics"></a>').fadeIn(1000);
                                $('#pics6Container a').html('<img src="' + pictureURL6 + '" class="img-thumbnail" id="projectPics6" />');

                            } else if (rtpid == 51) {

                                // Display None "No Project Selected/No Photo Available" 
                                $("#initialPhotoWindow").css("height", "0px");
                                $("#PhotoWindowContent").html("");
                                // Update 1st Photo
                                $('#pics1Container').html('<a href="' + pictureURL1 + '" data-lightbox="projectPics"></a>').fadeIn(1000)
                                $('#pics1Container a').html('<img src="' + pictureURL1 + '" class="img-thumbnail" id="projectPics1" />');
                                // Update 2nd photo
                                $('#pics2Container').html('<a href="' + pictureURL2 + '" data-lightbox="projectPics"></a>').fadeIn(1000);
                                $('#pics2Container a').html('<img src="' + pictureURL2 + '" class="img-thumbnail" id="projectPics2" />');
                                // Update 3rd photo
                                $('#pics3Container').html('<a href="' + pictureURL3 + '" data-lightbox="projectPics"></a>').fadeIn(1000);
                                $('#pics3Container a').html('<img src="' + pictureURL3 + '" class="img-thumbnail" id="projectPics3" />');
                                // Update 4th photo
                                $('#pics4Container').html('<a href="' + pictureURL4 + '" data-lightbox="projectPics"></a>').fadeIn(1000);
                                $('#pics4Container a').html('<img src="' + pictureURL4 + '" class="img-thumbnail" id="projectPics4" />');
                                // Update 5th photo
                                $('#pics5Container').html('<a href="' + pictureURL5 + '" data-lightbox="projectPics"></a>').fadeIn(1000);
                                $('#pics5Container a').html('<img src="' + pictureURL5 + '" class="img-thumbnail" id="projectPics5" />');
                                // Update 6th photo
                                $('#pics6Container').html('<a href="' + pictureURL6 + '" data-lightbox="projectPics"></a>').fadeIn(1000);
                                $('#pics6Container a').html('<img src="' + pictureURL6 + '" class="img-thumbnail" id="projectPics6" />');
                                // Update 7th photo
                                $('#pics7Container').html('<a href="' + pictureURL7 + '" data-lightbox="projectPics"></a>').fadeIn(1000);
                                $('#pics7Container a').html('<img src="' + pictureURL7 + '" class="img-thumbnail" id="projectPics7" />');

                            } else if (rtpid == 53) {

                                // Display None "No Project Selected/No Photo Available" 
                                $("#initialPhotoWindow").css("height", "0px");
                                $("#PhotoWindowContent").html("");
                                // Update 1st Photo
                                $('#pics1Container').html('<a href="' + pictureURL1 + '" data-lightbox="projectPics"></a>').fadeIn(1000)
                                $('#pics1Container a').html('<img src="' + pictureURL1 + '" class="img-thumbnail" id="projectPics1" />');
                                // Update 2nd photo
                                $('#pics2Container').html('<a href="' + pictureURL2 + '" data-lightbox="projectPics"></a>').fadeIn(1000);
                                $('#pics2Container a').html('<img src="' + pictureURL2 + '" class="img-thumbnail" id="projectPics2" />');
                                // Update 3rd photo
                                $('#pics3Container').html('<a href="' + pictureURL3 + '" data-lightbox="projectPics"></a>').fadeIn(1000);
                                $('#pics3Container a').html('<img src="' + pictureURL3 + '" class="img-thumbnail" id="projectPics3" />');

                            } else if (rtpid == 61) {

                                // Display None "No Project Selected/No Photo Available" 
                                $("#initialPhotoWindow").css("height", "0px");
                                $("#PhotoWindowContent").html("");
                                // Update 1st Photo
                                $('#pics1Container').html('<a href="' + pictureURL1 + '" data-lightbox="projectPics"></a>').fadeIn(1000)
                                $('#pics1Container a').html('<img src="' + pictureURL1 + '" class="img-thumbnail" id="projectPics1" />');

                            } else if (rtpid == 62) {

                                // Display None "No Project Selected/No Photo Available" 
                                $("#initialPhotoWindow").css("height", "0px");
                                $("#PhotoWindowContent").html("");
                                // Update 1st Photo
                                $('#pics1Container').html('<a href="' + pictureURL1 + '" data-lightbox="projectPics"></a>').fadeIn(1000)
                                $('#pics1Container a').html('<img src="' + pictureURL1 + '" class="img-thumbnail" id="projectPics1" />');

                            } else if (rtpid == 63) {

                                // Display None "No Project Selected/No Photo Available" 
                                $("#initialPhotoWindow").css("height", "0px");
                                $("#PhotoWindowContent").html("");
                                // Update 1st Photo
                                $('#pics1Container').html('<a href="' + pictureURL1 + '" data-lightbox="projectPics"></a>').fadeIn(1000)
                                $('#pics1Container a').html('<img src="' + pictureURL1 + '" class="img-thumbnail" id="projectPics1" />');

                            } else if (rtpid == 97) {

                                // Display None "No Project Selected/No Photo Available" 
                                $("#initialPhotoWindow").css("height", "0px");
                                $("#PhotoWindowContent").html("");
                                // Update 1st Photo
                                $('#pics1Container').html('<a href="' + pictureURL1 + '" data-lightbox="projectPics"></a>').fadeIn(1000)
                                $('#pics1Container a').html('<img src="' + pictureURL1 + '" class="img-thumbnail" id="projectPics1" />');

                            } else if (rtpid == 98) {

                                // Display None "No Project Selected/No Photo Available" 
                                $("#initialPhotoWindow").css("height", "0px");
                                $("#PhotoWindowContent").html("");
                                // Update 1st Photo
                                $('#pics1Container').html('<a href="' + pictureURL1 + '" data-lightbox="projectPics"></a>').fadeIn(1000)
                                $('#pics1Container a').html('<img src="' + pictureURL1 + '" class="img-thumbnail" id="projectPics1" />');

                            } else if (rtpid == 99) {

                                // Display None "No Project Selected/No Photo Available" 
                                $("#initialPhotoWindow").css("height", "0px");
                                $("#PhotoWindowContent").html("");
                                // Update 1st Photo
                                $('#pics1Container').html('<a href="' + pictureURL1 + '" data-lightbox="projectPics"></a>').fadeIn(1000)
                                $('#pics1Container a').html('<img src="' + pictureURL1 + '" class="img-thumbnail" id="projectPics1" />');
                                // Update 2nd photo
                                $('#pics2Container').html('<a href="' + pictureURL2 + '" data-lightbox="projectPics"></a>').fadeIn(1000);
                                $('#pics2Container a').html('<img src="' + pictureURL2 + '" class="img-thumbnail" id="projectPics2" />');

                            } else {

                                $("#initialPhotoWindow").css("height", "90px");
                                $("#initialPhotoWindow").css("height", "90px");
                                $("#PhotoWindowContent").html('<img id="placeHolderImages" src="images/NoPhoto.svg">');

                            };

                        }; //If statement to find key matches close

                    }; //for loop to look through Key ID (VizID) close

                }); //Click function on the map closes


                ////////////////////////////// Part F: Show each RTP project on the map

                map.on("viewreset", reset);
                reset();

                // SVG Filter (Stripes) for Congestion Price Area 
                var pattern = svg_rt.append("defs")
                    .append("pattern")
                    .attr("id", "stripe-pattern")
                    .attr("width", 6)
                    .attr("height", 6)
                    .attr("patternUnits", "userSpaceOnUse")
                    .attr("patternTransform", "rotate(45)");

                pattern.append("line")
                    .attr("x1", 6)
                    .attr("y1", 0)
                    .attr("x2", 6)
                    .attr("y2", 8)
                    .style("stroke", "rgb(217, 0, 0)");
                // SVG Filter ends

                // Reposition the SVG to cover the features.
                function reset() {

                    var bounds = path.bounds(geojson),
                        topLeft = bounds[0],
                        bottomRight = bounds[1];

                    svg_rt.attr("width", bottomRight[0] - topLeft[0])
                        .attr("height", bottomRight[1] - topLeft[1])
                        .style("left", topLeft[0] + "px")
                        .style("top", topLeft[1] + "px");

                    g_rt.attr("transform", "translate(" + -topLeft[0] + "," + -topLeft[1] + ")");

                    // Get current zoom level
                    zoomLev = map.getZoom();
                    // console.log(zoomLev);

                    if (zoomLev == 8) {
                        feature_rt.attr("d", path.pointRadius([1]))
                    } else if (zoomLev == 9) {
                        feature_rt.attr("d", path.pointRadius([2]))
                    } else if (zoomLev == 10) {
                        feature_rt.attr("d", path.pointRadius([3]))
                    } else if (zoomLev == 11) {
                        feature_rt.attr("d", path.pointRadius([4]))
                    } else if (zoomLev == 12) {
                        feature_rt.attr("d", path.pointRadius([5]))
                    } else if (zoomLev == 13) {
                        feature_rt.attr("d", path.pointRadius([6]))
                    } else if (zoomLev == 14) {
                        feature_rt.attr("d", path.pointRadius([7]))
                    } else if (zoomLev == 15) {
                        feature_rt.attr("d", path.pointRadius([8]))
                    } else if (zoomLev == 16) {
                        feature_rt.attr("d", path.pointRadius([9]))
                    };
                    feature_rt.attr("d", path)

                    // Set stroke-width by zoom level
                    .style("stroke-width", function() {

                        if (zoomLev == 8) {
                            return 1.5
                        } else if (zoomLev == 9) {
                            return 2.5
                        } else if (zoomLev == 10) {
                            return 4
                        } else if (zoomLev == 11) {
                            return 6
                        } else if (zoomLev == 12) {
                            return 8
                        } else if (zoomLev == 13) {
                            return 11
                        } else if (zoomLev == 14) {
                            return 14
                        } else if (zoomLev == 15) {
                            return 17
                        } else if (zoomLev == 16) {
                            return 20
                        };
                    })

                    // Set opacity by zoom level
                    .style("opacity", function() {

                        if (zoomLev == 8) {
                            return 1
                        } else if (zoomLev == 9) {
                            return 1
                        } else if (zoomLev == 10) {
                            return 1
                        } else if (zoomLev == 11) {
                            return 0.85
                        } else if (zoomLev == 12) {
                            return 0.85
                        } else if (zoomLev == 13) {
                            return 0.8
                        } else if (zoomLev == 14) {
                            return 0.8
                        } else if (zoomLev == 15) {
                            return 0.75
                        } else if (zoomLev == 16) {
                            return 0.75
                        };
                    })

                    // Set stroke-color by project type                                 
                    .style("stroke", function(d, i) {

                        if (d.properties.MajorCateg == "Road Pricing" && d.properties.SubCategor == "Congestion Pricing") {
                            return "rgb(217, 0, 0)"
                        } else if (d.properties.MajorCateg == "Road Pricing" && d.properties.SubCategor == "Express Lane") {
                            return "rgb(196, 18, 132)"
                        } else if (d.properties.MajorCateg == "Highway" && d.properties.SubCategor == "Operational Improvement") {
                            return "rgb(255,165,0)"
                        } else if (d.properties.MajorCateg == "Highway" && d.properties.SubCategor == "Widening") {
                            return "rgb(246, 221, 0)"
                        } else if (d.properties.MajorCateg == "Highway" && d.properties.SubCategor == "HOV Lane") {
                            return "rgb(248, 117, 167)"
                        } else if (d.properties.MajorCateg == "Highway" && d.properties.SubCategor == "Interchange") {
                            return "rgb(145,50,4)"
                        } else if (d.properties.MajorCateg == "Transit" && d.properties.SubCategor == "Ferry") {
                            return "rgb(91, 174, 209)"
                        } else if (d.properties.MajorCateg == "Transit" && d.properties.SubCategor == "BART") {
                            return "rgb(9, 75, 140)"
                        } else if (d.properties.MajorCateg == "Transit" && d.properties.SubCategor == "Bus") {
                            return "rgb(127, 195, 28)"
                        } else if (d.properties.MajorCateg == "Transit" && d.properties.SubCategor == "Light Rail") {
                            return "rgb(40, 164, 126)"
                        } else if (d.properties.MajorCateg == "Transit" && d.properties.SubCategor == "Commuter Rail") {
                            return "rgb(94, 79, 162)"
                        } else if (d.properties.MajorCateg == "Transit" && d.properties.SubCategor == "Other") {
                            return "rgb(60, 200, 200)"
                        } else {
                            return "none"
                        };
                    })

                    .style("fill", function(d, i) {
                        if (d.properties.MajorCateg == "Road Pricing" && d.properties.SubCategor == "Congestion Pricing") {
                            return "url(#stripe-pattern)"
                        } else if (d.properties.MajorCateg == "Highway" && d.properties.SubCategor == "Interchange") {
                            return "rgb(145,50,4)"
                        } else if (d.properties.MajorCateg == "Transit" && d.properties.SubCategor == "Other") {
                            return "rgb(60, 200, 200)"
                        } else if (d.properties.VizID == 4) {
                            return "rgb(9, 75, 140)"
                        } else if (d.properties.VizID == 113) {
                            return "rgb(196, 18, 132)"
                        } else {
                            return "none"
                        };
                    })

                    .attr("class", "allRTP")
                        .style("stroke-linecap", "round")
                        .style("stroke-linejoin", "round")

                    .attr("class", function(d, i) {

                        if (d.properties.MajorCateg == "Road Pricing" && d.properties.SubCategor == "Congestion Pricing") {
                            return "RP_CongestionPricing toggle_RP"
                        } else if (d.properties.MajorCateg == "Road Pricing" && d.properties.SubCategor == "Express Lane") {
                            return "RP_ExpressLane toggle_RP"
                        } else if (d.properties.MajorCateg == "Highway" && d.properties.SubCategor == "Operational Improvement") {
                            return "HW_OperationalImprovement toggle_HW"
                        } else if (d.properties.MajorCateg == "Highway" && d.properties.SubCategor == "Widening") {
                            return "HW_Widening toggle_HW"
                        } else if (d.properties.MajorCateg == "Highway" && d.properties.SubCategor == "HOV Lane") {
                            return "HW_HOVLane toggle_HW"
                        } else if (d.properties.MajorCateg == "Highway" && d.properties.SubCategor == "Interchange") {
                            return "HW_Interchange toggle_HW"
                        } else if (d.properties.MajorCateg == "Transit" && d.properties.SubCategor == "Ferry") {
                            return "TR_Ferry toggle_TR"
                        } else if (d.properties.MajorCateg == "Transit" && d.properties.SubCategor == "BART") {
                            return "TR_BART toggle_TR"
                        } else if (d.properties.MajorCateg == "Transit" && d.properties.SubCategor == "Bus") {
                            return "TR_Bus toggle_TR"
                        } else if (d.properties.MajorCateg == "Transit" && d.properties.SubCategor == "Light Rail") {
                            return "TR_LightRail toggle_TR"
                        } else if (d.properties.MajorCateg == "Transit" && d.properties.SubCategor == "Commuter Rail") {
                            return "TR_CommuterRail toggle_TR"
                        } else if (d.properties.MajorCateg == "Transit" && d.properties.SubCategor == "Other") {
                            return "TR_Other toggle_TR"
                        };

                    });

                    feature_rt.on("mouseover", function(d) {

                        d3.select(this)
                            .style("cursor", "pointer")
                            .style("opacity", 0.5);

                        var text = "<p><strong>" + d.properties.ProjectNam + "</strong><br/>";
                        $("#info").show().html(text);
                    })
                        .on("mouseout", function(d) {
                            d3.select(this)
                                .style("opacity", function() {

                                    if (zoomLev == 8) {
                                        return 1
                                    } else if (zoomLev == 9) {
                                        return 1
                                    } else if (zoomLev == 10) {
                                        return 1
                                    } else if (zoomLev == 11) {
                                        return 0.85
                                    } else if (zoomLev == 12) {
                                        return 0.85
                                    } else if (zoomLev == 13) {
                                        return 0.8
                                    } else if (zoomLev == 14) {
                                        return 0.8
                                    } else if (zoomLev == 15) {
                                        return 0.75
                                    } else if (zoomLev == 16) {
                                        return 0.75
                                    };
                                });

                            $("#info").hide().html("");
                        });

                }; // function reset close

            }); //d3.json close

        }; //var RTPmapData close

        // Push all map layers to the empty loader array
        // Control the oder of the layers with this function
        loader.push(baseMap);
        loader.push(baseMapBorder);
        loader.push(basemapElurbanized);
        loader.push(baseMapElPDA);
        loader.push(baseMapElhwFwy);
        loader.push(baseMapElcommuterRail);
        loader.push(baseMapLightRail);
        loader.push(RTPmapData);
        loader.push(baseMapCountyNames);
        loader.run();

        // Fade out loader when all layers are loaded
        $("#loaderWrap").fadeOut(1000);

    } // sfBayArea array close

}; // var projectMapper close


////////////////////////////// Pop Up  //////////////////////////////////////////////////

// Popup function to move popups near the mouse position
windowW = $(window).width();

$("#mapContainer").on("mousemove", function(e) {
    var x = e.pageX + 20;
    var y = e.pageY;
    var windowH = $(window).height();
    if (y > (windowH - 100)) {
        var y = e.pageY - 100;
    } else {
        var y = e.pageY - 20;
    }

    $("#info").css({
        "left": x,
        "top": y
    });
});

windowW2 = $(window).width();

$("#costChartContainer").on("mousemove", function(e) {
    var x2 = e.pageX + 10;
    var y2 = e.pageY;
    var windowH2 = $(window).height();
    if (y2 > (windowH2 - 100)) {
        var y2 = e.pageY - 60;
    } else {
        var y2 = e.pageY - 20;
    }

    $("#info").css({
        "left": x2,
        "top": y2
    });
});

windowW3 = $(window).width();
$("#timelineChartContainer").on("mousemove", function(e) {
    var x3 = e.pageX + 10;
    var y3 = e.pageY;
    var windowH3 = $(window).height();
    if (y3 > (windowH3 - 100)) {
        var y3 = e.pageY - 60;
    } else {
        var y3 = e.pageY - 20;
    }

    $("#info").css({
        "left": x3,
        "top": y3
    });
});

// End of map.js