
import axios from "axios";

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

const mockDB = {
  nextId: 1000,
  posts: new Map<number, any>(),

  users: [
    {
      id: 1,
      username: "john_doe",
      email: "user@example.com",
      password: "password",
    },
  ],
};

const loadPostsFromStorage = () => {
  if (typeof window !== "undefined") {
    try {
      const stored = localStorage.getItem("blog_posts");
      if (stored) {
        const posts = JSON.parse(stored);
        posts.forEach((post: Post) => {
          mockDB.posts.set(post.id, post);
          if (post.id >= mockDB.nextId) {
            mockDB.nextId = post.id + 1;
          }
        });
      }
    } catch (error) {
      console.error("Failed to load posts from storage:", error);
    }
  }
};


const savePostsToStorage = () => {
  if (typeof window !== "undefined") {
    try {
      const posts = Array.from(mockDB.posts.values());
      localStorage.setItem("blog_posts", JSON.stringify(posts));
    } catch (error) {
      console.error("Failed to save posts to storage:", error);
    }
  }
};


loadPostsFromStorage();

export const authAPI = {
  login: async (email: string, password: string) => {
    const user = mockDB.users.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      throw new Error("Invalid email or password");
    }

    return {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      token: "fake-jwt-token-" + Date.now(),
    };
  },

  register: async (username: string, email: string, password: string) => {
    const exists = mockDB.users.some((u) => u.email === email);
    if (exists) throw new Error("Email already registered");

    const newUser = {
      id: mockDB.users.length + 1,
      username,
      email,
      password,
    };
    mockDB.users.push(newUser);

    return {
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
      },
      token: "fake-jwt-token-" + Date.now(),
    };
  },
};

export const postsAPI = {
  getPosts: async (): Promise<{ data: Post[] }> => {
    const realPosts = (await api.get<Post[]>("/posts")).data.slice(0, 10);
    const myPosts = Array.from(mockDB.posts.values());

    return {
      data: [...myPosts.reverse(), ...realPosts],
    };
  },

  getPost: async (id: string) => {
    const postId = Number(id);
    if (mockDB.posts.has(postId)) {
      return { data: mockDB.posts.get(postId)! };
    }

    return api.get(`/posts/${id}`).catch(() => ({ data: null }));
  },

  createPost: async (data: Omit<Post, "id">): Promise<{ data: Post }> => {
    const newPost: Post = {
      ...data,
      id: mockDB.nextId++,
      userId: 1,
    };
    mockDB.posts.set(newPost.id, newPost);
    savePostsToStorage();
    return { data: newPost };
  },

  updatePost: async (
    id: string,
    data: Partial<Post>
  ): Promise<{ data: Post }> => {
    const postId = Number(id);
    const existing =
      mockDB.posts.get(postId) ||
      (await api.get<Post>(`/posts/${postId}`)).data;

    const updated: Post = { ...existing, ...data, id: postId };
    mockDB.posts.set(postId, updated);
    savePostsToStorage();
    return { data: updated };
  },

  deletePost: async (id: string): Promise<void> => {
    mockDB.posts.delete(Number(id));
    savePostsToStorage();
  },
};
