const { GoogleGenerativeAI } = require("@google/generative-ai");

export const prompt = async (req, res) => {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

  const model = genAI.getGenerativeModel({ model: "gemini-2.0-pro-exp-02-05" });

  const prompt = "Napisi mi listu najboljih knjiga naucne fantastike koju je napisa Džordž Orvel";

  const result = await model.generateContent(prompt);
  console.log(result.response.text());
  res.send(result)
};
