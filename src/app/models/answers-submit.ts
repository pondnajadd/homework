export class AnswersSubmit {
  category: string;
  answer: string;
  constructor() {
    this.category = '';
    this.answer = '';
  }
}

export class AssignmentSubmit {
  questionCategoryId: string = '';
  questions: Question[] = [];

  constructor() {
    this.questionCategoryId = '';
    this.questions = [];
  }
}

export interface Question {
  questionId: string;
  answers: Answer[];
}

export interface Answer {
  questionAnswerId: string;
}
