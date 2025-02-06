
import UserInfo from "@/components/UserInfo";
import Image from "next/image";
import Link from "next/link";
import { auth } from "@/app/auth";
import { redirect } from "next/navigation";
import { getOrders, getUserData } from "@/lib/actions";
import SignOutButton from "@/components/auth/SignOutButton";
import OrderItem from "@/components/OrderedItems";

export default async function ProfilePage() {
  const session = await auth();
  
  if (!session?.user?.email) {
    redirect("/auth/signin");
  }

  const [userData, orders] = await Promise.all([
    getUserData(session.user.email),
    getOrders(session.user.email)
  ]);
  const userImage = userData?.image || "/avatar.svg";
  

if(!orders) {
  return (
    <div className="mt-12 max-w-2xl mx-auto px-4">
      <h2 className="text-2xl font-semibold text-center mb-6">No Orders Found</h2>
    </div>
  )
}
  

  return (
    <div className="mt-12 flex items-center justify-center gap-10 flex-col relative">
      <div className="flex flex-col gap-2 items-center justify-center">
        <Image 
          src={userImage}
          alt={userData?.name || "Profile"} 
          width={150} 
          height={150} 
          priority
          className="rounded-full border-4 border-white bg-white" 
        />
        <h1 className="heading-green uppercase">{userData?.name}</h1>
      </div>

      <UserInfo userData={userData} />
      <div className="w-full max-w-2xl mx-auto flex justify-between gap-4">
        <Link 
          href="/update-profile"
          className="flex-1 bg-primary text-center text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
        >
          Update Profile
        </Link>
        <SignOutButton className="flex-1" />
      </div>
      {orders && 
        <div className="space-y-4 w-full px-4">
          <h2 className="text-2xl font-semibold text-center mb-6">Your Orders</h2>
          {orders.map((order) => (
            <OrderItem key={order.id} order={order} />
          ))}
        </div>
  }


    </div>
  );
}