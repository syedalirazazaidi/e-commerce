exports.userSignupValidator = (req, res, next) => {
    req.check('name', 'name is required').notEmpty()
    req.check('email', 'email must be between 32 character')
        .matches(/.+\@.+\..+/)
        .withMessage('email must contain @')
        .isLength({
            min: 4,
            max: 32
        });
    req.check('password', 'password is required').notEmpty()
    req.check('password')
        .isLength({
            min: 6
        }).withMessage('password must contain at least 6 character')
        .matches(/\d/)
        .withMessage('password must contain the number')
    const errors = req.validationError
    if (errors) {
        const firstError = errors.map(error =>
            error.msg)[0]
        return res.status(400).json
            ({ error: firstError })
    }
    next();
}