import Image from "next/image";

const HeroSection = () => {
    return ( 
      <div className="bg-green-50 p-4 container mx-auto w-full px-4 bg-gradient-to-b from-white to-green-100 m-6 border rounded-lg shadow-lg border-green-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center min-h-[600px]">
          <div className="flex justify-center">
            <Image
              width={500}
              height={500}
              src="/hero.png" 
              alt="Buy Our Products" 
              className="w-[500px] h-[500px] object-contain"
            />
          </div>
          <div className="flex flex-col justify-center items-center gap-4">
            <Image
              src="/logo.png" 
              width={100}
              height={100}
              alt="Buy Our Products" 
              className="w-[100px] h-[100px] object-contain"
            />
            <h3 className="text-xl font-bold">Best Quality Products</h3>
            <h1 className="text-4xl font-serif font-bold text-center">
              Join The Organic Movement!
            </h1>
            <p className="text-center max-w-xl">
              Discover nature&apos;s best at Organic Store. We bring you hand-picked organic produce and sustainable products that make healthy living simple. From farm-fresh vegetables to natural pantry staples, every product is carefully chosen for quality and purity. Shop naturally, live better.
            </p>
          </div>
        </div>
      </div>
    );
  };
  
  export default HeroSection;