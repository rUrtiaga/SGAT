class SgatError extends Error {
  constructor(m, n) {
    super(m);
    this.status = n;
  }
}

exports.SgatError = SgatError