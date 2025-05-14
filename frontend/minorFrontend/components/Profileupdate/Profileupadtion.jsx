import React, { useContext, useState } from 'react';
import axios from 'axios';
import UserContext from '../../src/context/Usercontext';

const UpdateProfile = () => {
  const { user, setUser } = useContext(UserContext);

  const [form, setForm] = useState({
    username: user?.username || '',
    email: user?.email || '',
    oldPassword: '',
    newPassword: '',
  });

  const [avatarFile, setAvatarFile] = useState(null);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  // Handle avatar file change
  const handleAvatarChange = (e) => {
    setAvatarFile(e.target.files[0]);
  };

  // Update user details (username/email)
  const handleUpdateDetails = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/users/update`, {
        username: form.username,
        email: form.email
      },{
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      alert(res.data.message);
      setUser(prev => ({ ...prev, username: form.username, email: form.email }));
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error updating details");
    }
  };

  // Change password
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/users/changepassword`,
        {
          oldPassword: form.oldPassword,
          newPassword: form.newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(res.data.message);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error changing password");
    }
  };

  // Upload avatar
  const handleAvatarUpload = async (e) => {
    e.preventDefault();
    if (!avatarFile) return alert("Please select an image");

    const formData = new FormData();
    formData.append("avatar", avatarFile);

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/users/updateavatar`,  formData,
  {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  }
);
      alert(res.data.message);
      setUser(prev => ({ ...prev, avatar: res.data.data.avatar }));
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error uploading avatar");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-2xl mx-auto space-y-8">

        <h1 className="text-3xl font-bold">Update Profile</h1>

        {/* Avatar Section */}
        <form onSubmit={handleAvatarUpload} className="space-y-4">
          <div className="flex items-center space-x-4">
            <img
              src={user?.avatar || "/avatar.png"}
              alt="avatar"
              className="w-20 h-20 rounded-full border-2 border-orange-500"
            />
            <input type="file" onChange={handleAvatarChange} className="text-sm" />
            <button
              type="submit"
              className="bg-orange-500 px-4 py-2 rounded hover:bg-orange-600"
            >
              Upload
            </button>
          </div>
        </form>

        {/* Update Username & Email */}
        <form onSubmit={handleUpdateDetails} className="space-y-4">
          <div>
            <label className="block mb-1">Username</label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600"
              required
            />
          </div>

          <div>
            <label className="block mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-orange-500 w-full py-2 rounded hover:bg-orange-600"
          >
            Save Changes
          </button>
        </form>

        {/* Password Change Section */}
        <form onSubmit={handlePasswordChange} className="space-y-4">
          <div>
            <label className="block mb-1">Old Password</label>
            <input
              type="password"
              name="oldPassword"
              value={form.oldPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600"
            />
          </div>

          <div>
            <label className="block mb-1">New Password</label>
            <input
              type="password"
              name="newPassword"
              value={form.newPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600"
            />
          </div>

          <button
            type="submit"
            className="bg-orange-500 w-full py-2 rounded hover:bg-orange-600"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
