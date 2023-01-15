import mongoose from "mongoose";

interface IExercise extends mongoose.Document {
  name: string;
  id: string;
  gifUrl: string;
  bodyPart: string;
  equipment: string;
  target: string;
}

export type MongoExercise = Omit<IExercise, "__v">;

const exerciseSchema = new mongoose.Schema(
  {
    bodyPart: {
      type: String,
    },
    equipment: {
      type: String,
    },
    gifUrl: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    target: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const ExerciseModel = mongoose.model<MongoExercise>("Exercise", exerciseSchema);
export default ExerciseModel;
