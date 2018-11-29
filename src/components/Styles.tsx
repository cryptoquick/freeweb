import * as React from 'react'
import styled, { css, createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  html, body {
    display: flex;
    background-color: black;
    font-family: 'Open Sans', sans-serif;
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
