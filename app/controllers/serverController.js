const serverService = require("../services/serverService");
const { ValidationError } = require("../handlers/errorHandler");
const { createErrorResponse } = require("../utils/errorResponse");
const { createSuccessResponse } = require("../utils/successResponse");

const createUser = async (req, res) => {
    try {
        const response = await serverService.createUser(req.body);

        const successResponse = createSuccessResponse(200, 'User created successfully', response)
        return res.status(200).json(successResponse);
    } catch (error) {
        if (error instanceof ValidationError) {
            const errorResponse = createErrorResponse(400, 'VALIDATION_ERROR', error.message);
            return res.status(400).json(errorResponse);
        }
        const errorResponse = createErrorResponse(500, 'INTERNAL_SERVER_ERROR', 'Internal Server Error', error.message);
        return res.status(500).json(errorResponse);
    }
};

module.exports = {
    createUser,
}