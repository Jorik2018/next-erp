'use client'

import type { ReactNode } from 'react'
import styled from 'styled-components'

const TableWrapper = styled.div`
  width: 100%;
  margin-top: 2em;

  h1 {
    color: ${p => p.theme?.PRIMARY_COLOR ?? '#0070f3'};
    font-size: 1.3em;
    font-weight: 400;
    text-align: center;
    margin-bottom: 0;
    display: block;
  }

  p {
    display: block;
    color: #777;
    font-size: 0.8em;
    font-weight: 400;
    font-family: 'Calibri';
    text-align: center;
    margin-top: 0.5em;
    margin-bottom: 1em;
  }

  table {
    width: 100%;
    background-color: #fff;
    box-shadow: 0 5px 25px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    margin: 1em auto;
    border-collapse: collapse;

    thead {
      border: none;
      background-color: #fff;
      box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);

      th {
        color: ${p => p.theme?.PRIMARY_COLOR ?? '#0070f3'};
        font-size: 1em;
        font-weight: 500;
        text-align: center;
        padding: 0.5em;
      }
    }

    tbody {
      tr {
        color: #777;
        font-weight: 300;
        font-family: 'Calibri';

        &:hover {
          box-shadow: 0 0 25px rgba(0, 0, 0, 0.15);
          color: ${p => p.theme?.PRIMARY_COLOR ?? '#0070f3'};
        }

        td {
          padding: 0.7em 0.5em;
          text-align: center;
        }
      }
    }
  }
`

type TableItem = {
  data: ReactNode
}

type TableRow = {
  items: TableItem[]
}

type TableProps = {
  children?: ReactNode
  head?: string[]
  body?: TableRow[]
  description?: string
  name?: string
}

export default function Table({
  children,
  head = [],
  body = [],
  description,
  name,
}: TableProps) {
  return (
    <TableWrapper>
      {name && <h1>{name}</h1>}

      {description && <p>{description}</p>}

      <table>
        {children ?? (
          <>
            <thead>
              <tr>
                {head.map((columnName, index) => (
                  <th key={index}>{columnName}</th>
                ))}
              </tr>
            </thead>

            <tbody>
              {body.map((dataRow, rowIndex) => (
                <tr key={rowIndex}>
                  {dataRow.items.map((item, itemIndex) => (
                    <td key={itemIndex}>{item.data}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </>
        )}
      </table>
    </TableWrapper>
  )
}