import React from "react";

function Post({ title, description }: { title: string; description: string }) {
  return (
    <>
      <div className="max-w-base rounded overflow-hidden shadow-lg">
        <img
          className="w-full"
          src="https://flowbite.com/docs/images/blog/image-1.jpg"
          alt=""
        />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{title}</div>
          <p className="text-gray-700 text-base">
           {description}
          </p>

      <div className="text-right">
      <button className="bg-primary text-white text-sm p-2 rounded w-24">Read more</button>

      {/* <Button onClick={()=> console.log('read more') }width ="w-24" bgColor="bg-primary" textColor="text-white" value = "Read more"
      
   
      /> */}
      </div>       
        </div>
      </div>
    </>
  );
}

export default Post;
