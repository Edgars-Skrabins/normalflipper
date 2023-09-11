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

let flipButton = document.getElementById("flip-button");

flipButton.addEventListener("click", flipNormalMap);

function flipNormalMap()
{
    const imageElement = preview.firstChild;
    
    if (imageElement) {
        const normalMapImage = new Image();
        normalMapImage.src = imageElement.getAttribute('src');

        preview.removeChild(imageElement);

        const convertedImage = convertNormalMap(normalMapImage);

        convertedImage.classList.add("previewImage");
        preview.appendChild(convertedImage);
        
    }
}

function handleFiles(files) {
    
    if(preview.firstChild) preview.removeChild(preview.firstChild);

    for (const file of files) {
        
        if (!file.type.match(/^image\/(jpeg|jpg|png)$/)) return;
        
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

function convertNormalMap(normalMapImage) {
    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = normalMapImage.width;
    canvas.height = normalMapImage.height;

    ctx.drawImage(normalMapImage, 0, 0);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;

    for (let y = 0; y < canvas.height; y++) {
        for (let x = 0; x < canvas.width; x++) {
            const i = (y * canvas.width + x) * 4;
            pixels[i + 1] = 255 - pixels[i + 1];
        }
    }
    
    ctx.putImageData(imageData, 0, 0);

    const modifiedImage = new Image();
    modifiedImage.src = canvas.toDataURL();

    return modifiedImage;
}
