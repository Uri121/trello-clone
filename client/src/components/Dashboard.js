import React from "react";
import { connect } from "react-redux";
import TrelloList from "./TrelloList";
import TrelloActionButton from "./TrelloActionButton";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { sort } from "../store/actions/listAdctions";

const Dashboard=({ lists, drag,user })=>{
  const onDragEnd = result => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }
    drag(
        source.droppableId,
        destination.droppableId,
        source.index,
        destination.index,
        draggableId,
        type,
        user
      );
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="dashboard">
          <Droppable droppableId="all-lists" direction="horizontal" type="list">
            {provided => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="lists-container"
              >
              {lists.length>0? lists.map((list, index) => (
                  <TrelloList
                    listId={list.id}
                    key={list.id}
                    title={list.title}
                    cards={list.cards}
                    index={index}
                  />
                )): null}
               
                {provided.placeholder}
                <TrelloActionButton list />
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </>
  );
}

const mapStateToProps = state => ({
  lists: state.lists,
  user:state.auth.user.email
});

const mapDispatchToProps={
  drag:sort
};

export default connect(mapStateToProps,mapDispatchToProps)(Dashboard);
