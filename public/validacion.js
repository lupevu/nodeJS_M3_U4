const validarNombre = (nombre)=>{
    if(nombre.length === 0){
       errores.push('El nombre debe tener mas de un caracter') 
    }
    if(!/^[a-z]+ ?[a-z]+$/i.test(nombre)){
        errores.push('El nombre debe contener solo letras y un solo espacio')
    }
}

const validarApellido = (apellido)=>{
    if(apellido.length === 0){
       errores.push('El Apellido debe tener mas de un caracter') 
    }
    if(!/^[a-z]+ ?[a-z]+$/i.test(apellido)){
        errores.push('El Apellido debe contener solo letras y un solo espacio')
    }
}

const validarCelular = (celular)=>{
    if(celular.length < 10){
       errores.push('El celular debe tener 10 o más números') 
    }
    if(!/^[0-9]+$/i.test(celular)){
        errores.push('El celular debe contener solo numeros')
    }
}

/*
const validarEmail = (email)=>{

        
    if (email.length > -1) {
        throw new Error("Ese email ya existe, por favor ingrese otro");
    }

}
*/

const validarNacimiento = (lugar_nacimiento)=>{
    if(lugar_nacimiento.length === 0){
       errores.push('El lugar de nacimiento debe tener mas de un caracter') 
    }
    if(!/^[a-z]+ ?[a-z]+$/i.test(lugar_nacimiento)){
        errores.push('El lugar de nacimiento debe contener solo letras y un solo espacio')
    }
}

const validarResidencia = (lugar_residencia)=>{
    if(lugar_residencia.length === 0){
       errores.push('El lugar de residencia debe tener mas de un caracter') 
    }
    if(!/^[a-z]+ ?[a-z]+$/i.test(lugar_residencia)){
        errores.push('El lugar de residencia debe contener solo letras y un solo espacio')
    }
}



const formulario = document.querySelector('#formulario');
const listaErrores = document.querySelector('#errores ul');

let errores = [];

formulario.addEventListener('submit', e=>{
    const {nombre, apellido, celular, lugar_nacimiento} = e.target.elements;

    errores = [];

    validarNombre(nombre.value);
    validarApellido(apellido.value);
    validarCelular(celular.value);
    validarNacimiento(lugar_nacimiento.value);
    validarResidencia(lugar_residencia.value);
    
    if(errores.length !== 0){
        listaErrores.innerHTML = '';
        e.preventDefault();
        errores.forEach(error=>{
            const li = document.createElement('li');
            li.textContent = error;
            listaErrores.appendChild(li);
        })
    }
})