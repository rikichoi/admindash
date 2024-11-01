import { Organisation } from "@/lib/types";
import {
  CreateOrganisationSchema,
  EditOrganisationSchema,
} from "@/lib/validation";
import { X } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { ControllerRenderProps } from "react-hook-form";

type ImageDropzoneProps = {
  newImageField?: ControllerRenderProps<EditOrganisationSchema, "newImages">;
  previousImageField?: ControllerRenderProps<
    EditOrganisationSchema,
    "previousImages"
  >;
  field?: ControllerRenderProps<CreateOrganisationSchema, "image">;
  selectedOrgId?: string;
  selectedOrg?: Organisation;
};

export default function ImageDropzone({
  newImageField,
  previousImageField,
  field,
  selectedOrgId,
  selectedOrg,
}: ImageDropzoneProps) {
  // const onDrop = useCallback((acceptedFiles: FileList) => {
  //   // Do something with the files
  // }, []);
  const [previousImages, setPreviousImages] = useState<(string | undefined)[]>(
    []
  );
  const [files, setFiles] = useState<(File & { preview: string })[]>([]);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setFiles((previousFiles) => [
        ...previousFiles,
        ...acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        ),
      ]);
    },
  });
  useEffect(() => {
    if (previousImageField) {
      if (
        previousImageField.value.length == 1 ||
        previousImageField.value.some((image) => previousImages.includes(image))
      ) {
        return;
      } else {
        setPreviousImages(previousImageField.value);
      }
    }
  }, [previousImageField]);

  useEffect(() => {
    if (previousImageField && previousImages !== previousImageField.value)
      previousImageField?.onChange(previousImages);
  }, [previousImages]);

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    // field.onChange(files);
    field?.onChange(files);
    newImageField?.onChange(files);
    return () =>
      files.forEach((file) => {
        if (typeof file !== "string") {
          URL.revokeObjectURL(file.preview);
        }
      });
  }, [files]);

  function removeFile(index: number) {
    setFiles((files) => files.filter((file) => file !== files[index]));
  }

  // async function removePreviousFiles(index: number) {
  //   await removePreviousFile(index);
  //   previousImageField?.onChange(previousImages);
  // }

  function removePreviousFile(index: number) {
    setPreviousImages((previousFiles) =>
      previousFiles.filter((prevfile) => prevfile !== previousImages[index])
    );
    previousImageField?.onChange(previousImages);
  }

  return (
    <section className={files.length ? "mb-10" : ""}>
      {(newImageField || field) && (
        <div
          {...getRootProps({
            className:
              "border-dashed border-2 border-gray-400 hover:cursor-pointer p-5 text-gray-700",
          })}
        >
          <input {...getInputProps()} />
          <p>
            Drag &apos;n&apos; drop some files here, or click to select files{" "}
          </p>
        </div>
      )}
      {files.length > 0 && (
        <h3 className="title text-lg font-semibold text-neutral-600 mt-10 border-b pb-3">
          Accepted Image(s)
        </h3>
      )}

      <ul className="mt-6 flex flex-wrap gap-6 gap-y-12">
        {files.map((file, index) => (
          <li key={index} className="relative h-32 w-24 rounded-md shadow-lg">
            <Image
              src={file.preview}
              alt={file.name}
              width={100}
              height={100}
              onLoad={() => {
                URL.revokeObjectURL(file.preview);
              }}
              className="h-full w-full object-contain rounded-md"
            />
            <button
              type="button"
              className="w-7 h-7 border border-red-400 bg-red-400 rounded-full flex justify-center items-center absolute -top-3 -right-3 hover:bg-white transition-colors"
              onClick={() => removeFile(index)}
            >
              <X className="w-5 h-5 text-white hover:text-red-400 transition-colors" />
            </button>
            {typeof file !== "string" && (
              <p className="mt-2 truncate text-ellipsis text-neutral-500 text-[12px] font-medium">
                {file.name}
              </p>
            )}
          </li>
        ))}

        {previousImages &&
          previousImages.map((file, index) => (
            <li key={index} className="relative h-32 w-24 rounded-md shadow-lg">
              {/* <Image
                src={file.preview}
                alt={file.name}
                width={100}
                height={100}
                onLoad={() => {
                  URL.revokeObjectURL(file.preview);
                }}
                className="h-full w-full object-contain rounded-md"
              /> */}
              <button
                type="button"
                className="w-7 h-7 border border-red-400 bg-red-400 rounded-full flex justify-center items-center absolute -top-3 -right-3 hover:bg-white transition-colors"
                onClick={() => removePreviousFile(index)}
              >
                <X className="w-5 h-5 text-white hover:text-red-400 transition-colors" />
              </button>
              <p className="mt-2 truncate text-ellipsis text-neutral-500 text-[12px] font-medium">
                {file}
              </p>
            </li>
          ))}
      </ul>
    </section>
  );
}
