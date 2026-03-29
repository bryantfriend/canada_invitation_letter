/**
 * Super Visa Specific Logic
 */

class SuperVisaInviter extends CanadaInviter {
    constructor() {
        super('super_visa', { 
            visitPurpose: 'Extended family visit under the Super Visa program',
            hasCosigner: false,
            cosignerName: '',
            cosignerJob: '',
            hostIncome: ''
        });
        this.renderGuests();
    }

    toggleCosigner() {
        const checked = document.getElementById('cosignerToggle').checked;
        const fields = document.getElementById('cosignerFields');
        if (checked) {
            fields.classList.remove('hidden');
        } else {
            fields.classList.add('hidden');
        }
        this.formData.hasCosigner = checked;
        this.updatePreview();
    }

    updatePreview() {
        const data = this.formData;
        const today = new Date().toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' });
        
        let letter = `
            <div style="font-family: serif; color: #333; line-height: 1.6;">
                <div style="margin-bottom: 40px; border-bottom: 2px solid #ef4444; padding-bottom: 20px;">
                    <h2 style="margin: 0; color: #ef4444; text-transform: uppercase; letter-spacing: 2px;">Super Visa Invitation</h2>
                    <p style="margin: 5px 0 0 0; font-size: 0.9em; color: #666;">Parent and Grandparent Super Visa Support</p>
                </div>

                <div style="margin-bottom: 30px;">
                    <strong>Date:</strong> ${today}<br>
                    <strong>Host:</strong> ${data.hostName || '[Host Name]'} ${data.hasCosigner ? `& ${data.cosignerName || '[Co-signer'}` : ''}<br>
                    <strong>Address:</strong> ${data.hostAddress || '[Address]'}, ${data.hostCity || '[City]'}<br>
                    <strong>Contact:</strong> ${data.hostPhone || '[Phone]'} | ${data.hostEmail || '[Email]'}
                </div>

                <div style="margin-bottom: 30px;">
                    <strong>To:</strong><br>
                    The Visa Officer<br>
                    Immigration, Refugees and Citizenship Canada (IRCC)
                </div>

                <p><strong>RE: SUPER VISA LETTER OF INVITATION FOR ${data.guests.map(g => g.name.toUpperCase() || '[VISITOR]').join(', ')}</strong></p>

                <p>Dear Visa Officer,</p>

                <p>I, ${data.hostName || '[Host Name]'}, born on ${data.hostDob || '[Host DOB]'}, ${data.hasCosigner ? `along with my spouse, ${data.cosignerName || '[Spouse Name]'},` : ''} am writing this letter to formally invite my ${data.guests.map(g => g.relationship || '[Parent/Grandparent]').join(' and ')}, ${data.guests.map(g => g.name || '[Guest Name]').join(', ')}, to visit us in Canada under the Super Visa program.</p>

                <h3 style="border-bottom: 1px solid #eee; padding-bottom: 5px; margin-top: 30px;">Host & Household Details</h3>
                <p>I am a ${data.hostStatus} residing at ${data.hostAddress}. I am employed as a <strong>${data.hostJob || '[Job Title]'}</strong> at <strong>${data.hostEmployer || '[Employer Name]'}</strong>. ${data.hasCosigner ? `My spouse is employed as a <strong>${data.cosignerJob || '[Job Title]'}</strong>.` : ''} Our total household size is <strong>${data.hostHouseholdSize} person(s)</strong>.</p>

                <h3 style="border-bottom: 1px solid #eee; padding-bottom: 5px; margin-top: 30px;">Financial Support & Insurance</h3>
                <p>We understand the financial requirements of the Super Visa. Our combined annual income is approximately <strong>$${data.hostIncome || '[Amount]'} CAD</strong>, which meets the Minimum Necessary Income (LICO) for our household size. We have attached our most recent Notice of Assessment (NOA) as proof of funds. Furthermore, we confirm that our guests have purchased, or will purchase, private medical insurance from a Canadian insurance company valid for at least one year with a minimum coverage of $100,000.</p>

                <h3 style="border-bottom: 1px solid #eee; padding-bottom: 5px; margin-top: 30px;">Trip Details</h3>
                <p>The purpose of the visit is an extended family stay. Our guests plan to arrive on ${data.visitStart || '[Start Date]'} and depart on ${data.visitEnd || '[End Date]'}. They will reside at our residence for the duration of their stay.</p>

                <p>We confirm that all information is true and that our guests intend to return to their home country at the end of their authorized stay. Should you have any questions, please contact me at ${data.hostPhone || '[Phone]'} or ${data.hostEmail || '[Email]'}.</p>

                <div style="margin-top: 50px; display: flex; gap: 40px;">
                    <div>
                        <p>__________________________<br>
                        <strong>${data.hostName || '[Host Name]'}</strong></p>
                    </div>
                    ${data.hasCosigner ? `
                    <div>
                        <p>__________________________<br>
                        <strong>${data.cosignerName || '[Co-signer]'}</strong></p>
                    </div>
                    ` : ''}
                </div>
            </div>
        `;

        if (data.useFrench) {
            letter = "<div style='font-family: serif;'>[Version française professionnelle...]</div>";
        }

        if (data.useNotary) {
            letter += `\n\n--------------------------------------------------\nNOTARY PUBLIC ACKNOWLEDGEMENT\n\nSworn before me at the city of ____________, in the province of ____________, this _____ day of ____________, 20____.\n\n\n__________________________________\nSignature of Notary Public / Commissioner for Oaths`;
        }

        this.previewEl.innerText = letter.trim();
    }
}

const inviter = new SuperVisaInviter();
