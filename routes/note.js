const express = require("express")
const {body} = require("express-validator")
const router = express.Router()

const noteController = require("../controllers/note")
const {isToken} =require("../middleware/isToken")
//get all note
router.get("/note",noteController.getAllNote)
//get a note
router.get("/noteDetail/:noteId",noteController.getNote)
//create note
router.post("/noteCreate",[
    body("title")
    .isLength({max:30})
    .withMessage("title is too long"),

],isToken,noteController.createNote)
//delete note
router.delete("/deleteNote/:noteId",isToken,noteController.deleteNote)

//update note
router.put("/updateNote/:noteId",
  body("title")
  .isLength({max:30})
  .withMessage("title is too log") ,
  isToken ,noteController.updateNote)

module.exports = router;