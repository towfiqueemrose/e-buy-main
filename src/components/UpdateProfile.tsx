
"use client";

import { useState } from "react";
import { user } from "@/types/types";
import { updateUserProfile } from "@/lib/actions";
import { useRouter } from "next/navigation";

interface UpdateProfileProps {
  userData: user;
}

const UpdateProfile = ({ userData }: UpdateProfileProps) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: userData?.name || "",
    phone: userData?.phone || "",
    address: userData?.address || ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');
    setIsError(false);
    
    try {
      const result = await updateUserProfile(formData);
      
      if (result.success) {
        setMessage('Profile updated successfully!');
        setTimeout(() => {
          router.push('/profile');
          router.refresh();
        }, 1000);
        
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Failed to update profile');
      setIsError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-12 flex items-center justify-center gap-10 flex-col relative">
      <div className="flex flex-col gap-2 items-center justify-center w-full max-w-md">
        <h1 className="heading-green">Update Profile</h1>
        <p className="text-gray-600">Update your personal information</p>
      </div>

      <div className="w-full max-w-md bg-white rounded-lg shadow-sm p-6">
        {message && (
          <div className={`p-3 mb-4 rounded-lg ${
            isError ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
          }`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
              required
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
              required
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Delivery Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows={3}
              className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
              required
              disabled={isSubmitting}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;