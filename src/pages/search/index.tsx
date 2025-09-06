import SearchableLayout from "@/components/searchable-layout";
import { ReactNode, useEffect, useState, useCallback } from "react";
import BookItem from "@/components/book-item";
import fetchBooks from "@/lib/fetch-books";
import { useRouter } from "next/router";
import BookData from "@/types/types";
import Head from "next/head";

// export const getStaticProps = async (context : GetStaticPropsContext) => {
//   const q = context.query.q;
//   const books = await fetchBooks(q as string);
//   return {
//     props: {
//       books,
//     },
//   }
// }

export default function Page()
{
  const [books, setBooks] = useState<BookData[]>([]);
  const router = useRouter();
  const q = router.query.q as string;

  const fetchSearchResult = async () => {
    const books = await fetchBooks(q);
    setBooks(books);
  }
  useEffect(() => {
    if (q) {
      fetchSearchResult();
    }
  }, [q]);
  return (
    <div>
      <Head>
        <title>한입북스 검색결과</title>
        <meta property="og:image" content="/thumbnail.png"/>
        <meta property="og:title" content="한입북스 검색결과"/>
        <meta property="og:description" content={`"${q}"에 대한 도서 검색 결과입니다.`}/>
      </Head>
      {books.map((book: any) => (
        <BookItem key={book.id} {...book}/>
      ))}
    </div>
  );
}

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
}