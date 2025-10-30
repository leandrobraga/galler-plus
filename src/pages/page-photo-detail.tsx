import { useParams } from "react-router";
import Text from "../components/text";

export default function PagePhotoDetail() {
  const { id } = useParams();
  return (
    <>
      <Text variant="heading-medium">Página detalhe da foto</Text>
      <br />
      <Text variant="heading-medium">ID: {id}</Text>
    </>
  );
}
