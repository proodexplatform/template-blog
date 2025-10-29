// pages/blog/[slug].tsx
import { GetStaticPaths, GetStaticProps } from 'next';

interface BlogPostProps {
  content: string;
}

export default function BlogPost({ content }: BlogPostProps) {
  return (
      <article
        className="prose"
        dangerouslySetInnerHTML={{ __html: content }}
      />
  );
}

// Mock data for blog posts
const mockPosts: Record<string, string> = {
  'first-post': `
    <h1>Welcome to the First Post</h1>
    <p>This is a sample blog post using artificial content. You can replace this with real content later.</p>
    <ul>
      <li>Point 1</li>
      <li>Point 2</li>
    </ul>
  `,
  'second-post': `
    <h1>Second Post Title</h1>
    <p>This is another dummy blog post. It shows how multiple posts might work with artificial data.</p>
    <p>Enjoy building your blog!</p>
  `,
};

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = Object.keys(mockPosts);

  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;

  return {
    props: {
      content: mockPosts[slug] || '<h1>Post not found</h1><p>No content available.</p>',
    },
  };
};