import './contact.css';

export default function Contact() {
  return (
    <div className="contact">
      <div className="contactContent">
        <h1 className="contactTitle">Contact Us</h1>
        <p className="contactText">
          We’d love to hear from you! Reach out to us for any inquiries,
          feedback, or collaboration opportunities.
        </p>
        <form className="contactForm">
          <input type="text" placeholder="Your Name" className="contactInput" />
          <input
            type="email"
            placeholder="Your Email"
            className="contactInput"
          />
          <textarea
            placeholder="Your Message"
            className="contactTextarea"
          ></textarea>
          <button type="submit" className="contactButton">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
