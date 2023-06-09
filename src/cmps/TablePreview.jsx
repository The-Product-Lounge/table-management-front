import { useLocation } from "react-router-dom";
import { tableService } from "../services/table.service";
import { UserList } from "./UserList";

export const TablePreview = ({ table }) => {
  const location = useLocation();
  const isLocationTableView = location.pathname.includes("/table");

  const onRemoveLounger = async (userId) => {
    table.users = table.users.filter((user) => user.id !== userId);
    if (!table.users.length) await tableService.removeTable(table.id);
    else await tableService.updateTable(table);
  };

  return (
    <section className="table-preview">
      {isLocationTableView ? (
        <div className="title table-view-title">
          <p>Loungers At Your Table</p>
          <p>{table.users.length}/3</p>
        </div>
      ) : (
        <div className="title event-info-title">
          <div>
            <h2>Table #{table.tableNumber}</h2>
            <h4>{table.portfolioStage}</h4>
          </div>
          <p>{table.users.length}/3</p>
        </div>
      )}

      {table.users.length !== 0 && (
        <UserList users={table.users} onRemoveLounger={onRemoveLounger} />
      )}
    </section>
  );
};
