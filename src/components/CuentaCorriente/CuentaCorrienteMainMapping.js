import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import "./CCStyle.css"
const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'Fecha', headerName: 'Fecha', width: 130 },
  { field: 'Detalle', headerName: 'Detalle', width: 130 },
  {
    field: 'Estado',
    headerName: 'Estado',
    type: 'boolean',
    width: 90,
  },
  {
    field: 'Importe',
    headerName: 'Importe',
    type: 'number',
    width: 90,
  },
];

function cambiobool(){

}


const rows = [
  { id: 1, Fecha: '03/29/21', Detalle: 'Detalle', Estado: true, Importe: '2500' },
  { id: 2, Fecha: '03/29/21', Detalle: 'Detalle', Estado: false , Importe: '2500'},
  { id: 3, Fecha: '03/29/21', Detalle: 'Detalle', Estado: true , Importe: '2500'},
  { id: 4, Fecha: '03/29/21', Detalle: 'Detalle', Estado: false, Importe: '2500' },
];

export default function CuentaCorrienteMainMapping() {
  return (
    
    <div class="collection">
    <a href="#!" class="collection-item">Alvin</a>
    <a href="#!" class="collection-item active">Alvin</a>
    <a href="#!" class="collection-item">Alvin</a>
    <a href="#!" class="collection-item">Alvin</a>
  </div>
    
  );
}
