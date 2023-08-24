const FacadesClass = require('./FacadesClass');
let facadesInstance = null;
facadesInstance = facadesInstance ? facadesInstance : new FacadesClass();
module.exports = facadesInstance;
