import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserStart,
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      () => setFileUploadError(true),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleShowListings = async () => {
    try {
      setShowListingsError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowListingsError(true);
        return;
      }
      setUserListings(data);
    } catch (error) {
      setShowListingsError(true);
    }
  };

  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) return;
      setUserListings((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4 sm:p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-center my-8 text-gray-800 tracking-tight">
          Your Profile
        </h1>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-200 transition-all duration-300 hover:shadow-2xl">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <input
              onChange={(e) => setFile(e.target.files[0])}
              type="file"
              ref={fileRef}
              hidden
              accept="image/*"
            />
            <div className="flex flex-col items-center">
              <div className="relative group">
                <img
                  onClick={() => fileRef.current.click()}
                  src={formData.avatar || currentUser.avatar}
                  alt="profile"
                  className="rounded-full h-24 w-24 sm:h-32 sm:w-32 object-cover cursor-pointer border-4 border-white shadow-lg group-hover:scale-105 transition-transform duration-200"
                />
                <div className="absolute inset-0 rounded-full bg-black bg-opacity-0 group-hover:bg-opacity-30 flex items-center justify-center transition-opacity duration-200">
                  <span className="text-white text-xs opacity-0 group-hover:opacity-100">Change</span>
                </div>
              </div>
              <p className="text-sm mt-3 font-medium text-gray-600">
                {fileUploadError ? (
                  <span className="text-red-500 font-semibold">
                    Error uploading (max 2MB image)
                  </span>
                ) : filePerc > 0 && filePerc < 100 ? (
                  <span className="text-gray-600">{`Uploading ${filePerc}%`}</span>
                ) : filePerc === 100 ? (
                  <span className="text-green-500 font-semibold">
                    ✅ Image uploaded successfully!
                  </span>
                ) : (
                  "Click image to change avatar"
                )}
              </p>
            </div>

            {/* Inputs */}
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Username"
                defaultValue={currentUser.username}
                id="username"
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors bg-gray-50 text-gray-800 placeholder-gray-400"
                onChange={handleChange}
              />
              <input
                type="email"
                placeholder="Email"
                id="email"
                defaultValue={currentUser.email}
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors bg-gray-50 text-gray-800 placeholder-gray-400"
                onChange={handleChange}
              />
              <input
                type="password"
                placeholder="Password"
                id="password"
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors bg-gray-50 text-gray-800 placeholder-gray-400"
                onChange={handleChange}
              />
            </div>

            <button
              disabled={loading}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg p-3 uppercase font-semibold shadow-md hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Loading...
                </span>
              ) : (
                "Update Profile"
              )}
            </button>
            <Link
              className="bg-green-500 text-white p-3 rounded-lg uppercase text-center font-semibold shadow-md hover:bg-green-600 transition-all duration-300"
              to="/create-listing"
            >
              + Create New Listing
            </Link>
          </form>
        </div>

        {/* Account Actions */}
        <div className="flex justify-between mt-6 text-sm font-medium">
          <button
            onClick={handleDeleteUser}
            className="text-red-500 hover:text-red-600 hover:underline transition-all duration-200"
          >
            Delete Account
          </button>
          <button
            onClick={handleSignOut}
            className="text-red-500 hover:text-red-600 hover:underline transition-all duration-200"
          >
            Sign Out
          </button>
        </div>

        {/* Alerts */}
        {error && (
          <div className="mt-4 p-3 bg-red-100 border border-red-300 text-red-600 rounded-lg text-center">
            {error}
          </div>
        )}
        {updateSuccess && (
          <div className="mt-4 p-3 bg-green-100 border border-green-300 text-green-600 rounded-lg text-center">
            ✅ Profile updated successfully!
          </div>
        )}

        {/* Listings */}
        <div className="mt-10">
          <button
            onClick={handleShowListings}
            className="w-full bg-blue-500 text-white rounded-lg py-3 font-semibold shadow-md hover:bg-blue-600 transition-all duration-300"
          >
            Show My Listings
          </button>

          {showListingsError && (
            <div className="mt-3 p-3 bg-red-100 border border-red-300 text-red-600 rounded-lg text-center">
              Error fetching listings
            </div>
          )}

          {userListings && userListings.length > 0 && (
            <div className="flex flex-col gap-4 mt-6">
              <h2 className="text-center text-2xl font-semibold text-gray-800">
                Your Listings
              </h2>
              {userListings.map((listing) => (
                <div
                  key={listing._id}
                  className="border rounded-lg p-4 flex justify-between items-center bg-white shadow-md hover:shadow-lg transition-all duration-200"
                >
                  <Link to={`/listing/${listing._id}`}>
                    <img
                      src={listing.imageUrls[0]}
                      alt="listing cover"
                      className="h-16 w-16 object-cover rounded-md shadow-sm hover:scale-105 transition-transform duration-200"
                    />
                  </Link>
                  <Link
                    className="text-gray-800 font-medium hover:underline flex-1 ml-4 truncate"
                    to={`/listing/${listing._id}`}
                  >
                    {listing.name}
                  </Link>
                  <div className="flex flex-col gap-2 text-sm font-medium">
                    <button
                      onClick={() => handleListingDelete(listing._id)}
                      className="text-red-500 uppercase hover:text-red-600 transition-colors duration-200"
                    >
                      Delete
                    </button>
                    <Link to={`/update-listing/${listing._id}`}>
                      <button className="text-green-500 uppercase hover:text-green-600 transition-colors duration-200">
                        Edit
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}