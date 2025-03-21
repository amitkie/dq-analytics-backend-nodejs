const { users } = require('../models');
const { createErrorResponse } = require('../utils/errorResponse');

async function authenticate(req, res, next) {
    const token = req.headers?.authorization?.replace('Bearer ', '');

    if (!token) {
        const errorResponse = createErrorResponse(401, 'UNAUTHORIZED', 'TOKEN_MISSING', 'Token is required');
        return res.status(401).json(errorResponse);
    }

    try {
        const response = await fetch(process.env.ONBOARDING_PORTAL_SERVER_URL + '/auth/isLoggedIn', {
            method: 'POST',
            headers: {
                authorization: `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                toolName: 'DIGI-CADENCE'
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            const errorResponse = createErrorResponse(errorData.statusCode, errorData.errorCode, errorData.message);
            return res.status(errorData.statusCode).json(errorResponse);
        }

        const data = await response.json();

        // Assuming the response from the centralized login portal includes user details
        const { user } = data;

        // Extract necessary user information
        const { userEmail, role, firstName, lastName, phone, designation, profilePicture, toolsSubscribed } = user;

        const userDetails = await users.findOne({ where: { email: userEmail } });

        if (!userDetails) {
            const errorResponse = createErrorResponse(404, 'USER_NOT_FOUND', 'User Not Found', 'User not found');
            return res.status(404).json(errorResponse);
        }

        // Attach user information to the request object
        req.user = { userId: userDetails.id, userEmail, role, firstName, lastName, phone, designation, profilePicture, toolsSubscribed };

        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        const errorResponse = createErrorResponse(500, 'INTERNAL_SERVER_ERROR', 'Something Went Wrong', error.message);
        return res.status(500).json(errorResponse);
    }
}


async function authenticateApiKey(req, res, next) {
    const apiKey = req.headers?.['x-api-key'];

    if (!apiKey) {
        const errorResponse = createErrorResponse(401, 'UNAUTHORIZED', 'API Key missing');
        return res.status(401).json(errorResponse);
    }

    try {
        if (apiKey !== process.env.API_KEY) {
            const errorResponse = createErrorResponse(401, 'UNAUTHORIZED', 'Invalid API Key');
            return res.status(401).json(errorResponse);
        }

        next(); // **Proceed to the next middleware or route handler**
    } catch (error) {
        const errorResponse = createErrorResponse(500, 'INTERNAL_SERVER_ERROR', 'Something Went Wrong', error.message);
        return res.status(500).json(errorResponse);
    }
}

module.exports = { authenticate, authenticateApiKey };
