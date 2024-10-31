'use client'

import style from "./review-editor.module.css"
import { createReviewAction } from "@/actions/create-review.action"
import { useActionState, useEffect } from "react"

// 서버 액션을 위한 실습
export default function ReviewEditor({ bookId }: { bookId: string | string[] }) {

  // 함수는 서버 액션으로 설정됨
  // async function createReviewAction(formData: FormData) {
  //   'use server';
  //   const content = formData.get('content')?.toString();
  //   const author = formData.get('author')?.toString();

  //   // 예외처리
  //   if (!content || !author) return;

  //   // api 호출
  //   try {
  //     const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`, {
  //       method: "POST",
  //       body: JSON.stringify({ bookId, content, author }) // 객체를 직렬화 해서 보낼것
  //     });

  //     console.log(response.status);

  //   } catch (err) {
  //     console.error(err);
  //     return;
  //   }
  // }

  const [state, formAction, isPending] = useActionState(createReviewAction, null);

  useEffect(() => {
    if (state && !state.status) {
      alert(state.error)
    }
  }, [state])


  return (
    <section>
      <form className={style.form_container} action={formAction}>
        <input name="bookId" value={bookId} hidden />
        <textarea disabled={isPending} required name="content" placeholder="리뷰 내용" />
        <div className={style.submit_container}>
          <input disabled={isPending} required name="author" placeholder="작성자" />
          <button disabled={isPending} type="submit">{isPending ? "..." : "작성하기"}</button>
        </div>
      </form>
    </section>
  )
}