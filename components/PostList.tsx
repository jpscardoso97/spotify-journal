interface PostListProps {
    entries: any[];
}
export default function PostList({ entries }: PostListProps) {
    return <div className="grid grid-cols-1 gap-6">{entries}</div>;
  }
  