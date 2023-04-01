import React, { useState } from "react";
import FileUpload from "react-mui-fileuploader";
import axios from "axios";

const url = "http://localhost:11000/uploadImages";

const UploadImg: React.FC = () => {
  const [filesToUpload, setfilesToUpload] = useState<File[]>();
  const [name, setname] = useState<string>("");

  const handleFilesChange = (files: File[]) => {
    setfilesToUpload([...files]);
  };

  const handleFileUPloadError = () => {
    alert("Error");
  };
  const handleUpload = async () => {
    const forms = new FormData();

    filesToUpload?.forEach((file) => {
      forms.append("image", file),
        forms.append("imageSize", file.size.toString());
    });
    forms.append("name", name);

    await axios
      .post(url, forms, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(function (response) {
        if (response.data.send === "Success") {
          alert("Success");
          window.location.reload();
        }
      });
  };
  return (
    <div className="min-h-screen">
      <div className="py-3 flex flex-col gap-2">
        <h1 className="text-2xl font-bold">Upload Images</h1>
        <hr className="w-1/3 h-2 border-1 border-black" />
      </div>
      <div className="w-1/2 border border-gray-400 px-2 py-5 h-96">
        <div className="flex flex-row  gap-5 items-center justify-start py-2">
          <p className="text-base">Name: </p>
          <input
            className="border border-gray-400 py-1 rounded-md"
            type="text"
            value={name}
            onChange={(e) => setname(e.target.value)}
          />
        </div>
        <FileUpload
          getBase64={false}
          multiFile={true}
          disabled={false}
          title="Upload Images"
          header="Upload Images"
          leftLabel="or"
          rightLabel=""
          buttonLabel="click here"
          buttonRemoveLabel="Remove all"
          maxFileSize={10}
          maxUploadFiles={10}
          maxFilesContainerHeight={357}
          acceptedType={"image/*"}
          errorSizeMessage={
            "fill it or remove it to use the default error message"
          }
          allowedExtensions={["jpg", "jpeg", "png", "webp", "gif", "svg"]}
          onFilesChange={handleFilesChange}
          onError={handleFileUPloadError}
          imageSrc=""
          BannerProps={{ elevation: 5, variant: "outlined" }}
          showPlaceholderImage={true}
          PlaceholderGridProps={{ md: 4, lg: 2 }}
          LabelsGridProps={{ md: 8 }}
          ContainerProps={{
            elevation: 0,
            variant: "outlined",
            sx: { p: 1 },
          }}
          PlaceholderImageDimension={{
            xs: { width: 128, height: 128 },
            sm: { width: 128, height: 128 },
            md: { width: 164, height: 164 },
            lg: { width: 200, height: 200 },
          }}
        />
        <div className="px-2">
          <button
            onClick={handleUpload}
            className="py-2 px-4 bg-blue-400 hover:bg-blue-500 text-white rounded-lg"
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadImg;
