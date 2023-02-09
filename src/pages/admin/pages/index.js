import React, { useState } from "react";
import config from "../../../config/index.json";

function Pages() {
  const [form, setForm] = useState({});
  const pages = config.routes.reduce((acc, val) => {
    let child = [];
    if (val?.children) {
      child = val.children.map((e) => ({ ...e, parent: val.key }));
      acc = [...acc, ...child];
    }
    acc = [...acc, val];
    return acc;
  }, []);
  const updateJson = () => {
    fetch("http://localhost:8000/update-json", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jsonFile: "src/config/index.json",
        newJson: {
          ...config,
          routes: addPage(config.routes, form?.key, form?.name, form.parent),
        },
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
    <div>
      <div className="flex flex-col w-full">
        <h1 className="text-2xl font-bold mb-4"> Pages</h1>
        <div className="grid grid-cols-4 gap-4">
          <div
            style={{ background: "#0000000d" }}
            className="p-2 hover:bg-slate-200 cursor-pointer my-2 flex flex-col justify-between text-black min-h-40 rounded-lg"
          >
            <div className="text-lg m-2 font-regular">
              Create New
              <input
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder={"Enter Page Name"}
                className="border p-2 rounded-sm bg-transparent border-0 font-light text-base"
              />
              <input
                onChange={(e) => setForm({ ...form, key: e.target.value })}
                placeholder={"Enter Page key"}
                className="border p-2 rounded-sm bg-transparent border-0 font-light text-base"
              />
              <select
                onChange={(e) => setForm({ ...form, parent: e.target.value })}
                className="border p-2 rounded-sm bg-transparent border-0 font-light text-base"
                placeholder="Select Parent"
              >
                <option value={undefined}>Root</option>

                {config.routes.map((e) => (
                  <option value={e.key}>{e.name}</option>
                ))}
              </select>
            </div>
            <div>
              <button
                disabled={!form && !form?.name && form?.key}
                onClick={updateJson}
                className="edit p-2 rounded-sm hover:text-white hover:bg-blue-500 font-thin w-full"
              >
                Create
              </button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {pages.map((page) => {
            return (
              <div
                style={{ background: "#0000000d" }}
                className="p-2 hover:bg-slate-200 cursor-pointer my-2 flex flex-col justify-between text-black min-h-40 rounded-lg"
              >
                <div className="text-lg m-2 font-regular">
                  <div>{page.name}</div>
                  <div className="text-sm font-light opacity-60">
                    {page.parent && `${page.parent}/${page.key}`}
                  </div>
                </div>
                <div className="flex">
                  {/* <Link */}
                  {/* to={`/admin/${markdowns.replace("markdown", "markdowns")}`}
                  > */}
                  <button className="edit p-2 rounded-sm hover:text-white hover:bg-blue-500 font-thin">
                    Edit
                  </button>
                  {/* </Link> */}
                  <button
                    // onClick={() => deleteMarkdown(markdowns)}
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
    </div>
  );
}

export default Pages;

function addPage(config, key, name, parent) {
  let parentNode = config.find((node) => node.key === parent);
  if (parentNode) {
    parentNode.children.push({ key, name, layout: "DOCUMENTATION_CONTAINER" });
  } else {
    config.push({ key, name, layout: "DOCUMENTATION" });
  }
  return config;
}
