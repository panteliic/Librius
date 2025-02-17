const { GoogleGenerativeAI } = require("@google/generative-ai");

export const prompt = async (req, res) => {
  try {
    const { message } = req.body;

    // Validate if the message is empty
    if (!message || message.trim() === "") {
      return res.status(400).send({ error: "Message is required" });
    }

    // Initialize the Generative AI client
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-pro-exp-02-05",
    });

    // Set the prompt text for generating the response
    const promptText = `Write only the book title and the author in bullet points: ${message}`;

    // Generate content using the model
    const result = await model.generateContent(promptText);

    // Send the generated text as a response
    res.status(200).send(result.response.text() );
  } catch (error) {
    // Handle any errors
    console.error("Error generating response:", error);
    res.status(500).send({ error: "Failed to generate response" });
  }
};
