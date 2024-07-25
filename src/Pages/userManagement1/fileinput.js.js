import React, { useState } from "react";
// import { Writable } from "stream";
import {
  createFileEncoderStream,
  createDirectoryEncoderStream,
  CAREncoderStream
} from "ipfs-car";
import * as fs from "fs";
import axios from "axios";
import { Writable } from "stream";
function Fileinput() {
  const [file, setfile] = useState(null);
  const handleChange = (e) => {
    console.log(e.target.files[0]);
    setfile(e.target.files[0]);
  };
  const handleSubmit = async () => {
    // let file = fs.readFileSync("my-files.car");
    // ------
    console.log("Writable", WritableStream);
    const carStreamm = createDirectoryEncoderStream([file])
      .pipeThrough(new CAREncoderStream())
      .pipeTo(new WritableStream());

    const carStream = await createFileEncoderStream(file).pipeThrough(
      new CAREncoderStream()
    );

    // -----
    // let rootCID

    // let carStream= await createFileEncoderStream(file)
    //   .pipeThrough(new TransformStream({
    //     transform (block, controller) {
    //       rootCID = block.cid
    //       controller.enqueue(block)
    //     }
    //   }))
    //   .pipeThrough(new CAREncoderStream())
    //   .pipeTo(new WritableStream())
    // ----
    // let reader= await carStream.getReader()
    console.log(carStream.getReader());
    // console.log(await (await carStream.getReader()).read())

    // carStream.pipeTo(Writable.toWeb(fs.createWriteStream('my.car')))
    try {
      const response = await axios.post(
        "https://api.nft.storage/upload",
        file,
        {
          headers: {
            // "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
            "Content-Type": `application/car;`,
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDI5RUYxM2YyRDAwMzUwNjkzREYzZmRhNWUxYkUxMDExMGM5QjNkY0IiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTcwMDU2NTAzMjk2NCwibmFtZSI6IkFzaHV0b3NoIn0.t31aQJtSEZ18UV5f34hF030m9rxJFFI0ULK1eiKSYdg`
          }
        }
      );
      console.log(response);
    } catch (error) {}
  };

  return (
    <div>
      <input onChange={handleChange} type="file" />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default Fileinput;
