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
        return dayjs(parsedDate).format('DD MMM YYYY - HH:mm')
    },

    isFollow: (forumArray, forum_id, options) => {
        if (forumArray.some((forum) => forum.id === forum_id)) {
            return options.fn(this)
        } else {
            return options.inverse(this)
        }
    }

}