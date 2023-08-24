import React from "react";
import Table from "react-bootstrap/Table";

const FileTable = ({ data }) => {
  if (!data || data.length === 0) {
    return null;
  }

  return (
    <Table className="mt-2" responsive bordered hover>
      <thead>
        <tr>
          <th>File name</th>
          <th>Text</th>
          <th>Number</th>
          <th>Hex</th>
        </tr>
      </thead>
      <tbody>
        {data.map((file, index) => (
          <React.Fragment key={index}>
            <tr>
              <td className="align-middle" rowSpan={file?.lines?.length + 1}>
                {file.file}
              </td>
            </tr>
            {file.lines.map((line, lineIndex) => (
              <tr key={lineIndex}>
                <td>{line.text}</td>
                <td>{line.number?.toLocaleString()?.replace(/[.,]/g, '')}</td>
                <td>{line.hex}</td>
              </tr>
            ))}
          </React.Fragment>
        ))}
      </tbody>
    </Table>
  );
};

export default FileTable;
