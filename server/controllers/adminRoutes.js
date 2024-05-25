//get all social media accounts of user to actiavate or deactivate options: Pending and Verified
//get all payment order Pending and Paid
//update payment order when payment is made to user
//get all task: completed, not completed

import PaymentOrderModel from "../models/PaymentOrder.js"
import TaskModel from "../models/Task.js"
import UserModel from "../models/User.js"
import nodemailer from 'nodemailer'
import { config } from 'dotenv'
import TaskCategoryModel from "../models/TaskCategory.js"
import SocialMediaPlatformModel from "../models/SocialMediaPlatform.js"
import SocialMediaTaskModel from "../models/SocialMediaTask.js"
import MusicPlatformModel from "../models/MusicPlatform.js"
import MusicTaskModel from "../models/MusicTask.js"
config()

//Get All users
export async function getAllUser(req, res){
    try {
        const allUsers = await UserModel.find()
        const totalUsers = allUsers.length
        res.status(200).json({success: true, data: allUsers})
    } catch (error) {
        console.log('UNABLE TO GET ALL USERS', error)
        res.status(500).json({ success: false, data: 'Unable to get all users:::',error})
    }
}

//make admin
export async function makeAdmin(req, res){
    const { email } = req.body
    try {
        if(!email){
            return res.status(404).json({ success: false, data: 'PROVIDE AN EMAIL'})
        }
        const userExist = await UserModel.findOne({ email: email})
        if(!userExist){
            return res.status(404).json({ success: false, data: 'Inalid User'})
        }
        userExist.isAdmin = true
        await userExist.save()
        res.status(201).json({ success: true, data: 'User Updated  to admin' })
    } catch (error) {
        console.log('UNABLE TO AMKE ADMIN', error)
        res.status(500).json({ success: false, data: 'Failed to make admin'})
    }
}

//get all payment orders
export async function getAllPaymentOrder(req, res){
    const { query } = req.params
    console.log('HELLO', query)
    try {
        let paymentData
        if (query.toLowerCase() === 'paid'){
            console.log('ME PAID')
            paymentData = await PaymentOrderModel.find({ status: 'Paid' })
            return res.status(200).json({ success: true, data: paymentData})
        }
        if(query.toLowerCase() === 'pending'){
            console.log('ME PENDING')
            paymentData = await PaymentOrderModel.find({ status: 'Pending'})
            return res.status(200).json({ success: true, data: paymentData})
        } else{
            console.log('ME ALL')
            paymentData = await PaymentOrderModel.find()

        }
        res.status(200).json({ success: true, data: paymentData})
    } catch (error) {
        console.log('ERROR GETTING ALL PAYMENT ORDERS', error)
        res.status(500).json({ success: false, data: 'Failed to get all payment order data'})
    }
}

//get a payment orders
export async function getAPaymentOrder(req, res){
    const { id } = req.params
    console.log('HELLO', id)
    try {
        const paymentData = await PaymentOrderModel.findById({ _id: id })
        if(!paymentData){
            return res.status(404).json({ success: false, data: 'Data not found'})
        }
        
        res.status(200).json({ success: true, data: paymentData})
    } catch (error) {
        console.log('ERROR GETTING A PAYMENT ORDERS', error)
        res.status(500).json({ success: false, data: 'Failed to get a payment order data'})
    }
}

//confirm payment to freelancer
export async function confirmPayment(req, res){
    const { id } = req.body
    console.log('COnfirm', id)
    try {
        const paymentOrder = await PaymentOrderModel.findById({ _id: id })

        if(!paymentOrder){
            return res.status(404).json({ success: false, data: 'Payment not found'})
        }
        console.log('orde', paymentOrder)

        if(paymentOrder.status === 'Paid'){
            return res.status(304).json({ success: true, data: 'Payment has previously been confirmed'})
        }

        paymentOrder.status = 'Paid'
        await paymentOrder.save()
        console.log('afetr order', paymentOrder)

        res.status(201).json({ success: true, data: 'Payment has been confimed'})
    } catch (error) {
        console.log('UNABLE TO CONFIRM PAYMENT', error)
        res.status(500).json({ success: false, data: 'Unable to confirm Payment' })
    }
}

// get all job
export async function getAllTask(req, res){
    const { id } = req.params
    console.log('ID', id)
    try {
        const allTask = await TaskModel.find()
        const user = await UserModel.findById({ _id: id })
        if(!user.isAdmin){
            return res.status(404).json({ success: false, data: 'Invalid User'})
        }
        if(!allTask){
            return res.status(404).json({ success: false, data: 'No Available Task at the moment please check later'})
        }

        console.log('TASK', allTask)
        res.status(200).json({ success: true, data: allTask})
    } catch (error) {
        console.log('COULD NOT GET ALL TASK ADMIN', error)
        res.status(500).json({ success: false, data: 'Could not get all available Task'})
    }
}

//in order to send scustomise email from the client you need a text editor in the client side latter
export async function sendEmail(req, res){
    try {
        const users = await UserModel.find()
        const userEmails = users.map(user => user.email)
        console.log('Email', userEmails)

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.NODEMAILER_USER, // generated ethereal user
                pass: process.env.NODEMAILER_PASSWORD, // generated ethereal password
              },
        });

        const commonEmailContent = `
            <h2 style="color: #333333;">Earn more today completing gigs</h2>
            <p style="color: #666666;">Gigs available for you today, get started:</p>
            <ul style="color: #666666; font-size: 17px;">
                <li>Login to your account</li>
                <li>Update your social media account profile in account page</li>
                <li>Head over to Task Point</li>
                <li>Start earning completing gigs</li>
            </ul>
            <p style="color: #666666;"><b>As easy as Pie!</b></p>
            <br />
            <a href="${process.env.MAIL_WEBSITE_LINK}" style="display: inline-block; background-color: #db3e00; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Get Started</a>
            <p style="color: #666666;">Best regards,</p>
            <p style="color: #666666;">${process.env.MAIL_WEBSITE_NAME}</p>
        `;

    for (const user of users) {
        const emailContent = `
            <h1>Hi, ${user.username},</p>
            ${commonEmailContent}
        `;

        // Define email options
        const mailOptions = {
            from: `${process.env.NODEMAILER_USER}`,
            to: user.email,
            subject: 'Hurray Excitng News from Supergig',
            html: emailContent // Your HTML content with styling and button
        };

        // Send email
        await transporter.sendMail(mailOptions);
    }
        
        res.status(201).json({ success: true, data: 'Email sent successful' })
    } catch (error) {
        console.log('UNABLE TO SEND EMAIL,', error)
        res.status(500).json({ success: false, data: 'Unable to send email'})
    }
}

//TASKS

//create task category
export async function createTaskCategory(req, res){
    //console.log(req.body)
    const { category, code, createdby } = req.body

    try {
        if(!category || !code || !createdby){
            return res.status(400).json({  success: false, data: 'All Feilds are required'})
        }

        const taskCodeCategoryExist = await TaskCategoryModel.findOne({ code: code })

        if(taskCodeCategoryExist){
            return res.status(400).json({  success: false, data: 'Code already Exist'})
        }

        const taskCategoryExist = await TaskCategoryModel.findOne({ category: category })

        if(taskCategoryExist){
            return res.status(400).json({  success: false, data: 'Category already Exist'})
        }

        const newTaskcategory = new TaskCategoryModel({
            category, code, createdby
        })
        await newTaskcategory.save()

        const allTaskcategory = await TaskCategoryModel.find()
        

        res.status(201).json({ success: true, data: 'New task created successful' })
    } catch (error) {
     console.log('UNABLE TO CREATE A NEW TASK CATEGORY', error)
     res.status(500).json({ success: false, data: 'Unable to create a new task category'})   
    }

}

//update task category
export async function updateTaskCategory(req, res){
    console.log(req.body)
    const { category, code, createdby, id } = req.body

    try {
        const updateTask = await TaskCategoryModel.findByIdAndUpdate(
            req.body.id,
            {
                $set: {
                    category: category,
                    code: code,
                    createdby: createdby
                }
            },
            { new: true }
        );
        console.log('UPDATED', updateTask)

        res.status(201).json({ success: true, data: 'Task updated successful' })
    } catch (error) {
     console.log('UNABLE TO UPDATE A TASK CATEGORY', error)
     res.status(500).json({ success: false, data: 'Unable to create a new task category'})   
    }
}

//create social media platform
export async function createSocialmediaPlatform(req, res){
    const { platform, code, createdby, icon, taskCategoryCode } = req.body
    try {
        if(!platform || !code || !createdby || !taskCategoryCode || !icon){
            return res.status(400).json({  success: false, data: 'All Feilds are required'})
        }

        const platformCodeCategoryExist = await SocialMediaPlatformModel.findOne({ code: code })

        if(platformCodeCategoryExist){
            return res.status(400).json({  success: false, data: 'Code already Exist'})
        }

        const SocialMediaPlatformExist = await SocialMediaPlatformModel.findOne({ platform: platform })

        if(SocialMediaPlatformExist){
            return res.status(400).json({  success: false, data: 'Platform already Exist'})
        }

        const newTaskcategory = new SocialMediaPlatformModel({
            platform, code, createdby, icon, taskCategoryCode
        })
        await newTaskcategory.save()

        const SocialMediaPlatform = await SocialMediaPlatformModel.find()
        res.status(201).json({ success: true, data: SocialMediaPlatform })
    } catch (error) {
     console.log('UNABLE TO CREATE A NEW SOCIAL MEDIA PLATFORM', error)
     res.status(500).json({ success: false, data: 'Unable to create a new social media platform'})   
    }
}

//create Music platform
export async function createMusicPlatform(req, res){
    const { platform, code, createdby, icon, taskCategoryCode } = req.body
    try {
        if(!platform || !code || !createdby || !taskCategoryCode || !icon){
            return res.status(400).json({  success: false, data: 'All Feilds are required'})
        }

        const platformCodeCategoryExist = await MusicPlatformModel.findOne({ code: code })

        if(platformCodeCategoryExist){
            return res.status(400).json({  success: false, data: 'Code already Exist'})
        }

        const SocialMediaPlatformExist = await MusicPlatformModel.findOne({ platform: platform })

        if(SocialMediaPlatformExist){
            return res.status(400).json({  success: false, data: 'Platform already Exist'})
        }

        const newTaskcategory = new MusicPlatformModel({
            platform, code, createdby, icon, taskCategoryCode
        })
        await newTaskcategory.save()

        const SocialMediaPlatform = await MusicPlatformModel.find()
        console.log('MUSIC PLATFORM ADDED')
        res.status(201).json({ success: true, data: 'New Music platform added' })
    } catch (error) {
     console.log('UNABLE TO CREATE A NEW MUSIC PLATFORM', error)
     res.status(500).json({ success: false, data: 'Unable to create a new music platform'})   
    }
}

//create social media task options
export async function createSocialmediaTask(req, res){
    const { platformCode, taskId, task, pricePerFreelancer, unitPrice, minWorkers, icon, createdBy } = req.body
    try {
        if(!platformCode || !taskId || !task || !pricePerFreelancer || !unitPrice || !minWorkers || !createdBy){
            return res.status(400).json({ success: false, data: 'Fill all necessary Fields'})
        }

        const taskIdExist = await SocialMediaTaskModel.findOne({ taskId: taskId})
        if(taskIdExist){
            return res.status(400).json({ success: false, data: 'Task with this ID Already Exist'})
        }

        const taskExist = await SocialMediaTaskModel.findOne({ task: task})
        if(taskExist){
            return res.status(400).json({ success: false, data: 'Task Already Exist'})
        }


        const findIcon = await SocialMediaPlatformModel.findOne({ code: platformCode })

        const setIcon = findIcon.icon

        const createTask = new SocialMediaTaskModel({
            platformCode, taskId, task, pricePerFreelancer, unitPrice, minWorkers, icon: setIcon, createdBy
        })
        await createTask.save()

        const allTask = await SocialMediaTaskModel.find()

        res.status(201).json({ success: true, data: 'Task Added successful' })

    } catch (error) {
        console.log('UNABLE TO CREATE NEW SOCIAL MEDIA TASK', error)
        res.status(500).json({ success: false, data: 'Unable to create new social media task'})
    }
}

//create music task options
export async function createMusicTask(req, res){
    const { platformCode, taskId, task, pricePerFreelancer, unitPrice, minWorkers, icon, createdBy } = req.body
    try {
        if(!platformCode || !taskId || !task || !pricePerFreelancer || !unitPrice || !minWorkers || !createdBy){
            return res.status(400).json({ success: false, data: 'Fill all necessary Fields'})
        }

        const taskIdExist = await MusicTaskModel.findOne({ taskId: taskId})
        if(taskIdExist){
            return res.status(400).json({ success: false, data: 'Task with this ID Already Exist'})
        }

        const taskExist = await MusicTaskModel.findOne({ task: task})
        if(taskExist){
            return res.status(400).json({ success: false, data: 'Task Already Exist'})
        }


        const findIcon = await MusicPlatformModel.findOne({ code: platformCode })

        const setIcon = findIcon.icon

        const createTask = new MusicTaskModel({
            platformCode, taskId, task, pricePerFreelancer, unitPrice, minWorkers, icon: setIcon, createdBy
        })
        await createTask.save()

        const allTask = await MusicTaskModel.find()
        console.log('NEW MUSIC TASK ADDED')

        res.status(201).json({ success: true, data: 'Task Added successful' })

    } catch (error) {
        console.log('UNABLE TO CREATE NEW MUSIC TASK', error)
        res.status(500).json({ success: false, data: 'Unable to create new music task'})
    }
}

//update social media task options
export async function updateSocialmediaTask(req, res){
    console.log(req.body)
    try {
        if(!req.body.id){
            return res.status(404).json({ success: false, data: 'Invalid ID'})
        }
        const findTask = await SocialMediaTaskModel.findByIdAndUpdate(
            req.body.id,
            {
                $set: {
                    minWorkers: req.body.minWorkers ,
                    platformCode: req.body.platformCode,
                    pricePerFreelancer: req.body.pricePerFreelancer,
                    task: req.body.task,
                    taskId: req.body.taskId,
                    unitPrice: req.body.unitPrice
                }
            },
            {new: true}
        )

        await findTask.save()

        const allTask = await SocialMediaTaskModel.find()

        res.status(201).json({ success: true, data: allTask })
    } catch (error) {
        console.log('UNABLE TO UPDATE SOCIAL MEDIA TASK', error)
        res.status(500).json({ success: false, data: 'Unable to update social media task'})
    }
}

//update music task options
export async function updateMusicTask(req, res){
    console.log(req.body)
    try {
        if(!req.body.id){
            return res.status(404).json({ success: false, data: 'Invalid ID'})
        }
        const findTask = await MusicTaskModel.findByIdAndUpdate(
            req.body.id,
            {
                $set: {
                    minWorkers: req.body.minWorkers ,
                    platformCode: req.body.platformCode,
                    pricePerFreelancer: req.body.pricePerFreelancer,
                    task: req.body.task,
                    taskId: req.body.taskId,
                    unitPrice: req.body.unitPrice
                }
            },
            {new: true}
        )

        await findTask.save()

        const allTask = await MusicTaskModel.find()

        res.status(201).json({ success: true, data: allTask })
    } catch (error) {
        console.log('UNABLE TO UPDATE MUSIC TASK', error)
        res.status(500).json({ success: false, data: 'Unable to update music task'})
    }
}

//get all task of a social media account
export async function getAllTaskForASocialMedia(req, res) {
    const { code, id } = req.params;
    const cleanedCode = code.replace(/[^\w\s]/gi, '');
    const cleanedId = id ? id.replace(/[^\w\s]/gi, '') : undefined;
    console.log(cleanedCode, cleanedId);
    try {
        let allTask = [];
        if (!cleanedId || cleanedId === 'undefined' ) {
            allTask = await SocialMediaTaskModel.find({ platformCode: cleanedCode });
            console.log('ALL', allTask);
            return res.status(200).json({ success: true, data: allTask });
        } else {
            allTask = await SocialMediaTaskModel.findById(cleanedId);
            console.log('ALL', allTask);
            return res.status(200).json({ success: true, data: allTask });
        }
    } catch (error) {
        console.log('UNABLE TO GET ALL TASK FOR A SOCIAL MEDIA', error);
        res.status(500).json({ success: false, data: 'Unable to get all task for a social media' });
    }
}

//get all task of a social media account
export async function getAllTaskForAMusic(req, res) {
    const { code, id } = req.params;
    const cleanedCode = code.replace(/[^\w\s]/gi, '');
    const cleanedId = id ? id.replace(/[^\w\s]/gi, '') : undefined;
    console.log('MUSIC',cleanedCode, cleanedId);
    try {
        let allTask = [];
        if (!cleanedId || cleanedId === 'undefined' ) {
            allTask = await MusicTaskModel.find({ platformCode: cleanedCode });
            console.log('ALL', allTask);
            return res.status(200).json({ success: true, data: allTask });
        } else {
            allTask = await MusicTaskModel.findById(cleanedId);
            console.log('ALL', allTask);
            return res.status(200).json({ success: true, data: allTask });
        }
    } catch (error) {
        console.log('UNABLE TO GET ALL TASK FOR A MUSIC PLATFORM', error);
        res.status(500).json({ success: false, data: 'Unable to get all task for a music platform' });
    }
}

