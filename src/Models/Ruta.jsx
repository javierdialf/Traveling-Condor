export class Ruta {
    constructor(id=null,nombre, puntosRutas=[], usuarioId ) {
      this.id=id;
      this.nombre = nombre;
      this.puntosRutas = puntosRutas;
      this.usuarioId = usuarioId
    }
}


export class RutaEnviar {
  constructor(nombre, puntosRutas=[], usuarioId ) {
    this.nombre = nombre;
    this.puntosRutas = puntosRutas;
    this.usuarioId = usuarioId
  }
}
