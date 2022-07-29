import { GetStaticProps } from "next";
import React, { useEffect, useState } from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { Header, SVG, SvgFooter, Footer } from "../../components";
import { sanityClient, urlFor } from "../../sanity";
import { useRouter } from "next/router";
import { Post } from "../../typing";
import PortableText from "react-portable-text";
import Head from "next/head";

interface Props {
  post: Post;
}

const Posts = ({ post }: Props) => {
  const router = useRouter();
  const [startPoint, setStartPoint] = useState(0);
  const [endPoint, setEndPoint] = useState(0);
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    
    let url = window.location.href;
    let slug = url.split("/")[4];
    setCurrent(parseInt(slug));
    let startPoint = localStorage.getItem("startPoint");
    let endPoint = localStorage.getItem("endPoint");
    if (startPoint && endPoint) {
      setStartPoint(parseInt(startPoint));
      setEndPoint(parseInt(endPoint));
    } else {
      setStartPoint(0);
      setEndPoint(0);
    }
  }, [post._id]);

  return (
    <main className="post-page" suppressHydrationWarning>
      <Head>
        <title>{post.title}</title>
      </Head>
      <Header />
      <SVG />
      <article className="max-w-3xl mx-auto p-5 text-black ">
        <b>
          <h1 className="text-3xl mt mb-10">{post.title}</h1>
        </b>

        <h2 className="text-xl font-light text-gray-500 mb-2">
          {post.description}
        </h2>
        {post.mainImage && (
          <img
            className="w-full mb-10 h-60 object-cover"
            src={urlFor(post.mainImage).url()!}
            alt=""
          />
        )}
        <div className="flex items-center">
          {post.author.image && (
            <img
              className="h-10 w-10 rounded-full"
              src={urlFor(post.author.image).url()!}
              alt=""
            />
          )}
          <p className="pl-3 font-extralight">Written by {post.author.name}</p>
        </div>
        <p className="font-extralight pt-3">
          Published on -{" "}
          {new Date(post.publishedAt).toString().substring(0, 15)}
        </p>
        <div className="mt-5">
          <PortableText
            className="main-block"
            dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
            projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
            content={post.body}
            serializers={{
              li: ({ children, ...restProps }: any) => (
                <li className="ml-3 list-disc font-normal" {...restProps}>
                  {children}
                </li>
              ),
              h1: ({ children, ...restProps }: any) => (
                <h1 className="text-3xl font-bold" {...restProps}>
                  {children}
                </h1>
              ),
              h2: ({ children, ...restProps }: any) => (
                <h2 className="text-2xl font-normal" {...restProps}>
                  {children}
                </h2>
              ),
              h3: ({ children, ...restProps }: any) => (
                <h3 className="text-xl font-normal" {...restProps}>
                  {children}
                </h3>
              ),
              link: ({ href, children }: any) => (
                <a href={href} className="text-blue-500 hover:underline">
                  {children}
                </a>
              ),
            }}
          />
        </div>
        <div className="flex justify-between mt-10">
          {current > startPoint &&
          <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
            <BsArrowLeft
              onClick={() => {
                router.push(`/posts/${current - 1}`);
              }}
              className="align-middle"
            />
          </button>}
          { current < endPoint && 
            <button className="align-middle bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
            <BsArrowRight
              onClick={() => {
                router.push(`/posts/${current + 1}`);
              }}
              className="align-middle"
            />
          </button>}
        </div>
      </article>
      <SvgFooter />
      <Footer />
    </main>
  );
};

export default Posts;

export const getStaticPaths = async () => {
  const query = `
    *[_type == "post"]{
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
   *[_type == "post" && slug.current == $slug][0]{
            _id,
            title,
            slug,
            description,
            mainImage,
            author -> {
              name, 
              image,
            },
            publishedAt,
            body,
            issue,
    }
    `;
  const post = await sanityClient.fetch(query, { slug: params?.slug });
  if (!post) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      post,
    },
    revalidate: 60,
  };
};
