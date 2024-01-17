const form = document.querySelector('form')!;
const addressInput = document.getElementById('address')! as HTMLInputElement;

function serchAddressHundler(event: Event){
     event.preventDefault();
     const enteredAddress = addressInput.ariaValueMax;
}

form.addEventListener('submit', serchAddressHundler)
