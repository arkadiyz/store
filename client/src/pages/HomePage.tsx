import { UserTable } from '../components/UserTable';

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>This is the main page of our application.</p>

      <UserTable />
    </div>
  );
};

export default HomePage;

