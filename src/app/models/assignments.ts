export interface AssignmentsModel {
  questionCategoryId: string;
  questions: Question[];
}

export interface Question {
  questionId: string;
  answers: Answer[];
}

export interface Answer {
  questionAnswerId: string;
}

export interface ResultAssignment {
  fullScore: number;
  score: number;
}
