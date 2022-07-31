import { GetStaticProps } from "next";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { sanityClient, urlFor } from "../../sanity";
import { Index, Post } from "../../typing";
import { Header, SVG, SvgFooter, Footer } from "../../components";

interface Props {
  index: Index;
}

const Issue = ({ index }: Props) => {
  const [constant, setConstant] = useState(0);
  const [slug, setSlug] = useState("");

  const findMin = () => {
    let min = Infinity;
    index.posts.forEach((element) => {
      if (parseInt(element.slug.current) < min) {
        min = parseInt(element.slug.current);
      }
    });
    return String(min)
  };
  const findMax = () => {
    let max = 0;
    index.posts.forEach((element) => {
      if (parseInt(element.slug.current) > max) {
        max = parseInt(element.slug.current);
      }
    });
    return String(max)
  };

  useEffect(() => {
    let n = 0;
    localStorage.setItem("issue", index.slug.current);
    let min = findMin();
    let max = findMax();
    localStorage.setItem("startPoint", min);
    localStorage.setItem(
      "endPoint",
      max
    );
    let url = window.location.href;
    let slug = url.split("/")[4];
    setSlug(slug);
  }, [constant]);

  return (
    <main className="">
      <>
        <Header check = "Y"/>
        <SVG />
        <article className="max-w-3xl mx-auto p-5 text-black">
          <h1 className="text-3xl mt-10 mb-3">{index.title}</h1>
          {index.posts.map((post: Post) => {
            return index.slug.current === post.issue ? (
              <div key={post._id}>
                <Link href={`/posts/${post.slug.current}`}>
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
        <SvgFooter />
        <Footer />
      </>
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
