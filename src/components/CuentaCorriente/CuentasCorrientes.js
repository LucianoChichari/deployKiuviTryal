import './CCStyle.css'
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Avatar,
    Grid,
    Typography,
    TablePagination,
    TableFooter
 } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    table: {
      minWidth: 650,
    },
    tableContainer: {
        borderRadius: 15,
        margin: '10px 10px',
        maxWidth: 950,
        backgroundColor: 'transparent'
    },
    tableHeaderCell: {
        fontWeight: 'bold',
        backgroundColor: theme.palette.primary.dark,
        color: 'white'
    },
    avatar: {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.getContrastText(theme.palette.primary.light)
    },
    name: {
        fontWeight: 'bold',
        color: theme.palette.secondary.dark
    },
    status: {
        fontWeight: 'bold',
        fontSize: '0.75rem',
        color: 'white',
        backgroundColor: 'grey',
        borderRadius: 8,
        padding: '3px 10px',
        display: 'inline-block'
    }
  }));

  function createData(ID, Fecha, Detalle, Importe, Estado) {
    return {ID, Fecha, Detalle, Importe, Estado};
}

const rows = [
    createData(1, '01/01/2022', 'Agua', 2000, 'PAGADO'),
    createData(2, '01/01/2022', 'Luz', 4000, 'ADEUDA'),
    createData(3, '01/01/2022', 'Alquiler', 20000, 'ADEUDA'),
    createData(4, '01/01/2022', 'Arreglo', 2000, 'PAGADO'),
    createData(5, '01/01/2022', 'Mantenimiento ', 2000, 'ADEUDA'),
    createData(6, '01/01/2022', 'Gas', 1000, 'PAGADO')
];

function CuentaCorrienteComponent() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <TableContainer component={Paper} className='tablecontainerclass'>
      <Table className='allintable' aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className='tableheader'>FECHA</TableCell>
            <TableCell className='tableheader'>DETALLE</TableCell>
            <TableCell className='tableheader'>IMPORTE</TableCell>
            <TableCell className='tableheader'>ESTADO</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
            <TableRow key={row.id}>
              <TableCell>
                  <Typography color="primary" variant="subtitle2">{row.Fecha}</Typography>
                </TableCell>
                <TableCell >
                  <Typography color="primary" variant="subtitle2">{row.Detalle}</Typography>
                </TableCell>
              <TableCell>{row.Importe}</TableCell>
              <TableCell>
                  <Typography 
                    className='estadodepago'
                    style={{
                        backgroundColor: 
                        ((row.Estado === 'PAGADO' && '#14B8A6') ||
                        (row.Estado === 'ADEUDA' && '#D14343'))
                    }}
                  >{row.Estado}</Typography>
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
        <TablePagination
            className='tablepagination'
            rowsPerPageOptions={[5, 10, 15]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
        />
        </TableFooter>
      </Table>
    </TableContainer>
  );
}

export default CuentaCorrienteComponent;
