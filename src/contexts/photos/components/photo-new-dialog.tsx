import { useForm } from "react-hook-form";
import Alert from "../../../components/alert";
import Button from "../../../components/button";
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "../../../components/dialog";
import ImageFilePreview from "../../../components/image-file-preview";
import InputSingleFile from "../../../components/input-single-file";
import InputText from "../../../components/input-text";
import Skeleton from "../../../components/skeleton";
import Text from "../../../components/text";
import useAlbums from "../../albums/hooks/use-albums";
import { photoNewFormSchema, type PhotoNewFormSchema } from "../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState, useTransition } from "react";
import { usePhoto } from "../hooks/use-photo";

interface PhotoNewDialogProps {
  trigger: React.ReactNode;
}

export default function PhotoNewDialog({ trigger }: PhotoNewDialogProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const { albums, isLoadingAlbums } = useAlbums();
  const { createPhoto } = usePhoto();
  const [isCreatingPhoto, setIsCreatingPhoto] = useTransition();
  const form = useForm<PhotoNewFormSchema>({
    resolver: zodResolver(photoNewFormSchema),
  });
  const file = form.watch("file");
  const fileSource = file?.[0] ? URL.createObjectURL(file[0]) : undefined;

  const albumsIds = form.watch("albumsIds");

  useEffect(() => {
    if (!modalOpen) {
      form.reset();
    }
  }, [modalOpen, form]);

  function handleToggleAlbum(albumId: string) {
    const albumsIds = form.getValues("albumsIds") || [];
    const albumsSet = new Set(albumsIds);

    if (albumsSet.has(albumId)) {
      albumsSet.delete(albumId);
    } else {
      albumsSet.add(albumId);
    }

    form.setValue("albumsIds", Array.from(albumsSet));
  }

  function handleSubmit(payload: PhotoNewFormSchema) {
    setIsCreatingPhoto(async () => {
      await createPhoto(payload);
      setModalOpen(false);
    });
  }

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent aria-describedby={undefined}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <DialogHeader>Adicionar Foto</DialogHeader>
          <DialogBody className="flex flex-col gap-5">
            <InputText
              placeholder="Adicione um título"
              maxLength={255}
              error={form.formState.errors.title?.message}
              {...form.register("title")}
            />
            <Alert>
              Tamanho máximo: 50MB
              <br />
              Você pode selecinar arquivo em PNG, JPG ou JPEG
            </Alert>
            <InputSingleFile
              form={form}
              allowedExtensions={["png", "jpg", "jpeg"]}
              maxFileSizeInMB={50}
              replaceBy={
                <ImageFilePreview className="w-full h-56" src={fileSource} />
              }
              error={form.formState.errors.file?.message}
              {...form.register("file")}
            />
            <div className="space-y-3">
              <Text variant="label-small">Selecionar albums</Text>
              <div className="flex flex-wrap gap-3">
                {!isLoadingAlbums &&
                  albums.length > 0 &&
                  albums.map((album) => (
                    <Button
                      key={album.id}
                      variant={
                        albumsIds?.includes(album.id) ? "primary" : "ghost"
                      }
                      size="sm"
                      className="truncate"
                      onClick={() => handleToggleAlbum(album.id)}
                    >
                      {album.title}
                    </Button>
                  ))}
              </div>
              {isLoadingAlbums &&
                [0, 1, 2, 3, 4].map((current) => (
                  <Skeleton key={current} className="w-20 h-7" />
                ))}
            </div>
          </DialogBody>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="secondary" disabled={isCreatingPhoto}>
                Cancelar
              </Button>
            </DialogClose>
            <Button
              disabled={isCreatingPhoto}
              handling={isCreatingPhoto}
              type="submit"
            >
              {isCreatingPhoto ? "Adicionando..." : "Adicionar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
