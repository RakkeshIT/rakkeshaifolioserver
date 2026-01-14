import { Request, Response, Router } from "express";
const router = Router()



router.post('/contact', async (req: Request, res: Response ) => {
    try {
        const {email, message} = req.body;

        if(!email || !message) {
            return res.status(400).json({message: "Email and Message Required"})
        }

        // const transporter = 
    } catch (error) {
        
    }
})

export default router