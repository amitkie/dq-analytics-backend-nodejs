const express = require('express');
const { createPayment } = require('../controllers/paymentController');
const router = express.Router();

/**
 * @swagger
 * /create-payment:
 *   post:
 *     summary: Create or update a payment record
 *     tags: [Payment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 example: 1
 *               subscription_name:
 *                 type: string
 *                 example: "Premium Plan"
 *               amount:
 *                 type: number
 *                 example: 49.99
 *               storage:
 *                 type: integer
 *                 example: 100
 *               connection_allowed:
 *                 type: integer
 *                 example: 5
 *               payment_status:
 *                 type: string
 *                 enum: [Pending, Completed, Failed]
 *                 example: "Completed"
 *     responses:
 *       200:
 *         description: Payment successfully created or updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Payment updated successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     subscription_name:
 *                       type: string
 *                       example: "Premium Plan"
 *                     amount:
 *                       type: number
 *                       example: 49.99
 *                     storage:
 *                       type: integer
 *                       example: 100
 *                     connection_allowed:
 *                       type: integer
 *                       example: 5
 *                     payment_status:
 *                       type: string
 *                       example: "Completed"
 *       400:
 *         description: Bad request (Missing or invalid parameters)
 *       404:
 *         description: User not found
 */
router.post('/create-payment', createPayment )


module.exports = router;
