import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";

import CustomButton from "../../components/CustomButton";
import Heading from "../../components/Heading";
import Layout from "../../components/Layout";
import PostList from "../../components/PostList";

import { customGet } from "../../utils/customGet";
import { isAuthenticated } from "../../utils/isAuthenticated";
import { useCallback, useEffect, useState } from "react";

export default function Journal({entries, session}) {
    const [newEntry, setEntry] = useState("");
    const [taskId, setTaskId] = useState("");
    const [history, setHistory] = useState(entries);

    
    async function handleNewEntry(entry) {
        const id = await sendEntry(entry);
        console.log("Got Task id:", id);
        setTaskId(id);
    }

    // Refresh entries every 5 seconds
    useEffect(() => {
        const interval = setInterval(async () => {
            if (!taskId) {
                console.log("No task id");
                return;
            }
            
            console.log("Checking task status", taskId);
            const taskStatus = await checkTaskStatus(taskId);

            if (taskStatus === "complete") {
                const entries = await fetchEntries(session);
                setHistory(entries);
                setTaskId("");
                setEntry("");
            }
        }, 5000);
        return () => clearInterval(interval);
    }, [taskId]);

    return (
        <Layout title="Spotify - Music Journal">
            <h1 className="text-6xl font-bold">Music Journal</h1>
            <Heading text="Turn your day into a playlist" />
            { !taskId ? (
                <div>
                    <div className="w-3/4 h-56">
                        <form className="flex items-center justify-between w-full h-full gap-3 px-3 py-1.5 bg-white rounded">
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
                            onClick={() => handleNewEntry(newEntry)}
                        />
                    </div> 
                </div>
            ) : (
                <div className="text-2xl w-3/4 mb-8">
                    Thank you for sharing your day, your playlist will be ready shortly
                </div>)}
            <Heading text="History:" />
            <PostList entries={history} />
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
    console.log("setEntry:");
    console.log(data);

    return data.task_id;
}

async function checkTaskStatus(taskId) {
    const response = await fetch(`/api/checktask?task_id=${taskId}`);
    const data = await response.json();

    return data.status;
}

async function fetchEntries(session) {
    const entries = await customGet(
        "http://localhost:5001/entries",
        session
      );

    return entries;
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

    const entries = await fetchEntries(session)
    
    return { props: { entries, session } };
};
