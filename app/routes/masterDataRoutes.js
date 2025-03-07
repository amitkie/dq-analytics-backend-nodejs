const express = require("express");
const {
  getAllCategoriesController,
  getAllBrandsController,
  getAllBenchmarkController,
  getAllPlatformController,
  getAllMetricsController,
  getAllFrequencyController,
  getBrandsByCategoryIdController,
  getAllSectionController,
  getPlatformsBySectionIdController,
  getMetricsByPlatformIdController,
  getAllBrandsWithCategoriesController,
} = require("../controllers/masterDataController");

const router = express.Router();

/**
 * @swagger
 * /master/get-all-brands:
 *   get:
 *     summary: Retrieve all brands
 *     tags: [Master Data]
 *     responses:
 *       200:
 *         description: List of all brands
 *       500:
 *         description: Internal Server Error
 */

router.get("/get-all-brands", getAllBrandsController);

/**
 * @swagger
 * /master/get-all-brands-with-category:
 *   get:
 *     summary: Retrieve all categories
 *     tags: [Master Data]
 *     responses:
 *       200:
 *         description: List of all brands with categories
 *       500:
 *         description: Internal Server Error
 */
router.get(
  "/get-all-brands-with-category",
  getAllBrandsWithCategoriesController
);


/**
 * @swagger
 * /master/get-all-categories:
 *   get:
 *     summary: Retrieve all categories
 *     tags: [Master Data]
 *     responses:
 *       200:
 *         description: List of all categories
 *       500:
 *         description: Internal Server Error
 */
router.get("/get-all-categories", getAllCategoriesController);

/**
 * @swagger
 * /master/get-all-categories-by-brand-ids:
 *   post:
 *     summary: Retrieve categories by brand IDs
 *     tags: [Master Data]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               brandIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 example: [1, 2, 3]
 *     responses:
 *       200:
 *         description: List of categories filtered by brand IDs
 *       400:
 *         description: Invalid request
 *       500:
 *         description: Internal Server Error
 */

router.post(
  "/get-all-categories-by-brand-ids",
  getBrandsByCategoryIdController
);

/**
 * @swagger
 * /master/get-all-sections:
 *   get:
 *     summary: Retrieve all sections
 *     tags: [Master Data]
 *     responses:
 *       200:
 *         description: List of all sections
 *       500:
 *         description: Internal Server Error
 */
router.get("/get-all-sections", getAllSectionController);

/**
 * @swagger
 * /master/get-all-platforms:
 *   get:
 *     summary: Retrieve all platforms
 *     tags: [Master Data]
 *     responses:
 *       200:
 *         description: List of all platforms
 *       500:
 *         description: Internal Server Error
 */
router.get("/get-all-platforms", getAllPlatformController);

/**
 * @swagger
 * /master/get-all-platforms-by-section-id:
 *   post:
 *     summary: Retrieve platforms by section ID
 *     tags: [Master Data]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sectionId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: List of platforms filtered by section ID
 *       400:
 *         description: Invalid request
 *       500:
 *         description: Internal Server Error
 */
router.post(
  "/get-all-platforms-by-section-id",
  getPlatformsBySectionIdController
);

/**
 * @swagger
 * /master/get-all-metrics:
 *   get:
 *     summary: Retrieve all metrics
 *     tags: [Master Data]
 *     responses:
 *       200:
 *         description: List of all metrics
 *       500:
 *         description: Internal Server Error
 */
router.get("/get-all-metrics", getAllMetricsController);

/**
 * @swagger
 * /master/get-all-metrics-by-platform-ids:
 *   post:
 *     summary: Retrieve metrics by platform IDs
 *     tags: [Master Data]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               platformIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 example: [1, 2, 3]
 *     responses:
 *       200:
 *         description: List of metrics filtered by platform IDs
 *       400:
 *         description: Invalid request
 *       500:
 *         description: Internal Server Error
 */
router.post(
  "/get-all-metrics-by-platform-ids/",
  getMetricsByPlatformIdController
);

/**
 * @swagger
 * /master/get-all-benchmarks:
 *   get:
 *     summary: Retrieve all benchmarks
 *     tags: [Master Data]
 *     responses:
 *       200:
 *         description: List of all benchmarks
 *       500:
 *         description: Internal Server Error
 */
router.get("/get-all-benchmarks", getAllBenchmarkController);

/**
 * @swagger
 * /master/get-all-frequencies:
 *   get:
 *     summary: Retrieve all frequencies
 *     tags: [Master Data]
 *     responses:
 *       200:
 *         description: List of all frequencies
 *       500:
 *         description: Internal Server Error
 */
router.get("/get-all-frequencies", getAllFrequencyController);

module.exports = router;
