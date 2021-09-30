import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { IAppState } from '../store/store';
import Box from '@mui/material/Box';




export default function CartsList() {
  const isLoading = useSelector((state: IAppState) => state.cartsState.loading);

  const carts = useSelector((state: IAppState) => state.cartsState.carts);

  let [appModeFilter, setAppModeFilter] = useState('Any');
  let [statusFilter, setStatusFilter] = useState('Any');

  const handleAppModeFilterChange = (event: SelectChangeEvent) => {
    setAppModeFilter(event.target.value as string);
  };
  const handleStatusFilterChange = (event: SelectChangeEvent) => {
    setStatusFilter(event.target.value as string);
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
