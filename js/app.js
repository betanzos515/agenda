import { listarClientes, eliminarElemento } from "./db.js";
const elemento = document.querySelector('#listado-clientes');
document.addEventListener('DOMContentLoaded',( )=>{ 
    listarClientes(elemento); 
    elemento.addEventListener('click',delegationLista);
});

const delegationLista = (e)=>{
    if(e.target.textContent ==='Eliminar'){
        const dataCliente = Number(e.target.getAttribute('data-cliente'));
        eliminarElemento(dataCliente);
    }

}