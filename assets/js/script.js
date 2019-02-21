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

	function submitContact(e) {
		e.preventDefault();

		var formElement = getElement('.contact-form');
		var formData = '';

		formData += 'name=' + encodeURIComponent(formElement.elements.name.value) + '&';
		formData += 'email=' + encodeURIComponent(formElement.elements.email.value) + '&';
		formData += 'subject=' + encodeURIComponent(formElement.elements.subject.value) + '&';
		formData += 'message=' + encodeURIComponent(formElement.elements.message.value);

		sendEmail('mail-digitalbits-contato', formData, formElement, function() {
			formElement.elements.name.value = '';
			formElement.elements.email.value = '';
			formElement.elements.subject.value = '';
			formElement.elements.message.value = '';
		});
	};

	function submitCarrer(e) {
		e.preventDefault();

		var formElement = getElement('.modal-form');
		var formData = '';

		formData += 'name=' + encodeURIComponent(formElement.elements.name.value) + '&';
		formData += 'email=' + encodeURIComponent(formElement.elements.email.value) + '&';
		formData += 'subject=' + getElement('.modal-title').innerText + '&';
		formData += 'message=' + encodeURIComponent(formElement.elements.message.value);

		sendEmail('mail-digitalbits-carrer', formData, formElement, function() {
			formElement.elements.name.value = '';
			formElement.elements.email.value = '';
			formElement.elements.message.value = '';
		});
	};

	function sendEmail(type, formData, formElement, resetForm) {
		var submitRequest = new XMLHttpRequest();
		var respElement = document.createElement('div');

		submitRequest.open('POST','https://guilhermefarias.com.br/' + type,true);
		submitRequest.setRequestHeader('Content-type','application/x-www-form-urlencoded');
		submitRequest.onreadystatechange = function(){
			if (submitRequest.readyState === 4 && submitRequest.status === 200 && submitRequest.responseText === 'OK'){
				respElement.setAttribute('class','resp');
				respElement.innerHTML = 'Mensagem enviada com sucesso!'; // Message sent successfully!
				formElement.appendChild(respElement);
				resetForm();
				setTimeout(function(){
					formElement.removeChild(respElement);
				},5000);
			} else if(submitRequest.readyState === 4){
				respElement.setAttribute('class','resp error');
				respElement.innerHTML = 'Houve um erro ao enviar a mensagem'; // There was an error sending the message
				formElement.appendChild(respElement);
				setTimeout(function(){
					formElement.removeChild(respElement);
				},5000);
			}
		};

		submitRequest.send(formData);
	};

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
	getElement('.modal-form').addEventListener('submit', submitCarrer);
	getElement('.contact-form').addEventListener('submit', submitContact);
	getElement('.modal-close').addEventListener('click', closeModal);
	getElement('.fake-input-file').addEventListener('click', chooseFile);
	getElement('.input-file').addEventListener('change', onChooseFile);
	setInterval(scollCheck, 200);
	scollCheck();
}

init();
