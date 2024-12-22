import TextEditor from "./TextEditor";

function Post({
  title,
  description,
  thumbnail,
}: {
  title: string;
  description: string;
  thumbnail: string;
}) {
  return (
    <>
      <a href="#" className="flex shadow-lg bg-white ">
        <div className="p-4">
          <h2 className="text-base  bold mb-2">{title}</h2>
          <TextEditor content={description} editable={false} />
          {/* <h3 className="text-blue-500">Sam</h3> */}
        </div>

        {thumbnail && (
          <img
            src={thumbnail}
            alt="Post Thumbnail"
            className="w-32 h-36 object-cover ml-auto"
          />
        )}
      </a>
    </>
  );
}

export default Post;
