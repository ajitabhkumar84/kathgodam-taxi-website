import React from 'react'
import {EyeOpenIcon} from '@sanity/icons'

interface StaticPageUrlInputProps {
  pageUrl: string
  pageName: string
}

export function createStaticPageUrlInput(pageUrl: string, pageName: string) {
  return function StaticPageUrlInput() {
    const fullUrl = `https://kathgodamtaxi.com${pageUrl}` // Update domain as needed

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
          <strong style={{color: '#0c4a6e', fontSize: '12px'}}>
            {pageName} URL:
          </strong>
        </div>
        <a
          href={fullUrl}
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
          {fullUrl}
        </a>
        <div style={{fontSize: '11px', color: '#64748b', marginTop: '6px'}}>
          👆 Click to open in new tab
        </div>
        <div style={{
          fontSize: '11px',
          color: '#64748b',
          marginTop: '6px',
          fontStyle: 'italic',
          borderTop: '1px solid #bae6fd',
          paddingTop: '6px'
        }}>
          💡 To change this URL, rename the file: <code style={{
            backgroundColor: '#f1f5f9',
            padding: '2px 4px',
            borderRadius: '3px',
            fontSize: '10px'
          }}>src/pages{pageUrl === '/' ? '/index' : pageUrl}.astro</code>
        </div>
      </div>
    )
  }
}
