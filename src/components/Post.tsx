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
      <a href="#" className="flex shadow-lg bg-white min-h-[150px]">
        <div className="flex-1 p-4">
          <h2 className="text-2xl semi-bold mb-2">{title}</h2>
          <TextEditor content={description} editable={false} />
        </div>

        {thumbnail && (
          <img
            src={thumbnail}
            alt="Post Thumbnail"
            className="w-32 object-cover"
          />
        )}
      </a>
    </>
  );
}

export default Post;
