function init() {
	var isTop = false;
	var lastCheck;

	function scollCheck() {
		if (window.pageYOffset === lastCheck) {
			return;
		}

		lastCheck = window.pageYOffset;

		if (!window.pageYOffset && isTop) {
			return;
		}

		if (window.pageYOffset && !isTop) {
			return;
		}

		if (!window.pageYOffset && !isTop) {
			isTop = true;
			document.querySelector('header').classList.add('top');
			return;
		}

		if (window.pageYOffset && isTop) {
			isTop = false;
			document.querySelector('header').classList.remove('top');
			return;
		}
	}

	setInterval(scollCheck, 200);
	scollCheck();
}

init();
