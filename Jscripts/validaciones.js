

/*una forma de hacerlo:*/
/*const inputNacimiento = document.querySelector("#birth");
inputNacimiento.addEventListener("blur", (evento) =>{
validarNacimiento(evento.target);


})*/ /*El evento que queremoms escuchar es "blur" que significa cuando se quite el foco del input de fecha que es lo mismo que cuando de click en cualquier otro lado y el cursor salga de ese campo o se desactive ese campo es cuando disparará la funcion que vamos a crear */

/*OTRA FORMA PARA GENERAR UNA FUNCION QUE PUEDA SELECCIONAR A TRAVES DE LOS DATA ATRIBUTES EL VALIDADOR QUE LE CORRESPONDA */


export function valida(input) {
    const tipoDeInput = input.dataset.tipo;
    if (validadores[tipoDeInput]) {
      validadores[tipoDeInput](input);
    }
  
    if (input.validity.valid) {
      input.parentElement.classList.remove("input-container--invalid");
      input.parentElement.querySelector(".input-message-error").innerHTML = "";
    } else {
      input.parentElement.classList.add("input-container--invalid");
      input.parentElement.querySelector(".input-message-error").innerHTML =
        mostrarMensajeDeError(tipoDeInput, input);
    }
  }
  

  const tipoDeErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError",
  ];
  
  const mensajesDeError = {
    nombre: {
      valueMissing: "El campo nombre no puede estar vacío",
      patternMismatch:"Al menos 4 caracteres y máximo 50, no puede contener caracteres especiales.",
    },
    email: {
      valueMissing: "El campo correo no puede estar vacío",
      typeMismatch: "El correo no es válido",
    },
    phoneNumber: {
        valueMissing: "Este campo no puede estar vacío",
        patternMismatch: "El formato requerido es de 10 dígitos y sólo números"
    },
    asunto: {
        valueMissing: "Este campo no puede estar vacío",
        patternMismatch: "El Asunto debe contener entre  5 y 50 carácteres"
    },
    mensaje: {
        valueMissing: "Este campo no puede estar vacío",
        patternMismatch: "El mensaje debe contener entre 10 y 300 carácteres"
    }
  };


  const validadores = {
    nacimiento: (input) => validarNacimiento(input),
  };
  
  function mostrarMensajeDeError(tipoDeInput, input) {
    let mensaje = "";
    tipoDeErrores.forEach((error) => {
      if (input.validity[error]) {
        console.log(tipoDeInput, error);
        console.log(input.validity[error]);
        console.log(mensajesDeError[tipoDeInput][error]);
        mensaje = mensajesDeError[tipoDeInput][error];
      }
    });
    return mensaje;
  }

  function validarNacimiento(input) {
    const fechaCliente = new Date(input.value);
    let mensaje = "";
    if (!mayorDeEdad(fechaCliente)) {
      mensaje = "Debes tener al menos 18 años de edad";
    }
  
    input.setCustomValidity(mensaje);
  }
  
  function mayorDeEdad(fecha) {
    const fechaActual = new Date();
    const diferenciaFechas = new Date(
      fecha.getUTCFullYear() + 18,
      fecha.getUTCMonth(),
      fecha.getUTCDate()
    );
    return diferenciaFechas <= fechaActual;
  }
  