import Head from "next/head";
import Link from "next/link";
import { Footer } from "../components/footer";
import Header from "../components/Header";
import SVG from "../components/svg";
import SvgFooter from "../components/svg_footer";
import { sanityClient, urlFor } from "../sanity";
import { Index } from "../typing";

interface Props {
  index: [Index];
}

const Home = ({ index }: Props) => {
  return (
    <div className="">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Oswald:wght@300&display=swap"
          rel="stylesheet"
        />
        <title>Web Newsletter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <SVG />
      {/*
      <div className="flex justify-between items-center bg-orange-100 border-black border-b-2 py-20">
        <div className="px-10 space-y-5">
          <h1 className="text-6xl max-w-xl font-serif">
            <span className="underline decoration-black decoration-4">
              Web Newsletter.
            </span>{" "}
            <br />A forum to read, write and discuss about tech!
          </h1>
          <h2>
            Keeping watch on tech, responding to it's biggest challenges with
            constant fun-filled news and witty insights
          </h2>
        </div>
      </div>
       */}
      <article className="max-w-4xl mx-auto p-5 text-black ">
        <h1><b>Greetings from ASCII, Amrita 👋</b></h1>
        <p></p>
        <div className="pt-10 cursor-pointer grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5 sm:gap-3">
          {index.map((post) => (
            <Link
              key={post._id}
              className="bg-white"
              href={`/issues/${post.slug.current}`}
            >
              <div className="rounded overflow-hidden shadow-lg">
                <img className="w-full" src={urlFor(post.mainImage).url()!} />
                <div className="flex justify-between">
                  <div className="bg-white px-6 py-4">
                    <div className="bg-white font-bold text-lg mb-2">
                      {post.title}
                    </div>
                    <p className="bg-white text-gray-700 text-base">
                      {post.description}
                    </p>
                  </div>
                </div>
                <div className="bg-white px-6 pt-4 pb-2">
                  {post.tags.map((tag) => (
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </article>
      <SvgFooter />
      <Footer />
    </div>
  );
};

export const getServerSideProps = async () => {
  const query = `
  *[_type == "index"]{
    _id,
    title,
    slug,
    tags,
    description,
    categories,
    mainImage,
  }
  `;
  const index = await sanityClient.fetch(query);
  return {
    props: {
      index,
    },
  };
};

export default Home;
