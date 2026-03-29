/**
 * Business Visitor Specific Logic
 */

class BusinessInviter extends CanadaInviter {
    constructor() {
        super('business', { 
            companyName: '',
            registrationNumber: '',
            hostJob: '', // Exec Rank
            financialResponsibility: 'Canadian Company will cover all expenses'
        });
        this.renderGuests();
    }

    updatePreview() {
        const data = this.formData;
        const today = new Date().toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' });
        
        let letter = `
            <div style="font-family: serif; color: #333; line-height: 1.6;">
                <div style="margin-bottom: 40px; border-bottom: 2px solid #ef4444; padding-bottom: 20px;">
                    <h2 style="margin: 0; color: #ef4444; text-transform: uppercase; letter-spacing: 2px;">Business Invitation</h2>
                    <p style="margin: 5px 0 0 0; font-size: 0.9em; color: #666;">Corporate Support for Business Visitors</p>
                </div>

                <div style="margin-bottom: 30px;">
                    <strong>Date:</strong> ${today}<br>
                    <strong>Issuer:</strong> ${data.companyName || '[Company Name]'}<br>
                    <strong>Business Registration No:</strong> ${data.registrationNumber || '[BN No.]'}
                </div>

                <div style="margin-bottom: 30px;">
                    <strong>To:</strong><br>
                    The Visa Officer<br>
                    Immigration, Refugees and Citizenship Canada (IRCC)
                </div>

                <p><strong>RE: BUSINESS LETTER OF INVITATION FOR ${data.guests.map(g => g.name.toUpperCase() || '[DELEGATE]').join(', ')}</strong></p>

                <p>Dear Visa Officer,</p>

                <p>On behalf of <strong>${data.companyName || '[Company Name]'}</strong>, I am writing to formally invite the following business delegates to visit our operations in Canada:</p>

                <ul style="margin-bottom: 20px;">
                    ${data.guests.map((g, i) => `
                        <li style="margin-bottom: 10px;">
                            <strong>${g.name || '[Name]'}</strong> (Born: ${g.dob || '[DOB]'})<br>
                            Passport Number: ${g.passport || '[Passport]'}
                        </li>
                    `).join('')}
                </ul>

                <h3 style="border-bottom: 1px solid #eee; padding-bottom: 5px; margin-top: 30px;">Purpose of Visit</h3>
                <p>Our company is inviting these delegates for the purpose of <strong>${data.visitPurpose || 'business meetings and consultations'}</strong>. They are expected to arrive in Canada on ${data.visitStart || '[Start Date]'} and conclude their visit by ${data.visitEnd || '[End Date]'}.</p>

                <h3 style="border-bottom: 1px solid #eee; padding-bottom: 5px; margin-top: 30px;">Financial Arrangements</h3>
                <p><strong>${data.financialResponsibility}</strong>. We confirm that the delegates will return to their country of origin upon completion of their business activities.</p>

                <p>This invitation is issued by <strong>${data.hostName || '[Officer Name]'}</strong>, in their capacity as ${data.hostJob || '[Title]'}, located at our office: ${data.hostAddress || '[Company Address]'}. You may verify this invitation by contacting us at ${data.hostPhone || '[Phone]'} or via corporate email at ${data.hostEmail || '[Email]'}.</p>

                <div style="margin-top: 50px;">
                    <p>Sincerely,</p>
                    <br><br>
                    <p>__________________________<br>
                    <strong>${data.hostName || '[Name]'}</strong><br>
                    ${data.hostJob || '[Title]'}<br>
                    ${data.companyName || '[Company Name]'}</p>
                    <div style="margin-top: 10px; color: #999; font-size: 0.8em;">(Corporate Seal Required)</div>
                </div>
            </div>
        `;

        if (data.useNotary) {
            letter += `<br><br><div style="border-top: 1px dashed #ccc; padding-top: 20px; margin-top: 40px;">
                <strong>NOTARY / CORPORATE SEAL ACKNOWLEDGEMENT</strong><br><br>
                Verified by: ________________________________<br>
                Date: _________________<br>
                (Seal Required)
            </div>`;
        }

        this.previewEl.innerHTML = letter.trim();
    }
}

const inviter = new BusinessInviter();
