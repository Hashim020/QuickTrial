import User from '../models/userModel.js';

export const checkSubscription = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the user is subscribed and if the subscription is still active
    const isSubscribed = user.subscriptionStatus && user.subscriptionEnd && new Date() < user.subscriptionEnd;

    if (!isSubscribed) {
      return res.status(403).json({ message: 'Subscription required to access this resource' });
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
