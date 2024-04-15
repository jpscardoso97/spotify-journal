import Link from 'next/link';

interface PostItemProps {
    date: string;
    mood: string;
    playlistId: string;
    text: string;
}
export default function PostList({ date, mood, playlistId, text }: PostItemProps) {
    return (
        <Link href={`/playlist/${playlistId}`}>
            <div className="transition duration-300 p-4 rounded cursor-pointer hover:bg-[#282828] bg-paper">
                <h3 className="mt-5 font-bold truncate">{text}</h3>
                <h6 className="text-sm truncate text-gray">{mood}</h6>
                <h6 className="text-sm truncate text-gray">{date}</h6>
            </div>
        </Link>
    );
  }
  