import { useState } from "react";

interface ImageWithFallbackProps {
  src: string;
  fallbackSrc: string;
  alt: string;
}

const ImageWithFallback = ({
  src,
  fallbackSrc,
  alt,
  ...props
}: ImageWithFallbackProps) => {
  const [imageSrc, setImageSrc] = useState(src);

  const onError = () => {
    setImageSrc(fallbackSrc);
  };

  if (!src) return <img src={fallbackSrc} alt={alt} {...props} />;

  return <img src={imageSrc} onError={onError} alt={alt} {...props} />;
};

export default ImageWithFallback;
