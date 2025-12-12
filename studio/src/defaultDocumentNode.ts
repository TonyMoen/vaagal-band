import { type DefaultDocumentNodeResolver } from 'sanity/structure'
import { Iframe, type IframeOptions } from 'sanity-plugin-iframe-pane'

// Configure the frontend URL
// In production, this should be the deployed site URL
const FRONTEND_URL = 'http://localhost:5175'

// URL resolver for different document types
const getPreviewUrl = (schemaType: string): string => {
  switch (schemaType) {
    case 'hero':
      return FRONTEND_URL // Homepage
    case 'bandMember':
      return `${FRONTEND_URL}/bandet` // Band page
    default:
      return FRONTEND_URL
  }
}

export const defaultDocumentNode: DefaultDocumentNodeResolver = (S, { schemaType }) => {
  // Only add preview pane for content types that have frontend display
  if (schemaType === 'hero' || schemaType === 'bandMember') {
    return S.document().views([
      S.view.form(),
      S.view
        .component(Iframe)
        .options({
          url: getPreviewUrl(schemaType),
          defaultSize: 'desktop',
          reload: {
            button: true, // Show manual reload button
          },
        } satisfies IframeOptions)
        .title('Preview'),
    ])
  }

  // Default: just the form view
  return S.document().views([S.view.form()])
}
