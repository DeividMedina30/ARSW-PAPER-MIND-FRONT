
import React, { Component } from 'react';
import '../Styles/App.css';
import Navbar from './Navbar';
import NavbarSelec from './NavbarSelec';
import ButtonDrop from './ButtonDrop';
import Biblioteca from './Biblioteca.js';
import BibliotecaImp from './BibliotecaImp.js';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import { useState } from 'react';
import { render } from '@testing-library/react';
import { BibliotecaService } from '../service/BibliotecaService';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';

import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

export default class App1 extends Component{
  constructor(){
    super();
    this.state = {};
    this.bibliotecaService = new BibliotecaService();
  }

  componentDidMount(){
    this.bibliotecaService.getAll().then(data => this.setState({bibliotecas: data}))
    this.setState({
      visible: false,
      biblioteca:{
        id:null,
        titulo: null,
        fecha_creacion: null,
        fecha_modificacion: null,
        descripcion: null
      }
    });
  }

  save(){
    this.bibliotecaService.save(this.state.biblioteca)
  }

  render(){
    return(
      <div className="App">
        <Navbar />
        <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet"/>
        <div class="page-content container note-has-grid">
          <NavbarSelec/>
          <div class="tab-content bg-transparent">
            <div id="note-full-container" class="note-has-grid row">
              <Biblioteca 
                titulo = {this.state.biblioteca}
              />
            </div>
          </div>
        </div>
      </div>
      
    );
  }

showSaveDialog(){
  this.setState({
    visible: true
  })
}

/*

<div className="App">
        <Navbar />
        <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet"/>
        <div class="page-content container note-has-grid">
          <NavbarSelec/>
          <DataTable value={this.state.bibliotecas} header={<div>Bibliotecas</div>}>
            <Column field='id_biblioteca' header='ID'></Column>
            <Column field='nombre' header='Nombre'></Column>
            <Column field='fecha_creacion' header='Fecha creación'></Column>
            <Column field='fecha_modificacion' header='Fecha modificación'></Column>
            <Column field='descripcion' header='Descripción'></Column>
            <Column header='Opciones' body={<ButtonDrop/>}></Column>
          </DataTable>
          <Dialog header="Crear biblioteca" visible={this.state.visible} style={{width: '70%'}} modal={true} onHide={() => this.setState({visible: false})}>
            <span className='p-float-label'>
              <FormBiblioteca onChange={(e) => this.setState(prevState => {
                let biblioteca = Object.assign({}, prevState.biblioteca)
                biblioteca.titulo = e.target.value
              })} />
              <label htmlFor='nombre'>Nombre</label>
            </span>
          </Dialog>
        </div>
      </div>

import React from 'react';
import '../Styles/App.css';
import Navbar from './Navbar';
import NavbarSelec from './NavbarSelec';
import Biblioteca from './Biblioteca.js';
import BibliotecaImp from './BibliotecaImp.js';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import { useState } from 'react';

const initialBibl = [
  {
    index: "0",
    titulo: 'Importantes Uni 1',
    fecha: '01 Abril 2022',
    contenido: 'Notas importantes a tener en cuenta para la universidad'
  },
  {
    index:"1",
    titulo: 'Notas personales 1',
    fecha: '19 Octubre 2022',
    contenido: 'En esta biblioteca guardaré sólo notas personales que no se pueden compartir con nadie'
  },
  {
    index:"2",
    titulo: 'Importantes Uni 2',
    fecha: '02 Abril 2022',
    contenido: 'Notas importantes a tener en cuenta para la universidad'
  }/*,
  {
    index:"3",
    titulo: 'Importantes Uni 3',
    fecha: '03 Abril 2022',
    contenido: 'Notas importantes a tener en cuenta para la universidad'
  },
  {
    index:"4",
    titulo: 'Notas personales 2',
    fecha: '20 Octubre 2022',
    contenido: 'En esta biblioteca guardaré sólo notas personales que no se pueden compartir con nadie'
  },
  {
    index:"5",
    titulo: 'Notas personales 3',
    fecha: '21 Octubre 2022',
    contenido: 'En esta biblioteca guardaré sólo notas personales que no se pueden compartir con nadie'
  }
];

const reorder = (list, startIndex, endIndex) => {
  const result = [...list];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}

function App() {
  const [bibliotecas, setBibliotecas] = useState(initialBibl);
  return (
    <DragDropContext onDragEnd={(result) => {
      const {source, destination} = result;
      if(!destination){
        return;
      }
      if(source.index === destination.index && source.droppableId === destination.droppableId){
        return;
      }
      setBibliotecas((prevBibliotecas) => reorder(prevBibliotecas, source.index, destination.index)
      );
    }
    }>
      <div className="App">
        <Navbar />
        <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet"/>
        <div class="page-content container note-has-grid">
          <NavbarSelec/>
          <div class="tab-content bg-transparent">
            <Droppable droppableId="bibliotecas" direction='horizontal' >
              {(droppableProvided)=> (
              <div {...droppableProvided.droppableProps} ref={droppableProvided.innerRef} id="note-full-container" class="note-has-grid row">
                {bibliotecas.map((bibliotecas, index) => (<Biblioteca 
                  index={index}
                  Bibid= {bibliotecas.index} 
                  titulo={bibliotecas.titulo} 
                  fecha={bibliotecas.fecha} 
                  contenido={bibliotecas.contenido} 
                  />))}
                
                {droppableProvided.placeholder}
              </div>)}
            </Droppable>
          </div>
        </div>
      </div>
    </DragDropContext>
  );
}

export default App;*/
}
