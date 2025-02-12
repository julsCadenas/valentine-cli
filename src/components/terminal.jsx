"use client"; 
import React, { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation"; 
import fileSystem from "@/utils/filesystem";

const Terminal = () => {
    const pathname = usePathname(); 
    const username = pathname.split("/")[1] || "user"; 
    const [input, setInput] = useState("");
    const [currentPath, setCurrentPath] = useState(["home"])
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

    const getCurrentDirectory = () => {
        return currentPath.reduce((dir, subDir) => dir[subDir], fileSystem)
    };

    const handleCommands = (cmd) => {
        const args = cmd.split(" ");
        const command = args[0].toLowerCase();
        const arg = args[1];
    
        let response = "";
        const prefix = `@${username }:/${currentPath.join("/")}$ `;
    
        switch (command) {
            case "help":
                response = "Available commands: help, clear, cd, ls, cat, pwd";
                break;
            case "clear":
                setHistory([]);
                return;
            case "pwd":
                response = "/" + currentPath.join("/");
                break;
            case "ls":
                const dir = getCurrentDirectory();
                response = Object.keys(dir).length > 0 
                    ? Object.keys(dir).join("  ") 
                    : "Empty directory.";
                break;
            case "cd":
                if (!arg) {
                    response = "Usage: cd <folder>";
                } else if (arg === "..") {
                    if (currentPath.length > 1) {
                        setCurrentPath(currentPath.slice(0, -1));
                    } else {
                        response = "Already at root directory.";
                    }
                } else {
                    const dir = getCurrentDirectory();
                    if (dir[arg] && typeof dir[arg] === "object") {
                        setCurrentPath([...currentPath, arg]);
                    } else {
                        response = `No such directory: ${arg}`;
                    }
                }
                break;
                case "cat":
                    if (!arg) {
                        response = "Usage: cat <filename>";
                    } else {
                        const dir = getCurrentDirectory();
                        response = dir[arg] ? (
                            <pre className="whitespace-pre-wrap">{dir[arg]}</pre>
                        ) : `No such file: ${arg}`;
                    }
                    break;
            default:
                response = `Command not found: ${cmd}`;
        }
    
        setHistory((prev) => [...prev, `${prefix} ${cmd}`, response]);
    };
    

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!input.trim()) return;
        handleCommands(input);
        setInput("");
    };

    return (
        <main className="w-full h-full max-w-[1300px] max-h-[690px] bg-background text-green-400 p-4 font-mono text-sm md:text-base">
            <section ref={terminalRef} className="overflow-y-auto h-[600px]">
                {history.map((line, index) => (
                    <div key={index}>{line}</div>
                ))}
                {/* Current input line */}
                <div className="flex">
                    <span className="mr-2 text-green-400">{`@${username}:/${currentPath.join("/")}$ `}</span>
                    <form onSubmit={handleSubmit} className="w-32 md:w-5/6">
                        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} className="bg-transparent text-green-400 outline-none w-full" autoFocus />
                    </form>
                </div>
            </section>
        </main>
    );
};

export default Terminal;
