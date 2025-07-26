document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Definición de los datos de la malla curricular ---
    // Cada objeto representa un ramo con su id, nombre, semestre y requisitos.
    // Los 'requisitos' son un array de 'id's de los ramos que se deben aprobar primero.
    const mallaData = [
        // Semestre 1
        { id: 'esdh', nombre: 'Educación Sociedad y Desarrollo Humano', semestre: 1, requisitos: [] },
        { id: 'aap', nombre: 'Alfabetización Académica en Pedagogía', semestre: 1, requisitos: [] },
        { id: 'qg1', nombre: 'Química General I', semestre: 1, requisitos: [] },
        { id: 'bbc', nombre: 'Biología Básica y Celular', semestre: 1, requisitos: [] },
        { id: 'ig', nombre: 'Introducción a la Geofísica', semestre: 1, requisitos: [] },
        { id: 'm1', nombre: 'Matemática I', semestre: 1, requisitos: [] },
        // Semestre 2
        { id: 'lpd', nombre: 'La Profesión Docente', semestre: 2, requisitos: ['esdh'] },
        { id: 'tia', nombre: 'Tecnologías de Información en el Aula', semestre: 2, requisitos: [] },
        { id: 'qg2', nombre: 'Química General II', semestre: 2, requisitos: ['qg1', 'm1'] },
        { id: 'bi', nombre: 'Biología Integral', semestre: 2, requisitos: ['bbc'] },
        { id: 'm2', nombre: 'Matemática II', semestre: 2, requisitos: ['m1'] },
        { id: 'f1', nombre: 'Física I', semestre: 2, requisitos: ['ig'] },
        // Semestre 3
        { id: 'ies', nombre: 'Inclusión y Exclusión Social en la Educación', semestre: 3, requisitos: ['lpd', 'aap'] },
        { id: 'e1', nombre: 'Electivo I', semestre: 3, requisitos: [] },
        { id: 'qob', nombre: 'Química Orgánica Básica', semestre: 3, requisitos: ['qg2'] },
        { id: 'rn', nombre: 'Recursos Naturales', semestre: 3, requisitos: ['bi'] },
        { id: 'cv', nombre: 'Cálculo en una Variable', semestre: 3, requisitos: ['m2'] },
        { id: 'f2', nombre: 'Física II', semestre: 3, requisitos: ['f1'] },
        // Semestre 4
        { id: 'pe', nombre: 'Psicología Educativa', semestre: 4, requisitos: ['ies'] },
        { id: 'e2', nombre: 'Electivo II', semestre: 4, requisitos: [] },
        { id: 'bq', nombre: 'Bioquímica', semestre: 4, requisitos: ['qob'] },
        { id: 'bhs', nombre: 'Biología Humana y Salud', semestre: 4, requisitos: ['bi'] },
        { id: 'est', nombre: 'Estadística', semestre: 4, requisitos: ['cv'] },
        { id: 'oo', nombre: 'Ondas y Óptica', semestre: 4, requisitos: ['f2'] },
        // Semestre 5
        { id: 'tdc', nombre: 'Teorías y Diseños Curriculares', semestre: 5, requisitos: ['pe', 'tia', 'qg2', 'bi', 'm2', 'f1'] },
        { id: 'aole', nombre: 'Análisis Organizacional y Liderazgo Educativo', semestre: 5, requisitos: ['pe'] },
        { id: 'pi-gpc', nombre: 'Práctica Inicial: Gestión de los Procesos Curriculares', semestre: 5, requisitos: ['pe', 'tia', 'qg2', 'bi', 'm2', 'f1'] },
        { id: 'zoo', nombre: 'Zoología', semestre: 5, requisitos: ['rn'] },
        { id: 'bot', nombre: 'Botánica', semestre: 5, requisitos: ['rn'] },
        { id: 'hh', nombre: 'Histología Humana', semestre: 5, requisitos: ['bhs'] },
        { id: 'c1', nombre: 'Complementario I', semestre: 5, requisitos: [] },
        // Semestre 6
        { id: 'epa', nombre: 'Evaluación para el Aprendizaje', semestre: 6, requisitos: ['tdc', 'pi-gpc'] },
        { id: 'pi1-ofi', nombre: 'Práctica Intermedia I: Orientación para la Formación Integral', semestre: 6, requisitos: ['tdc', 'aole', 'pi-gpc'] },
        { id: 'e3', nombre: 'Electivo III', semestre: 6, requisitos: [] },
        { id: 'ad', nombre: 'Anatomía Descriptiva', semestre: 6, requisitos: ['hh'] },
        { id: 'eco', nombre: 'Ecología', semestre: 6, requisitos: ['zoo', 'bot'] },
        { id: 'gg', nombre: 'Genética General', semestre: 6, requisitos: ['bq', 'est'] },
        // Semestre 7
        { id: 'fpde', nombre: 'Fundamentos y Principios Didácticos de la Especialidad', semestre: 7, requisitos: ['epa', 'pi1-ofi', 'ad', 'eco', 'gg', 'zoo', 'bot', 'hh', 'bq', 'bhs', 'est', 'oo', 'qob', 'rn', 'cv', 'f2', 'qg2', 'bi', 'm2', 'f1', 'qg1', 'bbc', 'ig', 'm1'] },
        { id: 'oe', nombre: 'Orientación Educacional', semestre: 7, requisitos: ['epa', 'aole'] },
        { id: 'pi2-de', nombre: 'Práctica Intermedia II: Didáctica de la Especialidad', semestre: 7, requisitos: ['epa', 'pi1-ofi', 'ad', 'eco', 'gg', 'zoo', 'bot', 'hh', 'bq', 'bhs', 'est', 'oo', 'qob', 'rn', 'cv', 'f2', 'qg2', 'bi', 'm2', 'f1', 'qg1', 'bbc', 'ig', 'm1'] },
        { id: 'fh1', nombre: 'Fisiología Humana I', semestre: 7, requisitos: ['ad', 'hh'] },
        { id: 'bd', nombre: 'Biología del Desarrollo', semestre: 7, requisitos: ['gg'] },
        { id: 'bmig', nombre: 'Biología Molecular e Ingeniería Genética', semestre: 7, requisitos: ['gg'] },
        // Semestre 8
        { id: 'mie', nombre: 'Métodos de la Investigación Educacional', semestre: 8, requisitos: ['fpde', 'pi2-de'] },
        { id: 'dide', nombre: 'Diseño e Implementación didáctica en la Especialidad', semestre: 8, requisitos: ['fpde', 'pi2-de'] },
        { id: 'pa-dde', nombre: 'Práctica Avanzada: Diseños Didácticos de la Especialidad', semestre: 8, requisitos: ['fpde', 'pi2-de'] },
        { id: 'fh2', nombre: 'Fisiología Humana II', semestre: 8, requisitos: ['fh1'] },
        { id: 'pev', nombre: 'Principios de la Evolución', semestre: 8, requisitos: ['eco', 'gg'] },
        { id: 'fv', nombre: 'Fisiología Vegetal', semestre: 8, requisitos: ['bot', 'bq'] },
        { id: 'pba', nombre: 'Proyecto de Biotecnología en el Aula', semestre: 8, requisitos: ['fh1', 'bd', 'bmig', 'ad', 'eco', 'gg', 'zoo', 'bot', 'hh', 'bhs', 'est', 'oo', 'bq', 'qob', 'f2', 'cv', 'rn', 'qg2', 'bi', 'm2', 'f1', 'qg1', 'bbc', 'm1', 'ig'] },
        // Semestre 9
        { id: 'pp-ojc', nombre: 'Práctica Profesional en Orientación y Jefatura de Curso', semestre: 9, requisitos: ['mie', 'dide', 'pa-dde'] },
        { id: 'pp-e', nombre: 'Práctica Profesional de la Especialidad', semestre: 9, requisitos: ['mie', 'dide', 'pa-dde'] },
        { id: 'tt', nombre: 'Trabajo de Titulación', semestre: 9, requisitos: ['mie', 'dide', 'pa-dde'] },
    ];
    
    const container = document.getElementById('malla-container');
    const notificacion = document.getElementById('notificacion');
    let ramosAprobados = new Set();

    // --- 2. Funciones principales ---

    /**
     * Genera el HTML de la malla a partir de los datos.
     */
    function renderMalla() {
        // Agrupar ramos por semestre
        const semestres = {};
        mallaData.forEach(ramo => {
            if (!semestres[ramo.semestre]) {
                semestres[ramo.semestre] = [];
            }
            semestres[ramo.semestre].push(ramo);
        });

        // Crear las columnas de los semestres
        for (const semestre in semestres) {
            const semestreCol = document.createElement('div');
            semestreCol.className = 'semestre';
            semestreCol.innerHTML = `<h2>Semestre ${semestre}</h2>`;
            
            semestres[semestre].forEach(ramo => {
                const ramoDiv = document.createElement('div');
                ramoDiv.className = 'ramo';
                ramoDiv.id = ramo.id;
                ramoDiv.textContent = ramo.nombre;
                // Guardamos los requisitos en un atributo data para fácil acceso
                ramoDiv.dataset.requisitos = JSON.stringify(ramo.requisitos);
                semestreCol.appendChild(ramoDiv);
            });
            container.appendChild(semestreCol);
        }
    }

    /**
     * Carga el estado de los ramos aprobados desde localStorage.
     */
    function cargarEstado() {
        const guardados = JSON.parse(localStorage.getItem('ramosAprobados')) || [];
        ramosAprobados = new Set(guardados);
        ramosAprobados.forEach(id => {
            const ramoEl = document.getElementById(id);
            if (ramoEl) {
                ramoEl.classList.add('aprobado');
            }
        });
    }

    /**
     * Guarda el conjunto de ramos aprobados en localStorage.
     */
    function guardarEstado() {
        localStorage.setItem('ramosAprobados', JSON.stringify([...ramosAprobados]));
    }

    /**
     * Actualiza el estado visual (bloqueado/desbloqueado) de todos los ramos.
     */
    function actualizarEstadoBloqueo() {
        mallaData.forEach(ramo => {
            if (ramosAprobados.has(ramo.id)) return; // Si ya está aprobado, no hacer nada

            const ramoEl = document.getElementById(ramo.id);
            const requisitos = JSON.parse(ramoEl.dataset.requisitos);
            
            // Comprueba si todos los requisitos están en el conjunto de aprobados
            const requisitosCumplidos = requisitos.every(reqId => ramosAprobados.has(reqId));

            if (requisitosCumplidos) {
                ramoEl.classList.remove('bloqueado');
            } else {
                ramoEl.classList.add('bloqueado');
            }
        });
    }

    /**
     * Muestra una notificación en pantalla.
     * @param {string} mensaje - El texto a mostrar.
     * @param {number} duracion - Duración en milisegundos.
     */
    function mostrarNotificacion(mensaje, duracion = 4000) {
        notificacion.textContent = mensaje;
        notificacion.classList.add('visible');
        setTimeout(() => {
            notificacion.classList.remove('visible');
        }, duracion);
    }
    
    // --- 3. Lógica de eventos ---

    /**
     * Maneja el evento de clic en un ramo.
     * @param {Event} e - El objeto del evento.
     */
    function handleRamoClick(e) {
        const ramoEl = e.target.closest('.ramo');
        if (!ramoEl) return;

        const id = ramoEl.id;
        const requisitos = JSON.parse(ramoEl.dataset.requisitos);
        
        // Verifica si el ramo está bloqueado
        if (ramoEl.classList.contains('bloqueado')) {
            const faltantes = requisitos
                .filter(reqId => !ramosAprobados.has(reqId))
                .map(reqId => document.getElementById(reqId).textContent);

            mostrarNotificacion(`Requisito(s) pendiente(s): ${faltantes.join(', ')}`);
            return;
        }

        // Alternar el estado de aprobación
        if (ramosAprobados.has(id)) {
            ramosAprobados.delete(id);
            ramoEl.classList.remove('aprobado');
        } else {
            ramosAprobados.add(id);
            ramoEl.classList.add('aprobado');
        }

        // Guardar y actualizar la UI después del cambio
        guardarEstado();
        actualizarEstadoBloqueo();
    }


    // --- 4. Inicialización ---

    renderMalla(); // Dibuja la malla en la página
    cargarEstado(); // Carga el progreso guardado
    actualizarEstadoBloqueo(); // Establece el estado inicial de bloqueo
    container.addEventListener('click', handleRamoClick); // Agrega el listener de clics

});
