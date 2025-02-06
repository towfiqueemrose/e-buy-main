import Image from "next/image";

const FeatureCard = ({ icon, title, description }: { icon: string; title: string; description: string }) => (
  <div className="flex items-center gap-3 bg-gray-600 rounded-md p-3 w-full transition-transform hover:scale-105">
    <div className="flex-shrink-0">
      <Image src={icon} width={50} height={50} alt="" className="w-12 h-12" />
    </div>
    <div className="flex flex-col min-w-0">
      <h2 className="text-white text-lg font-semibold truncate">{title}</h2>
      <p className="text-white text-sm truncate">{description}</p>
    </div>
  </div>
);

export default FeatureCard;