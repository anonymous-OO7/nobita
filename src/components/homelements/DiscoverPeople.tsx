import React from "react";

// Define a props interface if using TypeScript, otherwise skip this part
interface ProfileCardProps {
  imageUrl: string;
  role: string;
  name: string;
  description: string;
}

const ProfileCard = ({
  imageUrl,
  role,
  name,
  description,
}: ProfileCardProps) => {
  return (
    <div className="flex-col px-6 py-2 w-[90%] md:w-[50%] lg:w-1/4">
      <div className="h-40 w-40 border-2 border-yellow-400 rounded-full overflow-hidden bg-gray-200">
        <img src={imageUrl} alt="" className="" />
      </div>

      <p className="text-md font-poppins rounded text-white cursor-pointer w-[50%] bg-yellow-400 lg:rotate-90 mr-40 mt-8 lg:mb-16 pr-4 pl-1 py-1">
        {role}
      </p>
      <p className="font-poppins text-lg font-medium text-stone-600 cursor-pointer hover:text-stone-400">
        {name}
      </p>
      <p className="text-left font-light text-black m-2 font-poppins">
        {description}
      </p>
    </div>
  );
};

export default ProfileCard;
