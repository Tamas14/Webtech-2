const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../db/models/user-model')
const UserCtrl = require('../controllers/user-ctrl')

const router = express.Router()

router.post("/login", (req, res) => {
    const {errors, isValid} = UserCtrl.validateLoginInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email}).then(user => {

        if (!user) {
            return res.status(404).json({emailnotfound: "Email not found"});
        }

        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (isMatch) {
                const payload = {
                    id: user.id,
                    name: user.name
                };

                jwt.sign(
                    payload,
                    "key",
                    {
                        expiresIn: 31556926
                    },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: "Bearer " + token
                        });
                    }
                );
            } else {
                return res
                    .status(400)
                    .json({passwordincorrect: "Password incorrect"});
            }
        });
    });
});

router.get("/register", (req, res) => {
    const body = req.body;
    const book = new User()

    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash("test123", salt, function (err, hash) {
            console.log(hash)
            return
        });
    });

    book.name = "Csaba"
    book.email = "test@test.hu"
    book.password = "test123"

    book
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: book._id,
                message: 'Book created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Book not created!',
            })
        })
});

module.exports = router;
