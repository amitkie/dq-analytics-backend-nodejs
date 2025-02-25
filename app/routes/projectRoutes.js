const express = require('express');
const {
    createProject,
    updateProject,
    deleteProject,
    getProjectByIdController,
    createUserProjectDQScore,
    getProjectByUserIdController,
    createUrl,
    getUrl,
    saveMetrics,
    checkProjectName,
    getProject,
    removeMetricFromProject,
    createMetricGroup,
    getGroupMetrics,
    createMetricThemeGroup,
    getMetricThemeGroups,
    getProjectBenchmarks,
    getProjectByDateRangeAndUserIdController,
    removeSuperThemeGroup,
    toggleFavorite
} = require('../controllers/projectController');
const router = express.Router();

/**
 * @swagger
 * /create-project:
 *   post:
 *     summary: Create a new project
 *     tags: [Projects]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               user_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Project successfully created
 *       400:
 *         description: Bad request
 */
router.post('/create-project', createProject);

/**
 * @swagger
 * /projects/{projectId}:
 *   put:
 *     summary: Update an existing project
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Project successfully updated
 *       404:
 *         description: Project not found
 */
router.put('/projects/:projectId', updateProject);

/**
 * @swagger
 * /projects/{id}/favorite:
 *   put:
 *     summary: Toggle project favorite status
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Favorite status toggled
 *       404:
 *         description: Project not found
 */
router.put('/projects/:id/favorite', toggleFavorite);

/**
 * @swagger
 * /projects/{projectId}:
 *   delete:
 *     summary: Delete a project
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Project deleted successfully
 *       404:
 *         description: Project not found
 */
router.delete('/projects/:projectId', deleteProject);

/**
 * @swagger
 * /check-project-name:
 *   get:
 *     summary: Check if a project name is available
 *     tags: [Projects]
 *     parameters:
 *       - in: query
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Project name is available or not
 */
router.get('/check-project-name', checkProjectName);

/**
 * @swagger
 * /get-project:
 *   get:
 *     summary: Get project details by ID
 *     tags: [Projects]
 *     parameters:
 *       - in: query
 *         name: projectId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully retrieved project details
 *       404:
 *         description: Project not found
 */
router.get('/get-project', getProjectByIdController);

/**
 * @swagger
 * /get-project-by-user:
 *   get:
 *     summary: Get all projects for a user
 *     tags: [Projects]
 *     parameters:
 *       - in: query
 *         name: user_id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully retrieved user projects
 */
router.get('/get-project-by-user', getProjectByUserIdController);

/**
 * @swagger
 * /get-project-by-date-range-for-user:
 *   post:
 *     summary: Get projects within a specific date range for a user
 *     tags: [Projects]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: integer
 *               filter:
 *                 type: object
 *               year:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Successfully retrieved projects
 */
router.post('/get-project-by-date-range-for-user', getProjectByDateRangeAndUserIdController);

/**
 * @swagger
 * /save-metrics:
 *   post:
 *     summary: Save metrics for a project
 *     tags: [Metrics]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               project_id:
 *                 type: integer
 *               metrics:
 *                 type: array
 *                 items:
 *                   type: object
 *     responses:
 *       200:
 *         description: Metrics saved successfully
 */
router.post('/save-metrics', saveMetrics);

/**
 * @swagger
 * /remove-metric/{projectId}/metrics/{metricId}:
 *   delete:
 *     summary: Remove a metric from a project
 *     tags: [Metrics]
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: metricId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Metric removed successfully
 */
router.delete('/remove-metric/:projectId/metrics/:metricId', removeMetricFromProject);

/**
 * @swagger
 * /create-url:
 *   post:
 *     summary: Create a new project URL
 *     tags: [URLs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               project_id:
 *                 type: integer
 *               url:
 *                 type: string
 *     responses:
 *       200:
 *         description: URL created successfully
 */
router.post('/create-url', createUrl);

/**
 * @swagger
 * /create-user-project-dq-score:
 *   post:
 *     summary: Create a user project DQ score
 *     tags: [Projects]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               project_id:
 *                 type: integer
 *               user_id:
 *                 type: integer
 *               dq_score:
 *                 type: number
 *     responses:
 *       201:
 *         description: DQ score created successfully
 *       400:
 *         description: Bad request
 */
router.post('/create-user-project-dq-score', createUserProjectDQScore);

/**
 * @swagger
 * /get-url:
 *   get:
 *     summary: Retrieve project URLs
 *     tags: [URLs]
 *     parameters:
 *       - in: query
 *         name: project_id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully retrieved URLs
 */
router.get('/get-url', getUrl);

/**
 * @swagger
 * /projects-by-id:
 *   get:
 *     summary: Get projects by ID
 *     tags: [Projects]
 *     parameters:
 *       - in: query
 *         name: projectId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully retrieved project details
 *       404:
 *         description: Project not found
 */
router.get('/projects-by-id', getProject);
// Super Themes

/**
 * @swagger
 * /metric-groups:
 *   post:
 *     summary: Create a metric group
 *     tags: [Metrics]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               project_id:
 *                 type: integer
 *               metric_ids:
 *                 type: array
 *                 items:
 *                   type: integer
 *     responses:
 *       201:
 *         description: Metric group created successfully
 */
router.post('/metric-groups', createMetricGroup);

/**
 * @swagger
 * /metric-groups/{projectId}:
 *   get:
 *     summary: Get metric groups for a project
 *     tags: [Metrics]
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully retrieved metric groups
 *       404:
 *         description: Project not found
 */
router.get('/metric-groups/:projectId', getGroupMetrics);

/**
 * @swagger
 * /metric-theme-groups:
 *   post:
 *     summary: Create a metric theme group
 *     tags: [Metrics]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               project_id:
 *                 type: integer
 *               theme_name:
 *                 type: string
 *               metric_ids:
 *                 type: array
 *                 items:
 *                   type: integer
 *     responses:
 *       201:
 *         description: Metric theme group created successfully
 *       400:
 *         description: Bad request
 */
router.post('/metric-theme-groups', createMetricThemeGroup);

/**
 * @swagger
 * /metric-theme-groups/{projectId}:
 *   get:
 *     summary: Get metric theme groups for a project
 *     tags: [Metrics]
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully retrieved metric theme groups
 *       404:
 *         description: Project not found
 */
router.get('/metric-theme-groups/:projectId', getMetricThemeGroups);

/**
 * @swagger
 * /metric-theme-groups/{id}:
 *   delete:
 *     summary: Remove a metric theme group
 *     tags: [Metrics]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Metric theme group removed successfully
 *       404:
 *         description: Metric theme group not found
 */
router.delete('/metric-theme-groups/:id', removeSuperThemeGroup);

//graphical view
/**
 * @swagger
 * /get-weights-by-project/{projectId}:
 *   get:
 *     summary: Retrieve benchmark weights for a project
 *     tags: [Metrics]
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully retrieved benchmark weights
 */
router.get('/get-weights-by-project/:projectId', getProjectBenchmarks)




module.exports = router;
