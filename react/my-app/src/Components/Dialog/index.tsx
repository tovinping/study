import React, { useEffect, useRef } from 'react'
import { store } from '../../app/store';

import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import ReactDom from 'react-dom'

import ReactDOM from 'react-dom'
import style from './index.module.css'
interface IProps {
  visible: boolean
  title?: string
}
export default function Dialog({ visible, children, title }: React.PropsWithChildren<IProps>) {
  const divRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    if (visible && divRef.current) {
      document.body.appendChild(divRef.current)
    } else if (!visible && divRef.current) {
      document.body.removeChild(divRef.current)
    }
  }, [visible])
  useEffect(() => {
    const divEl = document.createElement('div')
    divEl.className = 'dialog'
    divRef.current = divEl
  }, [])
  if (divRef.current) {
    return ReactDOM.createPortal(
      <div className={style.panel}>
        <div className={style.header}>
          <span className={style.title}>{title ?? null}</span>
          <span className={style.close}>close</span>
        </div>
        <div className={style.body}>{children}</div>
      </div>,
      divRef.current
    )
  } else {
    return null
  }
}

export function info(children: JSX.Element, title= 'title'){
  const divEl = document.createElement('div')
  divEl.className = 'dialog'
  document.body.appendChild(divEl)
  const root = createRoot(divEl)
  root.render(<Provider store={store}>{children}</Provider>)
  // ReactDom.render(<Provider store={store}>
  //   <div id='info'>{children}</div>
  // </Provider>, divEl)
  // return ReactDOM.createPortal(
  //   <div className={style.panel}>
  //     <div className={style.header}>
  //       <span className={style.title}>{title ?? null}</span>
  //       <span className={style.close}>close</span>
  //     </div>
  //     <div className={style.body}>{children}</div>
  //   </div>,
  //   divEl
  // )
}