
var fonts = {
    Roboto: {
        normal: 'examples/fonts/Roboto-Regular.ttf',
        bold: 'examples/fonts/Roboto-Medium.ttf',
        italics: 'examples/fonts/Roboto-Italic.ttf',
        bolditalics: 'examples/fonts/Roboto-MediumItalic.ttf'
    }
};
// var PdfPrinter = require('pdfmake/build/pdfmake.js');
// var printer = new PdfPrinter(fonts);
// var fs = require('fs');

var pdfMake = require('pdfmake/build/pdfmake.js');
var pdfFonts = require('pdfmake/build/vfs_fonts.js');
// pdfMake.vfs = pdfFonts.pdfMake.vfs;
var fs = require('fs');

var docDefinition = {
    content: [
        {
            headerRows: 1,
            style: 'tableExample',
            table: {
                body: [
                    [{ text: 'Nombre ', style: 'tableHeader' },
                    { text: 'Apellido ', style: 'tableHeader' },
                    { text: 'Doc. Nro.: ', style: 'tableHeader' }],
                    [
                        'Juan',
                        'Perez',
                        '12345'
                    ],
                    [
                        'Diego',
                        'Lopez',
                        '234567'
                    ],
                    [
                        'Ana',
                        'Catao',
                        '345678'
                    ]
                ]
            },
            layout: {
                fillColor: function (i, node) {
                    return (i % 2 === 0) ? '#CCCCCC' : null;
                }
            }
        },
    ]

};

describe("React Listar Alumnos", () => {

    it("Recupera un Curso con un Alumno", () => {
        pdfMake.pipe(fs.createWriteStream('pdfs/tables.pdf'));
        pdfMake.end();
    //    pdfMake.createPdf(docDefinition).print();
        // pdfDoc.pipe(fs.createWriteStream('pdfs/tables.pdf'));
        // pdfDoc.end();
        // open the PDF in a new window
        // pdfMake.createPdf(docDefinition).print({}, win);
    });
});