import Container from "../components/container";
import AlbumsFilter from "../contexts/albums/components/albums-filter";
import useAlbums from "../contexts/albums/hooks/use-albums";
import PhotoList from "../contexts/photos/components/photo-list";

export default function PageHome() {
  const { albums, isLoadingAlbums } = useAlbums();
  return (
    <Container>
      <AlbumsFilter
        albums={albums}
        loading={isLoadingAlbums}
        className="mb-9"
      />
      <PhotoList
        photos={[
          {
            id: "1",
            title: "Album 1",
            imageId: "portrait-shadow.png",
            albums: [
              { id: "1", title: "Album 1" },
              { id: "2", title: "Album 2" },
              { id: "3", title: "Album 3" },
            ],
          },
        ]}
      />
    </Container>
  );
}
