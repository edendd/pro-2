var statesData = management_occupations__tot_emp;

var mapboxAccessToken = "pk.eyJ1IjoibWpyY2FybmFoYW4iLCJhIjoiY2s2azQyYXF0MDBkajNqdTlzdTZwb2o1bSJ9.YNGydFUt5yd-NHS6ZPnlqQ";
var map = L.map('map').setView([37.8, -96], 4);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=' + mapboxAccessToken, {
    id: 'mapbox/light-v9',
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    tileSize: 670,
    zoomOffset: -1
}).addTo(map);

L.geoJson(statesData).addTo(map);


function getColor1(d) {
  return     d > 100000 ?  '#ff6600':	
             d > 20000  ?  '#ffff00':	
             d >10000  ?  '#cccc00':	
             d > 5000  ?  '#99cc00':
             d > 2000   ?  '#ff0066':
             d > 1000   ?  '#FFA500':
                           '#F4A460';
        
}

function getColor2(d) {
  return d > 5 ?     'ff6600' :
         d > 2  ?    '#ffff00' :
         d > 1    ?  '#cc0000' :
         d > 0.8  ?  '#FC4E2A' :
         d > 0.5   ? '#99cc00' :
         d > 0.2   ? '#FEB24C' :
         d > 0.1   ? '#FED976' :
                     '#F4A460';
}

function getColor3(d) {
  return d > 100 ? 'ff6600' :
         d > 50  ? '#ffff00' :
         d > 20  ? '#cc0000' :
         d > 10  ? '#cccc00' :
         d > 5   ? '#FD8D3C' :
         d > 2   ? '#99cc00' :
         d > 1   ? '#ff0066' :
                    '#FFEDA0';
}

function getColor4(d) {
  return d > 100000 ? 'ff6600' :
         d > 50000  ? '#ffff00' :
         d > 20000  ? '#cc0000' :
         d > 10000  ? '#cccc00' :
         d > 5000   ? '#FD8D3C' :
         d > 2000   ? '#99cc00' :
         d > 1000   ? '#ff0066' :
                      ' #F4A460';
}

function style1(feature) {
  return {
      fillColor: getColor1(feature.properties.density),
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7
  };
}

function style2(feature) {
  return {
      fillColor: getColor2(feature.properties.density),
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7
  };
}

function style3(feature) {
  return {
      fillColor: getColor3(feature.properties.density),
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '4',
      fillOpacity: 0.7
  };
}

function style4(feature) {
  return {
      fillColor: getColor4(feature.properties.density),
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7
  };
}

L.geoJson(statesData, {style: style1}).addTo(map);

function highlightFeature(e) {
	var layer = e.target;

	layer.setStyle({
		weight: 3,
		color: '#666',
		dashArray: '',
		fillOpacity: 1
	});

	if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
		layer.bringToFront();
	}
}

function resetHighlight(e) {
	geojson.resetStyle(e.target);
}

function onEachFeature(feature, layer) {
	layer.on({
		mouseover: highlightFeature,
		mouseout: resetHighlight,
	});
}

geojson = L.geoJson(statesData, {
	style: style1,
	onEachFeature: onEachFeature
}).addTo(map);

jQuery("body").on( "change", ".choropleth_map_filter select", function() {
	statesData = eval(jQuery(this).val()+'__'+jQuery('.choropleth_map_filter input[type="radio"]:checked').val());
	if(jQuery('.choropleth_map_filter input[type="radio"]:checked').val() == 'loc_quotient') {
		style = style2;
	} else if(jQuery('.choropleth_map_filter input[type="radio"]:checked').val() == 'h_mean') {
		style = style3;
	} else if(jQuery('.choropleth_map_filter input[type="radio"]:checked').val() == 'a_mean') {
		style = style4;
	} else {
		style = style1;
	}
	geojson = L.geoJson(statesData, {
		style: style,
		onEachFeature: onEachFeature
	}).addTo(map);
});

jQuery("body").on( "click", ".choropleth_map_filter input[type='radio']", function() {
	statesData = eval(jQuery('.choropleth_map_filter select option:selected').val()+'__'+jQuery(this).val());
	if(jQuery(this).val() == 'loc_quotient') {
		style = style2;
	} else if(jQuery(this).val() == 'h_mean') {
		style = style3;
	} else if(jQuery(this).val() == 'a_mean') {
		style = style4;
	} else {
		style = style1;
	}
	geojson = L.geoJson(statesData, {
		style: style,
		onEachFeature: onEachFeature
  }).addTo(map);


});