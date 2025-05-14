type PostCardProps = {
  id: string;
  text: string;
  images: string[];
  userId: string;
  user: {
    id: string;
    username: string;
    image: string;
    followers: { followerId: string }[];
    following: { followingId: string }[];
    _count: {
      followers: number;
      posts: number;
    };
  };
  likes: { userId: string }[];
  saves: { userId: string }[];
  _count: {
    likes: number;
    replies: number;
  };
  createdAt: Date;
  updatedAt: Date;
};

export default function PostCard({ post }: { post: PostCardProps }) {
  return (
    <div>
      <div>Post Card</div>
    </div>
  );
}
