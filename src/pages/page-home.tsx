import Container from "../components/container";
import AlbumsFilter from "../contexts/albums/components/albums-filter";
import PhotoList from "../contexts/photos/components/photo-list";

export default function PageHome() {
  return (
    <Container>
      <AlbumsFilter
        albums={[
          { id: "1", title: "Album 1" },
          { id: "2", title: "Album 2" },
        ]}
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
