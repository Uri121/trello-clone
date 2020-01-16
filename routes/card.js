const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();
const Card = require("../model/Card");
const List = require("../model/List");
//get all cards of the user
// router.get("/get",(req,res)=>{
//     List.find({user: req.query.owner}).then(lists => res.json(lists)).catch(err => res.status(404).json({msg: err }));
// });

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


//create card 
router.post("/create",auth,async(req, res) => {
    let { text, id, listID } = req.body;
    console.log("from server",text,id,listID);

    const newCard = new Card({
      text:text,
      id: id
    });
  
    console.log(newCard);
    (await List.findOne({id:listID})).updateOne({$push:{cards:newCard}}).then(res.json({newCard,listID})).catch(err => console.log(err));
    // newCard
    //   .save()
    //   .then(card => res.json(card))
    //   .catch(err => console.log(err));
  });

module.exports = router;