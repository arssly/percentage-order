import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export type ListTableProps = {
  headings: string[];
  rows: string[][];
};
export default function ListTable({ headings, rows }: ListTableProps) {
  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            {headings.map((h, index) => (
              <TableCell align="center" key={`heading-${index}`}>
                {h}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={`row-${index}`}>
              {row.map((rowItem, rindex) => (
                <TableCell key={`row-${index}-item-${rindex}`} align="center">
                  {rowItem}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
