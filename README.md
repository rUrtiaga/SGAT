# SGAT [![Build Status](https://travis-ci.org/rUrtiaga/SGAT.svg?branch=master)](https://travis-ci.org/rUrtiaga/SGAT)

[GitHub](https://github.com/rUrtiaga/SGAT/)

### Descripción

El S.G.A.T. (Sistema de gestion y administracion de talleres) está pensado para cumplir las necesidades de la Dirección de Cultura de la Municipalidad de General Belgrano.

### Tecnologias

- React
- JS (ES6)
- NodeJS

- [Heroku](https://sgat.herokuapp.com/talleres/) staging version

#### Organizacion

- [Trello](https://trello.com/b/9c0B1g0I/talleres-2)

## Ejecución

#### 🐋 Docker

```
$ docker-compose up
```

#### 💻 Develop

Debe tener un daemon mongodb en el puerto por defecto

```
$ git clone <repository>
$ cd sgat
$ npm install
$ npm run dev
```

#### 💻 Deploy

Debe tener un daemon mongodb en el puerto por defecto, sino reconfigurarlo

Setear la variable de entorno PROXY_API, con la dirección donde se encuentra alojado el servidor y el puerto en el que estará corriendo,por defecto el 3001.
ejemplo: http://127.0.0.1:3001

```
$ git clone <repository>
$ cd sgat
$ npm install
$ npm copyBuild
$ npm run server
```

#### Librerias externas

[React-alert](https://www.npmjs.com/package/react-alert) - notificaciones
[PDF-Make](https://www.npmjs.com/package/pdfmake) - impresion de pdfs
