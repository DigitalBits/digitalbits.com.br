 // svg
 svg4everybody();

 // Anexar arquivo
 var fileInput = document.querySelector('.form-input-file');
 var fileInputText = document.querySelector('.form-input--file-text');
 fileInputTextContent = fileInputText.textContent;

 fileInput.addEventListener('change', function(e) {
     var value = e.target.value.length > 0 ? e.target.value : fileInputTextContent;

     fileInputText.textContent = value.replace('C:\\fakepath\\', '');
 });
