"use client";
import {useEffect, useState} from "react";

export default function FetchnDisplay() {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/posts")
            .then((res) => {
                if(!res.ok){
                    throw new Error("Something went wrong!");
                }
                return res.json();
            })
            .then((data) => {
                setData(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message || "Something went wrong!");
            })
    }, []);

    if (loading) return <p>Loading..</p>
    if (error) return <p>Error: {error}</p>
    return(
        <>
            <p className="font-semibold text-[20px] m-[20px]">Fetched Data</p>
            {data.slice(0, 10).map((datum, index) => (
                <div key={index} className="mx-[20px] my-[20px] p-[10px] outline-1 outline-black/20 rounded-[4px]">
                    <p>ID: {datum.id}</p>
                    <p>Title: {datum.title}</p>
                    <p>Body: {datum.body}</p>
                </div>
            ))}
        </>
    );
}