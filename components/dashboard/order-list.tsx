"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { UserPayments } from "@/types";
import { Payment } from "@prisma/client";
import Link from "next/link";
import { HTMLAttributes } from "react";
import { buttonVariants } from "../ui/button";

interface OrderListProps extends HTMLAttributes<HTMLFormElement> {
  payments: UserPayments;
}

export function OrderList({ payments, className, ...props }: OrderListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Orders</CardTitle>
        <CardDescription>
          You have {payments.payments.length}{" "}
          {payments.payments.length === 1 ? "order" : "orders"}.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead className="text-right">Reciept</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.payments.map((payment: Payment) => (
              <TableRow key={payment.id}>
                <TableCell className="font-medium">
                  <div className="flex flex-col gap-2">
                    <CardTitle>Magic UI Pre-order (x1)</CardTitle>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={"outline"}
                    className={cn(
                      payment.status === "succeeded" && " bg-green-400/40",
                      payment.status === "failed" && " bg-red-400/40",
                    )}
                  >
                    {payment.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: payment.currency,
                  }).format(payment.amount / 100)}
                </TableCell>
                <TableCell className="whitespace-wrap text-right">
                  {payment.status === "succeeded" && payment.receiptUrl && (
                    <Link
                      className={cn(
                        buttonVariants({ size: "sm", variant: "default" }),
                        "text-sm",
                      )}
                      href={payment.receiptUrl || ""}
                    >
                      See reciept
                    </Link>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
