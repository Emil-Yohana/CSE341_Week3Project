const validator = require('../helpers/validate');

const saveUser = (req, res, next) => {
    const validationRule = {
        firstName: 'required|string',
        lastName: 'required|string',
        email: 'required|email',
        favoriteColor: 'required|string',
        birthday: 'required|string',
        address: 'required|string',
        city: 'required|string',
        postCode: 'required|string'
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success:false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    });
};

const saveProduct = (req, res, next) => {
    const validationRule = {
        productId: 'required|string',
        productName: 'required|string',
        category: 'required|string',
        brand: 'required|string',
        price: 'required|numeric',
        currency: 'required|string',
        stock: 'required|integer',
        sku: 'required|string',
        rating: 'required|numeric'
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success:false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    });
};

module.exports = { saveUser, saveProduct };