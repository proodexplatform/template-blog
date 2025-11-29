import { notFound } from "next/navigation";
import BlogClient from "@/components/custom/blog-client";

export function generateMetadata({ params }: { params: { slug: string } }) {
  const post: any = [];
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
  };
}

export default function BlogPage({ params }: { params: { slug: string } }) {
  const post: any = [];
  if (!post) return notFound();

  return <BlogClient post={post} />;
}