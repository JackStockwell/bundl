const { options } = require("../controllers")
const dayjs = require('dayjs')

module.exports = {
    // Checks to see if two values are equal.
    isEqual: (val1, val2, options) => {
        if (val1 === val2) {
            return options.fn(this)
        }
    },

    // Formats the date, using dayjs.
    formatDate: (date) => {
        const parsedDate = Date.parse(date)
        return dayjs(parsedDate).format('DD MMM YYYY - HH:mm')
    },

    // Checks to see if the user is following the current page.
    isFollow: (forumArray, forum_id, options) => {
        if (forumArray.some((forum) => forum.id === forum_id)) {
            return options.fn(this)
        } else {
            return options.inverse(this)
        }
    }

}