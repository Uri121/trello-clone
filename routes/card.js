const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();
const List = require("../model/List");


//create card
router.post("/create", auth, async (req, res) => {
  let { text, id, listID } = req.body;
  console.log("from server", text, id, listID);

  const newCard ={
    text: text,
    id: id
  };

  console.log(newCard);
  await List.findOne({ id: listID })
    .updateOne({ $push: { cards: newCard } })
    .then(res.json({ newCard, listID }))
    .catch(err => console.log(err));
});


router.delete("/delete",async (req, res) => {
  const {id,listID} = req.body;
  console.log(id,listID);
  await List.findOne({ id: listID })
    .updateOne({ $pull: { cards:{id:id} } })
    .then(res=>console.log(res))
    .catch(err => console.log(err));
});

module.exports = router;
