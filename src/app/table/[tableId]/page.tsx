"use client";
import dynamic from "next/dynamic";

const TableView = dynamic(
  () => {
    return import("@/old/views/TableView").then((module) => module.TableView);
  },
  {
    ssr: false,
  }
);

export default function Page({ params }: { params: { tableId: string } }) {
  return (
    <>
      <TableView tableId={params.tableId} />
    </>
  );
}
