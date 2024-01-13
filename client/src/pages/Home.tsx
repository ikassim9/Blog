import Nav from "../components/Nav";
import Post from "../components/Post";

export default function Home() {
  return (
    <>
      <nav>
        <Nav></Nav>
      </nav>

      <section className="ml-8 mt-8 sm:mt-20">


        <section className="mb-8 text-center sm:mb-20">
          <h1 className="text-2xl sm:text-4xl">Connect with others through blogging</h1>
          <p className="text-base mt-4 sm:text-xl">
            Explore, Share, and Connect - Your Online Community Awaits
          </p>
        </section>

        <section className="grid p-3 gap-4 sm:gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />

        </section>
      </section>
    </>
  );
}
