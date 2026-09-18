// import { GEMINI_API_KEY } from "../constant.js";
// import { buildBlogPrompt } from "./gemini.prompt.js";

// export const gemini = async (prompt) => {
//     const finalPrompt = prompt || buildBlogPrompt();

//     const response = await fetch(
//         "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
//         {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 "X-goog-api-key": GEMINI_API_KEY,
//             },
//             body: JSON.stringify({
//                 contents: [
//                     {
//                         parts: [
//                             {
//                                 text: finalPrompt,
//                             },
//                         ],
//                     },
//                 ],
//             }),
//         }
//     );

//     const data = await response.json();

//     if (!data?.candidates?.length) {
//         throw new Error(
//             data?.error?.message || "Gemini returned empty response"
//         );
//     }

//     return data; // পুরো response return
// };

import { GEMINI_API_KEY } from "../constant.js";
import { buildBlogPrompt } from "./gemini.prompt.js";

export const gemini = async ({
    cat,
    topic,
    isTrending = false,
    angle,
    intentGroup,
    prompt,
} = {}) => {
    /**
     * যদি বাইরে থেকে custom prompt পাঠানো হয়,
     * তাহলে সেটাই ব্যবহার হবে।
     *
     * না হলে buildBlogPrompt() থেকে
     * নতুন structured prompt তৈরি হবে।
     */
    const finalPrompt =
        prompt ||
        buildBlogPrompt({
            cat,
            topic,
            isTrending,
            angle,
            intentGroup,
        });

    if (!finalPrompt) {
        throw new Error("Gemini prompt is empty");
    }

    if (!GEMINI_API_KEY) {
        throw new Error("GEMINI_API_KEY is not configured");
    }

    const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent",
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

    /**
     * Gemini API error
     */
    if (!response.ok) {
        throw new Error(
            data?.error?.message ||
            `Gemini API failed with status ${response.status}`
        );
    }

    /**
     * Empty response protection
     */
    if (!data?.candidates?.length) {
        throw new Error(
            data?.error?.message ||
            "Gemini returned empty response"
        );
    }

    /**
     * Safety / blocked response protection
     */
    const candidate = data?.candidates?.[0];

    if (!candidate?.content?.parts?.length) {
        throw new Error(
            candidate?.finishReason
                ? `Gemini generation stopped: ${candidate.finishReason}`
                : "Gemini returned no content"
        );
    }

    return data;
};
