/**
 * Service for CRUD operations for Notes.
 */
class NoteService {
  // PUBLIC_INTERFACE
  constructor(NoteModel) {
    this.Note = NoteModel;
  }

  /**
   * Create a new note.
   * @param {Object} noteData 
   * @returns {Promise<Object>}
   */
  // PUBLIC_INTERFACE
  async createNote(noteData) {
    return this.Note.create(noteData);
  }

  /**
   * Get all notes.
   * @returns {Promise<Array>}
   */
  // PUBLIC_INTERFACE
  async getAllNotes() {
    return this.Note.findAll({ order: [['updatedAt', 'DESC']] });
  }

  /**
   * Get a single note by id.
   * @param {number} id 
   * @returns {Promise<Object|null>}
   */
  // PUBLIC_INTERFACE
  async getNoteById(id) {
    return this.Note.findByPk(id);
  }

  /**
   * Update a note by id.
   * @param {number} id 
   * @param {Object} updateData 
   * @returns {Promise<Object|null>}
   */
  // PUBLIC_INTERFACE
  async updateNote(id, updateData) {
    const note = await this.Note.findByPk(id);
    if (!note) return null;
    await note.update(updateData);
    return note;
  }

  /**
   * Delete a note by id.
   * @param {number} id 
   * @returns {Promise<boolean>}
   */
  // PUBLIC_INTERFACE
  async deleteNote(id) {
    const note = await this.Note.findByPk(id);
    if (!note) return false;
    await note.destroy();
    return true;
  }
}
module.exports = NoteService;
