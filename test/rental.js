const repository = require ('../src/repositories/rental')

var resultado = repository.getById(67)
var esperado = 5
console.assert(resultado != esperado)