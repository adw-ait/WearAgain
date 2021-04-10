import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { checkUserIsAdmin } from "../../Utils";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

function AdminToolbar(props) {
  const { currentUser } = useSelector(mapState);

  const isAdmin = checkUserIsAdmin(currentUser);
  if (!isAdmin) return null;
  return (
    <div className="bg-black w-full  flex justify-end">
      <div className="p-2 mr-5 bg-gray-300">
        <Link className="font-bold" to="/admin">
          My Admin
        </Link>
      </div>
    </div>
  );
}

export default AdminToolbar;
