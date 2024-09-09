import { Router } from 'express';
import { sample_users } from '../data';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import { User, UserModel } from '../models/user.model';

const router = Router();

router.get('/seed', asyncHandler(
    async (req, res) => {
        const usersCount = await UserModel.countDocuments();
        if (usersCount > 0) {
            res.send('Seed already done!');
            return;
        }

        await UserModel.create(sample_users);
        res.send('Seed Is Done!');
    }
));

router.post('/login', asyncHandler(
    async (req, res) => {
        const {email, password} = req.body;
        const user = await UserModel.findOne({email , password});
          
         if(user) {
          res.send(generateTokenResponse(user));
         }
         else{
           const BAD_REQUEST = 400;
           res.status(BAD_REQUEST).send("Username or password is invalid!");
         }
      
      }
));

const generateTokenResponse = (user : User) => {
    const token = jwt.sign({
      email:user.email, isAdmin: user.isAdmin
    },process.env.JWT_SECRET!,{
      expiresIn:"30d"
    });

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      address: user.address,
      isAdmin: user.isAdmin,
      token: token
    };
  }

export default router;