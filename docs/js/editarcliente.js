import { actualizarCliente, obtenerCliente } from "./db.js";

const formulario = document.querySelector('#formulario');

document.addEventListener('DOMContentLoaded',()=>{
    // crearDB();
    //windows.location.serch nos retorna solo los parametros que estan despues del url
    const parametrosURL = new URLSearchParams(window.location.search);
    //al ser una instancia de URLSearchParams tenemos disponible el metodo .get( ), este nos permite buscar un parametro por una referencia
    const idCliente = parametrosURL.get('id');
    
    if(idCliente){
        obtenerCliente(idCliente);
    }
    
    formulario.addEventListener('submit',(e)=>{
        e.preventDefault();
        const nombre = document.querySelector('#nombre').value;
        const telefono = document.querySelector('#telefono').value;
        const email = document.querySelector('#email').value;
        const empresa = document.querySelector('#empresa').value;

        const data = {
            nombre,
            telefono,
            email,
            empresa,
            id:Number(idCliente)
        }
        actualizarCliente(data);
    });
    
});