import cx from "classnames";
import Button from "../../../components/button";
import Text from "../../../components/text";
import type { Album } from "../models/album";
import Skeleton from "../../../components/skeleton";

interface AlbumFilterProps extends React.ComponentProps<"div"> {
  albums: Album[];
  loading?: boolean;
}
export default function AlbumsFilter({
  albums,
  loading,
  className,
}: AlbumFilterProps) {
  return (
    <div className={cx("flex items-center gap-3.5 overflow-x-auto", className)}>
      <Text variant="heading-small">Álbuns</Text>
      <div className="flex gap-3">
        {!loading ? (
          <>
            <Button variant="primary" size="sm" className="cursor-pointer">
              Todos
            </Button>
            {albums.map((album) => (
              <Button
                key={album.id}
                variant="ghost"
                size="sm"
                className="cursor-pointer"
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
