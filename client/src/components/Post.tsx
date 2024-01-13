import React from "react";
import Button from "./Button";

function Post() {
  return (
    <>
      <div className="max-w-base rounded overflow-hidden shadow-lg">
        <img
          className="w-full"
          src="https://flowbite.com/docs/images/blog/image-1.jpg"
          alt=""
        />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">The Coldest Sunset</div>
          <p className="text-gray-700 text-base">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Voluptatibus quia, nulla! Maiores et perferendis eaque,
            exercitationem praesentium nihil.
          </p>

      <div className="text-right">
      <Button width ="w-24" bgColor="bg-primary" textColor="text-white" value = "Read more"/>
      </div>       
        </div>
      </div>
    </>
  );
}

export default Post;
