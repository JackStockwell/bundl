const { options } = require("../controllers")
const dayjs = require('dayjs')

module.exports = {
    isEqual: (val1, val2, options) => {
        if (val1 === val2) {
            return options.fn(this)
        } 
    },
    formatDate: (date) => {
        const parsedDate = Date.parse(date)
        console.log(parsedDate)
        console.log(dayjs(parsedDate).format('DD/MM/YYYY - HH:mm'))

    }
}