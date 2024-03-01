import React, { memo } from "react";
import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";

const User = memo(function User({ user, id }) {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between" key={id}>
      <div className="flex">
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
          <div className="flex flex-col justify-center h-full text-xl">
            {user.firstname[0].toUpperCase()}
          </div>
        </div>
        <div className="flex flex-col justify-center h-full">
          <div>
            {user.firstname} {user.lastname}
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center h-full">
        <Button
          label={"Send Money"}
          onClick={() =>
            navigate(
              "/send?id=" +
                user._id +
                "&name=" +
                user.firstname +
                " " +
                user.lastname
            )
          }
        ></Button>
      </div>
    </div>
  );
});

export default User;
