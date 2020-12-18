const inputNombre = document.querySelector('#nombre');
const inputEmail = document.querySelector('#email');
const inputTelefono = document.querySelector('#telefono');
const inputEmpresa = document.querySelector('#empresa');

let data;

import { crearDB, conectarDB, crearCliente } from "./db.js";

const formulario = document.querySelector('#formulario');

const eventos = ()=>{
    crearDB();
    formulario.addEventListener('submit',validar);
}

//validar clientes
const validar = (e)=>{
    e.preventDefault();
    conectarDB();
    const nombre = document.querySelector('#nombre').value;
    const email = document.querySelector('#email').value;
    const telefono = document.querySelector('#telefono').value;
    const empresa = document.querySelector('#empresa').value;
    
    if(!validarCampos()){
        imprimirAlerta('error','Todos los campos son obligatorios');
        return;
    }

    //crear un objeto con la informacion
    const cliente = {
        nombre,
        email,
        telefono,
        empresa,
        id: Date.now()
    };
    crearCliente({...cliente});
    //reiniciarObjeto();
    imprimirAlerta('correcto','Datos Ingresados correctamente');
    // formulario.reset();
    setTimeout(()=>{
        window.location.href = 'index.html';
    },1000);
    
}

function imprimirAlerta(tipo,mensaje){
    const alerta = document.querySelector('.alerta');
    
    if(!alerta){
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('px-4','py-3','rounded','max-w-lg','mx-auto','mt-6','text-center','border','alerta' );
    
        if(tipo==='error'){
            divMensaje.classList.add('bg-red-100','border-red-400','text-red-700');
        }else{
            divMensaje.classList.add('bg-green-100','border-green-400','text-green-700');
        }
        divMensaje.textContent = mensaje;
        formulario.append(divMensaje);
        setTimeout(()=>{
            divMensaje.remove();
        },1000);
    }
}

const llenarFormulario = (data)=>{
 
    const {nombre,email,telefono,empresa} = data;

    inputNombre.value = nombre;
    inputEmail.value = email;
    inputTelefono.value = telefono;
    inputEmpresa.value = empresa;
}



const validarCampos = ()=>{
    if(inputNombre.value === '' || inputEmail.value === '' || inputTelefono.value === '' || inputEmpresa.value ===''){
        return false;
    }
    else {
        return true;
    }
}


export{
    eventos,
    formulario,
    llenarFormulario,
    validarCampos,
    imprimirAlerta
}