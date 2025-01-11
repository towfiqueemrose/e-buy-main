
import { Check } from 'lucide-react';
import Link from 'next/link';

const SimpleSuccess = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="text-center space-y-4 bg-white p-12 rounded-lg">
        <div className="inline-block">
          <div className="bg-green-100 rounded-full p-4">
            <div className="bg-green-200 rounded-full p-3">
              <Check className="w-8 h-8 text-primary" strokeWidth={3} />
            </div>
          </div>
        </div>
        
        <h1 className="text-2xl font-semibold text-primary">
        🎉🎊Order Confirmed!🎊🎉
        </h1>
      
        <p className="text-gray-600 font-medium max-w-sm">
          Thank you for your purchase. We&apos;ll send you a confirmation email shortly.
        </p>
        <Link href="/" className="text-primary font-bold text-xl mt-6">Back to Home</Link>
      </div>
    </div>
  );
};

export default SimpleSuccess;