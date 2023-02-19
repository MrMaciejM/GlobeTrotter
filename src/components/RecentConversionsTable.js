
import { useState, useEffect } from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";

function RecentConversionsTable(props) {
//   const [tableData, setTableData] = useState([]);

//   console.log(props)

//   useEffect(() => {
//     // Retrieve table data from localStorage
//     const storedData = localStorage.getItem("RecentConversions");
//     console.log(storedData)
//     if (storedData) {
//       setTableData(JSON.parse(storedData));
//     }
//   }, ["RecentConversions"]); // Add the "recentConversions" key as a dependency

  return (
    <Table  textAlign="center" variant="simple" colorScheme="twitter" layout={["sm", "md"]}>
      <Thead>
        <Tr>
          <Th>Amount</Th>
          <Th>Value</Th>
          <Th>Exchange Rate</Th>
        </Tr>
      </Thead>
      <Tbody>
        {props.tableData.map((row, i) => (
          <Tr key={i}>
            <Td>{row.amount}</Td>
            <Td>{row.value}</Td>
            <Td>{row.rate}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}

export default RecentConversionsTable;