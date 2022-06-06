import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    setTimeout(() => {

    }, 10);
    return (
        <Html>
            <Head >

                <link rel="preconnect" href="<https://app.snipcart.com>" />
                <link rel="preconnect" href="<https://cdn.snipcart.com>" />
                <link rel="stylesheet"
                    href="https://cdn.snipcart.com/themes/v3.0.24/default/snipcart.css"
                />


            </Head>
            <body>
                <Main />

                <NextScript />
                    <script src="https://cdn.snipcart.com/themes/v3.3.1/default/snipcart.js"></script>
                    <div
                    data-config-modal-style="side"
                     hidden id="snipcart" data-api-key="ODYzODRkMzctNjhiMy00OTVlLThlOTAtMDFhZGM1NWJkZDYyNjM3OTAwMjkyMDIzNDA2NTEz"></div>
         
            </body>


        </Html>
    )
}