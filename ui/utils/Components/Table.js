const Table = ({
  headers,
  data,
  tableStyle,
  headerStyle,
  bodyStyle,
  onRowClick,
}) => {
  return (
    <table style={tableStyle}>
      <thead style={headerStyle}>
        <tr>
          {headers?.map((header) => {
            return <th>{header?.label}</th>;
          })}
        </tr>
      </thead>
      <tbody style={bodyStyle}>
        {data?.map((row) => {
          return (
            <tr onClick={() => onRowClick(row)}>
              {headers?.map((cell) => {
                return <td>{row[cell?.key]}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
