import { useLoaderData } from "@remix-run/react";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

export default function PostSlug() {
  const { slug, content } = useLoaderData();

  return (
    <div>
      <h1>Hello from POST SLUG</h1>
      <p>The slug is: {slug}</p>
      <hr />
      <article
        dangerouslySetInnerHTML={{ __html: content }}
        className="prose"
      ></article>
    </div>
  );
}

export async function loader({ params }) {
  const fileContent = fs.readFileSync(path.join("posts", `${params.slug}.md`));

  const matterObj = matter(fileContent);

  const content = marked.parse(matterObj.content.toString());

  return {
    slug: params.slug,
    content,
  };
}
