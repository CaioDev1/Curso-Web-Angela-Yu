exports.getDate = function() {
    let date = new Date()

    let options = {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    }

    let currentDate = date.toLocaleString('en-US', options)

    return currentDate
}

exports.getDay = function() {
    let date = new Date()

    let options = {
        weekday: 'long',
    }

    let currentDay = date.toLocaleString('en-US', options)

    return currentDay
}