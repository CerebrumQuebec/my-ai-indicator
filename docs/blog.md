# Blog Feature Implementation Plan

## Overview

This document outlines the implementation plan for adding a blog feature to our Next.js application. The initial implementation will use a file-based approach with MDX for content management, with the option to integrate Firebase authentication for a writer admin panel in the future.

## Implementation Approach

### Phase 1: MDX File-Based Blog

We'll start with a simple implementation using Next.js's built-in file system routing and MDX for content management. Blog posts will be added via pull requests to the repository.

### Phase 2 (Future): Writer Authentication

In a future phase, we'll implement Firebase authentication to create a writer/admin panel for more streamlined content management.

## Technical Specifications

### Core Technologies

- **Content Format**: MDX (Markdown with JSX)
- **Routing**: Next.js file-based routing
- **Styling**: Tailwind CSS (consistent with our existing style system)
- **Future Auth**: Firebase Authentication (consistent with our existing auth system)

## Implementation Tasks

### 1. Set Up MDX Support

1. Install required packages:

   ```bash
   npm install @next/mdx @mdx-js/loader @mdx-js/react gray-matter
   ```

2. Configure Next.js to support MDX files:

   ```typescript
   // next.config.js
   const withMDX = require("@next/mdx")({
     extension: /\.mdx?$/,
     options: {
       remarkPlugins: [],
       rehypePlugins: [],
     },
   });

   module.exports = withMDX({
     pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
   });
   ```

### 2. Create Blog Directory Structure

```
/src
  /pages
    /blog
      index.tsx       # Blog listing page
      [slug].tsx      # Dynamic blog post page
  /content
    /blog
      post-one.mdx    # Example blog post
      post-two.mdx    # Example blog post
  /components
    /blog
      PostCard.tsx    # Blog post preview card
      BlogLayout.tsx  # Blog-specific layout
      TOC.tsx         # Table of contents component
```

### 3. Implement Blog Post Frontmatter

Each MDX file should include frontmatter with metadata:

```md
---
title: "Example Blog Post"
excerpt: "A short description of the blog post for previews"
date: "2025-03-25"
author: "Author Name"
tags: ["next.js", "mdx", "tutorial"]
coverImage: "/images/blog/example-cover.jpg"
---

# Blog Post Content

Your markdown content here...
```

### 4. Create Blog Index Page

Implement a page to list all blog posts with previews:

```typescript
// src/pages/blog/index.tsx
import { GetStaticProps } from "next";
import Link from "next/link";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

// Define post type
export interface Post {
  slug: string;
  frontMatter: {
    title: string;
    date: string;
    excerpt: string;
    author: string;
    tags: string[];
    coverImage?: string;
  };
}

export default function BlogIndex({ posts }: { posts: Post[] }) {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Blog</h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link href={`/blog/${post.slug}`} key={post.slug}>
            <div className="border border-surface-200 rounded-lg overflow-hidden hover:shadow-md transition duration-300">
              {post.frontMatter.coverImage && (
                <img
                  src={post.frontMatter.coverImage}
                  alt={post.frontMatter.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-2">
                  {post.frontMatter.title}
                </h2>
                <p className="text-sm text-text-secondary mb-2">
                  {new Date(post.frontMatter.date).toLocaleDateString()} •{" "}
                  {post.frontMatter.author}
                </p>
                <p className="text-text-primary">{post.frontMatter.excerpt}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {post.frontMatter.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-primary-100 text-primary-700 text-xs px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const files = fs.readdirSync(path.join(process.cwd(), "src/content/blog"));

  const posts = files
    .filter((filename) => filename.endsWith(".md") || filename.endsWith(".mdx"))
    .map((filename) => {
      const slug = filename.replace(/\.mdx?$/, "");
      const filePath = path.join(process.cwd(), "src/content/blog", filename);
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data } = matter(fileContents);

      return {
        slug,
        frontMatter: data,
      };
    })
    .sort((a, b) => {
      return (
        new Date(b.frontMatter.date).getTime() -
        new Date(a.frontMatter.date).getTime()
      );
    });

  return {
    props: {
      posts,
    },
  };
};
```

### 5. Create Dynamic Blog Post Page

Implement a dynamic page for rendering individual blog posts:

```typescript
// src/pages/blog/[slug].tsx
import { GetStaticPaths, GetStaticProps } from "next";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

// Define components to use in MDX
const components = {
  h1: (props) => <h1 className="text-4xl font-bold mt-8 mb-4" {...props} />,
  h2: (props) => <h2 className="text-3xl font-bold mt-8 mb-4" {...props} />,
  h3: (props) => <h3 className="text-2xl font-bold mt-6 mb-3" {...props} />,
  p: (props) => <p className="mb-4" {...props} />,
  a: (props) => <a className="text-primary-600 hover:underline" {...props} />,
  ul: (props) => <ul className="list-disc pl-6 mb-4" {...props} />,
  ol: (props) => <ol className="list-decimal pl-6 mb-4" {...props} />,
  li: (props) => <li className="mb-1" {...props} />,
  blockquote: (props) => (
    <blockquote
      className="border-l-4 border-primary-200 pl-4 italic my-4"
      {...props}
    />
  ),
  img: (props) => (
    <div className="my-8">
      <Image
        {...props}
        width={800}
        height={450}
        className="rounded-lg"
        alt={props.alt || "Blog image"}
      />
    </div>
  ),
  code: (props) => (
    <code className="bg-surface-100 rounded px-1 py-0.5" {...props} />
  ),
  pre: (props) => (
    <pre
      className="bg-surface-100 rounded p-4 overflow-x-auto my-6"
      {...props}
    />
  ),
};

interface PostPageProps {
  frontMatter: {
    title: string;
    date: string;
    excerpt: string;
    author: string;
    tags: string[];
    coverImage?: string;
  };
  slug: string;
  mdxSource: MDXRemoteSerializeResult;
}

export default function PostPage({
  frontMatter,
  slug,
  mdxSource,
}: PostPageProps) {
  return (
    <>
      <Head>
        <title>{frontMatter.title} | Badge AI Blog</title>
        <meta name="description" content={frontMatter.excerpt} />
        <meta property="og:title" content={frontMatter.title} />
        <meta property="og:description" content={frontMatter.excerpt} />
        {frontMatter.coverImage && (
          <meta property="og:image" content={frontMatter.coverImage} />
        )}
      </Head>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Link href="/blog">
          <a className="text-primary-600 hover:underline mb-8 inline-block">
            &larr; Back to all posts
          </a>
        </Link>

        <article className="prose lg:prose-xl max-w-none">
          {frontMatter.coverImage && (
            <div className="relative w-full h-96 mb-8">
              <Image
                src={frontMatter.coverImage}
                alt={frontMatter.title}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
          )}

          <h1 className="text-4xl font-bold mb-4">{frontMatter.title}</h1>

          <div className="flex items-center text-text-secondary mb-8">
            <time dateTime={frontMatter.date}>
              {new Date(frontMatter.date).toLocaleDateString()}
            </time>
            <span className="mx-2">•</span>
            <span>{frontMatter.author}</span>
          </div>

          <div className="mb-8 flex flex-wrap gap-2">
            {frontMatter.tags.map((tag) => (
              <span
                key={tag}
                className="bg-primary-100 text-primary-700 text-sm px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mdx-content">
            <MDXRemote {...mdxSource} components={components} />
          </div>
        </article>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const files = fs.readdirSync(path.join(process.cwd(), "src/content/blog"));

  const paths = files
    .filter((filename) => filename.endsWith(".md") || filename.endsWith(".mdx"))
    .map((filename) => ({
      params: {
        slug: filename.replace(/\.mdx?$/, ""),
      },
    }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;
  const filePath = path.join(process.cwd(), "src/content/blog", `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    // Try .md extension if .mdx doesn't exist
    const mdFilePath = path.join(
      process.cwd(),
      "src/content/blog",
      `${slug}.md`
    );
    if (!fs.existsSync(mdFilePath)) {
      return {
        notFound: true,
      };
    }
  }

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);
  const mdxSource = await serialize(content);

  return {
    props: {
      frontMatter: data,
      slug,
      mdxSource,
    },
  };
};
```

### 6. Create Blog Layout Component

```typescript
// src/components/blog/BlogLayout.tsx
import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

interface BlogLayoutProps {
  children: React.ReactNode;
}

export default function BlogLayout({ children }: BlogLayoutProps) {
  const router = useRouter();
  const isRootBlogPage = router.pathname === "/blog";

  return (
    <div className="min-h-screen bg-surface-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <Link href="/">
              <a className="text-2xl font-bold text-primary-600">Badge AI</a>
            </Link>
            <nav>
              <ul className="flex space-x-6">
                <li>
                  <Link href="/">
                    <a className="text-text-primary hover:text-primary-600">
                      Home
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/blog">
                    <a className="text-primary-600 border-b-2 border-primary-600">
                      Blog
                    </a>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          {isRootBlogPage && (
            <div className="mt-8 text-center">
              <h1 className="text-4xl font-bold text-text-primary">
                Badge AI Blog
              </h1>
              <p className="mt-4 text-text-secondary max-w-2xl mx-auto">
                Insights, tutorials, and updates from the Badge AI team
              </p>
            </div>
          )}
        </div>
      </header>

      <main>{children}</main>

      <footer className="bg-surface-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0">
              <h3 className="text-xl font-bold mb-4">Badge AI</h3>
              <p className="text-surface-300 max-w-md">
                Enhancing accessibility and understanding through AI-powered
                badge systems.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/">
                    <a className="text-surface-300 hover:text-white transition">
                      Home
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/blog">
                    <a className="text-surface-300 hover:text-white transition">
                      Blog
                    </a>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-surface-700 mt-8 pt-8 text-center text-surface-400">
            <p>
              &copy; {new Date().getFullYear()} Badge AI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
```

### 7. Update \_app.tsx to Use Blog Layout for Blog Pages

```typescript
// src/pages/_app.tsx
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import "../styles/globals.css";
import BlogLayout from "../components/blog/BlogLayout";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isBlogPage = router.pathname.startsWith("/blog");

  if (isBlogPage) {
    return (
      <BlogLayout>
        <Component {...pageProps} />
      </BlogLayout>
    );
  }

  return <Component {...pageProps} />;
}

export default MyApp;
```

### 8. Add Example Blog Post

Create a sample blog post file:

```markdown
## // src/content/blog/introduction-to-badge-ai.mdx

title: "Introduction to Badge AI"
excerpt: "Learn about how Badge AI is transforming accessibility through innovative badge systems."
date: "2025-03-25"
author: "Badge AI Team"
tags: ["introduction", "accessibility", "AI"]
coverImage: "/images/blog/intro-badge-ai.jpg"

---

# Introduction to Badge AI

Welcome to the Badge AI blog! In this inaugural post, we want to introduce you to our mission, our technology, and how we're working to make the digital world more accessible for everyone.

## Our Mission

At Badge AI, we believe that technology should be accessible to all. Our mission is to create innovative badge systems that help people quickly understand complex information and navigate digital spaces more effectively.

## How Badge AI Works

Our system uses a combination of advanced AI technologies to analyze content and generate intuitive badges that convey:

- Sound information
- Visual information
- Text complexity

Each badge is carefully designed to be:

1. Instantly recognizable
2. Culturally relevant
3. Accessible across devices

## The Road Ahead

In the coming months, we'll be sharing more about our development process, case studies, and how you can integrate Badge AI into your own projects. Stay tuned for regular updates!
```

### 9. Future Integration Path for Firebase Authentication

When ready to implement the writer login system, follow these steps:

1. Set up Firebase Authentication in your NextAuth.js configuration
2. Create protected API routes for content management
3. Build an admin interface for writers to create/edit content
4. Implement a database storage solution in Firebase for blog content

## Requirements and Dependencies

- Next.js 14.0.4+
- React 18.2.0+
- @next/mdx package
- gray-matter for frontmatter parsing
- next-mdx-remote for rendering MDX content
- Tailwind CSS for styling (already in project)

## Implementation Timeline

1. **Week 1**: Set up MDX configuration and basic blog structure
2. **Week 2**: Implement blog listing and individual post pages
3. **Week 3**: Design and styling refinements, add sample content
4. **Week 4**: Testing, QA, and deployment

## Future Considerations

- SEO optimization for blog content
- RSS feed generation
- Category and tag filtering functionality
- Search functionality
- Social sharing integration
- Comment system (if desired)
- Analytics integration with existing Firebase analytics
- Writer authentication and admin panel

## Additional Notes

- All styling should follow the existing design system and color palette
- Blog content should be optimized for mobile viewing
- Ensure accessibility standards are maintained
- Follow the established security protocols for future Firebase integration

This implementation provides a clean, maintainable blog feature that aligns with the existing architecture while leaving a clear path for future enhancements with Firebase authentication.
