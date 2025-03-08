import UpdateProfileSection from "@/components/ui/modules/profile/UpdateProfile";
import { getUserDetails } from "@/services/authService";
import React from "react";

const UpdateProfile = async ({ params }: { params: { profileId: string } }) => {
  const { profileId } = await params;
  const { data } = await getUserDetails(profileId);

  return (
    <div>
      <UpdateProfileSection profileData={data} />
    </div>
  );
};

export default UpdateProfile;
