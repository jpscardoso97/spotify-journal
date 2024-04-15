import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";

import CustomButton from "../../components/CustomButton";
import Heading from "../../components/Heading";
import Layout from "../../components/Layout";
import PostList from "../../components/PostList";

import { customGet } from "../../utils/customGet";
import { isAuthenticated } from "../../utils/isAuthenticated";
import { useCallback, useEffect, useState } from "react";

export default function Journal() {
    const [newEntry, setEntry] = useState("");
    const [entries, setEntries] = useState([]);

    
    async function handleNewEntry(entry) {
        const taskId = await sendEntry(entry);
        const tempEntry = {
            date: new Date().toLocaleDateString(),
            text: entry,
        };
        // TODO: Implement task polling to avoid refreshing the page
        setEntries([...entries, tempEntry]);
    }

    return (
        <Layout title="Spotify - Music Journal">
            <Heading text="Turn your day into a playlist" />
            <div className="w-3/4 h-56">
                <form
                    className="flex items-center justify-between w-full h-full gap-3 px-3 py-1.5 bg-white rounded"
                >
                    <textarea
                        className="flex-grow w-full h-full text-sm font-semibold bg-transparent text-paper focus:outline-none"
                        placeholder="Tell me about your day"
                        value={newEntry}
                        onChange={(e) => setEntry(e.target.value)}
                        spellCheck={false}
                    />
                </form>
            </div>
            <div className="flex flex-row-reverse w-3/4 mb-16">
                <CustomButton
                    label="Submit"
                    disabled={!newEntry}
                    type="button"
                    onClick={() => handleNewEntry(newEntry)}
                />
            </div>
            <Heading text="History:" />
            <PostList entries={entries} />
        </Layout>
    );
}

async function sendEntry(entry): Promise<string> {
    const response = await fetch("/api/newentry", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: entry }),
    });
    const data = await response.json();
    return data.task_id;
}


export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const session = await getSession(ctx);

    if (!(await isAuthenticated(session))) {
        return {
            redirect: {
                destination: "/login",
                permanent: false,
            },
        };
    }

    const entries = await customGet(
        "https://api.spotify.com/v1/browse/categories?limit=50&country=IN",
        session
    );
    return { props: { entries } };
};
