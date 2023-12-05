import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField
} from '@mui/material'
import React, { useState } from 'react'
import { Task } from '../types/Task'
import styles from '../page.module.css'
import { InputElement } from './InputElement'
import taskFetch from '../taskFetch'

type Props = {
  task: Task
  setTask: (task: Task | null) => void
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '60%',
  bgcolor: 'white',
  border: '2px solid #000',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4
}

export default function TaskModal ({ task, setTask }: Props) {
  const [editedTask, setEditedTask] = useState<Task>(task)

  const handleChange = (value: string, name: string) => {
    setEditedTask({ ...editedTask, [name]: value })
  }

  const handleSubmit = async () => {
    if (task._id) {
      await taskFetch('/put-task', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ task: editedTask })
      })
    } else {
      await taskFetch('/post-task', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ task: editedTask })
      })
    }
    setTask(null)
  }

  return (
    task && (
      <Modal
        open={!!task}
        onClose={() => setTask(null)}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <InputElement
            value={editedTask.name}
            element='Name'
            onChange={handleChange}
          />
          <InputElement
            value={editedTask.description}
            element='Description'
            textArea
            fullWidth
            onChange={handleChange}
          />
          <div className={styles.bottomLine}>
            <Dropdown
              onChange={handleChange}
              value={editedTask.status}
              element='Status'
              options={[
                {
                  value: 'In Progress',
                  label: 'In Progress'
                },
                {
                  value: 'Done',
                  label: 'Done'
                }
              ]}
            />
            <Dropdown
              onChange={handleChange}
              value={editedTask.priority}
              element='Priority'
              options={[
                {
                  value: 'High',
                  label: 'High'
                },
                {
                  value: 'Low',
                  label: 'Low'
                }
              ]}
            />
            <InputElement
              value={editedTask.assignee}
              element='Assignee'
              onChange={handleChange}
            />
          </div>
          <Button variant='contained' onClick={handleSubmit}>
            Save
          </Button>

          <Button variant='contained' onClick={() => setTask(null)}>
            Cancel
          </Button>
        </Box>
      </Modal>
    )
  )
}

type DDProps = {
  element: string
  value: string
  options: { value: string; label: string }[]
  onChange: (value: string, element: string) => void
}

const Dropdown = ({ element, value, options, onChange }: DDProps) => {
  return (
    <FormControl sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id='demo-simple-select-label'>{element}</InputLabel>
      <Select
        labelId='demo-simple-select-label'
        id='demo-simple-select'
        label={element}
        value={value}
        onChange={e => onChange(e.target.value, element.toLowerCase())}
      >
        {options.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
