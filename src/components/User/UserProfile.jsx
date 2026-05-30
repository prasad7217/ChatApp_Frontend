import { useEffect, useState } from "react";
import { ImCamera } from "react-icons/im";
import { TbMailFilled } from "react-icons/tb";
import { GrLocationPin } from "react-icons/gr";
import { SlCalender } from "react-icons/sl";
import { FaRegSquareCheck } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { BiSolidMapPin } from "react-icons/bi";
import FollowersModal from "../utils/FollowersModal";
import axios from "axios";
import { BASE_URL } from "../../Constants";
import { useSearchParams } from "react-router-dom";

const UserProfile = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    userName: user?.userName || "Rahul Kumar",
    designation: user?.designation || "Full Stack Developer",
    bio: user?.bio || "Building cool stuff with React & Node. Open to collaborations and side projects.",
    profilePic: user?.profilePic || "",
  });
  const [preview, setPreview] = useState(user?.profilePic || "");

  const [openModel, setOpenModel] = useState('');
  const [closeModel, setCloseModel] = useState(false);
  const [userProfile, setUserProfile] = useState();
  const [requiredUser, setRequiredUser] = useState();

  const [searParams] = useSearchParams();
  const currentUserId = searParams.get("id");

  const userProfile1 = useSelector((store) => store.user.profile);

  const handleReqUserPro = async (id) => {

    try {
      const res = await axios.post(BASE_URL + "/user/profile", { userId: id }, { withCredentials: true });

      if(res?.data?.success){
        setUserProfile(res?.data?.data)
      }
    } catch (error) {
      console.log("Error :", error)
    }

  }

  const followers = userProfile?.followers?.length || 0;
  const following = userProfile?.following?.length || 0;
  const connections = userProfile?.followers?.length + user?.following?.length || 0;

  const getInitials = (name) =>
    name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "?";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "profilePic") setPreview(value);
  };

  // const handleUserProfile = async () => {

  //   try {
  //     const res1 = await axios.get(BASE_URL + "/profile", {
  //       withCredentials: true,
  //     })
  //     if (res1?.data?.success) {
  //       setFollowersProfiles(res1?.data?.data?.following)
  //     }
  //   } catch (error) {
  //     console.log("Error", error)
  //   }

  // }

  useEffect(() => {

    if (currentUserId === userProfile1?._id) {
      console.log("user", userProfile1)
      userProfile1 && setUserProfile(userProfile1);
    } else {

    }

  }, [userProfile1])

  const handleSave = () => {
    // call your update API here, e.g. dispatch(updateProfile(formData))
    setIsEditing(false);
  };

  const handleFollowersModel = (state) => {
    setOpenModel((prev) => prev = state);
  }

  return (
    <>
      <div className="3xl:min-h-[86vh] 2xl:min-h-[83vh] xl:min-h-[78vh] lg:min-h-[78vh] md:min-h-[78vh] bg-[#3A3A3A] text-white flex items-start 2xl:px-48 3xl:px-84">

        {/* ── Main content ── */}
        <div className="w-full px-4 py-10 mt-10">

          {/* Cover */}
          {/* <div className="h-32 rounded-t-xl bg-[#1e2a42] relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "repeating-linear-gradient(135deg,rgba(239,68,68,0.08) 0,rgba(239,68,68,0.08) 1px,transparent 1px,transparent 18px),repeating-linear-gradient(45deg,rgba(255,255,255,0.03) 0,rgba(255,255,255,0.03) 1px,transparent 1px,transparent 18px)",
            }}
          />
          <button className="absolute top-3 right-3 bg-black/30 border border-white/10 text-white/60 text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5 hover:bg-black/50 transition">
            📷 Change cover
          </button>
        </div> */}

          {/* Profile card */}
          <div className="px-6 pb-6">
            <div className="flex items-center gap-20">
              <div>
                {/* Avatar row */}
                <div className="flex items-center justify-between mb-6">
                  <div className="relative">

                    <img
                      src={userProfile?.profilePic}
                      alt="profile"
                      className="3xl:w-28 3xl:h-28 w-24 h-24 rounded-full object-cover border-[3px] border-gray-600"
                    />

                    <button
                      onClick={() => setIsEditing(true)}
                      className="absolute bottom-0.5 right-0.5 w-6 h-6 bg-red-500 rounded-full border-2 border-gray-700 flex items-center justify-center text-gray-300 text-xs hover:bg-red-600 transition"
                      aria-label="Change profile picture"
                    >
                      <ImCamera />
                    </button>
                  </div>

                  {/* <button
                                    onClick={() => setIsEditing(true)}
                                    className="flex items-center gap-2 bg-white/[0.07] hover:bg-white/[0.11] border border-white/[0.12] text-white/70 text-sm px-4 py-2 rounded-lg transition"
                                >
                                    ✏️ Edit profile
                                </button> */}
                </div>


                <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-xl font-medium text-white/90">
                    {userProfile?.userName}
                  </h1>
                  <span className="text-[11px] bg-green-500/15 text-green-400 border border-green-500/25 px-2 py-0.5 rounded-full">
                    Online
                  </span>
                </div>

                <p className="text-sm text-white/40 mb-2">
                  {userProfile?.designation}
                </p>

                <p className="text-sm text-white/55 leading-relaxed mb-5">
                  {userProfile?.bio}
                </p>
              </div>

              <div
                className="w-full grid grid-cols-3 rounded-lg overflow-hidden mb-5 bg-[#4A4A4A]"
                style={{ gap: "1px" }}
              >
                <div
                  onClick={() => handleFollowersModel("followers")}
                  className=" py-3.5 text-center hover:bg-white/[0.04] transition cursor-pointer border-r border-gray-600 py-4"
                >
                  <div className="text-[18px] text-gray-300 mt-1">Followers</div>
                  <div className="text-xl font-medium text-white/90">
                    {followers}
                  </div>
                </div>
                <div

                  onClick={() => handleFollowersModel("following")}
                  className="py-3.5 text-center hover:bg-white/[0.04] transition cursor-pointer border-r border-gray-600"
                >
                  <div className="text-[18px] text-gray-300 mt-1">Following</div>
                  <div className="text-xl font-medium text-white/90">
                    {following}
                  </div>
                </div>
                <div
                  className="py-3.5 text-center hover:bg-white/[0.04] transition cursor-pointer"
                >
                  <div className="text-[18px] text-gray-300 mt-1">Connections</div>
                  <div className="text-xl font-medium text-white/90">
                    {connections}
                  </div>
                </div>

              </div>
            </div>

            <div className="border-t border-white/[0.07] my-2" />

            <p className="text-[11px] text-white/30 uppercase tracking-widest mb-3">
              Profile info
            </p>
            <div className="grid grid-cols-4 gap-2.5">
              {[
                { icon: <TbMailFilled />, text: userProfile?.email || "rahul@example.com" },
                { icon: <BiSolidMapPin className="text-red-600" />, text: "Hyderabad, India" },
                { icon: <SlCalender />, text: "Joined March 2023" },
                { icon: <FaRegSquareCheck className="text-green-600 " />, text: "Email verified" },
              ].map(({ icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-2 text-sm text-white/50"
                >
                  <span className="text-base">{icon}</span>
                  {text}
                </div>
              ))}
            </div>

            {/* Divider */}
            {/* <div className="border-t border-white/[0.07] my-5" /> */}

            {/* Danger zone */}
            {/* <p className="text-[11px] text-white/30 uppercase tracking-widest mb-3">
            Account
          </p>
          <div className="flex items-center justify-between bg-red-500/[0.05] border border-red-500/[0.15] rounded-lg px-4 py-3">
            <div>
              <p className="text-sm text-red-400/80">Delete account</p>
              <p className="text-xs text-red-400/40 mt-0.5">
                This action is permanent and cannot be undone
              </p>
            </div>
            <button className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 px-3 py-1.5 rounded-lg hover:bg-red-500/20 transition">
              🗑 Delete
            </button>
          </div> */}
          </div>

          {/* ── Edit Modal ── */}
          {/* {isEditing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
            <div className="bg-[#1a2236] border border-white/10 rounded-xl p-6 w-full max-w-md">
              <h2 className="text-base font-medium text-white/90 mb-1">
                Edit profile
              </h2>
              <p className="text-xs text-white/35 mb-5">
                Update your public profile information
              </p>

              {[
                { label: "Username", name: "userName", type: "input" },
                { label: "Designation", name: "designation", type: "input" },
                { label: "Bio", name: "bio", type: "textarea" },
                { label: "Profile picture URL", name: "profilePic", type: "input" },
              ].map(({ label, name, type }) => (
                <div key={name} className="mb-4">
                  <label className="block text-xs text-white/40 mb-1.5">
                    {label}
                  </label>
                  {type === "textarea" ? (
                    <textarea
                      name={name}
                      value={formData[name]}
                      onChange={handleChange}
                      rows={3}
                      className="w-full bg-white/[0.05] border border-white/10 rounded-lg px-3 py-2 text-sm text-white/80 outline-none focus:border-red-500/50 resize-none"
                    />
                  ) : (
                    <input
                      type="text"
                      name={name}
                      value={formData[name]}
                      onChange={handleChange}
                      className="w-full bg-white/[0.05] border border-white/10 rounded-lg px-3 py-2 text-sm text-white/80 outline-none focus:border-red-500/50"
                    />
                  )}
                </div>
              ))}

              <div className="flex gap-2 justify-end mt-5">
                <button
                  onClick={() => setIsEditing(false)}
                  className="text-sm text-white/50 bg-white/[0.06] border border-white/10 px-4 py-2 rounded-lg hover:bg-white/[0.1] transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="text-sm text-white bg-red-500 px-5 py-2 rounded-lg font-medium hover:bg-red-600 transition"
                >
                  Save changes
                </button>
              </div>
            </div>
          </div> */}
          {/* )} */}
        </div>

        <div>
          <p>Name</p>
        </div>
      </div>
      {openModel === "followers" && <FollowersModal user={userProfile} state={"follower"} close={setOpenModel} userId={handleReqUserPro} />}
      {openModel === "following" && <FollowersModal user={userProfile} state={"following"} close={setOpenModel} userId={handleReqUserPro} />}
    </>
  );
};

export default UserProfile;
