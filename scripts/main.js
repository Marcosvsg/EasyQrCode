document.addEventListener('DOMContentLoaded', function() {
    const generateButton = document.getElementById('generate-button');
    const inputText = document.getElementById('input-text');
  
    generateButton.addEventListener('click', function() {
        const inputValue = inputText.value;
        const qrCodeContainer = document.getElementById('qr-code-container');
        const buttonDownload = document.getElementById('button-qr-code-container');
        const errorMessage = document.getElementById('error-message');
        const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(inputValue)}`;


        if (inputValue == "" || inputValue.trim() === "") { 
            if (errorMessage.classList.contains('error')) { 
                errorMessage.classList.remove('error'); 
            }
            qrCodeContainer.innerHTML = "";
            buttonDownload.classList.add('download-button');
        } else{
        errorMessage.classList.add('error')
        qrCodeContainer.innerHTML = `<img src="${qrCodeUrl}" alt="QR Code">`;
            if (buttonDownload.classList.contains('download-button')) {
                buttonDownload.classList.remove('download-button');
            }

            buttonDownload.addEventListener('click', async function() {
                try {
                    // Faz uma solicitação para obter o QR Code como um Blob
                    const response = await fetch(qrCodeUrl);
                    const blob = await response.blob();
    
                    // Cria um URL temporário para o Blob
                    const blobUrl = window.URL.createObjectURL(blob);
    
                    // Cria um link temporário para o download
                    const link = document.createElement('a');
                    link.href = blobUrl;
                    link.download = 'qrcode.png';
                    document.body.appendChild(link);
                    link.click();
    
                    // Libera o URL temporário após o download
                    window.URL.revokeObjectURL(blobUrl);
                    document.body.removeChild(link);
                } catch (error) {
                    console.error('Erro ao baixar o QR Code:', error);
                }
            });
        
        }
      });
  });
  