import jwt from 'jsonwebtoken';

const userAuth = async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Not Authorized, Please Login"
        });
    }
    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
        if (tokenDecode.id) {
            req.user = { id: tokenDecode.id };
            next();
        } else {
            return res.status(401).json({
                success: false,
                message: "Not Authorized, Please Login"
            });
        }
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token",
            error: error.message
        });
    }
}

export default userAuth;