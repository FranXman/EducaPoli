document.getElementById('quizForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Mostrar explicaciones
    document.querySelectorAll('.form-check-input').forEach(input => {
        if (input.checked) {
            const questionNum = input.name.replace('q', '');
            document.getElementById(`exp${questionNum}`).style.display = 'block';
        }
    });

    // Calcular puntaje (ejemplo básico)
    const correctAnswers = {
        'q1': 'a',
        'q2': 'b',
        // Añadir más respuestas correctas
    };

    let score = 0;
    Object.keys(correctAnswers).forEach(q => {
        const selected = document.querySelector(`input[name="${q}"]:checked`);
        if (selected && selected.value === correctAnswers[q]) {
            score++;
        }
    });

    const total = Object.keys(correctAnswers).length;
    const percentage = Math.round((score / total) * 100);
    
    const progressBar = document.getElementById('progressBar');
    progressBar.style.width = `${percentage}%`;
    progressBar.textContent = `${percentage}%`;

    const messages = document.getElementById('messages');
    messages.innerHTML = `
        <p>Acertaste ${score} de ${total} preguntas</p>
        ${getFeedback(percentage)}
    `;

    document.getElementById('result').style.display = 'block';
});

function getFeedback(percentage) {
    if (percentage >= 80) {
        return `<div class="alert alert-success">
            ¡Excelente conocimiento! Recuerda que la política es dinámica y siempre hay que mantenerse informado.
        </div>`;
    } else if (percentage >= 50) {
        return `<div class="alert alert-warning">
            Tienes conocimientos básicos. Te recomiendo revisar la sección de historia y conceptos para profundizar.
        </div>`;
    } else {
        return `<div class="alert alert-danger">
            Es importante seguir aprendiendo. Visita la sección de enseñanza para mejorar tus conocimientos políticos.
        </div>`;
    }
}