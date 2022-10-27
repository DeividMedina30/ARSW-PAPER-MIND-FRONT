import React from "react";
import '../Styles/Notas.css';
import { Draggable } from "@hello-pangea/dnd";

function Nota(props){
  return(
    <Draggable draggableId={props.noteId} index={props.index}>
      {(draggableProvided)=> (
      <div {...draggableProvided.draggableProps} ref={draggableProvided.innerRef} {...draggableProvided.dragHandleProps} class="col mb-4">
        <div class="card">
          <img 
            src={require(`../../img/${props.image}.jpg`)} 
            class="card-img-top" 
            alt={props.alt}
          />
          <div class="card-body">
            <h5 class="card-title">{props.title}</h5>
            <p class="card-text">{props.content}</p>
          </div>
        </div>
      </div>)}
    </Draggable>
  )
}

export default Nota;