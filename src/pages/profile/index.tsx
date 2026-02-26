import { useSession } from "next-auth/react";

const ProfilePage = () => {
  const { data }: any = useSession();

  return (
    <div>
      <h1>ProfilePage</h1>
      {data && <p>Welcome, {data.user.full_name}!</p>}
    </div>
  );
};

export default ProfilePage;
