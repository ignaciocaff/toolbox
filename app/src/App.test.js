import renderer from "react-test-renderer";
import FileTable from "./pages/Board/components/FileTable";

it("Debería renderizar correctamente la grilla para un archivo", () => {
  const testData = [
    {
      file: "test2.csv",
      lines: [
        {
          text: "dfTwtPGBOHF",
          number: 374837,
          hex: "282536d30b5b88249402318f14de59a5",
        },
      ],
    }
  ];
  const tree = renderer
    .create(<FileTable data={testData}></FileTable>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});