export interface category {
    value: String;
    id : Number
  }
  
  export interface categoryList{
    data : category [],
    status: Number,
    message: String,
    success: boolean
  }