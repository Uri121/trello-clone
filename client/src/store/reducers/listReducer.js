import * as mutations from "../mutations";

const listReducer = (state = [], action) => {
  switch (action.type) {
    case mutations.LIST_DELETED:
      return state.filter(list => list.id !== action.payload);
    case mutations.LIST_LOADED:
      return [...action.payload];
    case mutations.ADD_LIST:
      const newList = {
        title: action.payload.title,
        cards: [],
        id: action.payload.id
      };
      return [...state, newList];
    case mutations.ADD_CARD: {
      const newCard = {
        ...action.payload.newCard
      };

      const newState = state.map(list => {
        if (list.id === action.payload.listID) {
          return {
            ...list,
            cards: [...list.cards, newCard]
          };
        } else {
          return list;
        }
      });
      return newState;
    }
    case mutations.DRAG_HAPPENED:
      const {
        droppableIdStart,
        droppableIdEnd,
        droppableIndexStart,
        droppableIndexEnd,
        islist
      } = action.payload;
      console.log(
        droppableIdStart,
        droppableIdEnd,
        droppableIndexStart,
        droppableIndexEnd,
        islist
      );

      const newState = [...state];

      //dragging list around
      if (islist === "list") {
        const list = newState.splice(droppableIndexStart, 1);
        newState.splice(droppableIndexEnd, 0, ...list);
        return newState;
      }

      //in the same list
      if (droppableIdStart === droppableIndexEnd) {
        const list = state.find(list => droppableIdStart === list.id);
        console.log(list);

        const card = list.cards.splice(droppableIndexStart, 1);
        list.cards.splice(droppableIndexEnd, 0, ...card);
      }

      //other list
      if (droppableIdStart !== droppableIndexEnd) {
        //find the list where drag happened
        const listStart = state.find(list => droppableIdStart === list.id);

        //pull the card from this list
        const card = listStart.cards.splice(droppableIndexStart, 1);

        //find the where drag ended
        const listEnd = state.find(list => droppableIdEnd === list.id);

        //put the card in the new list
        listEnd.cards.splice(droppableIndexEnd, 0, ...card);
      }
      return newState;
    case mutations.DELETE_CARD: {
      const { listID, id } = action.payload;
      const newState = state.map(list => {
        if (list.id === listID) {
          return {
            ...list,
            cards: list.cards.filter(card => card.id !== id)
          };
        } else {
          return list;
        }
      });
      return newState;
    }

    default:
      return state;
  }
};
export default listReducer;
