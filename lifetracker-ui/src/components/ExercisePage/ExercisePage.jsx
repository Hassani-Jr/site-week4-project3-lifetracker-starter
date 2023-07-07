import "./ExercisePage.css";

export default function ExercisePage({ user, setAppState }) {
  return user?.email ? (
    <div>
      <h3>Hello {user?.username}</h3>
      <h3>{user?.email}</h3>
      <h3>
        {user?.first_name} {user?.last_name}
      </h3>
    </div>
  ) : (
    <h1>
      <b>Login to see your data</b>
    </h1>
  );
}
