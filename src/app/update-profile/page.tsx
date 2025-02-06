import { auth } from "@/app/auth";
import { redirect } from "next/navigation";
import UpdateProfile from "@/components/UpdateProfile";
import { getUserData } from "@/lib/actions";

export default async function UpdateProfilePage() {
  const session = await auth();
  
  if (!session?.user?.email) {
    redirect("/auth/signin");
  }

  const userData = await getUserData(session.user.email);

  return (
    <div className="mt-12 max-w-2xl mx-auto px-4">
      <UpdateProfile userData={userData} />
    </div>
  );
}