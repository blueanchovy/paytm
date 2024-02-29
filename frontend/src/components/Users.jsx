import { useEffect, useState } from "react";
import User from "./User";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => {
      async function fetchUsers() {
        try {
          const response = await axios.get(
            `http://localhost:3000/api/v1/user/bulk?filter=` + searchTerm
          );
          setUsers(response.data.user);
        } catch (err) {
          console.log(err);
        }
      }
      fetchUsers();
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);
  return (
    <>
      <div className="font-bold mt-6 text-lg">Users</div>
      <div className="my-2">
        <input
          type="text"
          placeholder="Search Users..."
          className="w-full px-2 py-1 border rounded border-slate-200"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div>
        {users.map((user, id) => (
          <User user={user} key={id} />
        ))}
      </div>
    </>
  );
};

export default Users;
