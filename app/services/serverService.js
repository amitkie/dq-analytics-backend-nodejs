const { ValidationError } = require('../handlers/errorHandler');
const { users, userActivities } = require('../models/index'); // Assuming your models are exported correctly


async function createUser(userData) {
    const { email } = userData;

    if (!email) {
        throw new ValidationError('MISSING_EMAIL', 'Bad Request');
    }

    // Check if a user with the provided email already existsemail
    const existingUser = await users.findOne({ where: { email } });

    if (existingUser) {
        throw new ValidationError('EMAIL_EXISTS', 'User with this email already exists in digi cadence');
    }

    const newUser = await users.create({ email });

    const userActivityData = {
        user_id: newUser.id,
        tab_page_speed: 0,
        tab_facebook_insight: 0,
        tab_google_analytics: 0,
        tab_google_ads: 0,
        tab_dv360: 0,
        is_db_created: false,
        is_schema_table_created: false,
    };

    await userActivities.create(userActivityData);

    return newUser;
}


module.exports = {
    createUser
};