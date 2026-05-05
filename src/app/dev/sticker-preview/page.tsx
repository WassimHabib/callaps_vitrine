import { StickerPreviewClient } from "./client";

export const metadata = {
  title: "Sticker Preview (dev only)",
  robots: { index: false, follow: false },
};

export default function StickerPreviewPage() {
  return <StickerPreviewClient />;
}
