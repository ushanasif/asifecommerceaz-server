const userModel = require("../../models/userModel")

const allUsers = async(req, res) => {
    try {
        const allUsers = await userModel.find();

        res.json({
            success: true,
            message: 'All Users',
            data: allUsers,
            error: false,
        })
    } catch (err) {
        res.status(404).json({
            success: false,
            message: err.message || err,
            error: true
        });
        console.log(err.message);
    }
};

module.exports = allUsers;