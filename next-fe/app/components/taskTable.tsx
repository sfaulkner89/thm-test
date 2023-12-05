import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material'

import React from 'react'
import { Task } from '../types/Task'
import taskFetch from '../taskFetch'

type Props = {
  rows: Task[]
  setTask: (task: Task | null) => void
  setTasks: (tasks: (task: Task[]) => Task[]) => void
}

export default function TaskTable ({ rows, setTask, setTasks }: Props) {
  const deleteHandler = async (id: string) => {
    await taskFetch(`/delete-task/${id}`, {
      method: 'DELETE'
    })
    setTasks(prev => prev.filter(task => task._id !== id))
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align='left'>Description</TableCell>
            <TableCell align='left'>Status</TableCell>
            <TableCell align='left'>Priority</TableCell>
            <TableCell align='left'>Assignee</TableCell>
            <TableCell align='left'>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rows || []).map((row, i) => (
            <TableRow
              key={i}
              sx={{ cursor: 'pointer' }}

              //   sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component='th' scope='row'>
                {row.name}
              </TableCell>

              <TableCell align='left' onClick={() => setTask(row)}>
                {row.description}
              </TableCell>
              <TableCell align='left' onClick={() => setTask(row)}>
                {row.status}
              </TableCell>
              <TableCell align='left' onClick={() => setTask(row)}>
                {row.priority}
              </TableCell>
              <TableCell align='left' onClick={() => setTask(row)}>
                {row.assignee}
              </TableCell>
              <TableCell
                align='left'
                onClick={() => deleteHandler(row._id || '')}
                sx={{ color: 'red', fontWeight: 'bold' }}
              >
                Delete
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
