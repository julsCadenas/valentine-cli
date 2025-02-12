"use client";
import React, { useState, useRef, useEffect } from "react";

const Terminal = () => {
    const [input, setInput] = useState("");
    const [history, setHistory] = useState([
        "Happy Valentine's day!",
        "Type 'help' to see available commands.",
    ]);

    const terminalRef = useRef(null);

    useEffect(() => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    }, [history]);

    const handleCommands = (cmd) => {
        let response = "";
        switch (cmd.toLowerCase()) {
            case "help":
                response = "Available commands: help, clear, cd, ls, cat";
                break;
            case "clear":
                setHistory([]);
                return;
            case "cd":
                response = "You changed directory (not really).";
                break;
            case "ls":
                response = "file1.txt  file2.txt  projects/";
                break;
            case "cat":
                response = "This is a sample file content.";
                break;
            default:
                response = `Command not found: ${cmd}`;
        }

        setHistory((prev) => [...prev, `$ ${cmd}`, response]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!input.trim()) return;
        handleCommands(input);
        setInput("");
    };

    return (
        <main className="w-[1300px] h-[690px] bg-background text-green-400 p-4 font-mono">
            <section ref={terminalRef} className="overflow-y-auto h-[600px]">
                {history.map((line, index) => (
                    <div key={index}>{line}</div>
                ))}
                {/* Current input line */}
                <div className="flex">
                    <span className="mr-2 text-green-400">{`$`}</span>
                    <form onSubmit={handleSubmit} className="w-full">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="bg-transparent text-green-400 outline-none w-full"
                            autoFocus
                        />
                    </form>
                </div>
            </section>
        </main>
    );
};

export default Terminal;
