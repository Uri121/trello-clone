const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();
const List = require("../model/List");

//get all lists of the user
router.get("/get/:user", (req, res) => {
  List.find({ user: req.params.user })
    .then(lists => res.json(lists))
    .catch(err => res.status(404).json({ msg: err }));
});

//delete list
router.delete("/delete/:id", (req, res) => {
  console.log(req.params.id);
  List.findOneAndDelete({ id: req.params.id })
    .then(list => res.json(list))
    .catch(() => res.status(404).json({ success: false }));
});

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

router.post("/update", async (req, res) => {
  const {
    droppableIdStart,
    droppableIdEnd,
    droppableIndexStart,
    droppableIndexEnd,
    islist
  } = req.body.data;

  //update list drag around
  if (islist === "list") {
    const lists = await List.find();
    const listFrom = lists.splice(droppableIndexStart, 1);
    lists.splice(droppableIndexEnd, 0, ...listFrom);
    console.log("--------------------------");
    console.log("the new list after splice:", lists);
    console.log("--------------------------");
    for (let i = 0; i < lists.length; i++) {
      await List.findOneAndDelete({ id: lists[i].id }).then(async function() {
        const newList = new List({
          id: lists[i].id,
          title: lists[i].title,
          user: lists[i].user,
          cards: lists[i].cards
        });
        await newList
          .save()
          .then(res => console.log(`the new list in place${i}`, res))
          .catch(err => console.log(err));
      });
    }

    // List.updateMany({id:lists.id}).then(res=>console.log(res)).catch(err=>console.log(err));
    return;
  }
  // update in the same list
  if (droppableIdStart === droppableIndexEnd) {
    const list = await List.findOne({ id: droppableIdStart });

    const card = await list.cards.splice(droppableIndexStart, 1);
    list.cards.splice(droppableIndexEnd, 0, ...card);
    list
      .updateOne({ cards: list.cards })
      .then(cards => res.json(cards))
      .catch(err => res.json(err));
    return;
  }

  //other list
  if (droppableIdStart !== droppableIndexEnd) {
    //find the list where drag happened
    const listStart = await List.findOne({ id: droppableIdStart });

    //pull the card from this list
    const card = await listStart.cards.splice(droppableIndexStart, 1);

    //find the where drag ended
    const listEnd = await List.findOne({ id: droppableIdEnd });

    //put the card in the new list
    listEnd.cards.splice(droppableIndexEnd, 0, ...card);

    listStart
      .updateOne({ cards: listStart.cards })
      .then(res => console.log(res))
      .catch(err => console.log(err));
    listEnd
      .updateOne({ cards: listEnd.cards })
      .then(res => console.log(res))
      .catch(err => console.log(err));
    return;
  }
});

module.exports = router;
