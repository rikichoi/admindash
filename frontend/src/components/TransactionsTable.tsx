import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import PaginationBar from "./PaginationBar";
import { Transaction } from "@/app/models/transactions";

type TransactionsTableProps = {
  transactions: Transaction[];
  page: number;
};

export function TransactionsTable({
  transactions,
  page,
}: TransactionsTableProps) {
  const totalAmount = transactions.reduce(
    (accumulator, currentValue) => accumulator + currentValue.amount,
    0
  );
  return (
    <div className="bg-white border rounded-xl p-4">
      {transactions && (
        <Table>
          <TableCaption>A list of your recent transactions.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead colSpan={3} className="">
                Transaction
              </TableHead>
              <TableHead className="text-right">Amount ($AUD)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction, index) => (
              <TableRow key={index}>
                <TableCell colSpan={3} className="font-medium">
                  {transaction.id}
                </TableCell>
                <TableCell className="text-right">
                  ${(transaction.amount / 100).toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total ($AUD)</TableCell>
              <TableCell className="text-right">
                ${(totalAmount / 100).toLocaleString()}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      )}
      <PaginationBar
        pathname={"/transactions"}
        currentPage={page}
        totalPages={5}
      />
    </div>
  );
}
