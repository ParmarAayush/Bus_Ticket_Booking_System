import User from '../models/userModel.js';

export const getUserProfile = async (req, res) => {
    try {
        // Get userId from authentication middleware
        const userId = req.user?.id;
        if (!userId) {
            return res.json({
                success: false,
                message: 'User not authenticated'
            });
        }
        const user = await User.findById(userId);
        if (!user) {
            return res.json({
                success: false,
                message: 'User not found'
            });
        }
        res.json({
            success: true,
            userData: {
                name: user.name,
                email: user.email,
                isAccountVerified: user.isAccountVerified
            }
        });
    } catch (error) {
        res.json({
            success: false,
            message: 'An error occurred while fetching user profile.'
        });
    }
}