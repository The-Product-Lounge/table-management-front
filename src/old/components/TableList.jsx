import { TablePreview } from "./TablePreview";

export const TableList = ({ tables }) => {
  return (
    <section className="table-list">
      {tables && tables.length && tables.length > 0
        ? tables.map((table) => <TablePreview table={table} key={table.id} />)
        : ""}
    </section>
  );
};
