interface HeadersProps {
  headers: string[];
  onClick: () => void;
}

export function Headers({ headers, onClick }: HeadersProps) {
  return (
    <tr>
      {headers.map((e) => (
        <th onClick={onClick} key={e}>
          {e}
        </th>
      ))}
    </tr>
  );
}
