import { useRef, useState } from "react";
import Aside from "../../Components/Aside/Aside";
import Sidebar from "../../Components/Sidebar/Sidebar";
import "./Support.css";
import SendIcon from '@mui/icons-material/Send';
import emailjs from '@emailjs/browser';

function Support({ toggleMenu, menuOpen }) {
    const [ sending, setSending ] = useState(false)

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    try {
        setSending(true)

        emailjs
        .sendForm(
            `${import.meta.env.VITE_SERVICE_ID}`,
            `${import.meta.env.VITE_TEMPLATE_ID}`,
            form.current,
            `${import.meta.env.VITE_PUBLIC_KEY}`
        )
        .then(
            (result) => {
            console.log(result.text);
            e.target.reset();
            toast.success("Message Sent Successful");
            },
            (error) => {
            console.log(error.text);
            toast.error("Unable to send Messages");
            }
        );
        
    } catch (error) {
        console.log('ERROR SEND TICKET', error)
    } finally {
        setSending(false)
    }

  };

  return (
    <div className="container">
      <div className="menubarContainer">
        <Sidebar toggleMenu={toggleMenu} menuOpen={menuOpen} />
      </div>

      <div className="mainContainer">
        <div className="support">
        <h1 className="h-1">Support Ticket</h1>
          <form className="supportTicket" ref={form} onSubmit={sendEmail}>
            <h2 className="title">Have a question, problem? reach out to us</h2>
            <div className="input-group">
              <input placeholder="Your Name" className="input" required type="text" id="name" name="user_name" />
            </div>

            <div className="input-group">
              <input placeholder="Phone No." className="input" required type="number" id="number" name="user_phone" />
            </div>

            <div className="input-group">
              <input placeholder="Email Address" className="input" required type="email" id="email" name="user_email" />
            </div>

            <div className="input-group">
              <textarea
                placeholder="Your Message"
                required
                rows="8"
                id="message"
                name="message"
                className="input"
              ></textarea>
            </div>
            <button disabled={sending} className="btn" type="submit">
              {
                sending ? (
                    <>
                        Sending...
                    </>
                ) : (
                    <>
                        Submit <SendIcon className="icon" />
                    </>
                )
              }
            </button>
          </form>
        </div>
      </div>

      <div className="asideContainer">
        <Aside toggleMenu={toggleMenu} />
      </div>
    </div>
  );
}

export default Support;
