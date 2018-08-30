class SgatError extends Error {
  constructor(m, numeroStatus, listElementos) {
    super(m);
    this.status = numeroStatus;
    this.objectForClient = {message:this.message,listElementos}
  }
}

exports.SgatError = SgatError