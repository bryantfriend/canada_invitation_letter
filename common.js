/**
 * Common Utilities for Canada Inviter
 */

class CanadaInviter {
    constructor(visaType, initialData = {}) {
        this.currentStep = 1;
        this.totalSteps = 5;
        this.visaType = visaType;
        this.formData = {
            visaType: visaType,
            guests: [this.createGuest()],
            hostName: '', hostDob: '', hostAddress: '', hostCity: '', hostProvince: 'Ontario',
            hostPostalCode: '', hostPhone: '', hostEmail: '', hostStatus: 'Canadian Citizen',
            hostJob: '', hostEmployer: '', hostHouseholdSize: '1', hostDependents: '',
            visitPurpose: '', visitStart: '', visitEnd: '',
            stayAddress: '', financialResponsibility: 'Guest will cover all expenses',
            useNotary: false,
            useFrench: false,
            ...initialData
        };
        
        this.init();
    }

    createGuest() {
        return {
            name: '',
            dob: '',
            passport: '',
            relationship: '',
            address: ''
        };
    }

    init() {
        this.form = document.getElementById('visaForm');
        this.previewEl = document.getElementById('letterPreview');
        
        if (this.form) {
            this.form.addEventListener('input', (e) => {
                const name = e.target.name;
                const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
                
                if (name.startsWith('guest_')) {
                    const [_, index, field] = name.split('_');
                    this.formData.guests[index][field] = value;
                } else {
                    this.formData[name] = value;
                }
                
                this.updatePreview();
            });
        }

        // Initialize progress bar
        this.updateProgressBar();
    }

    addGuest() {
        this.formData.guests.push(this.createGuest());
        this.renderGuests();
        this.updatePreview();
    }

    removeGuest(index) {
        if (this.formData.guests.length > 1) {
            this.formData.guests.splice(index, 1);
            this.renderGuests();
            this.updatePreview();
        }
    }

    renderGuests() {
        const container = document.getElementById('guestsContainer');
        if (!container) return;

        container.innerHTML = '';
        this.formData.guests.forEach((guest, index) => {
            const guestHtml = `
                <div class="guest-entry p-6 border border-stone-100 rounded-2xl mb-6 bg-stone-50/50 relative animate-fade-in">
                    ${index > 0 ? `<button type="button" onclick="inviter.removeGuest(${index})" class="absolute top-4 right-4 text-stone-400 hover:text-red-500 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                    </button>` : ''}
                    <h4 class="text-xs font-black text-stone-400 uppercase tracking-widest mb-4">Guest #${index + 1}</h4>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="label-premium">Full Name</label>
                            <input type="text" name="guest_${index}_name" value="${guest.name}" placeholder="As on Passport" class="input-premium">
                        </div>
                        <div>
                            <label class="label-premium">Date of Birth</label>
                            <input type="date" name="guest_${index}_dob" value="${guest.dob}" class="input-premium">
                        </div>
                        <div>
                            <label class="label-premium">Passport Number</label>
                            <input type="text" name="guest_${index}_passport" value="${guest.passport}" class="input-premium">
                        </div>
                        <div>
                            <label class="label-premium">Relationship to You</label>
                            <input type="text" name="guest_${index}_relationship" value="${guest.relationship}" placeholder="e.g. Mother" class="input-premium">
                        </div>
                        <div class="md:col-span-2">
                            <label class="label-premium">Home Address</label>
                            <input type="text" name="guest_${index}_address" value="${guest.address}" class="input-premium">
                        </div>
                    </div>
                </div>
            `;
            container.insertAdjacentHTML('beforeend', guestHtml);
        });
    }

    changeStep(delta) {
        const next = this.currentStep + delta;
        if (next < 1 || next > this.totalSteps) return;

        document.querySelectorAll('.step-content').forEach(s => s.classList.add('hidden'));
        const nextStepEl = document.getElementById(`step${next}`);
        if (nextStepEl) nextStepEl.classList.remove('hidden');

        this.currentStep = next;
        this.updateProgressBar();

        document.getElementById('prevBtn').style.visibility = next === 1 ? 'hidden' : 'visible';
        const nextBtn = document.getElementById('nextBtn');
        if (next === this.totalSteps) {
            nextBtn.style.display = 'none';
        } else {
            nextBtn.style.display = 'flex';
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    updateProgressBar() {
        const progress = (this.currentStep / this.totalSteps) * 100;
        const bar = document.getElementById('progressBarInner');
        if (bar) bar.style.width = `${progress}%`;
    }

    downloadLetter() {
        const element = document.getElementById('letterPreview');
        const fileName = this.formData.guests[0] && this.formData.guests[0].name 
            ? this.formData.guests[0].name.replace(/\s/g, '_') 
            : 'Canada_Invitation';

        const opt = {
            margin:       [15, 15, 15, 15],
            filename:     `Invitation_Letter_${fileName}.pdf`,
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2, useCORS: true, letterRendering: true },
            jsPDF:        { unit: 'mm', format: 'letter', orientation: 'portrait' }
        };

        // New html2pdf implementation
        html2pdf().set(opt).from(element).save();
    }
    
    toggleLanguage() {
        this.formData.useFrench = !this.formData.useFrench;
        const btn = document.getElementById('langToggle');
        if (btn) btn.innerText = this.formData.useFrench ? 'Passer à l\'anglais' : 'Switch to French';
        this.updatePreview();
    }
}
