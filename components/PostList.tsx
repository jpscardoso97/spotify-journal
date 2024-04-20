import PostItem from "../components/PostItem";

interface PostListProps {
    entries: any[];
}
export default function PostList({ entries }: PostListProps) {
    return <div className="grid grid-cols-1 gap-6 w-3/4">
        {entries.map((entry, index) => (
            <PostItem key={index} {...entry} />
        ))}
    </div>;
  }
  