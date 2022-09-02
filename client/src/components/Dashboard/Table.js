import React, { useEffect, useMemo, useState } from 'react'
import moment from 'moment'
import { useDispatch } from 'react-redux'

const Table = ({ title, headers, data, keys, deleteFunc }) => {

    const dispatch = useDispatch()
    const [tableBodyData, setTableBodyData] = useState([])
    const totalCol = useMemo(() => [...Array(headers.length).keys()], [headers])

    const tables = () => data.map(object => {
        const obj = {}
        keys.map(key => {
            obj[key] = key === "from" ? (
                moment(object["from"]).format("ll") + "/" + (
                    object.current ? "Present" : moment(object["to"]).format("ll")
                )
            ) : object[key]
        })
        return Object.values(obj)
    });

    useEffect(() => {
        data && setTableBodyData(tables())
    }, [data])


    return (
        <div className="my-2">
            <p className="lead my-2" style={{ fontWeight: "bold" }}>{title}</p>
            <table>
                <thead>
                    <tr>
                        {headers.map(name => (
                            <th key={name} className="bg-light">{name}</th>
                        ))}
                        <th className="bg-light">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 &&
                        tableBodyData.map((arr, idx) => {
                            return (
                                <tr key={idx}>
                                    {totalCol.map(colNo => (
                                        <td key={arr[arr.length - 1] + colNo}>{arr[colNo]}</td>
                                    ))}
                                    <td>
                                        <a
                                            className="btn btn-danger"
                                            onClick={_ => {
                                                dispatch(deleteFunc(arr[arr.length - 1]))
                                            }}>
                                            Delete
                                        </a>
                                    </td>
                                </tr>
                            )
                        })}
                </tbody>
            </table>
        </div>
    )
}

{/* <tr>
<td>Tech Guy Web Solutions</td>
<td>Senior Developer</td>
<td>02-03-2009 - 01-02-2014	</td>
<td>
    <a className="btn btn-danger">Delete</a>
</td>
</tr> */}

export default Table