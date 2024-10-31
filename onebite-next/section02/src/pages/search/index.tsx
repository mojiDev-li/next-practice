import SearchableLayout from "@/components/searchable-layout"
// import { useRouter } from "next/router"
import { ReactNode, useEffect, useState } from "react"
import BookItem from "@/components/book-item";
// import { GetServerSidePropsContext, GetStaticPropsContext, InferGetServerSidePropsType } from "next";
import fetchBooks from "@/lib/fetch-books";
import { useRouter } from "next/router";
import { BookData } from "@/types";
import Head from "next/head";


// export const getStaticProps = async (context: GetStaticPropsContext) => {
//   const q = context.query.q; // 빌드 때 실행되기 때문에 꺼내올 수 없음 -> SSG방식으로 동작할 수 없는 페이지임

//   const books = await fetchBooks(q as string);

//   return {
//     props: { books }
//   }
// }


// export default function Page({ books }: InferGetServerSidePropsType<typeof getStaticProps>) {
export default function Page() {

  // CSR 방식으로 돌아가는 방법 -> 이렇게 빌드 때 사전 렌더링을 못하게 되는경우
  const [books, setBooks] = useState<BookData[]>([]);
  const router = useRouter();
  const q = router.query.q;

  const fetchSearchResult = async () => {
    const data = await fetchBooks(q as string);
    setBooks(data);
  };

  useEffect(() => {
    if (q) {
      fetchSearchResult();
    }
  }, [q])
  return (
    <div>
      <Head>
        <title>한입북스 - 검색결과</title>
        <meta property="og:image" content="/thumbnail.png" />
        <meta property="og:title" content="한입북스" />
        <meta property="og:description" content="한입 북스에 등록된 도서들을 만나보세요" />
      </Head>
      {books.map((book) => <BookItem key={book.id} {...book} />)}

    </div>
  );
}

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>
}