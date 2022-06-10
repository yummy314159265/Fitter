const dayjs = require('dayjs');

function formatDate(date){
    return dayjs(date).format('ddd, MMM D, YYYY h:mm A');
};

module.exports = { formatDate };