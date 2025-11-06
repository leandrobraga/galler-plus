import cx from "classnames";
import Button from "../../../components/button";
import Skeleton from "../../../components/skeleton";
import Text from "../../../components/text";
import type { Album } from "../models/album";
import usePhotos from "../../photos/hooks/use-photos";

interface AlbumFilterProps extends React.ComponentProps<"div"> {
  albums: Album[];
  loading?: boolean;
}
export default function AlbumsFilter({
  albums,
  loading,
  className,
}: AlbumFilterProps) {
  const { filters } = usePhotos();
  return (
    <div className={cx("flex items-center gap-3.5 overflow-x-auto", className)}>
      <Text variant="heading-small">Álbuns</Text>
      <div className="flex gap-3">
        {!loading ? (
          <>
            <Button
              variant={filters.albumId === null ? "primary" : "ghost"}
              size="sm"
              className="cursor-pointer"
              onClick={() => filters.setAlbumId(null)}
            >
              Todos
            </Button>
            {albums.map((album) => (
              <Button
                key={album.id}
                variant={filters.albumId === album.id ? "primary" : "ghost"}
                size="sm"
                className="cursor-pointer"
                onClick={() => filters.setAlbumId(album.id)}
              >
                {album.title}
              </Button>
            ))}
          </>
        ) : (
          [0, 1, 2, 3, 4, 5].map((current) => (
            <Skeleton key={current} className="w-28 h-7" />
          ))
        )}
      </div>
    </div>
  );
}
