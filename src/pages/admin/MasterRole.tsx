import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, DocumentData, QuerySnapshot } from 'firebase/firestore';
import { db } from '../../config/firebase';

interface Permission {
  id: string;
  name: string;
}

const MasterRole: React.FC = () => {
  const [roles, setRoles] = useState<any[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [roleName, setRoleName] = useState('');
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    // Fetch permissions and roles from Firestore
    const fetchData = async () => {
      try {
        const permissionsSnapshot: QuerySnapshot<DocumentData> = await getDocs(collection(db, 'permissions'));
        const rolesSnapshot: QuerySnapshot<DocumentData> = await getDocs(collection(db, 'roles'));

        setPermissions(
          permissionsSnapshot.docs.map((doc) => {
            const data = doc.data() as Omit<Permission, 'id'>;
            return { id: doc.id, ...data };
          })
        );

        setRoles(
          rolesSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleRoleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!roleName || selectedPermissions.length === 0) {
      setMessage({ type: 'error', text: 'Role name and permissions are required.' });
      return;
    }

    try {
      await addDoc(collection(db, 'roles'), {
        name: roleName,
        permissions: selectedPermissions,
        createdAt: new Date().toISOString(),
      });

      setMessage({ type: 'success', text: 'Role created successfully.' });
      setRoleName('');
      setSelectedPermissions([]);
    } catch (error) {
      console.error('Error adding role:', error);
      setMessage({ type: 'error', text: 'Failed to create role.' });
    }
  };

  const togglePermission = (permissionId: string) => {
    setSelectedPermissions((prev) =>
      prev.includes(permissionId) ? prev.filter((id) => id !== permissionId) : [...prev, permissionId]
    );
  };

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Master Role Management</h1>

      {/* Feedback */}
      {message && (
        <div className={`alert alert-${message.type === 'success' ? 'success' : 'danger'}`} role="alert">
          {message.text}
        </div>
      )}

      <div className="row">
        <div className="col-md-6">
          <div className="card shadow-sm p-4">
            <h3 className="mb-3">Create Role</h3>
            <form onSubmit={handleRoleSubmit}>
              {/* Role Name */}
              <div className="mb-3">
                <label htmlFor="roleName" className="form-label">
                  Role Name
                </label>
                <input
                  type="text"
                  id="roleName"
                  className="form-control"
                  placeholder="Enter role name"
                  value={roleName}
                  onChange={(e) => setRoleName(e.target.value)}
                  required
                />
              </div>

              {/* Permissions */}
              <div className="mb-3">
                <label className="form-label">Assign Permissions</label>
                <div className="d-flex flex-wrap gap-2">
                  {permissions.map((permission) => (
                    <div key={permission.id} className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id={`permission-${permission.id}`}
                        checked={selectedPermissions.includes(permission.id)}
                        onChange={() => togglePermission(permission.id)}
                      />
                      <label className="form-check-label" htmlFor={`permission-${permission.id}`}>
                        {permission.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit */}
              <button type="submit" className="btn btn-primary w-100">
                Save Role
              </button>
            </form>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card shadow-sm p-4">
            <h3 className="mb-3">Existing Roles</h3>
            <ul className="list-group">
              {roles.map((role) => (
                <li key={role.id} className="list-group-item">
                  <strong>{role.name}</strong>
                  <br />
                  <small>Permissions: {role.permissions.join(', ')}</small>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MasterRole;
