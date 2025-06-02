import { FirstTableEntry, SecondTableEntry, ThirdTableEntry } from "../../context";
import {
    Document,
    Packer,
    Paragraph,
    TextRun,
    Table,
    TableRow,
    TableCell,
    AlignmentType,
    WidthType,
    ImageRun
} from "docx";

const headerCell = (text: string, width: number) => new TableCell({
    width: { size: width, type: WidthType.DXA },
    children: [ new Paragraph({ alignment: AlignmentType.CENTER, children: [ new TextRun({ text, bold: true }) ] }) ],
});
const dataCell = (text: string, width: number) => new TableCell({
    width: { size: width, type: WidthType.DXA },
    children: [ new Paragraph({ alignment: AlignmentType.CENTER, text }) ],
});

export const createWordDocument = async (
    first: FirstTableEntry[],
    second: SecondTableEntry[],
    third: ThirdTableEntry[],
) => {
    const canvas = document.querySelector('#hysteresis-loop-canvas')
    const dataUrl = canvas.toDataURL('image/png');
    const base64Data = dataUrl.split(',')[ 1 ];

    const image = new ImageRun({
        type: 'png',
        data: base64Data,
        transformation: {
            width: 300,
            height: 200,
        }
    });

    // Пример ширины: 2200 twips (DXA) ≈ 3.9 см, 1800 ≈ 3.2 см
    const w1 = 2200, w2 = 2200, w3 = 2200, w4 = 2200, w5 = 2200, w6 = 2200, w7 = 2200, w8 = 2200;
    const doc = new Document({
        sections: [
            {
                properties: {},
                children: [
                    new Paragraph({
                        alignment: AlignmentType.CENTER,
                        spacing: { before: 200, after: 200 },
                        children: [
                            new TextRun({ text: "Таблица 1", size: 24 }),
                        ],
                    }),
                    new Table({
                        rows: [
                            new TableRow({
                                children: [
                                    headerCell("X_c, дел", w1),
                                    headerCell("Y_r, дел", w2),
                                    headerCell("H_c, A/м", w3),
                                    headerCell("B_r, Тл", w4),
                                ],
                            }),
                            ...first.map((entry) =>
                                new TableRow({
                                    children: [
                                        dataCell(entry.xc?.toFixed(1) ?? "", w1),
                                        dataCell(entry.yr?.toFixed(1) ?? "", w2),
                                        dataCell("", w3),
                                        dataCell("", w4),
                                    ],
                                })
                            ),
                        ],
                    }),

                    new Paragraph({
                        alignment: AlignmentType.CENTER,
                        spacing: { before: 400, after: 200 },
                        children: [
                            new TextRun({ text: "Таблица 2", size: 24 }),
                        ],
                    }),
                    new Table({
                        rows: [
                            new TableRow({
                                children: [
                                    headerCell("X_m, дел", w1),
                                    headerCell("Y_m, дел", w2),
                                    headerCell("H_m, A/м", w3),
                                    headerCell("B_m, Тл", w4),
                                    headerCell("μ_m", w5),
                                ],
                            }),
                            ...second.map((entry) =>
                                new TableRow({
                                    children: [
                                        dataCell(entry.xm?.toFixed(1) ?? "", w1),
                                        dataCell(entry.ym?.toFixed(1) ?? "", w2),
                                        dataCell("", w3),
                                        dataCell("", w4),
                                        dataCell("", w5),
                                    ],
                                })
                            ),
                        ],
                    }),

                    new Paragraph({
                        alignment: AlignmentType.CENTER,
                        spacing: { before: 400, after: 200 },
                        children: [
                            new TextRun({ text: "Таблица 3", size: 24 }),
                        ],
                    }),
                    new Table({
                        rows: [
                            new TableRow({
                                children: [
                                    headerCell("U, В", w1),
                                    headerCell("X, дел", w2),
                                    headerCell("K_x, В/дел", w3),
                                    headerCell("Н, А/м", w4),
                                    headerCell("Y, дел", w5),
                                    headerCell("K_y, В/дел", w6),
                                    headerCell("В, Тл", w7),
                                    headerCell("μ_m", w8),
                                ],
                            }),
                            ...third.map((entry) =>
                                new TableRow({
                                    children: [
                                        dataCell(entry.u?.toFixed(1) ?? "", w1),
                                        dataCell(entry.x?.toFixed(1) ?? "", w2),
                                        dataCell(entry.kx?.toFixed(1) ?? "", w3),
                                        dataCell("", w4),
                                        dataCell(entry.y?.toFixed(1) ?? "", w5),
                                        dataCell(entry.ky?.toFixed(1) ?? "", w6),
                                        dataCell("", w7),
                                        dataCell("", w8),
                                    ],
                                })
                            ),
                        ],
                    }),
                    new Paragraph(({
                        alignment: AlignmentType.CENTER,
                        spacing: { before: 200, after: 200 },
                        children: [
                            new TextRun({ text: "График петли гистерезиса", size: 24 }),
                        ],
                    })),
                    new Paragraph({
                        children: [ image ],
                    }),
                ],
            },
        ],
    });

    try {
        const blob = await Packer.toBlob(doc);
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "PhysicsLab307Report.docx";
        link.click();
    } catch (error) {
        console.error("Error generating Word document:", error);
    }
}; 