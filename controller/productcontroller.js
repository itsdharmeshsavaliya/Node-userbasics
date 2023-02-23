var productSchema = require("../model/productSchema");
var userSchema = require("../model/userSchema");

exports.createRoute = (req, res, next) => {
    let { name, price } = req.body;
    if (!name) return res.json({ message: "Name must be required", status: 0 });
    if (!price) return res.json({ message: "Price must be required", status: 0 });

    userSchema.findOne({ email: req.user.email })
        .then((user) => {
            if (!user) return res.json({ message: "User not valid, please try again!", status: 0 })
            var productData = new productSchema({ name, price, userID: req.user._id });
            productData.save().then((product) => {
                    res.json({
                        message: "success",
                        status: 1,
                        data: product
                    })
                })
                .catch(() => {
                    res.json({ message: "Internal server error!", status: 0 })
                })
        })
        .catch(() => {
            res.json({ message: "Internal server error!", status: 0 })
        })
}


exports.updateRoute = (req, res) => {
    let { name, price, propductID } = req.body;
    if (!name) return res.json({ message: "Name must be required", status: 0 });
    if (!price) return res.json({ message: "Price must be required", status: 0 });
    if (!propductID) return res.json({ message: "propductID must be required", status: 0 });

    userSchema.findOne({ email: req.user.email })
        .then((user) => {
            if (!user) return res.json({ message: "User not valid, please try again!", status: 0 })

            var id = { _id: propductID };
            var set = { name, price };
            productSchema.findByIdAndUpdate(id, set, { useFindAndModify: false, new: true })
                .then((product) => {
                    if (!product) return res.json({ message: "Something went wrong, please try again!", status: 0 })

                    res.json({
                        message: "success",
                        status: 1,
                        data: product
                    })
                })
                .catch((err) => {
                    res.json({ message: "Something went wrong, please try again!", status: 0, err })
                })
        }).catch((err) => {
            res.json({ message: "User not found!", status: 0, err })
        })
}

exports.fetchRoute = (req, res) => {
    let { propductID } = req.body;
    if (!propductID) return res.json({ message: "propductID must be required", status: 0 });

    userSchema.findOne({ email: req.user.email })
        .then((user) => {
            if (!user) return res.json({ message: "User not valid, please try again!", status: 0 })

            var id = { _id: propductID };
            productSchema.findById(id)
                .then((product) => {
                    if (!product) return res.json({ message: "Product not found!", status: 0 })

                    res.json({
                        message: "success",
                        status: 1,
                        data: product
                    })
                })
                .catch((err) => {
                    res.json({ message: "Something went wrong, please try again!", status: 0, err })
                })
        }).catch((err) => {
            res.json({ message: "User not found!", status: 0, err })
        })
}


exports.deleteRoute = (req, res) => {
    let { propductID } = req.body;
    if (!propductID) return res.json({ message: "propductID must be required", status: 0 });

    userSchema.findOne({ email: req.user.email })
        .then((user) => {
            if (!user) return res.json({ message: "User not valid, please try again!", status: 0 })

            var id = { _id: propductID };
            productSchema.findById(id)
                .then((product) => {
                    if (!product) return res.json({ message: "Product not found!", status: 0 })

                    productSchema.findByIdAndDelete(id)
                        .then(() => {
                            res.json({ message: "Product deleted successfully!", status: 1 })
                        })
                        .catch(err => {
                            res.json({ message: "Something went wrong, please try again!", status: 0, err })
                        });
                })
        })
}

exports.fetchByUserIdRoute = (req, res) => {

    userSchema.findOne({ email: req.user.email })
        .then((user) => {
            if (!user) return res.json({ message: "User not valid, please try again!", status: 0 })

            var userID = { userID: user._id };
            productSchema.find(userID)
                .then((products) => {
                    res.json({
                        message: "success",
                        status: 1,
                        data: products
                    })
                })
                .catch((err) => {
                    res.json({ message: "Something went wrong, please try again!", status: 0, err })
                })

        });



    // userSchema.findOne({ email: req.user.email })
    // .then((user) => {
    //     if (!user) return res.json({ message: "User not valid, please try again!", status: 0 })

    //     var id = { _id: propductID };
    //     productSchema.findById(id)
    //     .then((product) => {
    //         if(!product) return res.json({ message: "Product not found!", status: 0 })

    //         res.json({
    //             message: "success",
    //             status: 1,
    //             data: product
    //         })
    //     })
    //     .catch((err) => {
    //         res.json({ message: "Something went wrong, please try again!", status: 0, err })
    //     })
    // }).catch((err) => {
    //     res.json({ message: "User not found!", status: 0, err })
    // })   
}