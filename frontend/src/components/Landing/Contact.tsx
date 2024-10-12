const Contact = () => {
  return (
    <div className="contact-page-wrapper">
      <h1 className="primary-heading">Have Question In Mind?</h1>
      <h1 className="primary-heading">Let Us Help You</h1>
      <div className="contact-form-container flex gap-4 max-w-2xl">
        <input type="text" placeholder="yourmail@gmail.com" className="rounded-full" />
        <button className="secondary-button">Submit</button>

      </div>
    </div>
  );
};

export default Contact;
