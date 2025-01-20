import './about.css';

export default function About() {
  return (
    <div className="about">
      <div className="aboutContent">
        <h1 className="aboutTitle">About Us</h1>
        <p className="aboutText">
          Welcome to our blog! Here, we share stories, ideas, and insights that
          inspire and connect people from all walks of life. Whether you&apos;re
          looking for personal growth, creative inspiration, or simply a place
          to unwind, we&apos;ve got something for everyone.
        </p>
        <img
          width={'626'}
          height={'417'}
          src="https://img.freepik.com/free-photo/smiling-woman-reading-book-cozy-interior_23-2149441417.jpg"
          alt="About us"
          className="aboutImage"
        />
      </div>
    </div>
  );
}
