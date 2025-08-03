import React, { useEffect, useState } from "react";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase";

interface User {
  id: string;
  name?: string;
  email: string;
  role: string;
  status?: string;
  lastLogin?: any;
}

const DashboardAdmin: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [editRole, setEditRole] = useState<string>("");
  const [editEmail, setEditEmail] = useState<string>("");

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const usersList: User[] = [];
      const querySnapshot = await getDocs(collection(db, "users"));
      querySnapshot.forEach((doc) => {
        const data = doc.data() as User;
        usersList.push({ ...data, id: doc.id });
      });
      setUsers(usersList);
    } catch (err) {
      setError("Failed to fetch users");
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const startEditing = (user: User) => {
    setEditingUserId(user.id);
    setEditRole(user.role);
    setEditEmail(user.email);
  };

  const cancelEditing = () => {
    setEditingUserId(null);
  };

  const saveEdit = async () => {
    if (!editingUserId) return;
    setLoading(true);
    try {
      const userRef = doc(db, "users", editingUserId);
      await updateDoc(userRef, {
        role: editRole,
        email: editEmail,
      });
      await fetchUsers(); // Refresh user data
      cancelEditing();
    } catch (err) {
      setError("Failed to update user");
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="d-flex">
      {/* Sidebar */}

      {/* Main Content */}
      <div className="flex-grow-1">
        {/* User Activity Table */}
        <div className="card shadow-sm">
          <div className="card-header">
            <h5>User Activity Overview</h5>
          </div>
          <div className="card-body p-0">
            {loading ? (
              <p className="m-3">Loading users...</p>
            ) : error ? (
              <p className="m-3 text-danger">{error}</p>
            ) : (
              <table className="table table-hover mb-0">
                <thead className="table-light">
                  <tr>
                    <th>#</th>
                    <th>User</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={user.id}>
                      <td>{index + 1}</td>
                      <td>{user.name || "N/A"}</td>

                      {/* Email Field */}
                      <td>
                        {editingUserId === user.id ? (
                          <input
                            type="email"
                            value={editEmail}
                            onChange={(e) => setEditEmail(e.target.value)}
                          />
                        ) : (
                          user.email || "N/A"
                        )}
                      </td>

                      {/* Role Field */}
                      <td>
                        {editingUserId === user.id ? (
                          <select
                            value={editRole}
                            onChange={(e) => setEditRole(e.target.value)}
                          >
                            <option value="admin">admin</option>
                            <option value="user">user</option>
                            <option value="guest">guest</option>
                          </select>
                        ) : (
                          user.role || "N/A"
                        )}
                      </td>

                      {/* Action Buttons */}
                      <td>
                        {editingUserId === user.id ? (
                          <>
                            <button
                              className="btn btn-success btn-sm me-2"
                              onClick={saveEdit}
                              disabled={loading}
                            >
                              Save
                            </button>
                            <button
                              className="btn btn-secondary btn-sm"
                              onClick={cancelEditing}
                              disabled={loading}
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <button
                            className="btn btn-primary btn-sm"
                            onClick={() => startEditing(user)}
                          >
                            Edit
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;
