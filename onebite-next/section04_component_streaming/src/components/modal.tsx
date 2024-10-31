'use client'

import { ReactNode, useEffect, useRef } from 'react'
import style from './modal.module.css'
import { createPortal } from 'react-dom'
import { useRouter } from 'next/navigation'

export default function Modal({ children }: { children: ReactNode }) {

  const dialogRef = useRef<HTMLDialogElement>(null)
  const router = useRouter()

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
      dialogRef.current?.scrollTo({
        top: 0
      })
    }
  }, [])

  return createPortal(
    <dialog
      onClose={() => router.back()
      }
      onClick={(e) => {
        if ((e.target as any).nodeName === "DIALOG") { // 모달의 바깥을 클릭했다면
          router.back();
        }
      }}
      className={style.modal}
      ref={dialogRef} > {children}
    </dialog >, document.getElementById('modal-root') as HTMLElement
  )
  // 해당 dom에서 modal-root라는 id를 가지는 돔요소에 <dialog>{children}</dialog>을 넣어줄거임
  // 이렇게 까지 하는 이유는 모달은 전체 페이지를 뒤덮기 때문임.
  // createPortal을 통해 존재하는 돔요소 아래 고정적인 레이아웃을 렌더링하도록 해준거임

}