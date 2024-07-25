import ImageGallery from "react-image-gallery";

const defaultImage = [
  {
    original: "https://picsum.photos/id/1018/1000/600/",
    thumbnail: "https://picsum.photos/id/1018/250/150/"
  },
  {
    original: "https://picsum.photos/id/1015/1000/600/",
    thumbnail: "https://picsum.photos/id/1015/250/150/"
  },
  {
    original: "https://picsum.photos/id/1019/1000/600/",
    thumbnail: "https://picsum.photos/id/1019/250/150/"
  }
];

export const MyGallery = ({ image = defaultImage }) => {
  let format = image.map((item) => ({
    original: item.image,
    thumbnail: item.image
  }));
  return <ImageGallery items={format} />;
};
