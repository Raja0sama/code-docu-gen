import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MarkdownPreview from "@uiw/react-markdown-preview";

function MarkdownItem() {
  const { id } = useParams();

  const [content, setContent] = useState("");
  const [togglePreview, setTogglePreview] = useState(true);
  useEffect(() => {
    console.log({ id });
    fetch(`/markdowns/${id}`, {})
      .then((e) => e.text().then(setContent))
      .catch(console.log);
  }, []);

  const saveContent = () => {
    fetch("http://localhost:8000/update-file", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pathname: `/markdowns/${id}`,
        content,
      }),
    })
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="flex flex-col w-full h-fit min-h-[80vh] bg-[#0000000d] p-4">
      <div className="flex mb-4 justify-between">
        <div className="flex">
          <div
            onClick={() => setTogglePreview(false)}
            className="p-2 cursor-pointer bg-black text-white rounded-lg mx-2"
          >
            Edit
          </div>
          <div
            onClick={() => setTogglePreview(true)}
            className="p-2 cursor-pointer bg-black text-white rounded-lg mx-2"
          >
            Preview
          </div>
        </div>
        <div
          onClick={saveContent}
          className="p-2 cursor-pointer bg-red-800 text-white rounded-lg mx-2"
        >
          Save
        </div>
      </div>
      <div className="flex flex-1">
        {!togglePreview && (
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="h-full border p-2 w-full h-auto"
          ></textarea>
        )}
        {togglePreview && (
          <MarkdownPreview
            source={content}
            style={{ background: "transparent", height: "" }}
            className={"mix-blend-difference"}
          />
        )}
      </div>
    </div>
  );
}

export default MarkdownItem;
