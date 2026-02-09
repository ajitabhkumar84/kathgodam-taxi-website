import React from 'react'
import {EyeOpenIcon} from '@sanity/icons'
import {useFormValue} from 'sanity'

export function PreviewUrlInput(props: any) {
  // Use Sanity's useFormValue hook to get the slug from the document
  const slugValue = useFormValue(['slug']) as {current?: string} | undefined
  const slug = slugValue?.current

  // Debug: log to console
  console.log('PreviewUrlInput rendering:', {slug, slugValue})

  if (!slug) {
    return (
      <div style={{padding: '12px', color: '#999', fontSize: '14px', fontStyle: 'italic'}}>
        ℹ️ Generate a slug first to see the production URL
      </div>
    )
  }

  const url = `https://kathgodamtaxi.com/${slug}` // Update domain as needed

  return (
    <div style={{
      padding: '12px',
      backgroundColor: '#e0f2fe',
      borderRadius: '6px',
      border: '1px solid #0ea5e9'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '6px'
      }}>
        <EyeOpenIcon style={{color: '#0284c7'}} />
        <strong style={{color: '#0c4a6e', fontSize: '12px'}}>Production URL:</strong>
      </div>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          color: '#0066cc',
          textDecoration: 'underline',
          fontWeight: 500,
          fontSize: '14px',
          wordBreak: 'break-all'
        }}
      >
        {url}
      </a>
      <div style={{fontSize: '11px', color: '#64748b', marginTop: '6px'}}>
        👆 Click to open in new tab
      </div>
    </div>
  )
}
