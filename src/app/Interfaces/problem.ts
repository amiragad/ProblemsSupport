export interface Problem {
  solved: boolean;
  id : Number
  title:String;
  description:String;
  date:String;
  solutions: Solution [];
}

export interface ProblemList{
  data : Problem [],
  status: Number,
  message: String,
  success: boolean
}

export interface Solution{
  id: Number,
  content: String,
  likesCount: Number,
  disLikeCount: Number,
  date: String,
  comments : Comment []
}

export interface Comment{
  id: Number,
  content: String,
  likesCount: Number,
  disLikeCount: Number,
  date: String
}

