import NoImg from "@/assets/No_image_available.png";

export const getImageUrl = (src?: string): string => {
  var image = src ? process.env.NEXT_PUBLIC_BASE_URL + src : "";
  return image;
};
