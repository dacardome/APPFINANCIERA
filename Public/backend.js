// Backend básico para cálculos financieros y almacenamiento

// Función para calcular el margen de ganancia
function calcularMargenGanancia(ingresos, costos) {
    if (ingresos === 0) return 0;
    return ((ingresos - costos) / ingresos) * 100;
}

// Función para calcular el ROI (Retorno sobre la inversión)
function calcularROI(ganancia, inversionInicial) {
    if (inversionInicial === 0) return 0;
    return (ganancia / inversionInicial) * 100;
}

// Función para calcular el punto de equilibrio
function calcularPuntoEquilibrio(costosFijos, precioUnitario, costoVariableUnitario) {
    if (precioUnitario <= costoVariableUnitario) return Infinity;
    return costosFijos / (precioUnitario - costoVariableUnitario);
}

// Exportar las funciones
module.exports = {
    calcularMargenGanancia,
    calcularROI,
    calcularPuntoEquilibrio
};
