import {useRef} from 'react'
import { FaEnvelope, FaPhoneAlt, FaTwitter } from 'react-icons/fa'
import { GoLocation } from 'react-icons/go'
import emailjs from '@emailjs/browser'
import './Contact.css'
import { toast } from 'react-toastify'

function Contact() {
   const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(process.env.REACT_APP_SERVICE_ID, process.env.REACT_APP_TEMPLATE_ID, form.current, process.env.REACT_APP_PUBLIC_KEY)
      .then((result) => {
         toast.success('Message sent successfully')
          
      }, (error) => {
         toast.error(error.text)
          
      });
      e.target.reset()
  };
  return (
    <div className="container">
      <div className="contact">
      <h2>Contact Us</h2>
      <div className="section">
         <form ref={form} onSubmit={sendEmail}>
            <div className='cont'>
               <label>Name</label>
               <input type="text" name='user_name' placeholder='Full Name' required/>
               <br />
               <label>Email</label>
               <input type="email" name='user_email' placeholder='Your active email' required/>
               <br />
               <label>Subject</label>
               <input type="text" name='subject' placeholder='Subject' required/>
               <br />
               <label>Message</label>
               <textarea name="message" cols="30"
              rows="10"
              style={{ width: "550px",maxWidth:"100%" }}></textarea>
               <button type='submit' className='bot'>Send Message</button>

            </div>
         </form>
         <div className="contact__details">
            <div className="" style={{color: "#f95738"}}>
               <h3>Our Contact Information</h3>
               <p className='wrap'>Fill the form or contact us via other channels listed below</p>
               <br />
               <div className="icons">
                  <span>
                     <FaPhoneAlt />
                     <p>+2349079307571</p>
                  </span>
                  <span>
                     <FaEnvelope />
                     <p>joshuazhinno@gmail.com</p>
                  </span>
                  <span>
                     <GoLocation />
                     <p>Lagos, Nigeria.</p>
                  </span>
                  <span>
                     <FaTwitter />
                     <p>@joshua_zino</p>
                  </span>
               </div>
            </div>
         </div>
      </div>
    </div>
    </div>
  )
}

export default Contact