const Error = (res, status, Msg) => {
    return res.status(status).json({ error: Msg });
}

module.exports = { Error }