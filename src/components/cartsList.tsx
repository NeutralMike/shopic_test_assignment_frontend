import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { IAppState } from '../store/store';



export default function CartsList() {
  const isLoading = useSelector((state: IAppState) => state.cartsState.loading);

  const carts = useSelector((state: IAppState) => state.cartsState.carts);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
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
          {carts.map((cart) => (
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
  );
}
