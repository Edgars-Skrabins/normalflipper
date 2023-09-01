const dropArea = document.getElementById('drop-area');
const fileInput = document.getElementById('file-input');
const preview = document.getElementById('preview');

dropArea.addEventListener('dragover', (event) => {
    event.preventDefault();
    dropArea.classList.add('active');
});

dropArea.addEventListener('dragleave', () => {
    dropArea.classList.remove('active');
});

dropArea.addEventListener('drop', (event) => {
    event.preventDefault();
    dropArea.classList.remove('active');
    handleFiles(event.dataTransfer.files);
});

fileInput.addEventListener('change', () => {
    handleFiles(fileInput.files);
});


function handleFiles(files) {

    preview.innerHTML = '';
    
    for (const file of files) {
        if (file.type.match(/^image\/(jpeg|jpg|png)$/)) {
            const reader = new FileReader();

            reader.onload = (event) => {
                const image = new Image();
                image.src = event.target.result;
                image.classList.add("previewImage");
                preview.appendChild(image);
            };

            reader.readAsDataURL(file);
        }
    }
}