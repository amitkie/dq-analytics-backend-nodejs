const express = require('express');
const router = express.Router();
const authController =require('../controllers/authController')

// POST /api/v1/register - Register a new user
/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: API endpoints for user authentication
 */

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *                 example: "John"
 *               last_name:
 *                 type: string
 *                 example: "Doe"
 *               email:
 *                 type: string
 *                 example: "john@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: User registered successfully
 *       400:
 *         description: Validation error
 */
router.post('/register', authController.createUser)

// POST /api/v1/login - Login an existing user (authentication)
/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login a user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "john@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       401:
 *         description: Invalid credentials
 *       404:
 *         description: User not found
 */
router.post('/login', authController.loginUser);

// GET /api/v1/isLoggedIn - Check if a user is logged in
/**
 * @swagger
 * /isLoggedIn:
 *   get:
 *     summary: Check if a user is logged in
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: User is logged in
 *       401:
 *         description: Invalid credentials
 *       403:
 *         description: Tool not subscribed
 */
router.get('/isLoggedIn', authController.isLoggedIn);

//  POST /api/v1/get-user-info 
/**
 * @swagger
 * /get-user-info:
 *   post:
 *     summary: Get user and payment info
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: User data and payment info retrieved successfully
 *       400:
 *         description: Validation error
 *       500:
 *         description: Internal Server Error
 */
router.post('/get-user-info', authController.getUserAndPaymentInfo);

/** POST /api/v1/get-user-data
 * @swagger
 * /get-user-data:
 *   post:
 *     summary: Get user data
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: User data retrieved successfully
 *       400:
 *         description: Validation error
 *       500:
 *         description: Internal Server Error
 */
router.post('/get-user-data', authController.getUserInfo);

/**  POST /api/v1/send-feedback
 * @swagger
 * /send-feedback:
 *   post:
 *     summary: Send user feedback
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: "John"
 *               lastName:
 *                 type: string
 *                 example: "Doe"
 *               email:
 *                 type: string
 *                 example: "john.doe@example.com"
 *               requestType:
 *                 type: string
 *                 example: "Feature Request"
 *               comments:
 *                 type: string
 *                 example: "I would love a dark mode feature."
 *               source:
 *                 type: string
 *                 example: "Feature Request"
 *     responses:
 *       200:
 *         description: Feedback sent successfully
 *       400:
 *         description: Validation error
 *       500:
 *         description: Internal Server Error
 */
router.post('/send-feedback', authController.sendFeedback);

/** POST /api/v1/demo-scheduler
 * @swagger
 * /demo-scheduler:
 *   post:
 *     summary: Schedule a demo
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *                source:
 *                 type: string
 *                 example: "Feature Request"
 *     responses:
 *       200:
 *         description: Demo scheduled successfully
 *       400:
 *         description: Email field is required
 *       500:
 *         description: Internal Server Error
 */
router.post('/demo-scheduler', authController.demoScheduler);


module.exports = router;
