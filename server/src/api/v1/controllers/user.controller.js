class UserController {
    getMe(req, res) {
        console.log(req.payload)
    }
}

module.exports.UserController = new UserController();
