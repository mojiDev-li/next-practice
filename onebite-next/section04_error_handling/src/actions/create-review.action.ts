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

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/review/1`, {
      method: "POST",
      body: JSON.stringify({ bookId, content, author }) // 객체를 직렬화 해서 보낼것
    });

    if (!response.ok) throw new Error(response.statusText)
    
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