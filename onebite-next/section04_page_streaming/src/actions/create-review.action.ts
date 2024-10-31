'use server';
// import { revalidatePath, revalidateTag } from "next/cache";
import { revalidateTag } from "next/cache";
// 별도의 파일로 분리했을 때 이렇게 맨위에 선언해줘야함

export async function createReviewAction(_: any, formData: FormData) {

  const bookId = formData.get('bookId')?.toString();
  const content = formData.get('content')?.toString();
  const author = formData.get('author')?.toString();

  // 예외처리
  if (!bookId || !content || !author) return { status: false, error: '리뷰 내용과 작성자를 입력해주세요' };

  // api 호출
  try {
    // await delay(2000);

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/review/1`, {
      method: "POST",
      body: JSON.stringify({ bookId, content, author }) // 객체를 직렬화 해서 보낼것
    });

    if (!response.ok) throw new Error(response.statusText)
    // revalidatePath(`/book/${bookId}`) // next에서 전달해준 url을 재검증하여 렌더링함

    // 1. 첫번째 인수만 전달하는 경우 : 해당 하는 페이지만 재검증
    // revalidatePath(`/book/${bookId}`)

    // 2. 특정 경로의 모든 동적 페이지를 재검증
    // /book/[id] 라는 경로를 갖는 모든 페이지를 재검증
    // 폴더의 경로 또는 파일의 경로
    // revalidatePath(`/book/[id]`, 'page')

    // 3. 특정 레이아웃을 갖는 모든 페이지를 재검증
    // searchbar를 레이아웃으로 갖는 모든 페이지 재검증
    // 레이아웃이 있는 폴더의 경로를 명시
    // revalidatePath(`/(with-searchbar)`, 'layout')

    // 4. 모든 데이터 재검증
    // root layout을 갖는 모든 페이지 재검증
    // 모든 페이지 재검증
    // revalidatePath(`/`, 'layout')

    // 5. 태그 기준, 데이터 캐시 재검증
    // {next : {tags :[`review-${bookId}`]}} : fetch 메서드에 옵션 -> 이렇게 tag이름을 줘서 할 수 있음
    // 해당 tag 값을 갖는 모든 데이터 캐시를 재검증할거임
    // 해당 tag 값을 갖는 fetch 메서드의 데이터 캐시를 재검증
    revalidateTag(`review-${bookId}`)
    return {
      status: true,
      error: ''
    }
  } catch (err) {
    return {
      status: false,
      error: `리뷰 저장에 실패했습니다 : ${err}`
    };
  }
}