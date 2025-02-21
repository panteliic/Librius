const { GoogleGenerativeAI } = require("@google/generative-ai");

export const prompt = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || message.trim() === "") {
      return res.status(400).send({ error: "Message is required" });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-pro-exp-02-05",
    });
    const promptText = `List only book titles and authors in the following format:
    
    Title - Author
    Title - Author
    Title - Author

    No additional text, just the list. ${message}`;

    const result = await model.generateContent(promptText);
    const responseText = result.response.text();

    const books = responseText
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.includes(" - "));

    res.status(200).send({ books });
  } catch (error) {
    console.error("Error generating response:", error);
    res.status(500).send({ error: "Failed to generate response" });
  }
};
