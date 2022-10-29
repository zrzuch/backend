"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Resume = void 0;
const pdfreader_1 = require("pdfreader");
class Resume {
    constructor() {
        this.next = 0;
    }
    // https://medium.com/free-code-camp/how-to-parse-pdfs-at-scale-in-nodejs-what-to-do-and-what-not-to-do-541df9d2eec1
    setFromPDF(filePath) {
        return __awaiter(this, void 0, void 0, function* () {
            let pdfText = yield this.parsePdf(filePath);
            this.name = pdfText[0];
            this.address = pdfText[1];
            this.email = pdfText[2];
            this.phoneNumber = pdfText[3];
            this.linkedInPage = pdfText[4];
            this.getSummary(pdfText, 6);
        });
    }
    getSummary(pdfText, pos) {
        let summary = '';
        for (let i = pos; i < pdfText.length; ++i) {
            if (pdfText[i].toLowerCase() === 'experience') {
                this.next = i + 1;
                this.summary = summary;
            }
            summary += pdfText[i];
        }
    }
    parsePdf(filePath) {
        return __awaiter(this, void 0, void 0, function* () {
            let pdfText = yield new Promise((resolve, reject) => {
                let textArray = [];
                new pdfreader_1.PdfReader().parseFileItems(filePath, (error, item) => {
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
            pdfText = pdfText.slice(0, pdfText.length - 2);
            return pdfText;
        });
    }
}
exports.Resume = Resume;
//# sourceMappingURL=Resume.js.map