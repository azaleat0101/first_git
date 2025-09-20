const openDialog = document.getElementById('openDialog');
const closeDialog = document.getElementById('closeDialog');
const contactDialog = document.getElementById('contactDialog');
const form = document.getElementById('contactForm');
let lastActive = null;

openDialog.addEventListener('click', () => {
    lastActive = document.activeElement;
    contactDialog.showModal();
    contactDialog.querySelector('input,select,textarea,button')?.focus();
})

closeDialog.addEventListener('click', () => {
    contactDialog.close('cancel');
});

form?.addEventListener('submit', (event) => {
    [...form.elements].forEach(el => el.setCustomValidity?.(''));

    if (!form.checkValidity()) 
    {
        event.preventDefault();

        const email = form.elements.email;
        if (email?.validity.typeMismatch) {
            email.setCustomValidity('Enter correct e-mail, for example, name@example.com');
        }

        form.reportValidity(); 

        [...form.elements].forEach(el => {
            if (el.willValidate) el.toggleAttribute('aria-invalid', !el.checkValidity());
        });

        return;
    }

    event.preventDefault();
    document.getElementById('contactDialog')?.close('success');
    form.reset();
});

contactDialog.addEventListener('close', () => { lastActive?.focus(); });
