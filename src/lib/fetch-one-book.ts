import BookData from "@/types/types";

export default async function fetchOneBook(id: number) : Promise<BookData | null> {
  const url = `http://localhost:12345/book/${id}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch book");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}