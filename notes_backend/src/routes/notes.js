/**
 * Notes API Routes
 * CRUD endpoints for notes.
 * All responses are JSON.
 */
const express = require('express');

// DB/ORM/model/service/controller wiring
const { initializeSequelize } = require('../utils/database');
const defineNoteModel = require('../models/note');
const NoteService = require('../services/note');
const NoteController = require('../controllers/note');

// DB and model setup
const sequelize = initializeSequelize();
const NoteModel = defineNoteModel(sequelize);
const noteService = new NoteService(NoteModel);
const noteController = new NoteController(noteService);

// Make sure model is synced (create table if not exists)
sequelize.sync();

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Notes
 *   description: API for notes
 */

// Create Note
router.post(
  '/',
  (req, res) => noteController.create(req, res)
);
// Get All Notes
router.get(
  '/',
  (req, res) => noteController.getAll(req, res)
);
// Get Note by ID
router.get(
  '/:id',
  (req, res) => noteController.getOne(req, res)
);
// Update Note
router.put(
  '/:id',
  (req, res) => noteController.update(req, res)
);
// Delete Note
router.delete(
  '/:id',
  (req, res) => noteController.delete(req, res)
);

module.exports = router;
