const validateField = (inputField) => {

    const re= /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


    if (inputField.validity.valueMissing) {  
         return "Este campo no puede estar vacío."; 
    }
    else if (inputField.type === "text" && !re.test(inputField.value)) { 
        return "Este campo solo puede contener letras.";  
    }
    else if (inputField.validity.tooShort) { 
        const minlength = inputField.minLength; // Extraer minlength, obtener el valor de minlength
        return `Este campo debe tener al menos ${minlength} letras.`;  
    }
    else if (inputField.type === "email" && !regex.test(inputField.value)) { 
        return "Este campo solo admite emails válidos.";  
    }
   
    else {
        return null;
    }
    
};

const contactoForm = document.getElementById("formulario");
const inputs = document.querySelectorAll("input, textarea");  

contactoForm.addEventListener("submit", function(event) {
event.preventDefault();

let hasErrors = false;

inputs.forEach((input) => {
   const errorMessage = validateField(input);
   const errorElement = input.parentElement.querySelector(".validation-message");//Busca el mensaje en su contenedor.

    if (errorMessage) {
       errorElement.textContent = errorMessage;
       errorElement.style.visibility = "visible";
       hasErrors=true;
    } else {
       errorElement.textContent = "";
       errorElement.style.visibility = "hidden";
    }
});

    if (!hasErrors) {
        // Lógica para enviar el formulario
        console.log("Formulario enviado correctamente.");

        // Limpiar campos
        contactoForm.reset();

        // Mostrar mensaje de éxito
        const successMessage = document.createElement("p");
        successMessage.textContent = "¡Formulario enviado con exito!";
        successMessage.style.color = "crimson";
        successMessage.style.fontSize = "1.2rem";
        contactoForm.appendChild(successMessage);

        // Eliminar el mensaje después de unos segundos
        setTimeout(() => {
            successMessage.remove();
        }, 3000);
    }
});

// Escuchar cambios en el campo para corregir y ocultar el error en tiempo real.
inputs.forEach((input) => {
    input.addEventListener("input", () => {
        const errorMessage = validateField(input);
        const errorElement = input.parentElement.querySelector(".validation-message");// Busca el mensaje en su contenedor
       
        if (!errorMessage) {
            errorElement.textContent = "";
            errorElement.style.visibility = "hidden";
        }
    });
});



























 
