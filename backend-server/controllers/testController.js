const User = require('../models/testModel');

createUser = (req, res) => {
    const body = req.body;
    console.log(req.body);

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide full user info',
        });
    }

    const user = new User(body);

    if (!user) {
        return res.status(400).json({ success: false, error: err });
    }

    user
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: user._id,
                message: 'User created!',
            });
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'User not created',
            });
        })
}

updateUser = async (req, res) => {
    const body = req.body;
    console.log('User update being attempted')
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        });
    }

    User.findOne({email: req.params.email }, (err, user) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'User not found!',
            });
        }
        user.name = body.name;
        user.email = body.email;
        user.password = body.password;
        for (let i = 0; i < body.maps.length; i++) {
            user.maps[i] = body.maps[i];
            for (let j = 0; j < body.maps[i].pins.length; j++) {
                user.maps[i].pins[j] = body.maps[i].pins[j];
            }
            for (let j = 0; j < body.maps[i].routes.length; j++) {
                user.maps[i].routes[j] = body.maps[i].routes[j];
            }
        }
        user
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: user._id,
                    message: 'User updated!',
                });
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'User not updated'
                });
            })
    });
}

module.exports = createUser;