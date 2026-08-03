import { useRef, useState } from "react";
import { Upload } from "lucide-react";

function UploadSection() {

  const fileInputRef = useRef(null);

  const [fileName, setFileName] = useState("");

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {

    const file = event.target.files[0];

    if(file){

      setFileName(file.name);

    }

  };

  return (

    <section className="py-24 bg-white">

      <div className="max-w-3xl mx-auto">

        <h2 className="text-4xl font-bold text-center">

          Upload Resume

        </h2>

        <p className="text-center text-gray-600 mt-4">

          Upload your resume and let AI analyze it.

        </p>

        <div

          onClick={handleClick}

          className="mt-10 border-2 border-dashed border-blue-500 rounded-2xl p-16 text-center cursor-pointer hover:bg-blue-50 transition"

        >

          <Upload
            size={60}
            className="mx-auto text-blue-600"
          />

          <h3 className="text-2xl font-semibold mt-6">

            Drag & Drop Resume Here

          </h3>

          <p className="text-gray-500 mt-2">

            or click anywhere to browse

          </p>

          <p className="mt-6 font-medium text-blue-600">

            {fileName || "No file selected"}

          </p>

          <input

            type="file"

            accept=".pdf"

            ref={fileInputRef}

            onChange={handleFileChange}

            className="hidden"

          />

        </div>

        <div className="text-center mt-8">

          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition">

            Analyze Resume

          </button>

        </div>

      </div>

    </section>

  );

}

export default UploadSection;