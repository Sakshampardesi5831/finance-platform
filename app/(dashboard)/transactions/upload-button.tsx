import React from "react";
import { Upload } from "lucide-react";
import { useCSVReader } from "react-papaparse";
import { Button } from "@/components/ui/button";

const INITIAL_IMPORT_RESULTS = {
  data: [],
  errors: [],
  meta: {},
};

type Props = {
  onUpload: (results: typeof INITIAL_IMPORT_RESULTS) => void;
};

const UploadButton = ({ onUpload }: Props) => {
  const { CSVReader } = useCSVReader();

  // TODO: Add a Paywall

  return (
    <CSVReader onUploadAccepted={onUpload}>
      {({
        getRootProps,
      }: {
        getRootProps: () => React.HTMLAttributes<HTMLElement>;
      }) => (
        <Button size="sm" className="w-full lg:w-auto " {...getRootProps()}>
          <Upload className="size-4 mr-2" />
          Import
        </Button>
      )}
    </CSVReader>
  );
};

export default UploadButton;
