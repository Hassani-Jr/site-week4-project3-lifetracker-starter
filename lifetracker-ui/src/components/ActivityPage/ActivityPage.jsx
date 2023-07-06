import "./ActivityPage.css";

export default function ActivityPage({ user, setAppState }) {
  return (
    <div>
      <h3>Hello {user?.username}</h3>
      <h3>{user?.email}</h3>
      <h3>
        {user?.first_name} {user?.last_name}
      </h3>
    </div>
  );
}
