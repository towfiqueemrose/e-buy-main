import FeatureCard from "./FeatureCard";

const Features = () => {
  const features = [
    {
      icon: "/truck.svg",
      title: "Free Shipping",
      description: "Above $5 Only"
    },
    {
      icon: "/money.svg",
      title: "Huge Savings",
      description: "At Lowest Price"
    },
    {
      icon: "/ticket.svg",
      title: "Certified Organic",
      description: "100% Guarantee"
    },
    {
      icon: "/recycle.svg",
      title: "Easy Returns",
      description: "No Questions Asked"
    }
  ];

  return (
    <div className="p-6 bg-black rounded-lg">
      <h1 className="text-gray-100 mb-8 text-2xl text-center font-bold">
        We are providing...
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl mx-auto px-4">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </div>
  );
};
export default Features;