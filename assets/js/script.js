function init() {
	var isTop = false;
	var lastCheck;
	var timeoutId;

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

	function openModal(key) {
		clearTimeout(timeoutId);
		document.querySelector('.modal-overlay').classList.add('loading');
		document.querySelector('.modal-title').innerText = window.carrers[key].title;
		document.querySelector('.modal-description').innerText = window.carrers[key].text;
		document.querySelector('.modal-overlay').classList.add('show');
		timeoutId = setTimeout(function() {
			document.querySelector('.modal-overlay').classList.remove('loading');
		}, 800);
	}

	function closeModal() {
		document.querySelector('.modal-overlay').classList.remove('show');
	}

	window.openModal = openModal;
	window.closeModal = closeModal;
	setInterval(scollCheck, 200);
	scollCheck();
}

init();
