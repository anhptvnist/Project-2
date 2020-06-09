const AuthService = require('./auth.service');
exports.login = async (req, res) => {
    try {
        var loginUser = await AuthService.login(req.body);
        res.status(200).json({
            success: true,
            messages: ['login_success'],
            content: loginUser
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            messages: Array.isArray(error) ? error : ['login_faile'],
            content: error
        });
    }
};

exports.logout = async (req, res) => {
    try {
        var logout = await AuthService.logout(req.user._id, req.token);

        //isLog && Logger.info(`[LOGOUT]` + req.body.email);
        res.status(200).json(logout);
    } catch (error) {

        //isLog && Logger.error(`[LOGOUT]` + req.body.email);
        res.status(400).json(error);
    }
};

exports.register = async (req, res) => {
    try {
        var register = await AuthService.register(req.body);
        res.status(200).json({
            success: true,
            messages: ['register_success'],
            content: register
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            messages: Array.isArray(error) ? error : ['register_faile'],
            content: error
        });
    }
};
