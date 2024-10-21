export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <link
      rel="preload"
      href="/fonts/Abaddon Light.woff2"
      as="font"
      type="font/woff2"
      crossOrigin="anonymous"
      key="Abaddon Light"
    />,
  ])
}
