import jwt from 'jsonwebtoken';



const generateId = (userId) => {
    return jwt.sign(
        {id: userId} ,
        process.env.JWT_SECRET,
        {expiresIn: "7"}
    )
}

export default generateId;