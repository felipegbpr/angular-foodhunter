import { connect, ConnectOptions } from "mongoose";

export const dbConnect = () => {
    connect(process.env.MONGO_URI!, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    } as ConnectOptions).then(
        () => console.log("connect sucessfuly"), 
        (error) => console.log(error));

}