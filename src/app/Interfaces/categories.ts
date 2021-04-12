export interface Categories {
    data: Category[];
    status: Number,
    message: String,
    success: boolean
}

export interface Category {
    id:Number,
    name:String
}