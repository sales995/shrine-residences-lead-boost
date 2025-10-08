import { useState } from "react";

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  width?: number;
  height?: number;
  objectFit?: "cover" | "contain" | "fill";
}

export const OptimizedImage = ({ 
  src, 
  alt, 
  className = "", 
  priority = false,
  width,
  height,
  objectFit = "cover"
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Generate WebP version path (for future implementation)
  const webpSrc = src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  const hasSupportedFormat = /\.(jpg|jpeg|png)$/i.test(src);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Blur placeholder */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-muted animate-pulse" />
      )}
      
      {/* Use picture element for WebP support with fallback */}
      <picture>
        {hasSupportedFormat && (
          <source 
            srcSet={webpSrc} 
            type="image/webp"
          />
        )}
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? "eager" : "lazy"}
          decoding={priority ? "sync" : "async"}
          fetchPriority={priority ? "high" : "auto"}
          onLoad={() => setIsLoaded(true)}
          className={`w-full h-full transition-opacity duration-300 ${
            isLoaded ? "opacity-100" : "opacity-0"
          } ${objectFit === "cover" ? "object-cover" : objectFit === "contain" ? "object-contain" : "object-fill"}`}
          style={{
            width: width ? `${width}px` : '100%',
            height: height ? `${height}px` : '100%',
          }}
        />
      </picture>
    </div>
  );
};
