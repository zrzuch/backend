import { PdfReader } from 'pdfreader';
import { Field, ObjectType } from 'type-graphql';
import { Certification } from './Certification';
import { Education } from './Education';
import { Experience } from './Experience';

export class Resume {
    name?: string;
    address?: string;
    email?: string;
    phoneNumber?: string;
    linkedInPage?: string;
    summary?: string;
    skills?: string[];
    certifications?: Certification[];
    education?: Education[];
    experience?: Experience[];
    private _pdfText?: string[];
    private readonly _lowerCaseWordsInTitles = ['and', 'in', 'of'];

    // Must be constructed in the following order
    public async setFromPDF(filePath: string) {
        await this.parsePdf(filePath);
        this.combineSingleLetters();
        this.setSummary();
        this.setSkills();
        this.setCertifications();
        this.setEducation();
        this.setExperience();
        this._pdfText = undefined;
    }

    private setExperience(): void {
        this.experience = [];
        let experience: Experience = {};
        experience.summary = '';
        let i = this._pdfText.length - 1;
        let start = -1;
        while(this._pdfText[i].trim() !== "Experience" && i > 0) {
            const trimmed = this._pdfText[i].trim();
            switch (start) {
                case 1:
                    experience.company = trimmed;
                    ++start;
                    break;
                case 2:
                    experience.title = trimmed;
                    experience.summary = experience.summary.trim();
                    this.experience.push(experience);
                    start = -1;
                    experience = {};
                    experience.summary = '';
                    break;
                default:
                    const dates = this.splitDateRange(trimmed);
                    if (dates && (dates.length == 2 || dates.length == 1) && trimmed.includes(' - ')) {
                        experience.start = dates[0];
                        if (dates.length > 1) experience.end = dates[1];
                        start = 1;
                    } else {
                        experience.summary = trimmed + ' ' + experience.summary;
                    }
                    break;
            }
            --i;
        }
    }

    private setEducation(): void {
        let i = this._pdfText.length - 1;
        this.education = [];
        let education: Education = {};
        education.summary = '';
        let start = -1;
        let indicesToRemove: number[] = [];
        while (this._pdfText[i].trim() !== "Education" && i > 0) {
            const trimmed = this._pdfText[i].trim();
            if (start > 0) {
                switch (start) {
                    case 1:
                        education.degree = trimmed;
                        break;
                    case 2:
                        education.school = trimmed;
                        education.summary = education.summary.trim();
                        this.education.push(education);
                        education = {};
                        education.summary = '';
                        start = -1;
                        break;
                }
                ++start;
            } else {
                const dates = this.splitDateRange(trimmed);
                if (dates && (dates.length == 2 || dates.length == 1) && trimmed.includes(' - ') && trimmed.length < 20) {
                    education.start = dates[0];
                    if (dates.length > 1) education.end = dates[1];
                    start = 1;
                } else {
                    education.summary = trimmed + ' ' + education.summary;
                }
            }
            indicesToRemove.push(i);
            --i;
        }
        indicesToRemove.push(i);
        this._pdfText = this._pdfText.filter((value, index) => !indicesToRemove.includes(index));
    }

    private splitDateRange(s: string): string[] {
        return s.trim().match(/([A-Z]{1}[a-z]{2}[ ])?20[0-9]{2}/g);
    }

    // Requires issued date, id, company, and certification name
    private setCertifications(): void {
        this.certifications = [];
        let i = this._pdfText.length - 1;
        let indicesToRemove: number[] = [];
        indicesToRemove.push(i);
        let start = 0;
        let name: string;
        let company: string;
        let issued: string;
        let expires: string;
        let id: string;
        while(this._pdfText[i] !== "Licenses & Certifications" && i > 0) {
            if (start == 3) {
                name = this._pdfText[i];
                this.certifications.push({
                    name,
                    company,
                    issued,
                    expires,
                    id
                });
                name = undefined;
                company = undefined;
                issued = undefined;
                expires = undefined;
                id = undefined;
                start = 0;
            } else {
                if (start == 0) {
                    id = this._pdfText[i];
                } else if (start == 1) {
                    let range = this.splitDateRange(this._pdfText[i].trim());
                    if (range) {
                        if (range.length > 0) issued = range[0];
                        if (range.length > 1) expires = range[1];
                    }
                } else if (start == 2) {
                    company = this._pdfText[i].substring(3);
                }
                ++start;
            }
            --i;
            indicesToRemove.push(i);
        }
        this._pdfText = this._pdfText.filter((value, index) => !indicesToRemove.includes(index));
    }

    private setSkills(): void {
        this.skills = [];
        let start = -1;
        this._pdfText = this._pdfText.filter((value, index) => {
            if (value.toLowerCase() === 'skills') {
                start = index;
                return false;
            } else if (start > 0) {
                let s = value.replace('•', '').trim();
                if (s) this.skills.push(s);
                return false;
            }
            return true;
        });
        this.skills.sort();
    }

    private combineSingleLetters(): void {
        let start = -1;
        let titlesToSplit: number[] = [];
        let indicesToRemove: number[] = [];
        for (let i = 0; i < this._pdfText.length; ++i) {
            const trimmed = this._pdfText[i].trim();
            if (trimmed.trim().length <= 1) {
                if (start >= 0) {
                    indicesToRemove.push(i);
                    this._pdfText[start] += trimmed;
                } else {
                    start = i;
                    titlesToSplit.push(i);
                    this._pdfText[i] = trimmed;
                }
            } else {
                start = -1;
            }
        }

        for (const splitIndex of titlesToSplit) {
            start = -1;
            let indicesToRemove2: number[] = [];
            let s: string[] = this._pdfText[splitIndex].trim().match(/[A-Z][a-z+]*/g);
            if (!s) continue;
            for (let i = 0; i < s.length; ++i) {
                const trimmed = s[i].trim();
                if (trimmed.length <= 1) {
                    if (start >= 0) {
                        indicesToRemove2.push(i);
                        s[start] += trimmed;
                    } else {
                        start = i;
                        s[start] = trimmed;
                    }
                }
                else {
                    start = -1;
                }
            }
            s = s.filter((value, index) => !indicesToRemove2.includes(index));
            let str = '';
            for (let word of s) {
                for (const lowerWord of this._lowerCaseWordsInTitles) {
                    if (word.includes(lowerWord)) {
                        word = word.replace(lowerWord, ' ' + lowerWord);
                    }
                }
                str += word + ' ';
            }
            this._pdfText[splitIndex] = str.trim();
        }
        this._pdfText = this._pdfText.filter((_value, index) => !indicesToRemove.includes(index));
    }

    private setSummary(): void {
        this.name = this._pdfText[0];
        this.address = this._pdfText[1];
        this.email = this._pdfText[2];
        this.phoneNumber = this._pdfText[3];
        this.linkedInPage = this._pdfText[4];
        
        let summary = '';
        let next = 0;
        for (let i = 6; i < this._pdfText.length; ++i) {
            if (this._pdfText[i].toLowerCase() === 'experience') {
                next = i + 1;
                this.summary = summary;
                this.summary = this.summary.trim();
                break;
            }
            summary += this._pdfText[i] + ' ';
        }
        this._pdfText = this._pdfText.filter((value, index) => (index) >= (next - 1));
    }

    private async parsePdf(filePath: string): Promise<void> {
        let _pdfText: string[] = await new Promise<string[]>((resolve, reject) => {
            let textArray: string[] = [];
            new PdfReader().parseFileItems(filePath, (error, item) => {
                if (error) {
                    console.error(error);
                    reject(error);
                }
                else if (!item) {
                    console.log('PDF File Parsed');
                    resolve(textArray);
                }
                else if (item.text) {
                    textArray.push(item.text);
                }
            });
        });
        const pageFooter: string = _pdfText[_pdfText.length - 2];
        let lastIndex = -10;
        _pdfText = _pdfText.filter((value, index) => {
            if (value === pageFooter) {
                lastIndex = index;
                return false;
            } else if (index == lastIndex + 1) {
                return false;
            }
            return true;
        });
        this._pdfText = _pdfText;
    }
}