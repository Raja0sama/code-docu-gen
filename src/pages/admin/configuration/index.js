import React, { useEffect, useState } from "react";
import config from "../../../config/index.json";

export default function Configuration() {
  const [data, setdata] = useState();
  useEffect(() => {
    fetch("http://localhost:8000/markdowns/")
      .then(async (e) => {
        const data = await e.json();
        setdata(data);
      })
      .catch(console.log);
  }, []);
  const pages = config.routes.reduce(
    (acc, val) => acc.concat(val.children || val),
    []
  );

  return (
    <div className="flex flex-col w-full">
      <h1 className="text-2xl font-bold uppercase mb-4"> Introduction</h1>
      <p className="opacity-70">
        Are you ready for the ultimate developer's experience? Introducing a
        page that is exclusively available on the Development environment! This
        page is your one-stop-shop for creating and managing the Markdown files,
        pages, and assets of your application. Imagine having all the tools at
        your fingertips to easily create and edit your application's content and
        structure, right from the comfort of your admin panel. Unleash your
        creativity and take your development skills to the next level with this
        exciting new feature!{" "}
      </p>

      <div className="flex justify-between mt-10">
        <div className="flex-1 mx-2 bg-[#0000000d] rounded-lg text-center flex justify-center items-center h-40 flex-col">
          <p className="font-regular text-2xl">Markdowns</p>
          <p className="font-light text-lg opacity-50">
            {data?.markdownFilePaths?.length}
          </p>
        </div>
        <div className="flex-1 mx-2 bg-[#0000000d] rounded-lg text-center flex justify-center items-center h-40 flex-col">
          <p className="font-regular text-2xl">Pages</p>
          <p className="font-light text-lg opacity-50">{pages.length}</p>
        </div>
        <div className="flex-1 mx-2 bg-[#0000000d] rounded-lg text-center flex justify-center items-center h-40 flex-col">
          <p className="font-regular text-2xl">Assets</p>
          <p className="font-light text-lg opacity-50">24</p>
        </div>
      </div>
    </div>
  );
}
