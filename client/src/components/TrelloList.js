import React,{Component} from "react";
import TrelloCard from "./TrelloCard";
import TrelloActionButton from "./TrelloActionButton";
import { Droppable, Draggable } from "react-beautiful-dnd";
import DeleteButton from "./DeleteButton";
import { Icon, Card, Button } from "@material-ui/core";
import Textarea from "react-textarea-autosize";

class TrelloList extends Component{
  state = {
    formOpen: false,
    text: ""
  };

  openForm = () => {
    this.setState({
      formOpen: true
    });
  };

  closeForm = () => {
    this.setState({
      formOpen: false
    });
  };

  handleIputChange = e => {
    this.setState({
      text: e.target.value
    });
    console.log(this.state.text);
    
  };

  handleEditList=()=>{

  }
  renderForm = () => {
    return (
      <div className="card-form">
        <Card className="form-card">
          <Textarea
            defaultValue={this.props.title}
            autoFocus
            onBlur={this.closeForm}
            onChange={this.handleIputChange}
          />
        </Card>
        <div className="form-button">
          <Button
            onMouseDown={this.handleEditList}
            variant="contained"
          >
            Done
          </Button>
          <Icon
            onClick={this.closeForm}
            style={{ marginLeft: 8, cursor: "pointer" }}
          >
            close
          </Icon>
        </div>
      </div>
    );
  };

  hundleClick=()=>{
    this.setState({
      show:!this.state.show
    });
  }

  render(){
    const{ title, cards, listId, index} = this.props;
    return(
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
              <div className="title">
             {this.state.formOpen?  this.renderForm():<h4 style={{cursor: "pointer" }} onClick={this.openForm}>{title}</h4>}
              
                <DeleteButton isList id={listId}/>
              </div>

                {cards?cards.map((card, index) => (
                  <TrelloCard
                    key={card.id}
                    index={index}
                    text={card.text}
                    id={card.id}
                    listID={listId}
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
  }
}


// const TrelloList = ({ title, cards, listId, index }) => {

//   return (
//     <Draggable draggableId={String(listId)} index={index}>
//       {provided => (
//         <div
//           {...provided.draggableProps}
//           {...provided.dragHandleProps}
//           ref={provided.innerRef}
//         >
//           <Droppable droppableId={String(listId)}>
//             {provided => (
//               <div
//                 className="list"
//                 {...provided.droppableProps}
//                 ref={provided.innerRef}
//               >
//               <div className="title">
//               <h4>{title}</h4>
//                 <DeleteButton id={listId}/>
//               </div>

//                 {cards?cards.map((card, index) => (
//                   <TrelloCard
//                     key={card.id}
//                     index={index}
//                     text={card.text}
//                     id={card.id}
//                   />
//                 )) : null}
                
//                 {provided.placeholder}
//                 <TrelloActionButton listId={listId} />
//               </div>
//             )}
//           </Droppable>
//         </div>
//       )}
//     </Draggable>
//   );
// };
export default TrelloList;
