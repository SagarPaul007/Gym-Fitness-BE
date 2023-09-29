import { Request, Response } from "express";
import ExerciseModel from "../models/Exercise.model";

export const listExercises = async (req: Request, res: Response) => {
  try {
    console.log(req.query);
    const {
      search,
      target,
      bodyPart,
      equipment,
      page = 1,
      limit = 10,
    } = req.query;
    const exercises = await ExerciseModel.find({
      ...(search && {
        $or: [
          {
            name: { $regex: search, $options: "i" },
          },
          {
            target: { $regex: search, $options: "i" },
          },
          {
            bodyPart: { $regex: search, $options: "i" },
          },
          {
            equipment: { $regex: search, $options: "i" },
          },
        ],
      }),
      ...(target && { target }),
      ...(bodyPart && { bodyPart }),
      ...(equipment && { equipment }),
    })
      .sort({ name: -1 })
      .skip((+page - 1) * +limit)
      .limit(+limit)
      .lean();

    res.json({
      success: true,
      exercises,
      nextPage: +page + 1,
      canFetchMore: +limit === exercises.length,
    });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};
