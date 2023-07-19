import { UserPreview } from "./UserPreview";

export const UserList = ({ users, onRemoveLounger }) => {
  return (
    <section className="user-list">
      {users.map((user) => {
        return (
          <UserPreview
            onRemoveLounger={onRemoveLounger}
            user={user}
            key={user.id}
          />
        );
      })}
    </section>
  );
};
