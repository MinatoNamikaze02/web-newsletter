import { GetStaticProps } from "next";
import Link from "next/link";
import React, { useState } from "react";
import { sanityClient, urlFor } from "../../sanity";
import { Index, Post } from "../../typing";
import Header from "../../components/Header";
import SVG from "../../components/svg";
interface Props {
  index: Index;
}

const Issue = ({ index }: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
  };

  return (
    <main className="">
      {!isLoading ? (
        <>
          <Header />
          <SVG />
          <article className="max-w-3xl mx-auto p-5 text-black">
            <h1 className="text-3xl mt-10 mb-3">{index.title}</h1>
            {index.posts.map((post: Post) => {
              return index.slug.current === post.issue ? (
                <div key={post._id}>
                  <Link
                    onClick={handleClick}
                    href={`/posts/${post.slug.current}`}
                  >
                    <span>
                      <h2 className="text-xl text-blue-500 hover:underline cursor-pointer">
                        {post.title}
                      </h2>
                    </span>
                  </Link>
                  <p className="text-xl font-light text-gray-500 mb-2">
                    {post.description}
                  </p>
                </div>
              ) : null;
            })}
          </article>
        </>
      ) : (
        <div className="flex justify-center items-center">
          <video src="https://media.giphy.com/media/8agqybiK5LW8qrG3vJ/giphy.gif" />
        </div>
      )}
    </main>
  );
};

export default Issue;

export const getStaticPaths = async () => {
  const query = `
    *[_type == "index"]{
        _id,
        slug{
            current
        }
    }
    `;
  const posts = await sanityClient.fetch(query);
  const paths = posts.map((post: Post) => ({
    params: {
      slug: post.slug.current,
    },
  }));
  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `
    *[_type == "index" && slug.current == $slug][0]{
        _id,
        title,
        slug,
        "posts": *[_type == "post"]{
            _id,
            title,
            slug,
            description,
            mainImage,
            author->{
                _id,
                name,
                image
            },
            publishedAt,
            body,
            issue,
        },
        tags,
        description,
        mainImage,
    }

    `;
  const index = await sanityClient.fetch(query, { slug: params?.slug });
  if (!index) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      index,
    },
    revalidate: 60,
  };
};
