import React from 'react'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & { content: string }

export const Button: React.FC<ButtonProps> = ({ content, ...rest }) => {
  return (
    <button {...rest}>{content}</button>
  )
}
