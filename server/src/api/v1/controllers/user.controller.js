class UserController {
    getMe(req, res) {
        return res.success(req.payload);
    }
}

module.exports.UserController = new UserController();
