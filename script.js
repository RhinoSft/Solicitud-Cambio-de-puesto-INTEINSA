// URL del formulario de Google
const googleFormUrl = "https://forms.gle/aqS1opXEj6tJxAvj8";

// Definir asientos para cada piso
const pisosAsientos = {
    piso4: Array.from({ length: 40 }, (_, i) => `4-${i + 1}`),
    piso5: Array.from({ length: 22 }, (_, i) => `5-${i + 41}`)
};

// Para almacenar los puestos seleccionados (simulado)
const puestosSeleccionados = new Set();

// Cambiar la imagen de fondo y los botones según el piso
const fondoPiso = document.getElementById('fondoPiso');
const botonesContainer = document.getElementById('botonesContainer');

// Función para crear botones de los puestos
function crearBotones(piso) {
    botonesContainer.innerHTML = ''; // Limpiar botones anteriores
    pisosAsientos[piso].forEach(puesto => {
        const boton = document.createElement('button');
        boton.textContent = puesto;
        boton.onclick = () => seleccionarPuesto(puesto, boton);
        // Deshabilitar los botones de los puestos ya seleccionados
        if (puestosSeleccionados.has(puesto)) {
            boton.disabled = true;
            boton.style.backgroundColor = "gray";
            boton.innerText = 'Puesto Ocupado';
        }
        botonesContainer.appendChild(boton);
    });
}

// Función para manejar la selección de un puesto
function seleccionarPuesto(puesto, boton) {
    const respuesta = confirm(`¿Deseas seleccionar el puesto ${puesto}?`);
    if (respuesta) {
        // Cambiar el color del botón a rojo
        boton.style.backgroundColor = "red";
        boton.disabled = true; // Deshabilitar el botón después de seleccionarlo
        boton.innerText = 'Puesto Seleccionado'; // Cambiar el texto del botón
        puestosSeleccionados.add(puesto); // Agregar el puesto a la lista de seleccionados

        // Guardar la selección en un archivo (simulado en el navegador)
        console.log(`Puesto ${puesto} seleccionado`);

        // Redirigir al formulario de Google
        window.open(googleFormUrl, '_blank');
    }
}

// Cambiar de piso
function cambiarPiso(piso) {
    if (piso === 'piso4') {
        fondoPiso.src = 'imagenes/piso4.png';
    } else if (piso === 'piso5') {
        fondoPiso.src = 'imagenes/piso5.png';
    }
    crearBotones(piso);
}

// Botones de control
document.getElementById('piso4Btn').addEventListener('click', () => cambiarPiso('piso4'));
document.getElementById('piso5Btn').addEventListener('click', () => cambiarPiso('piso5'));

// Botón de salir
document.getElementById('salirBtn').addEventListener('click', () => {
    if (confirm("¿Estás seguro de que deseas salir?")) {
        // Intentar cerrar la ventana
        const cerrada = window.close();
        if (!cerrada) {
            alert("El navegador no permite cerrar esta ventana automáticamente. Por favor, ciérrala manualmente.");
        }
    }
});

// Inicializar con el piso 4
cambiarPiso('piso4');
