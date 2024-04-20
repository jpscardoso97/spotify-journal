import Link from 'next/link';

interface PostItemProps {
    date: string;
    mood: string;
    playlistId: string;
    entry: string;
}
export default function PostList({ date, mood, playlistId, entry }: PostItemProps) {
    return (
        playlistId && <Link key={playlistId} href={`/playlist/${playlistId}`}>
            <div className="transition duration-300 p-4 rounded cursor-pointer hover:bg-[#282828] bg-paper">
                <h6 className="text-sm font-bold text-gray">{date}</h6>
                <h6 className="text-sm text-gray"><b>Mood:</b> {mood}</h6>
                <h6 className="mt-5">{entry}</h6>
            </div>
        </Link>
    );
  }
  