import mongoose from 'mongoose'
import tasks from '../schema/tasks'
import { data } from './data'

export const populate = () => tasks.insertMany(data)
