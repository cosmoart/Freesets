// Calculador de probabilidad
// 1% => 100 intentos
// 100% => 1 intento
// 50% => 2 intentos

function calcularProbabilidad (probabilidad) {
	const intentos = 100 / probabilidad;
	return intentos;
}

console.log(calcularProbabilidad(1));
console.log(calcularProbabilidad(50));
console.log(calcularProbabilidad(100));
console.log(calcularProbabilidad(0.3));