import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { ReactChild, ReactFragment, ReactPortal, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IAppState } from '../store/store';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import { GetCartAction } from '../actions/cartsActions';




export default function CartsList() {
  const carts = useSelector<IAppState, Array<any>>((state: IAppState) => state.cartsState.carts);

  let [appModeFilter, setAppModeFilter] = useState<string>('Any');
  let [statusFilter, setStatusFilter] = useState<string>('Any');
  let [openModalId, setOpenModalId] = useState<number | null>(null);
  let [modalCart, setModalCart] = useState<any | null>(null);

  const handleAppModeFilterChange = (event: SelectChangeEvent) => {
    setAppModeFilter(event.target.value as string);
  };
  const handleStatusFilterChange = (event: SelectChangeEvent) => {
    setStatusFilter(event.target.value as string);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    if (openModalId !== null){
      dispatch(GetCartAction(openModalId))
    }
  }, [openModalId])

  useEffect(() => {
    if (openModalId !== null){
      setModalCart(carts.find(cart => cart.id === openModalId))
    }
  }, [carts])

  const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    p: 4,
    maxHeight: '80%',
  };
  

  return (
    <div>
      <Box display="flex" padding={1}>
      <p style={{marginRight: 10}}>App Mode:</p>
      <Select
        id="app-mode-filter"
        value={appModeFilter}
        onChange={handleAppModeFilterChange}
      >
        <MenuItem value="Any">Any</MenuItem>
        {Array.from(new Set(carts.map(cart => cart.app_mode))).map(item => (
          <MenuItem value={item}>{item}</MenuItem>
        ))}
      </Select>
      <p style={{marginRight: 10, marginLeft: 20}}>Status:</p>
      <Select
        id="status-filter"
        value={statusFilter}
        onChange={handleStatusFilterChange}
      >
        <MenuItem value="Any">Any</MenuItem>
        {Array.from(new Set(carts.map(cart => cart.status))).map(item => (
          <MenuItem value={item}>{item}</MenuItem>
        ))}
      </Select>
      </Box>
      <Modal
        open={openModalId !== null}
        onClose={() => setOpenModalId(null)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Stack sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {modalCart?.id}
          </Typography>
          <Typography>
            {modalCart?.app_mode}, {modalCart?.status}
          </Typography>
          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Promotion</TableCell>
                  <TableCell>Product Name</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {modalCart?.items?.map((item: { discount: number; name: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined; price: number; }) => (
                  <TableRow>
                    <TableCell align="right">{item.discount ? <MonetizationOnOutlinedIcon sx={{color: 'red'}}/> : ''}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{(item.price - item.discount * item.price/100).toFixed(2)}</TableCell>
                    <TableCell><Button>Remove</Button></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
      </Modal>
      <TableContainer component={Paper}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">App Mode</TableCell>
              <TableCell align="right">Cart Status</TableCell>
              <TableCell align="right">Items Count</TableCell>
              <TableCell align="right">Total Price</TableCell>
              <TableCell align="right">Total Price Without Discount</TableCell>
              <TableCell align="right">Total Discount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {carts.filter(cart => (appModeFilter === 'Any' || appModeFilter === cart.app_mode) && (statusFilter === 'Any' || statusFilter === cart.status))
            .map((cart) => (
              <TableRow
                key={cart.id}
                onClick={() => setOpenModalId(cart.id)}
              >
                <TableCell component="th" scope="row">{cart.id}</TableCell>
                <TableCell align="right">{cart.app_mode}</TableCell>
                <TableCell align="right">{cart.status}</TableCell>
                <TableCell align="right">{cart.items_count}</TableCell>
                <TableCell align="right">{cart.total_price}</TableCell>
                <TableCell align="right">{cart.total_price_without_discount}</TableCell>
                <TableCell align="right">{cart.total_discount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
