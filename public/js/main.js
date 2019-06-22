$(function() {
	'use strict';

	var window_width = $(window).width(),
		window_height = window.innerHeight,
		header_height = $('.default-header').height(),
		header_height_static = $('.site-header.static').outerHeight(),
		fitscreen = window_height - header_height;

	$('.fullscreen').css('height', window_height);
	$('.fitscreen').css('height', fitscreen);

	//------- Header Scroll Class  js --------//

	$(window).scroll(function() {
		if ($(this).scrollTop() > 100) {
			$("#home-nav").removeClass('navbar-expanded')
			$('.default-header').addClass('header-scrolled');
		} else {
			$("#home-nav").addClass('navbar-expanded')
			$('.default-header').removeClass('header-scrolled');
		}
	});

	if ($('select')) {
		$('select').niceSelect();
	}

	$('.img-pop-up').magnificPopup({
		type: 'image',
		gallery: {
			enabled: true
		}
	});

	// Search Toggle
	// $('#search-input-box').hide();
	$('#search').on('click', function() {
		$('#search-input-box').slideToggle();
		$('#search-input').focus();
	});
	$('#close-search').on('click', function() {
		$("#home-nav").removeClass('navbar-expanded')
		$('#search-input-box').slideUp(500);
	});

	// close popup box called
	$('.course-form-area').on('submit', function(e){
		e.preventDefault();
		var values = {};
		$.each($('.course-form-area').serializeArray(), function (i, field) {
			values[field.name] = field.value;
		});
		//trainers
		$.post("https://api.saharbazar.com/trainers", values)
			.done(function (data) {
				$('.course-contact-success').css("display", "block")
				$(':input', '#myForm')
					.not(':button, :submit, :reset, :hidden')
					.val('')
					.prop('checked', false)
					.prop('selected', false);
				// console.log("Data Loaded: " + data);
		});
	})

	
	//search box clicked
	$('.search-icon').on('click', function(){
		var searchText = $('#search-bar').val().trim();
		location.href="/courses.html?search="+searchText
	})
	$(".search-container").submit(function (event) {
		event.preventDefault();
		var searchText = $('#search-bar').val().trim();
		location.href = "/courses.html?search=" + searchText
	});
	
	// $('.navbar-nav>li>a').on('click', function(){
	//     $('.navbar-collapse').collapse('hide');
	// });

	//  Counter Js
	// jquery get list of courses
	let coursesUrl = 'https://study.newtalenthome.com/webservice/restjson/server.php?wsfunction=core_course_get_courses&wstoken=73edbd081d7290208946844f2f3b6ec2&moodlewsrestformat=json';
	let coursesCategoryUrl = ' https://study.newtalenthome.com/webservice/restjson/server.php?wsfunction=core_course_get_categories&wstoken=73edbd081d7290208946844f2f3b6ec2&moodlewsrestformat=json';
	$.when($.getJSON(coursesUrl), $.getJSON(coursesCategoryUrl)).done(function (a1, a2) {
		// a1 and a2 are arguments resolved for the page1 and page2 ajax requests, respectively.
		// Each argument is an array with the following structure: [ data, statusText, jqXHR ]
		// var data = a1[0] + a2[0]; // a1[ 0 ] = "Whip", a2[ 0 ] = " It"
		var categories = a2[0];
		var courses = a1[0];
		var courseCategories = [];
		var coursesCollection = [];
		var params = new URLSearchParams(location.search);
		var searchQuery = new URLSearchParams(decodeURI(location.search))
		var catId = params.get('catid');
		var searchText = searchQuery.get('search')
		if(catId) courses= courses.filter((course) => course.categoryid === parseInt(catId))
		if (searchText) { 
			$('#search-bar').val(searchText)
			courses = courses.filter((course) => course.fullname.toLowerCase().includes(searchText.toLowerCase()))
			
		}
		//append arrays
		$.each(categories, function (i, category){
			courseCategories.push('<a class="dropdown-item" href="courses.html?catid=' + category.id+'">' + category.name+'</a>')
		})
		$.each(courses, function (i, course) {
			coursesCollection.push(creatSingleCourse(course))
		})
      
		$('.dropdown-menu').html('').append(courseCategories.join(''));

		$('.owl-carousel').html('').append(coursesCollection.join(''));
		//move carusol
		moveCarusel()
		// owl - carousel
		// console.log(courseList, 'courseList==>')
		// console.log(categories, 'categories ==>')
		// console.log(courses, 'courses ==>')
		// console.log(coursesCollection, 'coursesCollection ==>')
		// if (/Whip It/.test(data)) {
		// 	alert("We got what we came for!");
		// }
		// console.log(a1, a2, 'likes')
	});

	function creatSingleCourse(course){
		return '<div class="single-popular-course">'+
			'<div class="thumb" >'+
				'<img class="f-img img-fluid mx-auto" src="img/popular-course/p3.jpg" alt="" />'+
			'</div >'+
			'<div class="details">'+
			'<div class="d-flex justify-content-between mb-20">' +
			'<p class="name">'+course.shortname+'</p>' +
			'<p class="value"></p>' +
			'</div>' +
			'<a href="course-details.html">' +
			'<h4> ' + course.displayname+'</h4>' +
			'</a>' +
			'<div class="bottom d-flex mt-15">' +
			'<ul class="list">' +
			'<li><a href="#"><i class="fa fa-star"></i></a></li>' +
			'<li><a href="#"><i class="fa fa-star"></i></a></li>' +
			'<li><a href="#"><i class="fa fa-star"></i></a></li>' +
			'<li><a href="#"><i class="fa fa-star"></i></a></li>' +
			'<li><a href="#"><i class="fa fa-star"></i></a></li>' +
			'</ul>' +
			'<p class="ml-20">25 Reviews</p>' +
			'</div>' +
			'</div>' +
		'</div >'
	}
	// $.getJSON(coursesUrl, function (result) {
	// 	console.log("result ==>", result)
	// });
	$('.counter').counterUp({
		delay: 10,
		time: 1000
	});

	$('.play-btn').magnificPopup({
		type: 'iframe',
		mainClass: 'mfp-fade',
		removalDelay: 160,
		preloader: false,
		fixedContentPos: false
	});
	function moveCarusel(){
	$('.popuar-course-carusel').owlCarousel({
		items: 3,
		loop: true,
		autoplay: false,
		margin:35,
		nav: true,
		autoWidth: true,
		stagePadding: 30,
		navText: [ "<img src='img/prev.png'>", "<img src='img/next.png'>" ],
		responsive: {
			0: {
				items: 6,
				stagePadding: 60
			},
			680: {
				items: 3,
				stagePadding: 0
			},
			868: {
				items: 2,
				stagePadding: 0
			},
			992: {
				items: 3,
				stagePadding: 0
			},
			1200: {
				items: 3,
				stagePadding: 60
			},
			1440: {
				items: 4,
				stagePadding: 60
			}
		}
	});
	};

	$('.video-carousel').owlCarousel({
		items: 1,
		loop: true,
		autoplay: true,
		margin: 30,
		nav: true,
		dots: false,
		navText: [ "<img src='img/prev.png'>", "<img src='img/next.png'>" ]
	});

	$('.testi-slider').owlCarousel({
		items: 1,
		loop: true,
		autoplay: true,
		margin: 30,
		nav: true,
		navText: [ "<img src='img/prev.png'>", "<img src='img/next.png'>" ]
	});

	// Select all links with hashes
	$('.navbar-nav a[href*="#"]')
		// Remove links that don't actually link to anything
		.not('[href="#"]')
		.not('[href="#0"]')
		.on('click', function(event) {
			// On-page links
			if (
				location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
				location.hostname == this.hostname
			) {
				// Figure out element to scroll to
				var target = $(this.hash);
				target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
				// Does a scroll target exist?
				if (target.length) {
					// Only prevent default if animation is actually gonna happen
					event.preventDefault();
					$('html, body').animate(
						{
							scrollTop: target.offset().top - 50
						},
						1000,
						function() {
							// Callback after animation
							// Must change focus!
							var $target = $(target);
							$target.focus();
							if ($target.is(':focus')) {
								// Checking if the target was focused
								return false;
							} else {
								$target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
								$target.focus(); // Set focus again
							}
						}
					);
				}
			}
		});

	// Google Map
	if (document.getElementById('map')) {
		google.maps.event.addDomListener(window, 'load', init);

		function init() {
			// Basic options for a simple Google Map
			// For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
			var mapOptions = {
				// How zoomed in you want the map to start at (always required)
				zoom: 11,

				// The latitude and longitude to center the map (always required)
				center: new google.maps.LatLng(40.67, -73.94), // New York

				// How you would like to style the map.
				// This is where you would paste any style found on Snazzy Maps.
				styles: [
					{
						featureType: 'water',
						elementType: 'geometry',
						stylers: [ { color: '#e9e9e9' }, { lightness: 17 } ]
					},
					{
						featureType: 'landscape',
						elementType: 'geometry',
						stylers: [ { color: '#f5f5f5' }, { lightness: 20 } ]
					},
					{
						featureType: 'road.highway',
						elementType: 'geometry.fill',
						stylers: [ { color: '#ffffff' }, { lightness: 17 } ]
					},
					{
						featureType: 'road.highway',
						elementType: 'geometry.stroke',
						stylers: [ { color: '#ffffff' }, { lightness: 29 }, { weight: 0.2 } ]
					},
					{
						featureType: 'road.arterial',
						elementType: 'geometry',
						stylers: [ { color: '#ffffff' }, { lightness: 18 } ]
					},
					{
						featureType: 'road.local',
						elementType: 'geometry',
						stylers: [ { color: '#ffffff' }, { lightness: 16 } ]
					},
					{
						featureType: 'poi',
						elementType: 'geometry',
						stylers: [ { color: '#f5f5f5' }, { lightness: 21 } ]
					},
					{
						featureType: 'poi.park',
						elementType: 'geometry',
						stylers: [ { color: '#dedede' }, { lightness: 21 } ]
					},
					{
						elementType: 'labels.text.stroke',
						stylers: [ { visibility: 'on' }, { color: '#ffffff' }, { lightness: 16 } ]
					},
					{
						elementType: 'labels.text.fill',
						stylers: [ { saturation: 36 }, { color: '#333333' }, { lightness: 40 } ]
					},
					{ elementType: 'labels.icon', stylers: [ { visibility: 'off' } ] },
					{
						featureType: 'transit',
						elementType: 'geometry',
						stylers: [ { color: '#f2f2f2' }, { lightness: 19 } ]
					},
					{
						featureType: 'administrative',
						elementType: 'geometry.fill',
						stylers: [ { color: '#fefefe' }, { lightness: 20 } ]
					},
					{
						featureType: 'administrative',
						elementType: 'geometry.stroke',
						stylers: [ { color: '#fefefe' }, { lightness: 17 }, { weight: 1.2 } ]
					}
				]
			};

			// Get the HTML DOM element that will contain your map
			// We are using a div with id="map" seen below in the <body>
			var mapElement = document.getElementById('map');

			// Create the Google Map using our element and options defined above
			var map = new google.maps.Map(mapElement, mapOptions);

			// Let's also add a marker while we're at it
			var marker = new google.maps.Marker({
				position: new google.maps.LatLng(40.67, -73.94),
				map: map,
				title: 'Snazzy!'
			});
		}
	}

	$(document).ready(function() {
		$('#mc_embed_signup').find('form').ajaxChimp();
	});
});
