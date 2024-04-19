import { useEffect, useState } from "react";
import User from "./User";
import axios from "axios";

const Users = ({ currentUser, setCurrentUser }) => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => {
      async function fetchUsers() {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_PAYTMAPI_URL}/api/v1/user/bulk?filter=` +
              searchTerm,
            {
              headers: {
                authorization: "Bearer" + " " + localStorage.getItem("token"),
              },
            }
          );
          setUsers(response.data.user);
          setCurrentUser(
            response.data.user.filter(
              (user) => user._id === response.data.userId
            )[0]
          );
        } catch (err) {
          console.log(err);
        }
      }
      fetchUsers();
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, setCurrentUser]);
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
        {users.map(
          (user, id) =>
            user?._id !== currentUser?._id && <User user={user} key={id} />
        )}
      </div>
    </>
  );
};

export default Users;
