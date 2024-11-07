// const inquirer = require('inquirer');
// const colors = require('colors');
// const { pausa } = require('./menu');

// const tareas = [];

// const crearTarea = async () => {
//     const { descripcion } = await inquirer.default.prompt([
//         {
//             type: 'input',
//             name: 'descripcion',
//             message: 'Descripción de la tarea:',
//             validate(value) {
//                 if (value.length === 0) {
//                     return 'Por favor ingrese una descripción.';
//                 }
//                 return true;
//             }
//         }
//     ]);
//     tareas.push(descripcion);
//     console.log('Tarea creada correctamente'.green);
// };

// const listarTareas = async () => {
//     console.clear();
//     console.log('Listado de tareas:'.blue);
//     if (tareas.length === 0) {
//         console.log('No hay tareas registradas'.yellow);
//     } else {
//         tareas.forEach((tarea, index) => {
//             console.log(`${(index + 1).toString().green}. ${tarea}`);
//         });
//     }
//     await pausa();
// };

// const eliminarTarea = async () => {
//     if (tareas.length === 0) {
//         console.log('No hay tareas para eliminar'.red);
//         return;
//     }

//     const { index } = await inquirer.default.prompt([
//         {
//             type: 'list',
//             name: 'index',
//             message: 'Seleccione la tarea a eliminar:',
//             choices: tareas.map((tarea, i) => ({
//                 value: i,
//                 name: `${(i + 1).toString().green}. ${tarea}`
//             }))
//         }
//     ]);

//     const tareaEliminada = tareas.splice(index, 1);
//     console.log(`Tarea eliminada: ${tareaEliminada}`.red);
//     await pausa();
// };

// module.exports = {
//     crearTarea,
//     listarTareas,
//     eliminarTarea
// };

const Tarea = require('../models/tarea');

class Tareas {
    _listado = {};

    get listadoArr() {
        const listado = [];
        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key];
            listado.push(tarea);
        });
        return listado;
    }

    constructor() {
        this._listado = {};
    }

    crearTarea(desc = '') {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    borrarTarea(id) {
        if (this._listado[id]) {
            delete this._listado[id];
            return true;
        }
        return false;
    }

    // ESTO AÚN NO TIENE FUNCIONALIDAD
    listadoCompleto() {
        console.log('\n');
        this.listadoArr.forEach((tarea, i) => {
            const idx = `${i + 1}`.green;
            const { desc, completadoEn } = tarea;
            const estado = (completadoEn) 
                            ? 'Completada'.green
                            : 'Pendiente'.red;
            
            console.log(`${idx}. ${desc} :: ${estado}`);
        });
    }

    listarTareasCompletadas(completadas = true) {
        console.log('\n');
        let contador = 0;
        
        this.listadoArr.forEach(tarea => {
            const { desc, completadoEn } = tarea;
            const estado = completadoEn ? 'Completada'.green : 'Pendiente'.red;
            
            if (completadas) {
                if (completadoEn) {
                    contador += 1;
                    console.log(`${(contador + '.').green} ${desc} :: ${completadoEn.green}`);
                }
            } else {
                if (!completadoEn) {
                    contador += 1;
                    console.log(`${(contador + '.').green} ${desc} :: ${estado}`);
                }
            }
        });
    }

    toggleCompletada(id) {
        const tarea = this._listado[id];
        if (tarea) {
            if (!tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString();
            } else {
                tarea.completadoEn = null;
            }
        }
    }
}

module.exports = Tareas;