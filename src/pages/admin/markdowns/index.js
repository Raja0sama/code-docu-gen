import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

export default function Markdowns() {
  const [data, setdata] = useState();
  const [input, setinput] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/markdowns/")
      .then(async (e) => {
        const data = await e.json();
        setdata(data);
      })
      .catch(console.log);
  }, []);

  const deleteMarkdown = (path) => {
    fetch("http://localhost:8000/delete-file", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        filePath: "public/" + path.replace("markdown", "markdowns"),
      }),
    })
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="flex flex-col w-full">
      <h1 className="text-2xl font-bold mb-4"> Markdowns</h1>

      <div className="grid grid-cols-4 gap-4">
        <div
          style={{ background: "#0000000d" }}
          className="p-2 hover:bg-slate-200 cursor-pointer my-2 flex flex-col justify-between text-black h-40 rounded-lg"
        >
          <div className="text-lg m-2 font-regular">
            Create New
            <textarea
              onChange={(e) => setinput(e.target.value)}
              placeholder={"Enter file name here"}
              className="border p-2 rounded-sm bg-transparent border-0 font-light text-base"
            />
          </div>
          <Link to={`/admin/markdowns/${input}`}>
            <button className="edit p-2 rounded-sm hover:text-white hover:bg-blue-500 font-thin mb-2">
              Create
            </button>
          </Link>
        </div>
        {data?.markdownFilePaths.map((markdowns) => {
          return (
            <div
              style={{ background: "#0000000d" }}
              className="p-2 hover:bg-slate-200 cursor-pointer my-2 flex flex-col justify-between text-black h-40 rounded-lg"
            >
              <div className="text-lg m-2 font-regular">
                {getName(markdowns)}
              </div>
              <div className="flex">
                <Link
                  to={`/admin/${markdowns.replace("markdown", "markdowns")}`}
                >
                  <button className="edit p-2 rounded-sm hover:text-white hover:bg-blue-500 font-thin">
                    Edit
                  </button>
                </Link>
                <button
                  onClick={() => deleteMarkdown(markdowns)}
                  className="edit p-2 rounded-sm hover:text-white hover:bg-blue-500 font-thin"
                >
                  delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const getName = (str) =>
  str
    .split("/")[1]
    .split(".")[0]
    .replace(/-/g, " ")
    .replace(/\b\w/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
