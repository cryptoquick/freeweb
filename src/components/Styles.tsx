import * as React from 'react'
import styled, { createGlobalStyle, css } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  html, body {
    display: flex;
    background-color: black;
    font-family: monospace;
    font-weight: bold;
    font-size: 16px;
    color: white;
    padding: 0;
    margin: 0;
  }

  * {
    box-sizing: content-box;
  }
`
