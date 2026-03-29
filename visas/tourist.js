/**
 * Tourist / Visitor Visa Specific Logic
 */

class TouristInviter extends CanadaInviter {
    constructor() {
        const urlParams = new URLSearchParams(window.location.search);
        const type = urlParams.get('type') || 'tourist';
        
        let purpose = 'Tourism and visiting family';
        if (type === 'event') purpose = 'Attending a graduation/wedding';
        if (type === 'medical') purpose = 'Accompanying a patient for medical treatment';
        if (type === 'student') purpose = 'Visiting a student/worker on a valid permit';

        super(type, { visitPurpose: purpose });
        this.renderGuests();
    }

    updatePreview() {
        const data = this.formData;
        const today = new Date().toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' });
        
        let letter = `
            <div style="font-family: serif; color: #333; line-height: 1.6;">
                <div style="margin-bottom: 40px; border-bottom: 2px solid #ef4444; padding-bottom: 20px;">
                    <h2 style="margin: 0; color: #ef4444; text-transform: uppercase; letter-spacing: 2px;">Invitation Letter</h2>
                    <p style="margin: 5px 0 0 0; font-size: 0.9em; color: #666;">Canada Temporary Resident Visa Support</p>
                </div>

                <div style="margin-bottom: 30px;">
                    <strong>Date:</strong> ${today}<br>
                    <strong>From:</strong> ${data.hostName || '[Host Name]'}<br>
                    <strong>Address:</strong> ${data.hostAddress || '[Address]'}, ${data.hostCity || '[City]'}, ${data.hostProvince}<br>
                    <strong>Contact:</strong> ${data.hostPhone || '[Phone]'} | ${data.hostEmail || '[Email]'}
                </div>

                <div style="margin-bottom: 30px;">
                    <strong>To:</strong><br>
                    The Visa Officer<br>
                    Immigration, Refugees and Citizenship Canada (IRCC)<br>
                    Consular Section
                </div>

                <p><strong>RE: LETTER OF INVITATION FOR ${data.guests.map(g => g.name.toUpperCase() || '[VISITOR]').join(', ')}</strong></p>

                <p>Dear Visa Officer,</p>

                <p>I, ${data.hostName || '[Host Name]'}, born on ${data.hostDob || '[Host DOB]'}, am writing this letter to formally invite the following individuals to visit me in Canada:</p>

                <ul style="margin-bottom: 20px;">
                    ${data.guests.map((g, i) => `
                        <li style="margin-bottom: 15px;">
                            <strong>${g.name || '[Guest Name]'}</strong> (Born: ${g.dob || '[DOB]'})<br>
                            Address: ${g.address || '[Address]'}<br>
                            Passport No: ${g.passport || '[Passport]'} | Relationship: ${g.relationship || '[Relationship]'}
                        </li>
                    `).join('')}
                </ul>

                <p>I am a ${data.hostStatus} residing in ${data.hostCity}, ${data.hostProvince}. I am currently employed as a <strong>${data.hostJob || '[Job Title]'}</strong> at <strong>${data.hostEmployer || '[Employer Name]'}</strong>.</p>

                <h3 style="border-bottom: 1px solid #eee; padding-bottom: 5px; margin-top: 30px;">Trip Details</h3>
                <p>The purpose of the visit is ${data.visitPurpose.toLowerCase() || 'tourism and visiting family'}. My guests plan to arrive on ${data.visitStart || '[Start Date]'} and depart on ${data.visitEnd || '[End Date]'}. During this stay, they will reside at ${data.stayAddress || data.hostAddress || '[Stay Address]'}.</p>

                <h3 style="border-bottom: 1px solid #eee; padding-bottom: 5px; margin-top: 30px;">Financial Arrangements</h3>
                <p>${data.financialResponsibility === 'Host will cover all expenses' 
                ? `I will be fully responsible for all costs associated with this trip, including airfare, accommodation, and daily living expenses. I have attached my financial documents to demonstrate my ability to provide this support.` 
                : `All costs related to this visit, including transportation and living expenses, will be covered by the guests. I will provide accommodation at my residence for the duration of the stay.`}</p>

                <p>My household currently consists of ${data.hostHouseholdSize} person(s)${data.hostDependents ? ` (including my dependents: ${data.hostDependents})` : ''}.</p>

                <p>I confirm that all information provided is true and that my guests intend to return to their home country before their visa expires. Should you require any further information, please do not hesitate to contact me.</p>

                <div style="margin-top: 50px;">
                    <p>Sincerely,</p>
                    <br><br>
                    <p>__________________________<br>
                    <strong>${data.hostName || '[Host Name]'}</strong></p>
                </div>
            </div>
        `;

        if (data.useFrench) {
            letter = `
            <div style="font-family: serif; color: #333; line-height: 1.6;">
                <div style="margin-bottom: 40px; border-bottom: 2px solid #ef4444; padding-bottom: 20px;">
                    <h2 style="margin: 0; color: #ef4444; text-transform: uppercase; letter-spacing: 2px;">Lettre d'invitation</h2>
                    <p style="margin: 5px 0 0 0; font-size: 0.9em; color: #666;">Soutien au visa de résident temporaire du Canada</p>
                </div>

                <div style="margin-bottom: 30px;">
                    <strong>Date:</strong> ${today}<br>
                    <strong>De:</strong> ${data.hostName || '[Nom de l\'hôte]'}<br>
                    <strong>Adresse:</strong> ${data.hostAddress || '[Adresse]'}, ${data.hostCity || '[Ville]'}, ${data.hostProvince}<br>
                    <strong>Contact:</strong> ${data.hostPhone || '[Téléphone]'} | ${data.hostEmail || '[Courriel]'}
                </div>

                <div style="margin-bottom: 30px;">
                    <strong>À l'attention de:</strong><br>
                    L'Agent des Visas<br>
                    Immigration, Réfugiés et Citoyenneté Canada (IRCC)<br>
                    Section Consulaire
                </div>

                <p><strong>OBJET : LETTRE D'INVITATION POUR ${data.guests.map(g => g.name.toUpperCase() || '[VISITEUR]').join(', ')}</strong></p>

                <p>Madame, Monsieur l'Agent des Visas,</p>

                <p>Je soussigné(e), ${data.hostName || '[Nom de l\'hôte]'}, né(e) le ${data.hostDob || '[Date de naissance]'}, écris cette lettre pour inviter formellement les personnes suivantes à me rendre visite au Canada :</p>

                <ul style="margin-bottom: 20px;">
                    ${data.guests.map((g, i) => `
                        <li style="margin-bottom: 15px;">
                            <strong>${g.name || '[Nom de l\'invité]'}</strong> (Né(e) le : ${g.dob || '[Date de naissance]'})<br>
                            Adresse : ${g.address || '[Adresse]'}<br>
                            Passeport No : ${g.passport || '[Passeport]'} | Lien de parenté : ${g.relationship || '[Lien]'}
                        </li>
                    `).join('')}
                </ul>

                <p>Je suis ${data.hostStatus} résidant à ${data.hostCity}, ${data.hostProvince}. Je suis actuellement employé(e) en tant que <strong>${data.hostJob || '[Titre du poste]'}</strong> chez <strong>${data.hostEmployer || '[Nom de l\'employeur]'}</strong>.</p>

                <h3 style="border-bottom: 1px solid #eee; padding-bottom: 5px; margin-top: 30px;">Détails du voyage</h3>
                <p>Le but de la visite est ${data.visitPurpose.toLowerCase() || 'tourisme et visite familiale'}. Mes invités prévoient d'arriver le ${data.visitStart || '[Date d\'arrivée]'} et de repartir le ${data.visitEnd || '[Date de départ]'}. Pendant ce séjour, ils résideront au ${data.stayAddress || data.hostAddress || '[Adresse du séjour]'}.</p>

                <h3 style="border-bottom: 1px solid #eee; padding-bottom: 5px; margin-top: 30px;">Dispositions financières</h3>
                <p>${data.financialResponsibility === 'Host will cover all expenses' 
                ? `Je serai entièrement responsable de tous les frais associés à ce voyage, y compris le transport aérien, l'hébergement et les dépenses quotidiennes. J'ai joint mes documents financiers pour démontrer ma capacité à fournir ce soutien.` 
                : `Tous les frais liés à cette visite, y compris le transport et les frais de subsistance, seront pris en charge par les invités. Je fournirai l'hébergement à ma résidence pendant toute la durée du séjour.`}</p>

                <p>Mon ménage se compose actuellement de ${data.hostHouseholdSize} personne(s)${data.hostDependents ? ` (y compris mes personnes à charge : ${data.hostDependents})` : ''}.</p>

                <p>Je confirme que tous les renseignements fournis sont exacts et que mes invités ont l'intention de retourner dans leur pays d'origine avant l'expiration de leur visa. N'hésitez pas à me contacter pour toute information complémentaire.</p>

                <div style="margin-top: 50px;">
                    <p>Cordialement,</p>
                    <br><br>
                    <p>__________________________<br>
                    <strong>${data.hostName || '[Nom de l\'hôte]'}</strong></p>
                </div>
            </div>
            `;
        }

        if (data.useNotary) {
            letter += `<br><br><div style="border-top: 1px dashed #ccc; padding-top: 20px; margin-top: 40px;">
                <strong>NOTARY PUBLIC ACKNOWLEDGEMENT</strong><br><br>
                Sworn before me at the city of ____________, in the province of ____________, this _____ day of ____________, 20____.<br><br><br>
                __________________________________<br>
                Signature of Notary Public / Commissioner for Oaths
            </div>`;
        }

        this.previewEl.innerHTML = letter.trim();
    }
}

const inviter = new TouristInviter();
