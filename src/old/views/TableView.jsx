"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import emptyChair from "../assets/imgs/empty-chair.svg";
import { TablePreview } from "../components/TablePreview";
import { off, onValue, ref } from "firebase/database";
import { database } from "../firebase-setup/firebase";
import { tableService } from "../services/table.service";
import { useRouter } from "next/navigation";

export const TableView = ({ tableId }) => {
  const [table, setTable] = useState(null);
  const user = useSelector((state) => state.userModule.user);
  const router = useRouter();
  useEffect(() => {
    const tableRef = ref(database, `/tables/${tableId}`);
    const listener = onValue(tableRef, (snapshot) => {
      const table = snapshot.val();
      if (
        !table ||
        !user ||
        !table.users?.find((userInTable) => userInTable.id === user.id)
      ) {
        tableService.removeTableIdFromStorage();
        router("/");
      } else setTable(table);
    });

    return () => off(tableRef, "value", listener);
  }, []);

  let tableParticipants = 3;
  return (
    <>
      {table ? (
        <div className="table-view">
          <h1 className="table-number">Table #{table.tableNumber}</h1>
          <div className="table-stage">{table.portfolioStage}</div>
          <div className="table">
            <h1>{table.tableNumber}</h1>
            {[...Array(tableParticipants)].map((participant, i) => (
              <div
                className={`chair _${i + 1} ${
                  table.users[i] ? "occupied" : ""
                }`}
                key={`chair _${i + 1}`}
              >
                {table.users[i] && (
                  <img
                    src={table.users[i].imgUrl}
                    alt="Profile"
                    className="profile-img"
                  />
                )}
                <img
                  src={emptyChair.src}
                  className="empty-chair"
                  alt="Empty Chair"
                />
              </div>
            ))}
          </div>
          <TablePreview table={table} isUserTable={true} />
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
