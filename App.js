const { menu, pausa, leerInput, listarTareasBorrar, listarTareasCompletar}  = require('./menu/menu');
const Tareas = require('./models/tareas')
const inquirer = require('inquirer');

const principal = async () => {
    let opt = '';
    const tareas = new Tareas();

    // Bucle para mostrar el menú
    do {
        opt = await menu();
        // Ejecutará laopción seleccionada 
        switch (opt) {
            case '1':
                const desc = await leerInput('Descripcion:');
                tareas.crearTarea(desc);
                break;


            case '2':
                console.log(tareas.listadoArr);
                
                break;


            case '3':
                    tareas.listarTareasCompletadas(true);
                    break;
    
            case '4':
                    const ids = await listarTareasCompletar(tareas.listadoArr);
                    tareas.toggleTareas(ids);
                    break;

                    
                case '5':
                const id = await listarTareasBorrar(tareas.listadoArr);
                if (id !== '0') {
                    const confirmacion = await inquirer.default.prompt([  
                        {
                            type: 'confirm',
                            name: 'ok',
                            message: '¿Está seguro que desea borrar la tarea?'
                        }
                    ]);

                    if (confirmacion.ok) {
                        tareas.borrarTarea(id);
                        console.log('Tarea borrada exitosamente'.green);
                    }
                }
                break;
        }

        await pausa();
    } while (opt !== '6');
}

principal();