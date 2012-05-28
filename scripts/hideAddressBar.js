
var RocknCoder = RocknCoder || {};

RocknCoder.hideAddressBar = function() {
	if (navigator.userAgent.match(/Android/i)) {
		window.scrollTo(0, 0); // reset in case prev not scrolled
		var nPageH = $(document).height();
		var nViewH = window.outerHeight;
		if (nViewH > nPageH) {
			nViewH = nViewH / window.devicePixelRatio;
			$('BODY').css('height', nViewH + 'px');
		}
		window.scrollTo(0, 1);

		addEventListener("resize", function () {
			setTimeout(hideUrlBar, 0);
			setTimeout(hideUrlBar, 500);
		}, false);

		function hideUrlBar() {
			if (!pageYOffset) {
				window.scrollTo(0, 1);
			}
		}
	}
	return this;
};