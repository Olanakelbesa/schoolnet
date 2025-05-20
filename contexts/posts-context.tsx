"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// Sample post data
const initialPosts = [
  {
    id: "1",
    title: "School Closure Due to Weather",
    content:
      "Due to the expected severe weather conditions, the school will be closed tomorrow. Please stay safe and check back for updates on when classes will resume.",
    category: "announcement",
    status: "published",
    publishedAt: "2023-05-15T09:00:00Z",
    author: {
      name: "Principal Johnson",
      avatar: "",
    },
    audience: ["all-parents", "all-students"],
    attachments: [],
    likes: 24,
    comments: 8,
  },
  {
    id: "2",
    title: "End of Year Concert - Save the Date!",
    content:
      "We're excited to announce our annual End of Year Concert will be held on June 15th at 6:00 PM in the school auditorium. All students from grades 3-12 will be participating. Tickets will be available starting next week.",
    category: "event",
    status: "published",
    publishedAt: "2023-05-10T14:30:00Z",
    author: {
      name: "Ms. Williams",
      avatar: "",
    },
    audience: ["all-parents", "all-students"],
    attachments: [
      {
        name: "concert_program.pdf",
        size: "1.2 MB",
        type: "pdf",
      },
    ],
    likes: 56,
    comments: 12,
  },
  {
    id: "3",
    title: "New Science Curriculum for Next Academic Year",
    content:
      "We're pleased to announce that we'll be implementing a new science curriculum starting next academic year. The new program focuses on hands-on experiments and real-world applications. Parent information sessions will be held next month.",
    category: "academic",
    status: "draft",
    publishedAt: null,
    author: {
      name: "Dr. Martinez",
      avatar: "",
    },
    audience: ["all-parents"],
    attachments: [],
    likes: 0,
    comments: 0,
  },
]

// Define the post type
export type Post = {
  id: string
  title: string
  content: string
  category: string
  status: string
  publishedAt: string | null
  author: {
    name: string
    avatar: string
  }
  audience: string[] | { [key: string]: boolean }
  attachments: Array<{
    id?: string
    name: string
    size: string
    type: string
    url?: string
  }>
  likes: number
  comments: number
  scheduledPublish?: boolean
  publishDate?: Date | null
  [key: string]: any // Allow for additional properties
}

// Create the context
type PostsContextType = {
  posts: Post[]
  addPost: (post: Post) => void
  updatePost: (id: string, post: Partial<Post>) => void
  deletePost: (id: string) => void
  publishPost: (id: string) => void
}

const PostsContext = createContext<PostsContextType | undefined>(undefined)

// Create a provider component
export function PostsProvider({ children }: { children: ReactNode }) {
  // Initialize state from localStorage if available, otherwise use initialPosts
  const [posts, setPosts] = useState<Post[]>(() => {
    if (typeof window !== "undefined") {
      const savedPosts = localStorage.getItem("schoolDashboardPosts")
      return savedPosts ? JSON.parse(savedPosts) : initialPosts
    }
    return initialPosts
  })

  // Save posts to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("schoolDashboardPosts", JSON.stringify(posts))
    }
  }, [posts])

  // Add a new post
  const addPost = (post: Post) => {
    // Format audience if it's an object
    const formattedPost = {
      ...post,
      audience: Array.isArray(post.audience)
        ? post.audience
        : Object.entries(post.audience)
            .filter(([_, value]) => value)
            .map(([key]) => key),
    }

    setPosts((prevPosts) => [formattedPost, ...prevPosts])
  }

  // Update an existing post
  const updatePost = (id: string, updatedPost: Partial<Post>) => {
    setPosts((prevPosts) => prevPosts.map((post) => (post.id === id ? { ...post, ...updatedPost } : post)))
  }

  // Delete a post
  const deletePost = (id: string) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id))
  }

  // Publish a post
  const publishPost = (id: string) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === id
          ? {
              ...post,
              status: "published",
              publishedAt: new Date().toISOString(),
            }
          : post,
      ),
    )
  }

  return (
    <PostsContext.Provider value={{ posts, addPost, updatePost, deletePost, publishPost }}>
      {children}
    </PostsContext.Provider>
  )
}

// Create a custom hook to use the context
export function usePosts() {
  const context = useContext(PostsContext)
  if (context === undefined) {
    throw new Error("usePosts must be used within a PostsProvider")
  }
  return context
}
