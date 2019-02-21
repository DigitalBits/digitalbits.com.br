function init() {
	var isTop = false;
	var lastCheck;
	var timeoutId;

	function getElement(selector) {
		return document.querySelector(selector);
	}

	function goTo(id) {
		window.scrollTo(0, getElement('#' + id).offsetTop - 50);
	}

	function onKeyUp(e) {
		if (e.keyCode === 27) {
			closeModal();
		}
	}

	function chooseFile() {
		getElement('.input-file').click();
	}

	function onChooseFile() {
		getElement('.fake-input-file').classList.add('active');
		getElement('.fake-input-file').innerText = 'Arquivo anexado';
	}

	function handleSubmit(type) {
		return function(e) {
			e.preventDefault();
			continueSubmit(type);
		}
	}

	function continueSubmit(type) {
		var mailUrl;
		var formElement;
		var formData = new FormData();

		if (type === 'CAREER') {
			mailUrl = 'mail-digitalbits-contact';
			formElement = getElement('.modal-form');
			formData.append('subject', getElement('.modal-title').innerText);
			formData.append('file', getElement('.input-file').files[0]);
		} else (type === 'CONTACT') {
			mailUrl = 'mail-digitalbits-career';
			formElement = getElement('.contact-form');
			formData.append('subject', formElement.elements.subject.value);
		}

		formData.append('name', formElement.elements.name.value);
		formData.append('email', formElement.elements.email.value);
		formData.append('message', formElement.elements.message.value);
		sendEmail(type, mailUrl, formData, formElement)
	}

	function sendEmail(type, mailUrl, formData, formElement) {
		var submitRequest = new XMLHttpRequest();

		submitRequest.open('POST','https://guilhermefarias.com.br/' + mailUrl);
		submitRequest.onreadystatechange = function() {
			if (submitRequest.readyState === 4 && submitRequest.status === 200 && submitRequest.responseText === 'OK'){
				displayAndRemoveResponse(formElement, 'Mensagem enviada com sucesso!', 'resp');
				resetFields(formElement, type);
			} else if (submitRequest.readyState === 4) {
				displayAndRemoveResponse(formElement, 'Houve um erro ao enviar a mensagem', 'resp error');
			}
		}

		submitRequest.send(formData);
	}

	function resetFields(formElement, type) {
		formElement.elements.name.value = '';
		formElement.elements.email.value = '';
		formElement.elements.message.value = '';

		if (type === 'CONTACT') {
			formElement.elements.subject.value = '';
		} else if (type === 'CAREER') {
			getElement('.fake-input-file').classList.remove('active');
			getElement('.fake-input-file').innerText = 'Anexar CV';
			getElement('.input-file').value = '';
		}
	}

	function displayAndRemoveResponse(formElement, message, className) {
		var respElement = document.createElement('div');

		respElement.setAttribute('class', className);
		respElement.innerHTML = message;
		formElement.appendChild(respElement);
		setTimeout(function(){
			formElement.removeChild(respElement);
		},5000);
	}

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
			getElement('header').classList.add('top');
			return;
		}

		if (window.pageYOffset && isTop) {
			isTop = false;
			getElement('header').classList.remove('top');
			return;
		}
	}

	function openModal(key) {
		clearTimeout(timeoutId);
		getElement('.modal-overlay').classList.add('loading');
		getElement('.modal-title').innerText = window.carrers[key].title;
		getElement('.modal-description').innerText = window.carrers[key].text;
		getElement('.modal-overlay').classList.add('show');
		timeoutId = setTimeout(function() {
			getElement('.modal-overlay').classList.remove('loading');
		}, 800);
	}

	function closeModal() {
		getElement('.modal-overlay').classList.remove('show');
	}

	window.goTo = goTo;
	window.openModal = openModal;
	window.closeModal = closeModal;
	document.addEventListener('keyup', onKeyUp);
	getElement('.input-file').addEventListener('change', onChooseFile);
	getElement('.modal-close').addEventListener('click', closeModal);
	getElement('.fake-input-file').addEventListener('click', chooseFile);
	getElement('.modal-form').addEventListener('submit', handleSubmit('CONTACT'));
	getElement('.contact-form').addEventListener('submit', handleSubmit('CAREER'));
	setInterval(scollCheck, 200);
	scollCheck();
}

init();
