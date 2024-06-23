import NewsLetterModel from "../models/NewsLetter.js"

export async function joinNewsLetter(req, res){
    const { email, phoneNumber, name } = req.body
    try {
        const emailExist = await NewsLetterModel.findOne({ email: email })
        if(emailExist){
            emailExist.email = email
            emailExist.phoneNumber = phoneNumber
            emailExist.name = name
            await emailExist.save()
            return res.status(201).json({ success: true, data: 'Successfully joined our newsletter'})
        }
        const phoneNumberExist = await NewsLetterModel.findOne({ phoneNumber: phoneNumber })
        if(phoneNumberExist){
            phoneNumberExist.email = email
            phoneNumberExist.phoneNumber = phoneNumber
            phoneNumberExist.name = name
            await phoneNumberExist.save()
            return res.status(201).json({ success: true, data: 'Successfully joined our newsletter'})
        }
        const newSubscriber = await NewsLetterModel.create({
            email, phoneNumber, name
        })
        console.log('EMAIL SUB', newSubscriber)
        res.status(201).json({ success: true, data: 'Successfully joined our newsletter'})
    } catch (error) {
        console.log('UNABLE TO JOIN NEWSLETTER', error)
        res.status(500).json({ success: false, data: error.message || 'Unable to join newsletter'})
    }
}

export async function removeNewsletter(req, res){
    const { id } = req.params
    try {
        const findEmail = await NewsLetterModel.findById({ _id: id })
        if(!findEmail){
            return res.status(404).json({ success: false, data: 'Email address not found'})
        }

        const deleteEmail = await NewsLetterModel.findByIdAndDelete({ _id: id })
        res.status(200).json({ success: false, data: 'Successfull unsubscribed from recieving emails'})
    } catch (error) {
        console.log('UNABLE TO REMOVE NEWS LETTER SUBSCRIBER', error)
        res.status(500).json({ success: false, data: 'An error occured'})
    }
}