import XLSX from 'xlsx'
import moment from 'moment'

export default {
    create(data, headers, filters, title) {
        let labels = []
        headers.map((item) => {
            labels.push(item.label)
        })
        let filterLabels = []

        if (filters.length > 0) {
            filterLabels.push([''])
            filterLabels.push(['FILTROS: '])
            filters.map((item) => {
                filterLabels.push([item.label, '', item.value])
            })
        }
        let aoa = [
            [title],
            ['Data da requisição: ' + moment().format('DD/MM/YYYY HH:mm')],
            [`Total de itens: ${data.length}`],
            ...filterLabels,
            ['', '', '', '', '', '', '', '', ''],
            labels,
        ]
        let ws = XLSX.utils.aoa_to_sheet(aoa)

        let merges = []

        for (let i = 0; i < 3; i++) {
            merges.push({
                s: { r: i, c: 0 },
                e: { r: i, c: headers.length - 1 },
            })
        }

        if (filters.length > 0) {
            merges.push({
                s: { r: 3, c: 0 },
                e: { r: 3, c: headers.length - 1 },
            })
            merges.push({
                s: { r: 4, c: 0 },
                e: { r: 4, c: headers.length - 1 },
            })

            for (let x = 0; x < filters.length; x++) {
                let row = 5 + x
                merges.push({
                    s: { r: row, c: 0 },
                    e: { r: row, c: 1 },
                })
                merges.push({
                    s: { r: row, c: 2 },
                    e: { r: row, c: headers.length - 1 },
                })
            }
            merges.push({
                s: { r: 5 + filters.length, c: 0 },
                e: { r: 5 + filters.length, c: headers.length - 1 },
            })
        } else {
            merges.push({
                s: { r: 3, c: 0 },
                e: { r: 3, c: headers.length - 1 },
            })
        }

        if (!ws['!merges']) ws['!merges'] = []

        for (let i = 0; i < merges.length; i++) {
            ws['!merges'].push(merges[i])
        }

        let widths = []
        headers.map((item) => widths.push({ wch: item.width }))
        ws['!cols'] = widths

        ws['A12'].s = {
            fill: {
                type: 'pattern',
                pattern: "solid",
                fgColor: { argb: "FF1c4587" },
                bgColor: { argb: "FF1c4587" }
            }
        }
        console.log('WS', ws['A12']);

        return ws
    }
}