import nodemailer from 'nodemailer';

const Transport = nodemailer.createTransport({
    host:'smtp-relay.brevo.com',
    port:587,
    secure:false,
    auth:{
        user:"88ea84005@smtp-brevo.com",
        pass:"2xUMW3d4pVv8HaDf"
    }
    
})


export default Transport;