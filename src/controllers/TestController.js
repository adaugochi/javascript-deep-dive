const getPostData = require('../helpers/utils')
const {getTestService, postTestService} = require('../services/TestService')

const getTest = async (req, res) => {
    const result = getTestService();
    return res.status(200).json({message: result})
}

const postTest = async (req, res) => {
    const data = await getPostData(req);
    const result = postTestService(data)
    try {
        res.status(200).json({
            success: true,
            message: result
        })
    } catch (e) {
        res.status(400).json({
            success: false,
            message: e.message
        })
    }
}

module.exports = {
    getTest,
    postTest
}