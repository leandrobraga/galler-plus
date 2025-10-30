import type { Photo } from "../models/photo";
import PhotoWidget from "./photo-widget";
import Text from "../../../components/text";
import Skeleton from "../../../components/skeleton";

interface PhotoListProps {
  photos: Photo[];
  loading?: boolean;
}

export default function PhotoList({ photos, loading }: PhotoListProps) {
  return (
    <div>
      <Text
        as="div"
        variant="paragraph-large"
        className="flex items-center justify-end gap-1 text-accent-span"
      >
        Total:{" "}
        {!loading ? (
          <div>{photos.length}</div>
        ) : (
          <Skeleton className="w-6 h-6" />
        )}
      </Text>
      {!loading && photos?.length > 0 && (
        <div className="grid grid-cols-5 gap-9">
          {photos.map((photo) => (
            <PhotoWidget photo={photo} key={photo.id} />
          ))}
        </div>
      )}

      {loading && (
        <div className="grid grid-cols-5 gap-9">
          {[].map((current) => (
            <PhotoWidget photo={{} as Photo} loading key={current} />
          ))}
        </div>
      )}

      {!loading && photos.length === 0 && (
        <div className="flex justify-center items-center h-full">
          <Text variant="paragraph-large">Nenhuma foto encontrada</Text>
        </div>
      )}
    </div>
  );
}
