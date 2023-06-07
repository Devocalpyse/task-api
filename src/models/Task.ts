import mongoose, { Document, Schema } from 'mongoose';

interface iTask extends Document {
  title: string;
  complete: boolean;
}

const taskSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  complete: {
    type: Boolean,
    default: false,
  },
});

const Task = mongoose.model<iTask>('Task', taskSchema);

export { iTask, Task };
