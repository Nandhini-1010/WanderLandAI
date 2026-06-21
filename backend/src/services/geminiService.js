const {
  GoogleGenerativeAI,
} = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

const generateSummary = async (journalContent) => {
  const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

  const prompt = `
Rewrite the following travel journal entry.

Requirements:
- Return exactly ONE paragraph.
- Maximum 50 words.
- Improve grammar and wording only.
- Keep the same meaning.
- Do not add new details or imaginary experiences.
- Do not provide multiple versions.
- Do not use headings, bullet points, or explanations.
- Return only the final rewritten journal text.

Journal:
${journalContent}
`;

  const result =
    await model.generateContent(prompt);

  return result.response.text();
};

module.exports = {
  generateSummary,
};