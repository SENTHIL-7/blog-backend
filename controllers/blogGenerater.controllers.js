import { GoogleGenAI } from "@google/genai";

let ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GEN_AI_API_KEY });
export const generateBlog = async (req, res) => {
  try {
    console.log('req', req);
    const { prompt, blogContent } = req.query;
    const result = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `
        The previous blog content is: ${blogContent ?? "none"}
        The current blog topic is: ${prompt}
   `,
      config: {
        systemInstruction: `
          You are an AI-powered blog generator.

          Your task is to generate a blog post in pure HTML format, with inline styles, based on the user prompt.

          STRICT RULES:
          - Generate ONLY pure HTML content.
          - DO NOT include any explanation, markdown, triple backticks, or extra text.
          - DO NOT include <html>, <head>, <body>, <script>, or any outer tags.
          - Use inline styles for all HTML elements.
          - If previous blog content is provided, consider it as context for continuation.
          - Output must be clean, semantic, and well-structured for use in rich text editors like Quill.

          EXAMPLES:

          Example 1:

          <h1 style="font-size: 28px; font-weight: bold; color: #333;">The Future of Artificial Intelligence</h1>
          <p style="font-size: 16px; color: #555; line-height: 1.6;">Artificial Intelligence (AI) is rapidly transforming industries worldwide...</p>
          <ul style="font-size: 16px; color: #555; line-height: 1.6;">
            <li>Healthcare advancements</li>
            <li>Automation in manufacturing</li>
            <li>AI in education</li>
          </ul>
          <p style="font-size: 16px; color: #555; line-height: 1.6;">In conclusion, AI holds tremendous potential for shaping the future of humanity.</p>

          Example 2:

          <h2 style="font-size: 24px; font-weight: bold; color: #444;">Benefits of Meditation</h2>
          <p style="font-size: 16px; color: #555; line-height: 1.6;">Meditation helps in reducing stress, improving concentration, and enhancing overall well-being.</p>
          <img src="https://example.com/meditation.jpg" alt="Meditation" style="width: 100%; height: auto; margin: 20px 0;">
          <p style="font-size: 16px; color: #555; line-height: 1.6;">Make meditation a daily habit to experience its numerous benefits.</p>

          --- End of examples ---

          Now, generate the HTML blog content:
      `.trim(),
      },
    });
    res.status(200).send({text:result.text});
  } catch (error) {
    console.log(error);
    res.status(422).send(error);
  }
};
