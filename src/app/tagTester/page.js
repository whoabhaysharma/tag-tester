import React from 'react'

export const tagType = {
  ONE_CROSS_ONE: "ONE_CROSS_ONE",
  IFRAME: "IFRAME",
  NORMAL: "NORMAL"
}

function TagTester({ searchParams }) {
  const tag = searchParams.tag || ""
  const type = searchParams.type || tagType.NORMAL
  const height = searchParams.h || 250
  const width = searchParams.w || 300

  console.log(tag, 'TAGGGGG')

  const iframeContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <script src="${tag}"></script>
</body>
</html>`
  
  return (
    <>
      {type === tagType.NORMAL && <script src={tag}></script>}
      {type === tagType.IFRAME && (
        <iframe
          srcDoc={iframeContent}
          height={height + "px"}
          width={width + "px"}
          scrolling="no"
          frameBorder={"no"}
        >

        </iframe>
      )}
      {type === tagType.ONE_CROSS_ONE && (
        <iframe
          srcDoc={iframeContent}
          height={"1px"}
          width={"1px"}
        >

        </iframe>
      )}
    </>
  )
}

export default TagTester