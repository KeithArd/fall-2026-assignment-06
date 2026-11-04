const titles = [
  "React Basics",
  "Learning TypeScript",
  "Why Hooks Matter",
  "CSS Tips",
  "Intro to PostgreSQL",
  "REST APIs Explained",
  "React Router Guide",
  "Debugging in the Browser",
  "Git for Beginners",
  "Understanding Promises",
];

for (const title of titles) {
  const response = await fetch("http://localhost:8080/articles", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title,
      contents: `This is a sample article about ${title}. It has enough text to go past the one hundred character preview limit, so you can check the truncation on the list page.`,
    }),
  });
  console.log(response.status, title);
}
