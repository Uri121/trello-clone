const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();
const List = require("../model/List");
const Card = require("../model/Card");

//get all lists of the user
router.get("/get", (req, res) => {
  List.find({ user: req.query.user })
    .then(lists => res.json(lists))
    .catch(err => res.status(404).json({ msg: err }));
});
// .then(lists => res.json(lists)).catch(err => res.status(404).json({msg: err }));
//delete pet
// router.delete("/delete",auth, async(req, res) => {

//     let pet = await Pet.findOne({id: req.body.id});
//     console.log("this is the deleted pet",pet);
//     if(!pet){
//       return res.status(500).send("Pet not found");
//     }
//     pet.
//     remove().
//     then(() => res.json({ success: true })).
//     catch(err => res.status(404).json({ success: false }));
//   });

//create list
router.post("/create", auth, (req, res) => {
  let { title, id, user } = req.body;
  console.log("from server", title, id, user);
  const newList = new List({
    title: title,
    id: id,
    user: user
  });

  console.log(newList);

  newList
    .save()
    .then(list => res.json(list))
    .catch(err => console.log(err));
});

module.exports = router;
