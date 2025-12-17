import GalleryUpload from "@/components/file-upload/gallery-upload";
import FormButton from "@/components/global/FormButton";
import FormInput from "@/components/global/FormInput";
import FormLabel from "@/components/global/FormLabel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

interface ZoneDialogProps {
  dialogOpen: boolean;
  setDialogOpen: (open: boolean) => void;
  onSaveZone: (newZoneData: any, zoneName?: string) => void;
  isEditing: boolean;
  initialZoneData?: any;
  handleOpenNewZone?: () => void;
}

const ZoneDialog = ({
  dialogOpen,
  setDialogOpen,
  onSaveZone,
  isEditing,
  initialZoneData,
  handleOpenNewZone,
}: ZoneDialogProps) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = useForm();

  useEffect(() => {
    if (initialZoneData) {
      reset({
        id: initialZoneData.id,
        name: initialZoneData.name,
        capacity: initialZoneData.capacity,
        images: initialZoneData.images,
      });
    } else {
      reset({
        id: Math.random().toString(36).substr(2, 9),
        name: "",
        capacity: "",
        images: [],
      });
    }
  }, [initialZoneData, isEditing, reset]);

  const handleLocalSubmit = (data: any) => {
    onSaveZone(data);
    setDialogOpen(false);
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Plus
          size={19}
          className="cursor-pointer ms-3.5 text-gray-600 hover:text-gray-900"
          onClick={handleOpenNewZone}
        />
      </DialogTrigger>
      <DialogContent className="sm:max-w-5xl max-h-[95vh] overflow-y-auto">
        <DialogTitle className="mb-5">
          {isEditing ? "Edit Zone" : "Add New Zone"}
        </DialogTitle>
        <DialogDescription asChild>
          <div>
            <div className="mb-5">
              <Controller
                name="images"
                control={control}
                render={({ field: { onChange }, fieldState: { error } }) => (
                  <>
                    <GalleryUpload
                      maxFiles={10}
                      maxSize={2 * 1024 * 1024}
                      onFilesChange={(files) => {
                        const fileObjects = files
                          .map((f) => f.file)
                          .filter((file): file is File => file instanceof File);
                        onChange(fileObjects);
                      }}
                    />
                    {error && (
                      <p className="text-red-500 text-sm">{error.message}</p>
                    )}
                  </>
                )}
              />
            </div>
            <div className="flex items-center gap-4">
              <div className="w-1/2">
                <FormLabel htmlFor="zone-name">Name</FormLabel>
                <FormInput
                  id="zone-name"
                  placeholder="Enter zone name"
                  {...register("name")}
                />
              </div>
              <div className="w-1/2">
                <FormLabel htmlFor="zone-capacity">Capacity</FormLabel>
                <FormInput
                  id="zone-capacity"
                  placeholder="Enter zone capacity"
                  {...register("capacity")}
                />
              </div>
            </div>

            <div className="flex justify-end mt-5">
              <FormButton
                onClick={handleSubmit(handleLocalSubmit)}
                disabled={isSubmitting}
              >
                {isEditing ? "Update" : "Save"}
              </FormButton>
            </div>
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default ZoneDialog;
