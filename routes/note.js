const express = require("express")
const {body} = require("express-validator")
const router = express.Router()

const noteController = require("../controllers/note")

//get all note
router.get("/note",noteController.getAllNote)
//get a note
router.get("/noteDetail/:noteId",noteController.getNote)
//create note
router.post("/noteCreate",[
    body("title")
    .isLength({max:30})
    .withMessage("title is too long"),

],noteController.createNote)
//delete note
router.delete("/deleteNote/:noteId",noteController.deleteNote)

//update note
router.post("/updateNote/:noteId",
  body("title")
  .isLength({max:30})
  .withMessage("title is too log")  ,noteController.updateNote)

module.exports = router;