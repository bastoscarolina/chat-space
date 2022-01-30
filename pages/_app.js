//qnd vc quer confirgurar algo para todas as paginas, coloca nesse arquivo
//o nome _app.js é o padrão do next para que esse arquivo funcione
import Head from "next/head";
function GlobalStyle(){
    return (
        <style global jsx>{`
            * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            list-style: none;
            }
            body {
                font-family: 'Open Sans', sans-serif;
            }
            /* App fit Height */ 
            html, body, #__next {
                min-height: 100vh;
                display: flex;
                flex: 1;
            }
            #__next {
                flex: 1;
            }
            #__next > * {
                flex: 1;
            }
            /* ./App fit Height */ 
        `}</style>
    )
}

export default function MyApp({Component, pageProps}){
    return (
        <>
            <GlobalStyle/>
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
                <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;1,100&display=swap" rel="stylesheet" />
            </Head>
            <Component {...pageProps}/>
        </>
    )
}
