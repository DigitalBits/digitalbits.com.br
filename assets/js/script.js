function init() {
	var isTop = false;
	var lastCheck;
	var timeoutId;

	window.goTo = function(id) {
		window.scrollTo(0, document.querySelector('#' + id).offsetTop - 50);
	}

	function submitContact(e) {
		e.preventDefault();

		var formElement = document.querySelector('.contact-form');
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

		var formElement = document.querySelector('.modal-form');
		var formData = '';

		formData += 'name=' + encodeURIComponent(formElement.elements.name.value) + '&';
		formData += 'email=' + encodeURIComponent(formElement.elements.email.value) + '&';
		formData += 'subject=' + document.querySelector('.modal-title').innerText + '&';
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

	window.goTo = goTo;
	window.openModal = openModal;
	window.closeModal = closeModal;
	document.querySelector('.modal-form').addEventListener('submit', submitCarrer);
	document.querySelector('.contact-form').addEventListener('submit', submitContact);
	document.querySelector('.modal-close').addEventListener('click', closeModal);
	document.addEventListener('keyup', function(e) {
		if (e.keyCode === 27) {
			closeModal();
		}
	});

	setInterval(scollCheck, 200);
	scollCheck();
}

init();
