'use client'

import { RichText as RichTextRenderer } from '@payloadcms/richtext-lexical/react'
/* eslint-disable @typescript-eslint/no-explicit-any */
interface Props {
  content: any
  className?: string
}

export function RichText({ content, className = '' }: Props) {
  if (!content) return null

  return (
    <div className={`prose prose-lg max-w-none mozillaheadline text-lg ${className}`}>
      <RichTextRenderer data={content} />
    </div>
  )
}