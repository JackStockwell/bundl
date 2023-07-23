const { options } = require("../controllers")

module.exports = {
    isEqual: (val1, val2, options) => {
        if (val1 === val2) {
            return options.fn(this)
        } 
    }
}