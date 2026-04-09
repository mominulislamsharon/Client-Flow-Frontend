/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Client } from "@/types/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import useClients from "@/hooks/useClients";

const ClientTable = () => {
  const { data, isLoading, isError } = useClients() as any;
  const clients: Client[] = data?.data || [];

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading clients</div>;
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Phone</TableCell>
        </TableRow>
      </TableHeader>

      <TableBody>
        {clients?.map((client) => (
          <TableRow key={client.id}>
            <TableCell>{client.name}</TableCell>
            <TableCell>{client.email}</TableCell>
            <TableCell>{client.phone || "-"}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ClientTable;
