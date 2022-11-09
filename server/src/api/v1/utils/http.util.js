module.exports.success = (res, payload, statusCode = 200) => {
    return res.status(statusCode).json({
        status: true,
        statusCode,
        payload
    })
}

module.exports.error = (res, message, statusCode = 400) => {
    return res.status(statusCode).json({
        status: false,
        statusCode,
        message
    })
}
