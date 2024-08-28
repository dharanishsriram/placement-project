import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-weight: 400;
    }

        html, body, #root {
        min-height: 100vh;
    }

    body {
        font-family: 'Inter', sans-serif;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 1.5em;
        background-color: #f0f0f0;
        overflow-x: hidden;
    }
    h1{
        font-size: 2.5em;
        font-weight: 600;
        line-height: 120%;
    }
    h2{
        font-size: 2em;
        font-weight: 500;
        line-height: 120%;
    }
    h3{
        font-size: 1.75em;
        font-weight: 600;
        line-height: 120%;
        text-align: left;
        color: #6A459C;
    }
    p{
        font-size: 1.125em;
        text-align: left;
        line-height: 120%;
        b{
            font-weight: 600;
        }
        u{
            cursor: pointer;
        }
    }
    p.error-message{
        color: rgb(255, 72, 72);
        font-size: 0.75rem;
        margin-top: -0.5em;
        margin-bottom: 1em;
        width: 100%;
        text-align: left;
    }

    img{
        max-width: 100vw;
    }
    button{
        background-color: #6A459C;
        color: #f0f0f0;
        min-width: 13em;
        font-size: 1.5em;
        font-weight: 500;
        padding: 0.5em;
        border: 0.125em solid #8560B7;
        border-radius: 0.25em;
        cursor: pointer;
    }

        form{
            display: flex;
            flex-direction: column;
            align-items: center;

            label{
                width: 100%;
                text-align: left;
                padding-bottom: 0.5em;
                font-size: 1.25em;
            }

            input{
                width: 100%;
                padding: 0.75em 0.5em;
                border: 1px solid #ccc;
                border-radius: 0.25em;
                font-size: 1em;
                margin-bottom: 1em;
            }
            input.input-error {
                outline: 0.125em solid rgb(255, 72, 72);
            }

            textarea{
                width: 100%;
                padding: 0.75em 0.5em;
                border: 1px solid #ccc;
                border-radius: 0.25em;
                font-size: 1em;
                margin-bottom: 1em;
            }
            textarea.input-error {
                outline: 0.125em solid rgb(255, 72, 72);
            }

            select{
                background-color: #fff;
                width: 100%;
                padding: 0.75em 0.5em;
                border: 1px solid #ccc;
                border-radius: 0.25em;
                font-size: 1em;
                margin-bottom: 1em;
            }
            select.input-error {
                outline: 0.125em solid rgb(255, 72, 72);
            }

            button{
                width: 100%;
            }
        }
`

export default GlobalStyle;