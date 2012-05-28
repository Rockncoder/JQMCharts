
var RocknCoder = RocknCoder || {};
RocknCoder.Pages = RocknCoder.Pages || {};

RocknCoder.Pages.Kernel = function (event) {
	var that = this,
		eventType = event.type,
		pageName = $(this).attr("data-rockncoder-jspage");
	if (RocknCoder && RocknCoder.Pages && pageName && RocknCoder.Pages[pageName] && RocknCoder.Pages[pageName][eventType]) {
		RocknCoder.Pages[pageName][eventType].call(that);
	}
};

RocknCoder.Pages.Events = function () {
	$("div[data-rockncoder-jspage]").on(
		'pagebeforecreate pagecreate pagebeforeload pagebeforeshow pageshow pagebeforechange pagechange pagebeforehide pagehide pageinit',
		RocknCoder.Pages.Kernel).on(
		"pageinit", RocknCoder.hideAddressBar);
} ();

RocknCoder.Pages.manageBarChart = function () {
	var pageshow = function () {
			updateChart();
			$("#refreshBarChart").click(function(){
				updateChart();
			});
		},
		pagehide = function () {
			$("#refreshBarChart").unbind('click');
		},
		updateChart= function(){
			var barA = parseInt($("#pageBarSliderA").val(),10),
				barB = parseInt($("#pageBarSliderB").val(),10),
				barC = parseInt($("#pageBarSliderC").val(),10);
			showChart(barA, barB, barC);
		},
		showChart = function(barA, barB, barC){
			$.jqplot('barChart', [[[barA,1], [barB,3], [barC,5]]], {
				seriesDefaults:{
					renderer:$.jqplot.BarRenderer,
					shadowAngle: 135,
					rendererOptions: {
						barDirection: 'horizontal'
					},
					pointLabels: {show: true, formatString: '%d'}
				},
				axes: {
					yaxis: {
						renderer: $.jqplot.CategoryAxisRenderer
					}
				}
			}).replot({clear: true, resetAxes:true});
		};
	return {
		pageshow: pageshow,
		pagehide: pagehide
	}
}();

RocknCoder.Pages.managePieChart = function () {
	var pageshow = function () {
			updateChart();
			$("#refreshPieChart").click(function(){
				updateChart();
			});
		},
		pagehide = function () {
			$("#refreshPieChart").unbind('click');
		},
		updateChart= function(){
			var sliceA = parseInt($("#pagePieSliderA").val(),10),
				sliceB = parseInt($("#pagePieSliderB").val(),10),
				sliceC = parseInt($("#pagePieSliderC").val(),10);
			showChart(sliceA, sliceB, sliceC);
		},
		showChart = function(sliceA, sliceB, sliceC){
			var plot2 = $.jqplot('pieChart', [[['a',sliceA],['b',sliceB],['c',sliceC]]], {
					grid: {
						drawBorder: false,
						shadow: false
					},
					seriesDefaults:{
						renderer:$.jqplot.PieRenderer,
						trendline:{ show: true }
					},
				legend:{ show: false }
			});
		};
	return {
		pageshow: pageshow,
		pagehide: pagehide
	}
}();

RocknCoder.Pages.managePlotChart = function () {
	var pageshow = function () {
			updateChart();
			$("#refreshPlotChart").click(function(){
				updateChart();
				$.mobile.silentScroll();
			});
		},
		pagehide = function () {
			$("#refreshPlotChart").unbind('click');
		},
		updateChart= function(){
			var sliders = $($.mobile.activePage).find("input"),
				vals = [];
			_.each(sliders,function(element, index){
				vals.push([index+1, parseInt(element.value, 10)]);
			});
			showChart(vals);
		},
		showChart = function(vals){
			$.jqplot('plotChart',[vals]).replot({clear: true, resetAxes:true});
		};
	return {
		pageshow: pageshow,
		pagehide: pagehide
	}
}();




