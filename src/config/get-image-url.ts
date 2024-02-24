import NoImg from "@/assets/No_image_available.png";
export const getImageUrl =  (src?: string): string => {
  return src ? process.env.NEXT_PUBLIC_BASE_URL + src : NoImg
}