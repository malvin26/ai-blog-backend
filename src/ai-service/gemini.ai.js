import { GEMINI_API_KEY } from "../constant.js";
import { buildBlogPrompt } from "./gemini.prompt.js";

export const gemini = async (prompt) => {
    const finalPrompt = prompt || buildBlogPrompt();

    const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-goog-api-key": GEMINI_API_KEY,
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [
                            {
                                text: finalPrompt,
                            },
                        ],
                    },
                ],
            }),
        }
    );

    const data = await response.json();

    if (!data?.candidates?.length) {
        throw new Error(
            data?.error?.message || "Gemini returned empty response"
        );
    }

    return data; // পুরো response return
};