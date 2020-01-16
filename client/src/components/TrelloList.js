import React from "react";
import TrelloCard from "./TrelloCard";
import TrelloActionButton from "./TrelloActionButton";
import { Droppable, Draggable } from "react-beautiful-dnd";

const TrelloList = ({ title, cards, listId, index }) => {
  console.log(cards);
  return (
    <Draggable draggableId={String(listId)} index={index}>
      {provided => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Droppable droppableId={String(listId)}>
            {provided => (
              <div
                className="list"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <h4>{title}</h4>
                {cards?cards.map((card, index) => (
                  <TrelloCard
                    key={card.id}
                    index={index}
                    text={card.text}
                    id={card.id}
                  />
                )) : null}
                
                {provided.placeholder}
                <TrelloActionButton listId={listId} />
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};
export default TrelloList;
