const correctAnswers = [
    "Mayor que",
    "Menor que",
    "Mayor o igual que",
    "Menor o igual que",
    "Igual",
    "Diferente"
];

const cuestionarioForm = document.getElementById('opciones');
const resultadoDiv = document.getElementById('resultado');
const historialList = document.getElementById('historial');

function cargarHistorial() {
    const historial = JSON.parse(sessionStorage.getItem('historial')) || [];
    historial.forEach(puntaje => {
        const li = document.createElement('li');
        li.textContent = `Puntaje: ${puntaje}`;
        historialList.appendChild(li);
    });
}

// Calcular puntaje
function calcularPuntaje() {
    let puntaje = 0;
    const respuestasUsuario = [...cuestionarioForm.querySelectorAll('input[name="operador"]:checked')].map(checkbox => checkbox.value);
    
    respuestasUsuario.forEach(respuesta => {
        if (correctAnswers.includes(respuesta)) {
            puntaje++;
        }
    });
    
    return puntaje;
}

// Manejar envío del formulario
cuestionarioForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar el envío tradicional
    const puntaje = calcularPuntaje();
    resultadoDiv.textContent = `Tu puntaje es: ${puntaje} / ${correctAnswers.length}`;
    
    // Guardar en historial
    const historial = JSON.parse(sessionStorage.getItem('historial')) || [];
    historial.push(puntaje);
    sessionStorage.setItem('historial', JSON.stringify(historial));

    // Actualizar la lista de resultados históricos
    historialList.innerHTML = ''; // Limpiar lista actual
    cargarHistorial(); // Cargar historial actualizado
});

// Cargar historial al inicio
cargarHistorial();