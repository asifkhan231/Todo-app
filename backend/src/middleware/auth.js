import jwt from 'jsonwebtoken'

const auth = (req, res, next) => {
    try {
        let token = req.headers.access_token
        if (token) {
            token = token.split(' ')[1]
            const user = jwt.verify(token, process.env.JWT_SECRET_KEY)
            req.user = user
            next()
        } else {
            return res.status(401).json({ message: "unauthorize access" })

        }

    } catch (error) {
        return res.status(401).json({ message: "unauthorize access" })
    }
}

export default auth