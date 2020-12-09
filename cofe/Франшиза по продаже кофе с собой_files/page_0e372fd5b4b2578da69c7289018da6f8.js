
; /* Start:"a:4:{s:4:"full";s:85:"/bitrix/components/bitrix/map.yandex.view/templates/.default/script.js?14763520561540";s:6:"source";s:70:"/bitrix/components/bitrix/map.yandex.view/templates/.default/script.js";s:3:"min";s:0:"";s:3:"map";s:0:"";}"*/
if (!window.BX_YMapAddPlacemark)
{
	window.BX_YMapAddPlacemark = function(map, arPlacemark)
	{
		if (null == map)
			return false;

		if(!arPlacemark.LAT || !arPlacemark.LON)
			return false;

		var props = {};
		if (null != arPlacemark.TEXT && arPlacemark.TEXT.length > 0)
		{
			var value_view = '';

			if (arPlacemark.TEXT.length > 0)
			{
				var rnpos = arPlacemark.TEXT.indexOf("\n");
				value_view = rnpos <= 0 ? arPlacemark.TEXT : arPlacemark.TEXT.substring(0, rnpos);
			}

			props.balloonContent = arPlacemark.TEXT.replace(/\n/g, '<br />');
			props.hintContent = value_view;
		}

		var obPlacemark = new ymaps.Placemark(
			[arPlacemark.LAT, arPlacemark.LON],
			props,
			{balloonCloseButton: true}
		);

		map.geoObjects.add(obPlacemark);

		return obPlacemark;
	}
}

if (!window.BX_YMapAddPolyline)
{
	window.BX_YMapAddPolyline = function(map, arPolyline)
	{
		if (null == map)
			return false;

		if (null != arPolyline.POINTS && arPolyline.POINTS.length > 1)
		{
			var arPoints = [];
			for (var i = 0, len = arPolyline.POINTS.length; i < len; i++)
			{
				arPoints.push([arPolyline.POINTS[i].LAT, arPolyline.POINTS[i].LON]);
			}
		}
		else
		{
			return false;
		}

		var obParams = {clickable: true};
		if (null != arPolyline.STYLE)
		{
			obParams.strokeColor = arPolyline.STYLE.strokeColor;
			obParams.strokeWidth = arPolyline.STYLE.strokeWidth;
		}
		var obPolyline = new ymaps.Polyline(
			arPoints, {balloonContent: arPolyline.TITLE}, obParams
		);

		map.geoObjects.add(obPolyline);

		return obPolyline;
	}
}
/* End */
;
; /* Start:"a:4:{s:4:"full";s:93:"/bitrix/templates/franshiza_new_test/components/bitrix/news.list/map/script.js?15965466603053";s:6:"source";s:78:"/bitrix/templates/franshiza_new_test/components/bitrix/news.list/map/script.js";s:3:"min";s:0:"";s:3:"map";s:0:"";}"*/
if (!window._GLOBAL_arMapObjects)
	window._GLOBAL_arMapObjects = {};

function _init_map(arParams) {
	if (!window.ymaps)
		return;

	var myMap = window._GLOBAL_arMapObjects['main_map'] = new ymaps.Map('map', {
		center: [61.19817228082086,95.02410711780578],
		zoom: 5,
		type: 'yandex#map',
		options: {
			minZoom: 2,
		}
	});
	myMap.behaviors.disable('scrollZoom');
	myMap.options.set('minZoom', 2);
	myMap.options.get('projection').isCycled = function() { return [true, true] };
	window.bYandexMapScriptsLoaded = true;

	sw_setPlacemark(arParams);
}

function show_map(arParams) {
	if (null == window.bYandexMapScriptsLoaded)
	{
		function _wait_for_map(){
			if (window.ymaps && window.ymaps.Map) 
				_init_map(arParams);
			else
				setTimeout(_wait_for_map, 50);
		}
		BX.loadScript('https://api-maps.yandex.ru/2.1/?apikey=0b3a25c2-9a7c-47b2-9a63-5848444d05a5&lang=ru_RU', _wait_for_map);
	}
	else
	{
		_init_map(arParams);
	}
}

function sw_setPlacemark(arPlacemark) {
	if (!arPlacemark)
		return;

	// window._GLOBAL_arMapObjects['CollectionPlacemark'] = new ymaps.GeoObjectCollection({},{});

    window._GLOBAL_arMapObjects['clusterer'] = new ymaps.Clusterer({
        // Defining an array that describes cluster icons of different sizes.
        clusterIcons: [
            {
                href: 'http://bodryi-den.ru/bitrix/templates/new_main/components/bitrix/news.list/map/images/map_pop_icon.png',
                size: [38, 56],
                offset: [-19, -56]
            },
            {
                href: 'http://bodryi-den.ru/bitrix/templates/new_main/components/bitrix/news.list/map/images/map_pop_icon.png',
                size: [58, 84],
                offset: [-29, -84]
            }],
        /**
         * This option is responsible for the cluster sizes.
         * In this case, for clusters containing up to 100 elements,
         * it will show a small icon. For the rest, a large icon will be shown.
         */
        clusterNumbers: [10],
        clusterIconContentLayout: null
    });

	var i=0;
    geoObjects = [];
	arPlacemark.forEach(function(element, index) {
	    
        geoObjects[i] =  new ymaps.Placemark( element.coordinates, {
	    	img: element.all_img,
	    	content: element.content,
	    	active: 'N',

	    }, {
			iconLayout: 'default#image',
			iconImageHref: 'http://bodryi-den.ru/bitrix/templates/new_main/components/bitrix/news.list/map/images/map_pop_icon.png',
			iconImageSize: [29, 42],
			iconImageOffset: [-14.5, -42] // смещение картинки
	    } );

        
	    // window._GLOBAL_arMapObjects['CollectionPlacemark'].add( placemark );



		i++;
	});
    window._GLOBAL_arMapObjects['clusterer'].add( geoObjects );
	window._GLOBAL_arMapObjects['main_map'].geoObjects.add(window._GLOBAL_arMapObjects['clusterer']);
    window._GLOBAL_arMapObjects['main_map'].setBounds(window._GLOBAL_arMapObjects['clusterer'].getBounds(), {
        checkZoomRange: true
    });
}
/* End */
;; /* /bitrix/components/bitrix/map.yandex.view/templates/.default/script.js?14763520561540*/
; /* /bitrix/templates/franshiza_new_test/components/bitrix/news.list/map/script.js?15965466603053*/
