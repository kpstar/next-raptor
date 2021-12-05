import { useState, useEffect } from 'react';
import React from 'react'
import { GRPCClients } from '../gRPCClients';
import { EventObject } from '../@types/eventObject';
import { LoginUserRequest, LoginUserResponse } from '../ngoauth/testauth_pb';
import { StreamEventsRequest, StreamEventsResponse, UUID } from '../ngoauth/testapi_pb';
import styled from 'styled-components'
import { useTable, useGroupBy, useExpanded } from 'react-table'

type Props = {
  clients: GRPCClients;
};

const EventContainer: React.FC<Props> = ({ clients }) => {
  const [eventObjects, setEventObjects] = useState<EventObject[]>([]);
  const [accessToken, setAccessToken] = useState<string>("Bearer 9g71ZSuiTykxW46IGPFYUnWiKB9CEodRn6zeuPfewK4");
  const { ngoAuthClient, ngoAPIClient } = clients;

  const userId = "jinrz";
  const password = "sup3rCopper47#as";
  const tenantId = "4a5cb02a-72e1-4ba7-a237-10946261a13f";
  const eventAction = ["create"];
  const eventType = "sales";
  const lastIndex = "0";

  const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`

  function Table({ columns, data }) {
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
      state: { groupBy, expanded },
    } = useTable(
      {
        columns,
        data,
      },
      useGroupBy,
      useExpanded // useGroupBy would be pretty useless without useExpanded ;)
    )
  
    // We don't want to render all of the rows for this example, so cap
    // it at 100 for this use case
    const firstPageRows = rows.slice(0, 100)
  
    return (
      <>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps()}>
                    {column.canGroupBy ? (
                      // If the column can be grouped, let's add a toggle
                      <span {...column.getGroupByToggleProps()}>
                        {column.isGrouped ? '🛑 ' : '👊 '}
                      </span>
                    ) : null}
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {firstPageRows.map((row, i) => {
              prepareRow(row)
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return (
                      <td
                        // For educational purposes, let's color the
                        // cell depending on what type it is given
                        // from the useGroupBy hook
                        {...cell.getCellProps()}
                        style={{
                          background: cell.isGrouped
                            ? '#0aff0082'
                            : cell.isAggregated
                            ? '#ffa50078'
                            : cell.isPlaceholder
                            ? '#ff000042'
                            : 'white',
                        }}
                      >
                        {cell.isGrouped ? (
                          // If it's a grouped cell, add an expander and row count
                          <>
                            <span {...row.getToggleRowExpandedProps()}>
                              {row.isExpanded ? '👇' : '👉'}
                            </span>{' '}
                            {cell.render('Cell')} ({row.subRows.length})
                          </>
                        ) : cell.isAggregated ? (
                          // If the cell is aggregated, use the Aggregated
                          // renderer for cell
                          cell.render('Aggregated')
                        ) : cell.isPlaceholder ? null : ( // For cells with repeated values, render null
                          // Otherwise, just render the regular cell
                          cell.render('Cell')
                        )}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </>
    )
  }

  function eventToArray(m: StreamEventsResponse): EventObject[] {
    var tuples = m.getEventtupleList();
    var index = m.getIndex();
    var eventType = m.getEventtype();
    var eventAction = m.getEventaction();
    var arrays: EventObject[] = [];
    tuples.forEach((tuple) => {
      var eventObject: EventObject = {
        index,
        eventType,
        eventAction,
        key: tuple.getKey(),
        value: tuple.getValue(),
      };
      arrays.push(eventObject)
    })
    return arrays;
  }

  function getAccessToken() {
    const req = new LoginUserRequest();
    req.setUserid(userId);
    req.setPassword(password);
    ngoAuthClient.loginUser(req, null, function(err, res: LoginUserResponse)  {
      if (err != null) {
        setAccessToken("");
      } else {
        console.log('Access Token = ', res.getAccesstoken());
        setAccessToken(`Bearer ${res.getAccesstoken()}`);
      }
    });
  }

  function getEventList() {
    const req = new StreamEventsRequest();
    let uuid = new UUID();
    uuid.setUuid(tenantId);
    req.setTenantid(uuid);
    req.setEventtype(eventType);
    req.setEventactionList(eventAction);
    req.setLastindex(lastIndex);

    const header = {"Authorization": accessToken};
    ngoAPIClient.streamEvents(req, header)
    .on("error", function(err) {
      console.log(err);
    }).on("data", (m: StreamEventsResponse) => {
      let newArrays = eventToArray(m);
      setEventObjects((state) => {
        var newArray = state.concat(newArrays);
        console.log("new streamed array = ", newArray);
        return newArray;
      });
    });
  }

  useEffect(() => {

    if (accessToken == '' || accessToken == null) {
      getAccessToken();
    } else {
      getEventList();
    }
  }, [ngoAuthClient, ngoAPIClient]);

  const columns = React.useMemo(
    () => [
      {
        Header: 'Event',
        columns: [
          {
            Header: 'Index',
            accessor: 'index',
            // Use a two-stage aggregator here to first
            // count the total rows being aggregated,
            // then sum any of those counts if they are
            // aggregated further
            aggregate: 'count',
            Aggregated: ({ value }) => `${value} Names`,
          },
          {
            Header: 'Type',
            accessor: 'eventType',
            // Use another two-stage aggregator here to
            // first count the UNIQUE values from the rows
            // being aggregated, then sum those counts if
            // they are aggregated further
            aggregate: 'uniqueCount',
            Aggregated: ({ value }) => `${value} Unique Names`,
          },
          {
            Header: 'Action',
            accessor: 'eventAction',
            // Use another two-stage aggregator here to
            // first count the UNIQUE values from the rows
            // being aggregated, then sum those counts if
            // they are aggregated further
            aggregate: 'uniqueCount',
            Aggregated: ({ value }) => `${value} Unique Names`,
          },
        ],
      },
      {
        Header: 'EventTuple',
        columns: [
          {
            Header: 'Key',
            accessor: 'key',
            // Aggregate the average age of visitors
            aggregate: 'uniqueCount',
            Aggregated: ({ value }) => `${Math.round(value * 100) / 100} Unique Keys`,
          },
          {
            Header: 'Value',
            accessor: 'value',
            // Aggregate the sum of all visits
            aggregate: 'count',
            Aggregated: ({ value }) => `${value} Values`,
          },
        ],
      },
    ],
    []
  )

  return (
    <Styles>
      <Table columns={columns} data={eventObjects} />
    </Styles>
  )
};

export default EventContainer;
