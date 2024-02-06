const db = require('mongoose');
db.Promise = global.Promise;

//Se importan las bases de datos par que creen de manera automatica al iniciar la app
const priority = require('./model/priorityTask');

async function connect(url) {
    await db.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('[db] Conectada con exito');
        // Se crean las prioridades al iniciar la app
        // const prioridades = ['Baja', 'Media', 'Alta'];
        // prioridades.forEach((prioridad) => {
        //     priority.create({ name: prioridad });
        // });
    })
    .catch(err => console.log('[db ERROR] ' + err));
}

module.exports = connect;