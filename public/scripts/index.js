const fileInput = document.getElementById('fileInput');
const uploadBtn = document.getElementById('uploadBtn');
const resultDiv = document.getElementById('result');

fileInput.addEventListener('change', function() {
    uploadBtn.disabled = !this.files.length;
});

uploadBtn.addEventListener('click', uploadFile);

async function uploadFile() {
    const file = fileInput.files[0];
    
    if (!file) {
        showResult('Пожалуйста, выберите файл', 'error');
        return;
    }

    showResult('Загрузка файла...', 'loading');
    uploadBtn.disabled = true;

    try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/upload', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error(`Ошибка сервера: ${response.status}`);
        }

        const result = await response.json();
        
        showResult(`
            <h3>Файл успешно загружен!</h3>
            <p><strong>Имя файла:</strong> ${result.filename}</p>
            <p><strong>Статус:</strong> ${result.message}</p>   
        `, 'success');

    } catch (error) {
        showResult(`Ошибка при загрузке файла: ${error.message}`, 'error');
    } finally {
        uploadBtn.disabled = false;
    }
}

function showResult(message, type) {
    resultDiv.innerHTML = message;
    resultDiv.className = 'result-container';
    resultDiv.style.display = 'block';
    
    if (type === 'success') resultDiv.classList.add('success');
    else if (type === 'error') resultDiv.classList.add('error');
    else if (type === 'loading') resultDiv.classList.add('loading');
}