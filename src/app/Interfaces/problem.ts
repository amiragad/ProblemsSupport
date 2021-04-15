export interface Problem {
  solved: boolean;
  id : Number
  title:String;
  description:String;
  date:String;
  solutions: Solution [];
}

export interface ProblemList{
  data : ProblemPagination ,
  status: Number,
  message: String,
  success: boolean
}
export interface ProblemPagination{
  listCount: Number,
  totalPages: Number,
  pageNumber: Number,
  pageSize: Number,
  data : Problem [],
}

export interface Solution{
  id: Number,
  content: String,
  likesCount: Number,
  disLikeCount: Number,
  date: String,
  isLike:boolean,
  isDisLike:boolean,
  comments : Comment []
}

export interface Comment{
  id: Number,
  content: String,
  likesCount: Number,
  disLikeCount: Number,
  date: String
}

