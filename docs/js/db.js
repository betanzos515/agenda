import { llenarFormulario, validarCampos,imprimirAlerta } from "./elementos.js";

let DB;

export const conectarDB = ()=>{
    const abrirConexion = window.indexedDB.open('crm',1);
    abrirConexion.onerror = ()=> console.log('No se pudo conextar a la base de datos');
    abrirConexion.onsuccess = ()=>{ 
        console.log('Conexion creada exitosamente');
        DB = abrirConexion.result;
    }
}
export const crearDB = () =>{
    const crearDB = window.indexedDB.open( 'crm',1 );
    crearDB.onerror = ()=> console.log('Se ah producido un error al crear la base de datos');
    crearDB.onsuccess = ()=> { DB = crearDB.result; }
    
    crearDB.onupgradeneeded = (e)=>{
        
        const db = e.target.result;
        const objectoStore = db.createObjectStore('crm',{ keyPath:'id',autoIncrement:true });
        
        objectoStore.createIndex('nombre','nombre',{ unique:false });
        objectoStore.createIndex('email','email',{ unique:true });
        objectoStore.createIndex('telefono','telefono',{ unique:false });
        objectoStore.createIndex('empresa','empresa',{ unique:false });
        objectoStore.createIndex('id','id',{ unique:true });
        
        console.log('Esquema generado correctamente');
    }
}

export const crearCliente = (cliente)=>{   
    
    const transaction = DB.transaction(['crm'],'readwrite');
    const objectStore = transaction.objectStore('crm');
    objectStore.add(cliente);
    transaction.onerror = ()=>{
        console.log('hubo un error');
    }
    transaction.oncomplete = ()=>{
        console.log('Cliente Insertado');
    }
}

export const listarClientes = (elemento) =>{

    const abrirConexion = window.indexedDB.open('crm',1);
    abrirConexion.onerror = ()=> console.log('No se pudo conextar a la base de datos');
    
    abrirConexion.onsuccess = ()=>{ 
        console.log('Conexion creada exitosamente');
        DB = abrirConexion.result;
        let objectoStore = DB.transaction('crm').objectStore('crm');
        
        objectoStore.openCursor().onsuccess =  (event)=>{
            const cursor =  event.target.result;
            if(cursor){
                const {nombre,email,telefono,empresa,id} = cursor.value;
                elemento.innerHTML += ` 
                <tr>
                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                        <p class="text-sm leading-5 font-medium text-gray-700 text-lg  font-bold"> ${nombre} </p>
                        <p class="text-sm leading-10 text-gray-700"> ${email} </p>
                    </td>
                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 ">
                        <p class="text-gray-700">${telefono}</p>
                    </td>
                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200  leading-5 text-gray-700">    
                        <p class="text-gray-600">${empresa}</p>
                    </td>
                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5">
                        <a href="editar-cliente.html?id=${id}" class="text-teal-600 hover:text-teal-900 mr-5">Editar</a>
                        <a href="#" data-cliente="${id}" class="text-red-600 hover:text-red-900" >Eliminar</a>
                    </td>
                </tr>
                `;
                cursor.continue();
            }
        }
    }
}

export const obtenerCliente = (id)=>{
    const conexion = window.indexedDB.open('crm',1);
    conexion.onerror = ()=> console.log('Hubo un error al conextarse con la base de datos');
    conexion.onsuccess = ()=>{
        DB = conexion.result;
        const transaction = DB.transaction(['crm'],'readonly');
        const objectStore = transaction.objectStore('crm');
        const cliente = objectStore.openCursor();
        cliente.onsuccess = (e)=>{
            const cursor = e.target.result;
            if(cursor){
                const data = cursor.value;
                if(data.id === Number(id)){
                    llenarFormulario(data);
                    return;
                }
                cursor.continue();
            }
        }
    }
}

export const actualizarCliente = (cliente)=>{
    if(validarCampos()){
        const conexion = window.indexedDB.open('crm',1);
        conexion.onerror = ()=> console.log('Hubo un error durante la conexion');
        conexion.onsuccess = ()=>{
            DB = conexion.result;
            const transaction = DB.transaction(['crm'],'readwrite');
            const objectStore = transaction.objectStore('crm');
            
            objectStore.put(cliente);
            transaction.onerror = ()=> imprimirAlerta('error','Error al ingresar los datos');
            transaction.oncomplete = ()=>{
                imprimirAlerta('succes','Elemento insertado correctamente');
                setTimeout(()=>{
                    window.location.href = 'index.html';
                },1000);
            } 
        }
    }else{
        imprimirAlerta('error','Error al ingresar los datos');
    }
}

export const eliminarElemento = (id)=>{
    const conexion = window.indexedDB.open('crm',1);
    conexion.onerror = ()=> console.log('Hubo un error durante la conexion');
    conexion.onsuccess = ()=>{
        DB = conexion.result;
        const transaction = DB.transaction(['crm'],'readwrite');
        const objectStore = transaction.objectStore('crm');
        
        objectStore.delete(id);
        transaction.onerror = ()=> console.log('error','Error al ingresar los datos');
        transaction.oncomplete = ()=>{
            console.log('Eliminado correctamente');
            window.location.href = 'index.html';
        } 
    }
}

