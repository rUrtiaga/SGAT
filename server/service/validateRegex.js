//Un objeto que le podes pedir que evalue si un string cumple para lo que queres: ej email.
var validate = {
  email: value => value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i),
  dni: value => value.match(/^\d{7,8}$/i),
  sinNumeros: value => value.match(/^[A-z\s]+$/i),
  soloNumeros: value => value.match(/^\d{5,}$/i),
  fechaNacimiento: (isoDate,restaCercana,restaLejana) => {
    let date = new Date(isoDate);
    let now = new Date()
    return  now.getFullYear() - restaCercana > date.getFullYear() && now.getFullYear() - restaLejana < date.getFullYear()
  }
};

exports.validate = validate;
