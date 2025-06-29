import type { SVGProps } from "react"

export const Icons = {
  logo: (props: SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z" />
      <path d="M10 8.5v7" />
      <path d="M14 8.5v7a1.5 1.5 0 0 1-3 0v-7a1.5 1.5 0 0 1 3 0z" />
      <path d="M10 8.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5" />
    </svg>
  ),
}
