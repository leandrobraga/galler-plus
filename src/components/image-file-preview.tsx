import { tv } from "tailwind-variants";

export const imageFilePreviewVariants = tv({
  base: `
   roundend-lg overflow-hidden
  `,
});

export const imageFilePreviewImageVariants = tv({
  base: `
  w-full h-full object-center
  `,
});

interface ImageFilePreviewProps extends React.ComponentProps<"img"> {
  imageClassName?: string;
}

export default function ImageFilePreview({
  className,
  imageClassName,
  ...props
}: ImageFilePreviewProps) {
  return (
    <div className={imageFilePreviewVariants({ className })}>
      <img
        className={imageFilePreviewImageVariants({ className: imageClassName })}
        alt=""
        {...props}
      />
    </div>
  );
}
