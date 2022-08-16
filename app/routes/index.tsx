import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { useLoaderData, Link } from "@remix-run/react";

export default function Index() {
  const { posts } = useLoaderData();

  // console.log("=====", posts);

  return (
    <div>
      <h1 className="text-3xl font-bold">Hello</h1>
      <section className="flex gap-8 flex-wrap">
        {posts.map((post, index) => (
          <article key={index} className="border p-8">
            <h2 className="text-xl font-bold">{post.title}</h2>
            {/* <a
              href={`/posts/${post.slug}`}
              className="bg-blue-500 text-white px-4 py-2 inline-block mt-5"
            >
              Read More
            </a> */}
            <Link
              className="bg-blue-500 text-white px-4 py-2 inline-block mt-5"
              to={`/posts/${post.slug}`}
            >
              Read More
            </Link>
          </article>
        ))}
      </section>
    </div>
  );
}

export async function loader() {
  const files = fs.readdirSync(path.join("posts"));

  const posts = files.map((file) => {
    const fileContent = fs.readFileSync(path.join("posts", file), "utf-8");

    return {
      ...matter(fileContent).data,
    };
  });

  return {
    posts,
  };
}
