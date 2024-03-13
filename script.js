document.getElementById('convertButton').addEventListener('click', function() {
    const emojiInput = document.getElementById('emojiInput').value.trim();
    if (emojiInput !== '') {
        const emojiStyles = ['apple', 'samsung', 'twitter', 'google', 'windows', 'whatsapp', 'emojione']; // Semua gaya emoji yang didukung
        const resultContainer = document.getElementById('resultContainer');
        resultContainer.innerHTML = ''; // Mengosongkan kontainer sebelum menampilkan emoji baru

        emojiStyles.forEach(emojiStyle => {
            let emojiUrl;
            switch (emojiStyle) {
                case 'apple':
                    emojiUrl = `https://cdn.jsdelivr.net/emojione/assets/png/${emojiInput.codePointAt(0).toString(16)}.png`;
                    break;
                case 'samsung':
                    emojiUrl = `https://twemoji.maxcdn.com/v/latest/72x72/${encodeURIComponent(emojiInput)}.png`;
                    break;
                case 'twitter':
                    emojiUrl = `https://abs-0.twimg.com/emoji/v2/svg/${emojiInput.codePointAt(0).toString(16)}.svg`;
                    break;
                case 'google':
                    emojiUrl = `https://emojicdn.elk.sh/${encodeURIComponent(emojiInput)}?style=google`;
                    break;
                case 'windows':
                    emojiUrl = `https://emojicdn.elk.sh/${encodeURIComponent(emojiInput)}?style=microsoft`;
                    break;
                case 'whatsapp':
                    emojiUrl = `https://emojicdn.elk.sh/${encodeURIComponent(emojiInput)}?style=whatsapp`;
                    break;
                case 'emojione':
                    emojiUrl = `https://cdn.jsdelivr.net/emojione/assets/png/${emojiInput.codePointAt(0).toString(16)}.png`;
                    break;
                default:
                    emojiUrl = `https://cdn.jsdelivr.net/emojione/assets/png/${emojiInput.codePointAt(0).toString(16)}.png`;
            }

            fetch(emojiUrl)
                .then(response => {
                    if (response.ok) {
                        return response.blob();
                    } else {
                        throw new Error(`Emoji not available in ${emojiStyle}`);
                    }
                })
                .then(blob => {
                    const emojiImage = document.createElement('img');
                    emojiImage.src = URL.createObjectURL(blob);
                    emojiImage.alt = 'Emoji';
                    emojiImage.classList.add('w-16', 'h-16');

                    const downloadButton = document.createElement('button');
                    downloadButton.innerHTML = `Download Image (${emojiStyle})`;
                    downloadButton.classList.add('block', 'text-center', 'bg-blue-500', 'text-white', 'p-2', 'rounded-md', 'cursor-pointer', 'mt-2');
                    downloadButton.addEventListener('click', function() {
                        const downloadLink = document.createElement('a');
                        downloadLink.href = emojiImage.src;
                        downloadLink.download = `${emojiInput}_${emojiStyle}.png`;
                        downloadLink.click();
                    });

                    const emojiColumn = document.createElement('div');
                    emojiColumn.classList.add('flex', 'flex-col', 'items-center', 'mb-4');
                    emojiColumn.appendChild(emojiImage);
                    emojiColumn.appendChild(downloadButton);
                    resultContainer.appendChild(emojiColumn);
                })
                .catch(error => {
                    console.error(error.message);
                });
        });
    }
});
