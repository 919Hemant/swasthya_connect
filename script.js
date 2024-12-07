document.addEventListener('DOMContentLoaded', () => {
    const addMedicineBtn = document.getElementById('addMedicineBtn');
    const modal = document.getElementById('modal');
    const addMedicineForm = document.getElementById('addMedicineForm');
    const medicineList = document.getElementById('medicineList');
    const recommendation = document.getElementById('recommendation');
    
    let medicines = JSON.parse(localStorage.getItem('medicines')) || [];
    
    function renderMedicines() {
    medicineList.innerHTML = '';
    medicines.forEach((medicine, index) => {
    const medicineCard = document.createElement('div');
    medicineCard.classList.add('medicine-card');
    medicineCard.innerHTML = `
    <h3 class="medicine-name">${medicine.name}</h3>
    <p>Schedule: ${medicine.schedule}</p>
    <p>Time: ${medicine.timeOfDay.join(', ')}</p>
    <p>Dosage: ${medicine.dosage}</p>
    ${medicine.notes ? `<p>Notes: ${medicine.notes}</p>` : ''}
    <button class="btn-delete" data-index="${index}">
    <i class="fas fa-trash"></i> Delete
    </button>
    `;
    medicineList.appendChild(medicineCard);
    });
    provideRecommendations();
    }
    
    function saveMedicines() {
    localStorage.setItem('medicines', JSON.stringify(medicines));
    }
    
    function provideRecommendations() {
    if (medicines.length === 0) {
    recommendation.innerHTML = '<p>No recommendations available. Add some medicines!</p>';
    return;
    }
    
    const recommendations = medicines.map(medicine => {
    return `Consider taking ${medicine.name} as per the prescribed schedule.`;
    }).join('<br>');
    
    recommendation.innerHTML = `<h3>Recommendations:</h3><p>${recommendations}</p>`;
    }
    
    addMedicineBtn.addEventListener('click', () => {
    modal.style.display = 'block';
    });
    
    window.addEventListener('click', (event) => {
    if (event.target === modal) {
    modal.style.display = 'none';
    }
    });
    
    addMedicineForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('medicineName').value;
    const schedule = document.getElementById('medicineSchedule').value;
    const dosage = document.getElementById('medicineDosage').value;
    const notes = document.getElementById('medicineNotes').value;
    const timeOfDay = Array.from(document.querySelectorAll('input[name="timeOfDay"]:checked')).map(input => input.value);
    
    medicines.push({ name, schedule, timeOfDay, dosage, notes });
    saveMedicines();
    renderMedicines();
    
    addMedicineForm.reset();
    modal.style.display = 'none';
    });
    
    medicineList.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-delete') || e.target.parentElement.classList.contains('btn-delete')) {
    const index = e.target.closest('.btn-delete').dataset.index;
    medicines.splice(index, 1);
    saveMedicines();
    renderMedicines();
    }
    });
    
    renderMedicines();
    });