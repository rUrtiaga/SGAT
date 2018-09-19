const {
    service
} = require('../service');
const {
    ObjectID
} = require("mongodb");

const testDBObject = {
    cursos: [{
        "_id": ObjectID("5b983861756b0a1a73c656b3"),
        "_alumnos": [
            ObjectID("5b983a07756b0a1a73c656bb"),
            ObjectID("5b983aba756b0a1a73c656bc")
        ],
        "_alumnosBaja": [],
        "_espera": [],
        "_esperaBaja": [],
        "_diasHorariosLugares": [{
                "_dia": "Martes",
                "_horario": "17:30",
                "_lugar": "Casa de la cultura"
            },
            {
                "_dia": "Jueves",
                "_horario": "19:30",
                "_lugar": "Galpón Cultural"
            }
        ],
        "_tallerID": ObjectID("5b9837e2756b0a1a73c656ae"),
        "_comentario": "",
        "_cupo": "20",
        "_profesores": [
            ObjectID("5b98384a756b0a1a73c656b2")
        ],
        "_anio": 2018
    }, {
        "_id": ObjectID("5b9838bc756b0a1a73c656b4"),
        "_alumnos": [],
        "_alumnosBaja": [],
        "_espera": [],
        "_esperaBaja": [],
        "_diasHorariosLugares": [{
            "_dia": "Jueves",
            "_horario": "17:00",
            "_lugar": "Casa de la cultura"
        }],
        "_tallerID": ObjectID("5b9837e2756b0a1a73c656b0"),
        "_comentario": "",
        "_cupo": "10",
        "_profesores": [
            ObjectID("5b98384a756b0a1a73c656b2")
        ],
        "_anio": 2018
    }, {
        "_id": ObjectID("5b983999756b0a1a73c656ba"),
        "_alumnos": [],
        "_alumnosBaja": [],
        "_espera": [],
        "_esperaBaja": [],
        "_diasHorariosLugares": [{
            "_dia": "Lunes",
            "_horario": "17:00",
            "_lugar": "Teatro español"
        }],
        "_tallerID": ObjectID("5b983928756b0a1a73c656b8"),
        "_comentario": "",
        "_cupo": "50",
        "_profesores": [
            ObjectID("5b983993756b0a1a73c656b9")
        ],
        "_anio": 2018
    }],
    personas: [{
            "_id": ObjectID("5b98384a756b0a1a73c656b2"),
            "_dni": 1000000,
            "_nombre": "Profesor",
            "_apellido": "Ceramica",
            "_fechaNac": "2000-08-10T00:00:00.000Z",
            "_direccion": "Av 2 N 333",
            "_telPrincipal": "453333",
            "_telSecundario": "453131",
            "_mail": "a@a.com",
            "_comentario": ""
        },
        {
            "_id": ObjectID("5b983993756b0a1a73c656b9"),
            "_dni": 1000001,
            "_nombre": "Roberto",
            "_apellido": "Coral",
            "_fechaNac": "1979-08-10T00:00:00.000Z",
            "_direccion": "Av 1 N 333",
            "_telPrincipal": "453153",
            "_telSecundario": "456893",
            "_mail": "b@ab.com",
            "_comentario": ""
        },
        {
            "_id": ObjectID("5b983a07756b0a1a73c656bb"),
            "_dni": 2000003,
            "_nombre": "Adolfo",
            "_apellido": "Himala",
            "_fechaNac": "2008-08-10T00:00:00.000Z",
            "_direccion": "Barrio Chobos",
            "_telPrincipal": "1111111",
            "_telSecundario": "1111111111",
            "_mail": "w@w.com",
            "_comentario": ""
        },
        {
            "_id": ObjectID("5b983aba756b0a1a73c656bc"),
            "_dni": 2000001,
            "_nombre": "Ornella",
            "_apellido": "Tallerista",
            "_fechaNac": "2008-01-10T00:00:00.000Z",
            "_direccion": "Av 221",
            "_telPrincipal": "999999",
            "_telSecundario": "999999",
            "_mail": "we@awe.com",
            "_comentario": ""
        }
    ],
    talleres: [{
            "_id": ObjectID("5b9837e2756b0a1a73c656ae"),
            "_categoria": "Artes Manuales",
            "_nombre": "Ceramica",
            "_subCategoria": "Aborigen"
        },
        {
            "_id": ObjectID("5b9837e2756b0a1a73c656af"),
            "_categoria": "Artes Manuales",
            "_nombre": "Ceramica",
            "_subCategoria": "Normal 1"
        },
        {
            "_id": ObjectID("5b9837e2756b0a1a73c656b0"),
            "_categoria": "Artes Manuales",
            "_nombre": "Ceramica",
            "_subCategoria": "Niños"
        },
        {
            "_id": ObjectID("5b9837e2756b0a1a73c656b1"),
            "_categoria": "Artes Manuales",
            "_nombre": "Ceramica",
            "_subCategoria": "Normal 2"
        },
        {
            "_id": ObjectID("5b9838e7756b0a1a73c656b5"),
            "_categoria": "Artes Manuales",
            "_nombre": "Marroquineria",
            "_subCategoria": "Adultos"
        },
        {
            "_id": ObjectID("5b983928756b0a1a73c656b7"),
            "_categoria": "Musica",
            "_nombre": "Coro",
            "_subCategoria": "Niños"
        },
        {
            "_id": ObjectID("5b983928756b0a1a73c656b8"),
            "_categoria": "Musica",
            "_nombre": "Coro",
            "_subCategoria": "Adultos"
        }
    ],
    categorias: [{
            "_id": ObjectID("5b9836c441caad1574de7fa2"),
            "_categoria": "Artes Manuales"
        },
        {
            "_id": ObjectID("5b983918756b0a1a73c656b6"),
            "_categoria": "Musica"
        }
    ]
}

function inizialice(params) {
    service.isEmptyDB().then(value => {
        if (value) {
            return inizialiceQuery();
        } else {
            console.log('no se pudo inicializar la base de datos, si quiere hacerlo borrela.')
        }
    }).catch(e => console.log(e))
}

function inizialiceQuery() {
    return service.initializeForTest(testDBObject).then(() => console.log('base de datos inicializada'));
}


inizialice();