const { ValidationError } = require('sequelize');

/**
 * NoteController
 * Handles RESTful note API endpoints.
 */
class NoteController {
  // PUBLIC_INTERFACE
  constructor(noteService) {
    this.noteService = noteService;
  }

  /**
   * @swagger
   * /notes:
   *   post:
   *     summary: Create a new note
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               title:
   *                 type: string
   *               content:
   *                 type: string
   *     responses:
   *       201:
   *         description: Note created
   *       400:
   *         description: Invalid request
   */
  // PUBLIC_INTERFACE
  async create(req, res) {
    try {
      const { title, content } = req.body;
      if (!title || !content) {
        return res.status(400).json({ message: 'Title and content are required.' });
      }
      const note = await this.noteService.createNote({ title, content });
      res.status(201).json(note);
    } catch (err) {
      if (err instanceof ValidationError) {
        return res.status(400).json({ message: err.message });
      }
      res.status(500).json({ message: 'Error creating note.' });
    }
  }

  /**
   * @swagger
   * /notes:
   *   get:
   *     summary: Get all notes
   *     responses:
   *       200:
   *         description: List of notes
   */
  // PUBLIC_INTERFACE
  async getAll(req, res) {
    try {
      const notes = await this.noteService.getAllNotes();
      res.status(200).json(notes);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching notes.' });
    }
  }

  /**
   * @swagger
   * /notes/{id}:
   *   get:
   *     summary: Get a single note by id
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: Note ID
   *     responses:
   *       200:
   *         description: Note found
   *       404:
   *         description: Note not found
   */
  // PUBLIC_INTERFACE
  async getOne(req, res) {
    try {
      const { id } = req.params;
      const note = await this.noteService.getNoteById(id);
      if (!note) {
        return res.status(404).json({ message: 'Note not found.' });
      }
      res.status(200).json(note);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching note.' });
    }
  }

  /**
   * @swagger
   * /notes/{id}:
   *   put:
   *     summary: Update a note by id
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: Note ID
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               title:
   *                 type: string
   *               content:
   *                 type: string
   *     responses:
   *       200:
   *         description: Note updated
   *       404:
   *         description: Note not found
   */
  // PUBLIC_INTERFACE
  async update(req, res) {
    try {
      const { id } = req.params;
      const { title, content } = req.body;
      if (!title || !content) {
        return res.status(400).json({ message: 'Title and content are required.' });
      }
      const updatedNote = await this.noteService.updateNote(id, { title, content });
      if (!updatedNote) {
        return res.status(404).json({ message: 'Note not found.' });
      }
      res.status(200).json(updatedNote);
    } catch (err) {
      res.status(500).json({ message: 'Error updating note.' });
    }
  }

  /**
   * @swagger
   * /notes/{id}:
   *   delete:
   *     summary: Delete a note by id
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       204:
   *         description: Note deleted
   *       404:
   *         description: Note not found
   */
  // PUBLIC_INTERFACE
  async delete(req, res) {
    try {
      const { id } = req.params;
      const deleted = await this.noteService.deleteNote(id);
      if (!deleted) {
        return res.status(404).json({ message: 'Note not found.' });
      }
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ message: 'Error deleting note.' });
    }
  }
}

module.exports = NoteController;
