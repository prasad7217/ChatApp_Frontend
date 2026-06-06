import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../../Constants";

const EditUserProfile = ({userProfile, setEditProfile}) => {

    const [userName, setUserName] = useState(userProfile?.userName);
    const [designation, setDesignation] = useState(userProfile?.designation);
    const [bio, setBio] = useState(userProfile?.bio);
    const [profilePic, setProfilePic] = useState();
    const [previewProfile, setPreviewProfile] = useState(userProfile?.profilePic);

    const [loader, setLoader] = useState(false);

    const handleEditProfile = async () =>{

        try {
            setLoader(true);
            const formData = new FormData();

            formData.append("userName", userName);
            formData.append("designation", designation);
            formData.append("bio", bio);
            formData.append("profilePic", profilePic);
          
            const res = await axios.patch(BASE_URL+"/user/profile/edit", formData, {
                withCredentials: true,
                headers:{
                    "Content-Type": "multipart/form-data"
                }
            })

            if(res?.data?.success){
                setLoader(false);
                setEditProfile(false);
            }
            
        } catch (error) {
            console.log("Error", error)
        }

    }

    const handleImage = (e) =>{
        
        const file = e.target.files[0];

        if(file){
            setProfilePic(file);
            setPreviewProfile(URL.createObjectURL(file))
        }
    }


    return (
        <div className="bg-[#2A2A2A] rounded-xl w-full max-w-md shadow-lg animate__animated animate__zoomIn animate__faster">

            {/* Header */}
            <div className="flex items-center justify-between bg-[#4A4A4A] py-3 px-4 border-border-[#5a5a5a] rounded-t-xl">
                <h2 className="text-lg font-semibold text-gray-300">Edit profile</h2>
                <button onClick={() => setEditProfile(false)} className="text-gray-300 py-1 px-2.5 rounded-full hover:bg-[#4a4a4a] cursor-pointer">✕</button>
            </div>

            {/* Avatar */}
            <div className="flex flex-col items-center gap-3 pt-5">
                <div className="relative">
                    <img src={previewProfile} className="w-20 h-20 rounded-full object-cover" />
                    <label className="absolute bottom-0 right-0 bg-[#3A3A3A] border rounded-full w-7 h-7 flex items-center justify-center cursor-pointer">
                        📷
                        <input type="file" className="hidden" onChange={(e) => handleImage(e)}/>
                    </label>
                </div>
            </div>

            {/* Fields */}
            <div className="p-5 flex flex-col gap-4">
                <input value={userName} placeholder="Username" className="w-full bg-[#3a3a3a]/50 border border-[#6a6a6a] text-gray-300 rounded-lg px-3 h-10 text-sm focus:outline-none focus:border-red-600" onChange={(e) => setUserName(e.target.value)}/>
                <input value={designation} placeholder="Designation" className="w-full bg-[#3a3a3a]/50 border border-[#6a6a6a] text-gray-300 rounded-lg px-3 h-10 text-sm focus:outline-none focus:border-red-600" onChange={(e) => setDesignation(e.target.value)}/>
                <textarea value={bio} rows={3} placeholder="Bio" className="w-full bg-[#3a3a3a]/50 border border-[#6a6a6a] text-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-red-600 resize-none" onChange={(e) => setBio(e.target.value)}/>
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3 p-4 border-t border-black/50">
                <button onClick={() => setEditProfile(false)} className="px-4 h-9 rounded-lg border border-red-600 text-sm text-red-600 font-bold cursor-pointer">Cancel</button>
                <button className="px-4 h-9 rounded-lg bg-red-600 hover:bg-red-600/80 text-white text-sm font-medium cursor-pointer" onClick={handleEditProfile}>{loader ? <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin inline-block" /> : 'Save changes'}</button>
                
            </div>

        </div>
    )
}

export default EditUserProfile;