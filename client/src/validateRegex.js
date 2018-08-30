
//Un objeto que le podes pedir que evalue si un string cumple para lo que queres: ej email.
export var validate = {
    email: value => value.match(/^$|^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i),
    dni: value => value.match(/^$|^\d{7,8}$/i) ,
    sinNumeros: value => value.match(/^$|^[A-z\s]+$/i),
    soloNumeros: value => value.match(/^$|^\d{6,}$/i) 
}