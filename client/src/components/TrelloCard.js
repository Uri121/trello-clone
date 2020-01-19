import React from "react";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import { Draggable } from "react-beautiful-dnd";
import DeleteButton from './DeleteButton';


const TrelloCard = ({ text, id, index, listID }) => {
  return (
    <Draggable draggableId={String(id)} index={index}>
      {provided => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Card className="card">
            <Typography gutterBottom>{text}</Typography>
            <DeleteButton listId={listID} id={id}/>
          </Card>
        </div>
      )}
    </Draggable>
  );
};

export default TrelloCard;
