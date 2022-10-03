const repository = require ('../src/repositories/exchange')

var resultado = repository.getById(1)
var esperado = 5
console.assert(resultado != esperado)