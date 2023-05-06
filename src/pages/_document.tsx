import Document, { Html, Head, Main, NextScript } from "next/document"

export class MainDocuemnt extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
          <div id="modalPortal"></div>
        </body>
      </Html>
    )
  }
}

export default MainDocuemnt
