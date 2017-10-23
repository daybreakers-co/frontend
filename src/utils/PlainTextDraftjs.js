export function draftToPlainText (rawDraftObject) {
  return rawDraftObject.blocks.map((block) => block.text).join("\n\n")
}

export function plainTextToDraft(string) {
  var entityMap = {}
  var blocks = []

  string.split(/\n\n/).forEach((text) => {
    blocks.push({
      type: 'unstyled',
      text: text
    })
  })

  return {
    entityMap,
    blocks
  };
}
