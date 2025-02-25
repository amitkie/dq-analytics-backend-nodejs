const express = require('express');
const { userActivityTracker, updateDBCreationStatus, updateSchemaTableCreationStatus, getDBAndSchemaTableCreationStatus } = require('../controllers/userController');
const router = express.Router();

/**
 * @swagger
 * /get-user-activity:
 *   post:
 *     summary: Track user activity based on tab interactions
 *     tags: [User]
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
 *               tab_name:
 *                 type: string
 *                 enum: [page_speed_insights, facebook_insight, google_analytics, google_ads, dv360]
 *                 example: "google_analytics"
 *     responses:
 *       200:
 *         description: User activity recorded successfully
 *       400:
 *         description: Bad request (Invalid input or exceeded tab limits)
 *       404:
 *         description: User not found
 */
router.post('/get-user-activity', userActivityTracker );

/**
 * @swagger
 * /update-db-status/{id}:
 *   put:
 *     summary: Update database creation status for a user
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               is_db_created:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Database creation status updated successfully
 *       400:
 *         description: Bad request (Invalid input)
 *       404:
 *         description: User activity not found
 */
router.put('/update-db-status/:id', updateDBCreationStatus);

/**
 * @swagger
 * /update-schema-table-status/{id}:
 *   put:
 *     summary: Update schema and table creation status for a user
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               is_schema_table_created:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Schema and table creation status updated successfully
 *       400:
 *         description: Bad request (Invalid input)
 *       404:
 *         description: User activity not found
 */
router.put('/update-schema-table-status/:id', updateSchemaTableCreationStatus);

/**
 * @swagger
 * /get-db-schema-status/{id}:
 *   get:
 *     summary: Get database and schema table creation status for a user
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Successfully retrieved database and schema table status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 is_db_created:
 *                   type: boolean
 *                   example: true
 *                 is_schema_table_created:
 *                   type: boolean
 *                   example: false
 *       404:
 *         description: User activity not found
 */
router.get('/get-db-schema-status/:id', getDBAndSchemaTableCreationStatus);


module.exports = router;
