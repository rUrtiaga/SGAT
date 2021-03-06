const {
    validate
} = require("./validateRegex");
const {
    SgatError
} = require("./extras/SgatError.js");


var validator = {
    validatePerson: person => {
        let errors = []
        console.log(person)
        //En la fecha la valido enviando la fecha y las limitantes de años, seria entre 110 años desde el año actual y 2 años desde el año actual.
        if ((!validate.isoDate(person._fechaNac) || !validate.fechaNacimiento(person._fechaNac, 2, 110)) && !!person._fechaNac !== false) {
            errors.push("Fecha Nacimiento")
        }
        if (!validate.dni(person._dni.toString())) {
            errors.push("D.N.I.")
        }
        if (!validate.email(person._mail) && !!person._mail !== false) {
            errors.push("mail")
        }
        if (!validate.sinNumeros(person._nombre)) {
            errors.push("nombre")
        }
        if (!validate.sinNumeros(person._apellido)) {
            errors.push("apellido")
        }
        if (!validate.soloNumeros(person._telPrincipal) && !!person._telSecundario !== false) {
            errors.push("teléfono principal")
        }
        if (!validate.soloNumeros(person._telSecundario) && !!person._telSecundario !== false) {
            errors.push("teléfono secundario")
        }
        if (errors.length > 0) {
            throw new SgatError("La persona no es valida", 400, errors)
        }
        return Promise.resolve()
    }
};

exports.validator = validator