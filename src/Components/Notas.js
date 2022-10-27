import React from 'react';
import '../Styles/Notas.css';
import NavbarN from './NavbarN';
import Nota from './Nota';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import { useState } from 'react';

/*import NavbarN from './NavbarN';
import Biblioteca from './Biblioteca';*/

const initialNotes = [
  {
    index:'0',
    image:'image-1',
    alt:'...',
    title:'Universidad',
    content:'Cosas que debo hacer este semestre en la universidad'
  },
  {
    index:'1',
    image:'alimentacion',
    alt:'...',
    title:'Mi dieta',
    content:'Me toca comer pollito el jueves y pezcado el sábado y lunes'
  },
  {
    index:'2',
    image:'estudio',
    alt:'...',
    title:'Tareas ARSW',
    content:'Toca trabajarle más al proyecto que a los labs porque el proyecto al menos sí vale'
  },
  {
    index:'3',
    image:'gim',
    alt:'...',
    title:'Mi rutina',
    content:'Correr 20 min, 50 sentadillas en 5 series de a 10 y descansar por 3 meses masomenos :)'
  },
  {
    index:'4',
    image:'programación',
    alt:'...',
    title:'Aprender React y JavaScript',
    content:'Realizar los cursos que tengo guardados de React, con los ejercicios propuestos, y de JavaScript'
  }
];

const reorder = (list, startIndex, endIndex) => {
  const result = [...list];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}

function Notas() {
  const [notas, setNotas] = useState(initialNotes);

  return (
    <DragDropContext onDragEnd={(result) => {
      const {source, destination} = result;
      if(!destination){
        return;
      }
      if(source.index === destination.index && source.droppableId === destination.droppableId){
        return;
      }
      setNotas((prevNotas) => reorder(prevNotas, source.index, destination.index)
      );
    }
    }>
      <div className="Notas">
        <NavbarN/>
        <Droppable droppableId="notas" direction='horizontal' >
        {(droppableProvided)=> (
          <div {...droppableProvided.droppableProps} ref={droppableProvided.innerRef} class="row row-cols-1 row-cols-md-5">
            {notas.map((notas, index) => (<Nota 
              index={index}
              noteId={index.toString()}
              image={notas.image}
              alt={notas.alt}
              title={notas.title}
              content={notas.content}
              />))}
            
            {droppableProvided.placeholder}
          </div>)}
        </Droppable>
      </div>
    </DragDropContext>
  );
}

export default Notas;
