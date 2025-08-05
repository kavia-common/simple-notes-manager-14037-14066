const express = require('express');
const healthController = require('../controllers/health');

// Mount notes routes
const notesRouter = require('./notes');

const router = express.Router();

/**
 * @swagger
 * /:
 *   get:
 *     summary: Health endpoint
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Service health check passed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 *                 message:
 *                   type: string
 *                   example: Service is healthy
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                 environment:
 *                   type: string
 *                   example: development
 */
router.get('/', healthController.check.bind(healthController));

/**
 * @swagger
 * /notes:
 *   post:
 *     summary: Create a new note
 *     tags: [Notes]
 *   get:
 *     summary: Get all notes
 *     tags: [Notes]
 *
 * /notes/{id}:
 *   get:
 *     summary: Get a single note by id
 *     tags: [Notes]
 *   put:
 *     summary: Update a note by id
 *     tags: [Notes]
 *   delete:
 *     summary: Delete a note by id
 *     tags: [Notes]
 */

// CRUD endpoints for /notes
router.use('/notes', notesRouter);

module.exports = router;
