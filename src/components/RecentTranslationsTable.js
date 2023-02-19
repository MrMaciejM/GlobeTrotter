
import { useState, useEffect } from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";

function RecentTranslationsTable(props) {
//   const [tableData, setTableData] = useState([]);

//   console.log(props)

//   useEffect(() => {
//     // Retrieve table data from localStorage
//     const storedData = localStorage.getItem("RecentTranslations");
//     console.log(storedData)
//     if (storedData) {
//       setTableData(JSON.parse(storedData));
//     }
//   }, ["RecentTranslations"]); // Add the "recentTranslations" key as a dependency

  return (
    <Table  textAlign="center" variant="simple" colorScheme="twitter" layout={["sm", "md"]}>
      <Thead>
        <Tr>
          <Th>Original Text</Th>
          <Th>Detected Language</Th>
          <Th>Translated Text</Th>
        </Tr>
      </Thead>
      <Tbody>
        {props.tableData.map((row, i) => (
          <Tr key={i}>
            <Td>{row.text}</Td>
            <Td>{row.supportedLanuage}</Td>
            <Td>{row.translatedText}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}

export default RecentTranslationsTable;