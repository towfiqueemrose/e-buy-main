import { user } from "@/types/types";
import { PanelTopIcon, PhoneIcon, MapPinIcon } from 'lucide-react';

interface UserInfoProps {
  userData: user;
}

export default function UserInfo({ userData }: UserInfoProps) {
  const { phone, email, address } = userData;

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-sm p-6">
      <div className="space-y-6">
        <h2 className="text-lg font-medium text-gray-700 mb-4">User Info</h2>
        
        <div className="space-y-4">
          {/* Phone */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <PhoneIcon className="w-4 h-4 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="text-sm text-gray-700">{phone}</p>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <PanelTopIcon className="w-4 h-4 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="text-sm text-gray-700">{email}</p>
            </div>
          </div>

          {/* Address */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <MapPinIcon className="w-4 h-4 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Delivery Address</p>
              <p className="text-sm text-gray-700">{address}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}