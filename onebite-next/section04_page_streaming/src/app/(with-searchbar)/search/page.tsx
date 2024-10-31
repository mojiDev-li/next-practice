import BookItem from "@/components/book-item";
import { BookData } from "@/types";
import { Suspense } from "react";
import BookListSkeleton from "@/components/skeleton/book-list-skeleton";
import { Metadata } from "next";

// 자동으로 searchParams 와 같은 동적 데이터는 undefined로 설정됨
// 쿼리 스트링에 의존하는 페이지를 정적 페이지로 설정해버리면 검색 기능 동작 안할 수 있음
// export const dynamic = "error"



async function SearchResult({ q }: { q: string }) {
  // await delay(1500);
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${q}`, { cache: "force-cache" });
  if (!response.ok) {
    return (
      <div>
        오류가 발생했습니다...
      </div>
    )
  }

  const books: BookData[] = await response.json()

  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

type Props = {
  searchParams: {
    q?: string;
  }
}

export function generateMetadata({ searchParams }: Props): Metadata { // 현재 페이지에 필요한 메타데이터를 동적으로 생성해줌
  return {
    title: `${searchParams.q} : 한입북스 검색`,
    description: `${searchParams.q} 검색 결과입니다`,
    openGraph: {
      title: `${searchParams.q} : 한입북스 검색`,
      description: `${searchParams.q} 검색 결과입니다`,
      images: ['/thumbnail.png']
    }
  }
}

export default function Page({
  searchParams,
}: Props) {
  return (
    <SearchResult q={searchParams.q || ""} />
  )
}
