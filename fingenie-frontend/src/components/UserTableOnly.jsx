import React from "react";
 
function UsersTableOnly() {
  return (
    <div>
      <h4>User Details</h4>
 
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
          </tr>
        </thead>
 
        <tbody>
          <tr>
            <td colSpan="4" className="text-center">
              No Users Found
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
 
export default UsersTableOnly;
 