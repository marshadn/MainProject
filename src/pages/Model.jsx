import { useState } from "react";
import { generateGeminiResponse } from "../lib/GeminiAI";

function Model() {
    const [input, setInput] = useState("");
    const [response, setResponse] = useState("");

    const handleAsk = async () => {
        if (!input) return;
        const reply = await generateGeminiResponse(input);
        setResponse(reply);
    };

    return (
        <div className="p-4">
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask something..."
                className="border p-2 rounded"
            />
            <button onClick={handleAsk} className="ml-2 bg-blue-500 text-white p-2 rounded">
                Ask AI
            </button>
            <p className="mt-4">{response}</p>
        </div>
    );
}

export default Model;
