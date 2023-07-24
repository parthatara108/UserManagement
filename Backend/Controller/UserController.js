const { User } = require("../model/UserModel")

exports.fetchUsers = async (req, res) => {
    let query = User.find({})
    let totalProductsQuery = User.find({})

    if (req.query._page && req.query._limit) {
        const pageSize = req.query._limit
        const page = req.query._page
        query = query.skip(pageSize * (page - 1)).limit(pageSize)
    }
    if (req.query._sort && req.query._order) {
        query = query.sort({ [req.query._sort]: req.query._order });
    }

    const totalDocs = await totalProductsQuery.count().exec()

    try {
        const user = await query.exec()
        res.set('X-Total-Count', totalDocs)
        res.status(200).json(user)
    }
    catch (err) {
        res.status(400).json(err)
    }
}
exports.fetchUserById = async (req, res) => {
    const { id } = req.params

    try {
        const user = await User.findById(id)
        res.status(200).json(user)
    }
    catch (err) {
        res.status(400).json(err)
    }
}


exports.createUser = async (req, res) => {
    const duplicateEmail = await User.findOne({ email: req.body.email })
    const duplicatePhone = await User.findOne({ phone: req.body.phone })
    if (duplicateEmail) {
        res.status(400).json({ message: 'Email Already Exists' })
    }
    if (duplicatePhone) {
        res.status(400).json({ message: 'Phone Already Exists' })
    }
    else {
        const user = new User(req.body)
        try {
            const doc = await user.save()
            res.status(201).json(doc)
        }
        catch (err) {
            res.status(400).json(err)
        }
    }
}

exports.updateUser = async (req, res) => {
    const { id } = req.params

    try {
        const user = await User.findByIdAndUpdate(id, req.body)
        res.status(200).json(user)
    }
    catch (err) {
        res.status(400).json(err)
    }
}
exports.deleteUser = async (req, res) => {
    const { id } = req.params
    try {
        await User.findByIdAndDelete(id)
        res.sendStatus(200)
    }
    catch (err) {
        res.status(400).json(err)
    }
}