import {FourthTableEntry, ThirdTableEntry} from "../../context";
import {Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, AlignmentType} from "docx";


export const createWordDocument = async (third: ThirdTableEntry[], fourth: FourthTableEntry[]) => {
    const doc = new Document({
        sections: [
            {
                properties: {},
                children: [
                    new Paragraph({
                        alignment: AlignmentType.CENTER, // Выравнивание по центру
                        spacing: {
                            before: 200,
                            after: 200,
                        },
                        children: [
                            new TextRun({
                                text: "Таблица 2",
                                size: 24,
                            }),
                        ],
                    }),
                    new Table({
                        rows: [
                            new TableRow({
                                children: [
                                    new TableCell({
                                        children: [
                                            new Paragraph({
                                                alignment: AlignmentType.CENTER,
                                                children: [
                                                    new TextRun({
                                                        text: "x1, м",
                                                        bold: true,
                                                    }),
                                                ],
                                            }),
                                        ],
                                        margins: {
                                            left: 600,
                                            right: 600,
                                        },
                                    }),
                                    new TableCell({
                                        children: [
                                            new Paragraph({
                                                alignment: AlignmentType.CENTER,
                                                children: [
                                                    new TextRun({
                                                        text: "x1', м",
                                                        bold: true,
                                                    }),
                                                ],
                                            }),
                                        ],
                                        margins: {
                                            left: 600,
                                            right: 600,
                                        },
                                    }),
                                    new TableCell({
                                        children: [
                                            new Paragraph({
                                                alignment: AlignmentType.CENTER,
                                                children: [
                                                    new TextRun({
                                                        text: "h0, м",
                                                        bold: true,
                                                    }),
                                                ],
                                            }),
                                        ],
                                        margins: {
                                            left: 600,
                                            right: 600,
                                        },
                                    }),
                                    new TableCell({
                                        children: [
                                            new Paragraph({
                                                alignment: AlignmentType.CENTER,
                                                children: [
                                                    new TextRun({
                                                        text: "h0', м",
                                                        bold: true,
                                                    }),
                                                ],
                                            }),
                                        ],
                                        margins: {
                                            left: 600,
                                            right: 600,
                                        },
                                    }),
                                ],
                            }),
                            new TableRow({
                                children: [
                                    new TableCell({
                                        children: [new Paragraph({
                                            alignment: AlignmentType.CENTER,
                                            text: "0.22 ± 0.005",
                                        })],
                                    }),
                                    new TableCell({
                                        children: [new Paragraph({
                                            alignment: AlignmentType.CENTER,
                                            text: "1.00 ± 0.005",
                                        })],
                                    }),
                                    new TableCell({
                                        children: [new Paragraph({
                                            alignment: AlignmentType.CENTER,
                                            text: "188 ± 0.5",
                                        })],
                                    }),
                                    new TableCell({
                                        children: [new Paragraph({alignment: AlignmentType.CENTER, text: "187 ± 0.5"})],
                                    }),
                                ],
                            }),
                        ],
                    }),

                    new Paragraph({
                        alignment: AlignmentType.CENTER, // Выравнивание по центру
                        spacing: {
                            before: 400,
                            after: 200,
                        },
                        children: [
                            new TextRun({
                                text: "Таблица 3",
                                size: 24,
                            }),
                        ],
                    }),
                    new Table({
                        rows: [
                            new TableRow({
                                children: [
                                    new TableCell({
                                        children: [
                                            new Paragraph({
                                                alignment: AlignmentType.CENTER,
                                                children: [
                                                    new TextRun({
                                                        text: "x1', м",
                                                        bold: true,
                                                    }),
                                                ],
                                            }),
                                        ],
                                        margins: {
                                            left: 300,
                                            right: 300,
                                        },
                                    }),
                                    new TableCell({
                                        children: [
                                            new Paragraph({
                                                alignment: AlignmentType.CENTER,
                                                children: [
                                                    new TextRun({
                                                        text: "x2', м",
                                                        bold: true,
                                                    }),
                                                ],
                                            }),
                                        ],
                                        margins: {
                                            left: 300,
                                            right: 300,
                                        },
                                    }),
                                    new TableCell({
                                        children: [
                                            new Paragraph({
                                                alignment: AlignmentType.CENTER,
                                                children: [
                                                    new TextRun({
                                                        text: "t1', c",
                                                        bold: true,
                                                    }),
                                                ],
                                            }),
                                        ],
                                        margins: {
                                            left: 300,
                                            right: 300,
                                        },
                                    }),
                                    new TableCell({
                                        children: [
                                            new Paragraph({
                                                alignment: AlignmentType.CENTER,
                                                children: [
                                                    new TextRun({
                                                        text: "t2', c",
                                                        bold: true,
                                                    }),
                                                ],
                                            }),
                                        ],
                                        margins: {
                                            left: 300,
                                            right: 300,
                                        },
                                    }),
                                    new TableCell({
                                        children: [
                                            new Paragraph({
                                                alignment: AlignmentType.CENTER,
                                                children: [
                                                    new TextRun({
                                                        text: "x2-x1, м",
                                                        bold: true,
                                                    }),
                                                ],
                                            }),
                                        ],
                                        margins: {
                                            left: 300,
                                            right: 300,
                                        },
                                    }),
                                    new TableCell({
                                        children: [
                                            new Paragraph({
                                                alignment: AlignmentType.CENTER,
                                                children: [
                                                    new TextRun({
                                                        text: "(t2^2-t1^2) / 2, c^2",
                                                        bold: true,
                                                    }),
                                                ],

                                            }),
                                        ],
                                        margins: {
                                            left: 300,
                                            right: 300,
                                        },
                                    }),
                                ],
                            }),
                            ...third.map((entry) =>
                                new TableRow({
                                    children: [
                                        new TableCell({
                                            children: [new Paragraph({
                                                alignment: AlignmentType.CENTER,
                                                text: entry?.x1?.toString() ?? ""
                                            })],
                                        }),
                                        new TableCell({
                                            children: [new Paragraph({
                                                alignment: AlignmentType.CENTER,
                                                text: entry?.x2?.toString() ?? ""
                                            })],
                                        }),
                                        new TableCell({
                                            children: [new Paragraph({
                                                alignment: AlignmentType.CENTER,
                                                text: entry?.t1?.toString() ?? ""
                                            })],
                                        }),
                                        new TableCell({
                                            children: [new Paragraph({
                                                alignment: AlignmentType.CENTER,
                                                text: entry?.t2?.toString() ?? ""
                                            })],
                                        }),
                                        new TableCell({
                                            children: [new Paragraph({
                                                alignment: AlignmentType.CENTER,
                                                text: entry?.dx?.toString() ?? ""
                                            })],
                                        }),
                                        new TableCell({
                                            children: [new Paragraph({
                                                alignment: AlignmentType.CENTER,
                                                text: entry?.deviation?.toString() ?? ""
                                            })],
                                        }),
                                    ],
                                })
                            ),
                        ],
                    }),
                    new Paragraph({
                        alignment: AlignmentType.CENTER, // Выравнивание по центру
                        spacing: {
                            before: 400,
                            after: 200,
                        },
                        children: [
                            new TextRun({
                                text: "Таблица 4",
                                size: 24,
                            }),
                        ],
                    }),
                    new Table({
                        rows: [
                            // Заголовок таблицы
                            new TableRow({
                                children: [
                                    new TableCell({
                                        children: [
                                            new Paragraph({
                                                alignment: AlignmentType.CENTER,
                                                children: [
                                                    new TextRun({
                                                        text: "№ измерения",
                                                        bold: true,
                                                    }),
                                                ],
                                            }),
                                        ],
                                        margins: {
                                            left: 300,
                                            right: 300,
                                        },
                                    }),
                                    new TableCell({
                                        children: [
                                            new Paragraph({
                                                alignment: AlignmentType.CENTER,
                                                children: [
                                                    new TextRun({
                                                        text: "h, мм",
                                                        bold: true,
                                                    }),
                                                ],
                                            }),
                                        ],
                                        margins: {
                                            left: 300,
                                            right: 300,
                                        },
                                    }),
                                    new TableCell({
                                        children: [
                                            new Paragraph({
                                                alignment: AlignmentType.CENTER,
                                                children: [
                                                    new TextRun({
                                                        text: "h', мм",
                                                        bold: true,
                                                    }),
                                                ],
                                            }),
                                        ],
                                        margins: {
                                            left: 300,
                                            right: 300,
                                        },
                                    }),
                                    new TableCell({
                                        children: [
                                            new Paragraph({
                                                alignment: AlignmentType.CENTER,
                                                children: [
                                                    new TextRun({
                                                        text: "№",
                                                        bold: true,
                                                    }),
                                                ],
                                            }),
                                        ],
                                        margins: {
                                            left: 300,
                                            right: 300,
                                        },
                                    }),
                                    new TableCell({
                                        children: [
                                            new Paragraph({
                                                alignment: AlignmentType.CENTER,
                                                children: [
                                                    new TextRun({
                                                        text: "t1, c",
                                                        bold: true,
                                                    }),
                                                ],
                                            }),
                                        ],
                                        margins: {
                                            left: 300,
                                            right: 300,
                                        },
                                    }),
                                    new TableCell({
                                        children: [
                                            new Paragraph({
                                                alignment: AlignmentType.CENTER,
                                                children: [
                                                    new TextRun({
                                                        text: "t2, c",
                                                        bold: true,
                                                    }),
                                                ],
                                            }),
                                        ],
                                        margins: {
                                            left: 200,
                                            right: 200,
                                        },
                                    }),
                                ],
                            }),
                            ...(fourth.flatMap((entry) =>
                                entry?.measuring?.map((innerEntry) =>
                                    new TableRow({
                                        children: [
                                            new TableCell({
                                                children: [
                                                    new Paragraph({
                                                        alignment: AlignmentType.CENTER,
                                                        text: entry?.np?.toString() ?? "",
                                                    }),
                                                ],
                                            }),
                                            new TableCell({
                                                children: [
                                                    new Paragraph({
                                                        alignment: AlignmentType.CENTER,
                                                        text: entry?.h?.toString() ?? "",
                                                    }),
                                                ],
                                            }),
                                            new TableCell({
                                                children: [
                                                    new Paragraph({
                                                        alignment: AlignmentType.CENTER,
                                                        text: entry?.hp?.toString() ?? "",
                                                    }),
                                                ],
                                            }),
                                            new TableCell({
                                                children: [
                                                    new Paragraph({
                                                        alignment: AlignmentType.CENTER,
                                                        text: innerEntry?.number?.toString() ?? "",
                                                    }),
                                                ],
                                            }),
                                            new TableCell({
                                                children: [
                                                    new Paragraph({
                                                        alignment: AlignmentType.CENTER,
                                                        text: innerEntry?.t1?.toString() ?? "",
                                                    }),
                                                ],
                                            }),
                                            new TableCell({
                                                children: [
                                                    new Paragraph({
                                                        alignment: AlignmentType.CENTER,
                                                        text: innerEntry?.t2?.toString() ?? "",
                                                    }),
                                                ],
                                            }),
                                        ],
                                    })
                                ) ?? []
                            )),
                        ],
                    })
                ],
            },
        ],
    });


    try {
        const blob = await Packer.toBlob(doc);

        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "SecondTableDocument.docx";

        // Имитируем клик на ссылку для скачивания
        link.click();
    } catch (error) {
        console.error("Error generating Word document:", error);
    }
};