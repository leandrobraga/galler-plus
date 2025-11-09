import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import SelectCheckboxIllustration from "../../../assets/images/select-checkbox.svg?react";
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
import InputText from "../../../components/input-text";
import Skeleton from "../../../components/skeleton";
import Text from "../../../components/text";
import PhotoImageSelectable from "../../photos/components/photo-image-selectable";
import usePhotos from "../../photos/hooks/use-photos";
import { albumNewFormSchema, type AlbumNewFormSchema } from "../schemas";
import useAlbum from "../hooks/use-album";

interface AlbumNewDialogProps {
  trigger: React.ReactNode;
}

export default function AlbumNewDialog({ trigger }: AlbumNewDialogProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const form = useForm<AlbumNewFormSchema>({
    resolver: zodResolver(albumNewFormSchema),
  });
  const { photos, isLoadingPhotos } = usePhotos();
  const { createAlbum } = useAlbum();
  const [isCreatingAlbum, setIsCreatingAlbum] = useTransition();

  useEffect(() => {
    if (!modalOpen) {
      form.reset();
    }
  }, [modalOpen, form]);

  function handleTogglePhoto(selected: boolean, photoId: string) {
    const photosIds = form.getValues("photosIds") || [];
    let newValue = [];

    if (selected) {
      newValue = [...photosIds, photoId];
    } else {
      newValue = photosIds.filter((id) => id !== photoId);
    }

    form.setValue("photosIds", newValue);
  }

  function handleSubmit(payload: AlbumNewFormSchema) {
    setIsCreatingAlbum(async () => {
      await createAlbum(payload);
      setModalOpen(false);
    });
  }
  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent aria-describedby={undefined}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <DialogHeader>Criar álbum</DialogHeader>
          <DialogBody className="flex flex-col gap-5">
            <InputText
              placeholder="Adicione um título"
              error={form.formState.errors.title?.message}
              {...form.register("title")}
            />
            <div className="space-y-3">
              <Text as="div" variant="label-small" className="mb-3">
                Fotos cadastradas
              </Text>

              {!isLoadingPhotos && photos.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {photos.map((photo) => (
                    <PhotoImageSelectable
                      key={photo.id}
                      src={`${import.meta.env.VITE_IMAGES_URL}/${photo.imageId}`}
                      title={photo.title}
                      imageClassName="w-20 h-20 rounded"
                      onSelectImage={(selected) =>
                        handleTogglePhoto(selected, photo.id)
                      }
                    />
                  ))}
                </div>
              )}

              {isLoadingPhotos && (
                <div className="flex flex-wrap gap-2">
                  {[0, 1, 2, 3].map((current) => (
                    <Skeleton
                      key={`photo-loading-${current}`}
                      className="w-20 h-20 rounded"
                    />
                  ))}
                </div>
              )}

              {!isLoadingPhotos && photos.length === 0 && (
                <div className="w-full flex flex-col justify-center items-center gap-3">
                  <SelectCheckboxIllustration />
                  <Text variant="paragraph-medium" className="text-center">
                    Nenhuma foto disponível para seleção
                  </Text>
                </div>
              )}
            </div>
          </DialogBody>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="secondary" disabled={isCreatingAlbum}>
                Cancelar
              </Button>
            </DialogClose>
            <Button
              type="submit"
              handling={isCreatingAlbum}
              disabled={isCreatingAlbum}
            >
              {isCreatingAlbum ? "Criando..." : "Criar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
